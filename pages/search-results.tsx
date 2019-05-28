import * as React from 'react';
import styled from 'styled-components';
import IndexForm from '../src/components/Forms/IndexForm';
import Layout from '../src/components/Layout';
import debounce from 'lodash.debounce';
import { Margin } from '../src/theme/globalStyle';
import { Box, Flex } from '@rebass/grid';
import { i18n, withNamespaces } from '../src/i18n';
import { connect } from '../src/store'
import { REQUEST_getLocations } from '../src/API';
import { FilterAndSortBar, SearchBar, ResultsCards } from '../src/components/Search';
import Router, { withRouter } from 'next/router';
import axios from 'axios';
import moment from 'moment-jalaali';
moment.loadPersian();

export default withRouter(withNamespaces('common')(connect(state => state)(
  class extends React.Component<{ t: any, router: any, href: any, user: any }> {
    static async getInitialProps() {
      return {
        namespacesRequired: ['common']
      };
    }

    state = {
      error: '',
      city: 1,
      cityName: null,
      showFilters: false,
      citiesFarsi: [{ text: 'کمی صبر کنید...', value: null }],
      citiesEnglish: [{ text: 'کمی صبر کنید...', value: null }],
      startDate: moment(),
      endDate: moment(),
      price: [0, 2000000],
      priceSort: "price",
      focusedInput: null,
      brand: null,
      brandsFarsi: [{ text: 'کمی صبر کنید...', value: null }],
      brandsEnglish: [{ text: 'کمی صبر کنید...', value: null }],
      model: null,
      modelsFarsi: [{ text: 'کمی صبر کنید...', value: null }],
      modelsEnglish: [{ text: 'کمی صبر کنید...', value: null }],
      brandLoading: true,
      modelLoading: true,
      deliverAtRentersPlace: false,
      loadingResults: true,
      lodingMore: false,
      noResult: false,
      results: [{}],
      carBodyType: [],
      latest_result_key: null,
      page: 1,
      total_count: 0,
      stats: {
        deliver_at_renters_place: 0,
        body_style_set: [
          {
            id: 1,
            count: 0
          },
          {
            id: 2,
            count: 0
          },
          {
            id: 3,
            count: 0
          },
          {
            id: 4,
            count: 0
          },
          {
            id: 5,
            count: 0
          },
          {
            id: 6,
            count: 0
          },
          {
            id: 7,
            count: 0
          },
          {
            id: 8,
            count: 0
          },
          {
            id: 9,
            count: 0
          }
        ]
      }
    };

    constructor(props) {
      super(props);
      this.toggleShowFilters = this.toggleShowFilters.bind(this);
      this.toggleDeliverAtRentersPlace = this.toggleDeliverAtRentersPlace.bind(this);
      this.setCity = this.setCity.bind(this);
      this.setDate = this.setDate.bind(this);
      this.setfocusedInput = this.setfocusedInput.bind(this);
      this.setBrandAndGetModels = this.setBrandAndGetModels.bind(this);
      this.setModel = this.setModel.bind(this);
      this.setPrice = this.setPrice.bind(this);
      this.toggleToCarBodyType = this.toggleToCarBodyType.bind(this);
      this.togglePriceSort = this.togglePriceSort.bind(this);
      this.nextPage = this.nextPage.bind(this);
      // this.renderResultsDebounced = debounce(this.renderResults.bind(this), 1000);
      this.renderResults = debounce(this.renderResults.bind(this), 1000);
    }

    toggleShowFilters(showFilters) {
      this.setState({ showFilters });
    }

    toggleDeliverAtRentersPlace(val) {
      this.setState({ deliverAtRentersPlace: val, loadingResults: true }, () => {
        this.renderResults();
      });
    }

    togglePriceSort(priceSort) {
      this.setState({ priceSort, loadingResults: true }, () => {
        this.renderResults();
      });
    }

    nextPage() {
      console.log("nextpage is ", this.state.page + 1);
      this.setState({ lodingMore: true }, () => {
        this.renderResults(this.state.page + 1);
      });
    }

    toggleToCarBodyType(id) {
      console.log("runned");
      let carBodyType = this.state.carBodyType;
      const index = carBodyType.indexOf(id);
      // console.log({ index, a: "1" });
      if (index > -1) {
        carBodyType.splice(index, 1);
        console.log(id + "removed");
      }
      else {
        carBodyType.push(id);
        console.log(id + "pushed");
      }

      this.setState({ carBodyType, loadingResults: true }, () => {
        this.renderResults();
      });
    }

    setCity(cityID, CityName) {
      this.setState({ city: cityID, CityName, loadingResults: true }, () => {
        this.renderResults();
      });
    }

    setDate(startDate, endDate) {
      this.setState({ startDate, endDate, loadingResults: true }, () => {
        this.renderResults();
      });
    }

    setfocusedInput(focusedInput) {
      this.setState({ focusedInput });
    }

    setBrandAndGetModels(brandID, brandName) {
      if (brandID === "") {
        this.setState({ brand: null, model: null, modelLoading: false, loadingResults: true }, () => {
          this.renderResults();
        });
      } else {
        this.setState({ brand: brandID, modelLoading: true, loadingResults: true }, () => {
          this.renderResults();
        });
        axios
          .post('https://otoli.net' + '/core/car/list?limit=100&brand_id=' + brandID)
          .then(response => {
            if (
              response.data.success &&
              Object.keys(response.data.items).length >= 1
            ) {
              const modelsFarsi = response.data.items.map((value, index) => ({
                key: value.id,
                text: `${value.name.fa} - ${value.name.en}`,
                value: value.id
              }));
              const modelsEnglish = response.data.items.map((value, index) => ({
                key: value.id,
                text: value.name.en,
                value: value.id
              }));
              this.setState({ modelsFarsi, modelsEnglish, model: null, modelLoading: false });
            } else {
              this.setState({
                model: null,
                modelLoading: false,
                modelsEnglish: [{ text: 'All Models', value: 0 }],
                modelsFarsi: [{ text: 'تمام مدل‌ها', value: 0 }]
              });
            }
          })
          .catch(error => {
            // tslint:disable-next-line:no-console
            console.error(error);
            this.setState({ error: error, success: false });
          })
      }
    }

    setModel(modelID, modelName) {
      if (modelID === "") {
        modelID = null;
      }
      this.setState({ model: modelID, loadingResults: true }, () => {
        this.renderResults();
      });
    }
    setPrice(price) {
      this.setState({ price, loadingResults: true }, () => {
        this.renderResults();
      });
    }


    componentWillMount() {
      if (this.props.router.query) {
        const { start, end, min_price, max_price, deliver, brand, model, city } = this.props.router.query;
        // console.log(this.props.router.query);
        let startDate = moment(start, 'jYYYY/jMM/jDD');
        let endDate = moment(end, 'jYYYY/jMM/jDD');
        // console.log({ inp: start, startDate: startDate.format('jYYYY/jMM/jDD [is] YYYY/MM/DD') });
        // console.log({ inp: end, endDate: endDate.format('jYYYY/jMM/jDD [is] YYYY/MM/DD') });
        if (start) {
          this.setState({ startDate });
        }
        if (end) {
          this.setState({ endDate });
        }
        if (min_price && max_price) {
          this.setState({
            price: [min_price, max_price]
          });
        }
        if (deliver) {
          this.setState({
            deliverAtRentersPlace: true
          });
        }
        if (brand) {
          this.setState({
            brand: Number(brand)
          });
        }
        if (model) {
          this.setState({
            model: Number(model)
          });
        }
        if (city) {
          this.setState({
            city: Number(city)
          });
        }
      }
    }

    async componentDidMount() {
      const res = await REQUEST_getLocations({ brief: true });
      this.setState(res);
      if (this.state.city) {
        console.log(this.state.citiesFarsi[this.state.city].text);
        this.state.citiesFarsi.map((value, index) => {
          if (value.value == this.state.city) {
            this.setState({ cityName: this.state.citiesFarsi[index].text });
          }
        });
      }

      this.renderResults();

      // get car brands and genrate a dropdown input in form
      axios
        .post('https://otoli.net' + '/core/brand/list?limit=500')
        .then(response => {
          if (response.data.success) {
            const brandsFarsi = response.data.items.map((value, index) => ({
              key: value.id,
              text: `${value.name.fa} - ${value.name.en}`,
              value: value.id
            }));
            const brandsEnglish = response.data.items.map((value, index) => ({
              key: value.id,
              text: value.name.en,
              value: value.id
            }));
            this.setState({ brandsEnglish, brandsFarsi, brandLoading: false });
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ error: error, success: false });
        });
    }

    // renderResultsDebounced(page = 0) {
    //   debounce(this.renderResults(page), 500)
    // };

    renderResults(page = 0) {
      // send search resluts request
      let queryString = '';
      let shownURL = '';
      if (this.state.city) {
        queryString = queryString + `location_id=${this.state.city}&`;
        shownURL = shownURL + `city=${this.state.city}&`;
      }
      if (this.state.startDate && this.state.endDate) {
        queryString = queryString + `start_date=${
          moment(this.state.startDate).format('jYYYY/jMM/jDD')
          }&end_date=${
          moment(this.state.endDate).format('jYYYY/jMM/jDD')
          }&`;
        shownURL = shownURL + `start=${
          moment(this.state.startDate).format('jYYYY/jMM/jDD')
          }&end=${
          moment(this.state.endDate).format('jYYYY/jMM/jDD')
          }&`;
      }
      if (this.state.brand) {
        queryString = queryString + `brand_id=${this.state.brand}&`;
        shownURL = shownURL + `brand=${this.state.brand}&`;
      }
      if (this.state.model) {
        queryString = queryString + `car_id=${this.state.model}&`;
        shownURL = shownURL + `model=${this.state.model}&`;
      }
      if (this.state.deliverAtRentersPlace) {
        queryString = queryString + `deliver_at_renters_place=1&`;
        shownURL = shownURL + `deliver=1&`;
      }
      if (this.state.price) {
        let max = this.state.price[1];
        if (max == 2000000) {
          max = 100000000
        }
        queryString = queryString + `min_price=${this.state.price[0]}&max_price=${max}&`;
        shownURL = shownURL + `min_price=${this.state.price[0]}&max_price=${this.state.price[1]}&`;
      }
      if (this.state.carBodyType) {
        queryString = queryString + `body_style_id=${this.state.carBodyType.join()}&`;
        shownURL = shownURL + `bodytype=${this.state.carBodyType.join()}&`;
      }
      if (this.state.priceSort) {
        queryString = queryString + `o=${this.state.priceSort}&`;
        shownURL = shownURL + `order=${this.state.priceSort}&`;
      }

      if (page === 0) {
        axios
          .get('https://otoli.net' + `/core/rental-car/search-for-rent/list?start=${page}&limit=4&` + queryString)
          .then(response => {
            // update URL
            const href = `/search-results?${shownURL}page=${page}`;
            const as = href;
            Router.replace(href, as, { shallow: true });
            if (response.data.success) {
              console.log(response.data.result_key);
              const results = response.data.items.map((value, index) => ({
                key: value.index,
                id: value.id,
                avg_price_per_day: value.avg_price_per_day,
                body_style: value.body_style,
                cancellation_policy: value.cancellation_policy,
                capacity: value.capacity,
                car: value.car,
                color: value.color,
                deliver_at_renters_place: value.deliver_at_renters_place,
                description: value.description,
                extra_km_price: value.extra_km_price,
                location: value.location,
                max_km_per_day: value.max_km_per_day,
                media_set: value.media_set,
                mileage_range: value.mileage_range,
                min_days_to_rent: value.min_days_to_rent,
                no_of_days: value.no_of_days,
                owner: value.owner,
                total_price: value.total_price,
                transmission_type: value.transmission_type,
                year: value.year,
                search_id: value.search_id
              }));
              if (results === undefined || results.length == 0) {
                this.setState({ results: [], loadingResults: false, noResult: true, lodingMore: false });
              }
              else {
                const stats = response.data.extra_info.stats;
                const body_style_stats = stats.body_style_set.map((value, index) => ({
                  id: value.id,
                  count: value.count,
                }));
                this.setState({
                  results, loadingResults: false, noResult: false, lodingMore: false,
                  latest_result_key: response.data.result_key,
                  total_count: response.data.total_count,
                  stats: {
                    body_style_set: body_style_stats,
                    deliver_at_renters_place: stats.deliver_at_renters_place
                  }
                });
              }
            }
          })
          .catch(error => {
            console.error(error);
            this.setState({ error: error, success: false });
          });
      } else if (this.state.latest_result_key) {
        console.log("here we go again...!");
        axios
          .get('https://otoli.net'
            + `/core/rental-car/search-for-rent/list?page=${page}&limit=4&result_key=`
            + this.state.latest_result_key)
          .then(response => {
            // update URL
            // const href = `/search-results?${shownURL}start=${page}`;
            // const as = href;
            // Router.push(href, as, { shallow: true });
            if (response.data.success) {
              console.log(response.data);
              const results = response.data.items.map((value, index) => ({
                key: value.index,
                id: value.id,
                avg_price_per_day: value.avg_price_per_day,
                body_style: value.body_style,
                cancellation_policy: value.cancellation_policy,
                capacity: value.capacity,
                car: value.car,
                color: value.color,
                deliver_at_renters_place: value.deliver_at_renters_place,
                description: value.description,
                extra_km_price: value.extra_km_price,
                location: value.location,
                max_km_per_day: value.max_km_per_day,
                media_set: value.media_set,
                mileage_range: value.mileage_range,
                min_days_to_rent: value.min_days_to_rent,
                no_of_days: value.no_of_days,
                owner: value.owner,
                total_price: value.total_price,
                transmission_type: value.transmission_type,
                year: value.year,
                search_id: value.search_id
              }));
              if (results === undefined || results.length == 0) {
                this.setState({ results: [], loadingResults: false, noResult: true, lodingMore: false });
              }
              else {
                let temp = this.state.results;
                this.setState({
                  results: temp.concat(results), loadingResults: false, noResult: false, page, lodingMore: false
                });
              }
            }
          })
          .catch(error => {
            console.error(error);
            this.setState({ error: error, success: false });
          });
      }
    }


    render() {
      const { t, router, href } = this.props;
      const {
        showFilters,
        citiesFarsi,
        citiesEnglish,
        city,
        cityName,
        startDate,
        endDate,
        focusedInput,
        brand,
        model,
        brandsEnglish,
        brandsFarsi,
        modelsFarsi,
        modelsEnglish,
        brandLoading,
        modelLoading,
        deliverAtRentersPlace,
        loadingResults,
        results,
        price,
        carBodyType,
        priceSort,
        noResult,
        latest_result_key,
        total_count,
        stats,
        page,
        lodingMore
      } = this.state;
      const showMore = ((page * 4) <= total_count);
      console.log({ num: (page * 4), total_count, showMore });
      return (
        <Layout haveSubHeader={true} pageTitle={'Hello World'}>
          <SearchBar
            count={total_count}
            t={t}
            setDate={this.setDate}
            startDate={startDate}
            endDate={endDate}
            setfocusedInput={this.setfocusedInput}
            focusedInput={focusedInput}
            setCity={this.setCity}
            cities={{ citiesFarsi, citiesEnglish }}
            city={city}
            cityName={cityName}
          />
          <div className="row container_on_desktop" style={{ margin: 'auto auto', flexDirection: 'row-reverse' }}>
            <FilterAndSortBar
              toggleToCarBodyType={this.toggleToCarBodyType}
              priceSort={priceSort}
              togglePriceSort={this.togglePriceSort}
              carBodyType={carBodyType}
              t={t}
              showFilters={showFilters}
              toggleShowFilters={this.toggleShowFilters}
              brand={brand}
              model={model}
              brands={{ brandsEnglish, brandsFarsi }}
              models={{ modelsEnglish, modelsFarsi }}
              brandLoading={brandLoading}
              modelLoading={modelLoading}
              price={price}
              setBrandAndGetModels={this.setBrandAndGetModels}
              setModel={this.setModel}
              setPrice={this.setPrice}
              deliverAtRentersPlace={deliverAtRentersPlace}
              toggleDeliverAtRentersPlace={this.toggleDeliverAtRentersPlace}
              stats={stats}
            />
            <ResultsCards
              t={t}
              nextPage={this.nextPage}
              showNextPage={true}
              results={results}
              loadingResults={loadingResults}
              lodingMore={lodingMore}
              noResult={noResult}
              showMore={showMore}
              dateURL={
                `&start=${moment(this.state.startDate).format('jYYYY/jMM/jDD')}&end=${moment(this.state.endDate).format('jYYYY/jMM/jDD')}`}
            />
          </div>
        </Layout>
      );
    }
  }
)));
