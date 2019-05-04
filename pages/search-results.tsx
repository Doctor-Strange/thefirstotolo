import * as React from 'react';
import styled from 'styled-components';
import IndexForm from '../src/components/Forms/IndexForm';
import Layout from '../src/components/Layout';
import { Margin } from '../src/theme/globalStyle';
import { Box, Flex } from '@rebass/grid';
import { i18n, withNamespaces } from '../src/i18n';
import { FilterAndSortBar, SearchBar, ResultsCards } from '../src/components/Search';
import Router from 'next/router';
import jsCookie from 'js-cookie';
import axios from 'axios';
import moment from 'moment-jalaali';
moment.loadPersian();

export default withNamespaces('common')(
  class extends React.Component<{ t: any, router: any }> {
    static async getInitialProps() {
      return {
        namespacesRequired: ['common']
      };
    }

    state = {
      token: '',
      error: '',
      city: null,
      showFilters: false,
      citiesFarsi: [{ text: 'کمی صبر کنید...', value: null }],
      citiesEnglish: [{ text: 'کمی صبر کنید...', value: null }],
      startDate: moment(),
      endDate: moment(),
      price: {
        max: 1000000,
        min: 0
      },
      focusedInput: null,
      brand: null,
      brandsFarsi: [{ text: 'کمی صبر کنید...', value: null }],
      brandsEnglish: [{ text: 'کمی صبر کنید...', value: null }],
      model: null,
      shouldModelLoad: false,
      modelsFarsi: [{ text: 'کمی صبر کنید...', value: null }],
      modelsEnglish: [{ text: 'کمی صبر کنید...', value: null }],
      deliverAtRentersPlace: false,
      loadingResults: true,
      results: []
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
    }

    toggleShowFilters(val) {
      this.setState({ showFilters: val });
    }

    toggleDeliverAtRentersPlace(val) {
      this.setState({ deliverAtRentersPlace: val, loadingResults: true }, () => {
        this.renderResults();
      });
    }

    setCity(cityID, CityName) {
      this.setState({ city: cityID, loadingResults: true }, () => {
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
      this.setState({ brand: brandID, shouldModelLoad: true, loadingResults: true }, () => {
        this.renderResults();
      });
      axios
        .post('https://otoli.net' + '/core/car/list?brand_id=' + brandID)
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
            this.setState({ modelsFarsi, modelsEnglish });
          } else {
            this.setState({
              model: null,
              modelsEnglish: [{ text: 'Loading', value: null }],
              modelsFarsi: [{ text: 'Loading', value: null }]
            });
          }
        })
        .catch(error => {
          // tslint:disable-next-line:no-console
          console.error(error);
          this.setState({ error: error, success: false });
        })
        .then(() => {
          this.setState({ shouldModelLoad: false });
        });
    }

    setModel(modelID, modelName) {
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
      this.setState({
        token: jsCookie.get('token')
      });
    }

    componentDidMount() {
      // get cities and genrate a dropdown input in form
      axios
        .post('https://otoli.net' + '/core/location/list?brief=1')
        .then(response => {
          if (response.data.success) {
            const citiesFarsi = response.data.items.map((value, index) => ({
              key: value.id,
              text: value.name.fa,
              value: value.id
            }));
            const citiesEnglish = response.data.items.map((value, index) => ({
              key: value.id,
              text: value.name.en,
              value: value.id
            }));
            this.setState({ citiesFarsi, citiesEnglish });
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ error, success: false });
        });
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
            this.setState({ brandsEnglish, brandsFarsi });
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ error: error, success: false });
        });
    }

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
        queryString = queryString + `min_price=${this.state.price.min}&max_price=${this.state.price.max}&`;
        shownURL = shownURL + `min_price=${this.state.price.min}&max_price=${this.state.price.max}&`;
      }

      axios
        .get('https://otoli.net' + `/core/rental-car/search-for-rent/list?start=${page}&limit=9` + queryString)
        .then(response => {
          // update URL
          const href = `/search-results?${shownURL}start=${page}&limit=9`;
          const as = href;
          Router.push(href, as, { shallow: true });
          if (response.data.success) {
            console.log(response.data.items[0]);
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
            }));
            this.setState({ results, loadingResults: false });
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ error: error, success: false });
        });
    }


    render() {
      const { t, router } = this.props;
      const {
        showFilters,
        citiesFarsi,
        citiesEnglish,
        city,
        startDate,
        endDate,
        focusedInput,
        brand,
        model,
        brandsEnglish,
        brandsFarsi,
        modelsFarsi,
        modelsEnglish,
        deliverAtRentersPlace,
        loadingResults,
        results,
        price } = this.state;
      console.log("router is ");
      console.log(router);
      return (
        <Layout haveSubHeader={true} pageTitle={'Hello World'}>
          <SearchBar
            count={43}
            t={t}
            setDate={this.setDate}
            startDate={startDate}
            endDate={endDate}
            setfocusedInput={this.setfocusedInput}
            focusedInput={focusedInput}
            setCity={this.setCity}
            cities={{ citiesFarsi, citiesEnglish }}
            city={city}
          />
          <FilterAndSortBar
            t={t}
            showFilters={showFilters}
            toggleShowFilters={this.toggleShowFilters}
            brand={brand}
            model={model}
            brands={{ brandsEnglish, brandsFarsi }}
            models={{ modelsEnglish, modelsFarsi }}
            price={price}
            setBrandAndGetModels={this.setBrandAndGetModels}
            setModel={this.setModel}
            setPrice={this.setPrice}
            deliverAtRentersPlace={deliverAtRentersPlace}
            toggleDeliverAtRentersPlace={this.toggleDeliverAtRentersPlace}
          />
          <ResultsCards t={t} results={results} loadingResults={loadingResults} />
        </Layout>
      );
    }
  }
);
