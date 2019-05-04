import * as React from 'react';
import styled from 'styled-components';
import { Section } from '../src/components/row/Sections';
import IndexForm from '../src/components/Forms/IndexForm';
import Layout from '../src/components/Layout';
import { Margin } from '../src/theme/globalStyle';
import { Box, Flex } from '@rebass/grid';
import { i18n, withNamespaces } from '../src/i18n';
import { FilterAndSortBar, SearchBar } from '../src/components/Search';
import { CarCard } from '../src/components/Cards';
import { BulletList } from "react-content-loader";
import jsCookie from 'js-cookie';
import axios from 'axios';
import moment from 'moment-jalaali';
moment.loadPersian();

export default withNamespaces('common')(
  class extends React.Component<{ t: any }> {
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
      focusedInput: 'startDate',
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
    }

    toggleShowFilters(val) {
      this.setState({ showFilters: val });
    }

    toggleDeliverAtRentersPlace(val) {
      this.setState({ deliverAtRentersPlace: val });
    }

    setCity(cityID, CityName) {
      this.setState({ city: cityID });
    }

    setDate(startDate, endDate) {
      this.setState({ startDate, endDate });
    }

    setfocusedInput(focusedInput) {
      this.setState({ focusedInput });
    }

    setBrandAndGetModels(brandID, brandName) {
      this.setState({ brand: brandID, shouldModelLoad: true });
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
      this.setState({ model: modelID });
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
      axios
        .post('https://otoli.net' + `/core/rental-car/search-for-rent/list?start=${page}&limit=9`)
        .then(response => {
          if (response.data.success) {
            const results = response.data.items.map((value, index) => ({
              key: value.id,
              //  text: `${value.name.fa} - ${value.name.en}`,
              //  value: value.id
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
      const { t } = this.props;
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
        results } = this.state;
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
            setBrandAndGetModels={this.setBrandAndGetModels}
            setModel={this.setModel}
            deliverAtRentersPlace={deliverAtRentersPlace}
            toggleDeliverAtRentersPlace={this.toggleDeliverAtRentersPlace}
          />
          <Section justifyCenter={true}>
            {(loadingResults === true || results.length <= 0) ?
              (
                <>
                  <BulletList style={{ height: '160px', width: '318px' }} />
                  <BulletList style={{ height: '160px', width: '318px' }} />
                  <BulletList style={{ height: '160px', width: '318px' }} />
                </>
              ) : (
                results.map((value, index) =>
                  <CarCard
                    key={index}
                    title={value.title}
                    img={value, image}
            description={value.description}
            text2={value.text2}
            score={"8.4"}
            />
          )
        )
      }


          </Section>
          <p className="text-center">
            <a href="#0" className="btn_1 rounded add_top_30">Load more</a>
          </p>
        </Layout>
      );
    }
  }
);
