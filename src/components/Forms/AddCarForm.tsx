/* tslint:disable */
import * as React from 'react';
import { useCallback } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import {
  Form,
  Label,
  Segment,
  Button,
  Checkbox,
  Grid,
  Dropdown,
  Icon,
  Card,
  TextArea
} from 'semantic-ui-react';
import Error404 from '../404';
import { i18n, withNamespaces } from '../../i18n';
// import {  } from 'formik-semantic-ui';
import { Formik, FormikActions, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import * as NewUser from '../../../static/new_user.svg';
import * as Pelak from '../../../static/pelak2.png';
import { Box, Flex } from '@rebass/grid';
import { kmDrivenEnglish, kmDrivenFarsi } from '../../constants/options';
import { useDropzone } from 'react-dropzone';
import Dropzone from 'react-dropzone';

const DropZoneDiv = styled.section`
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  .dropzone {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-bottom: 16px;
    border-width: 2px;
    border-radius: 2px;
    border-color: #eeeeee;
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border 0.24s ease-in-out;
    &:focus {
      border-color: #2196f3;
    }
  }
  .flexParentCards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    /* justify-content: space-between; */
    align-items: flex-start;
    .flexItem {
      margin: auto 8px;
    }
    i.delete.icon {
      margin: 0;
      display: table-cell;
    }
    .label {
      position: relative;
      bottom: -30px;
      right: -2px;
      z-index: 1;
      padding: 5px;
      font-size: 15px;
    }
  }
  .card {
    margin-top: 0;
    height: 100px !important;
    width: 150px !important;
    .image {
      height: 100px !important;
      width: 150px !important;
    }
  }
`;

const BoxAccount = styled.div`
  margin-bottom: 25px;
  margin-top: 25px;
  h3 {
    font-size: 21px;
    font-size: 1.3125rem;
    padding-left: 30px;
    padding-right: 30px;
    height: 30px;
    padding-top: 5px;
    display: inline-block;
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    &.new_client {
      background: url(${NewUser}) center left no-repeat;
    }
  }

  .pelak {
    background: url(${Pelak}) no-repeat;
    height: 70px;
    width: 300px;
    #carLicensePlates1 {
      background: transparent;
      position: absolute;
      left: 40px;
      width: 40px !important;
      padding: 8px;
      top: -5px;
      font-size: 18px;
    }
    #carLicensePlates2 {
      background: transparent;
      position: relative;
      left: -142px;
      width: 70px !important;
      height: 47px;
      padding: 8px;
      top: -28px;
      font-size: 18px;
      text-align: center;
      direction: rtl;
    }
    #carLicensePlates3 {
      background: transparent;
      position: absolute;
      left: 166px;
      width: 55px !important;
      padding: 8px;
      top: -105px;
      font-size: 18px;
    }
    #carLicensePlates4 {
      background: transparent;
      position: absolute;
      left: 235px;
      width: 55px !important;
      height: 39px;
      padding: 8px;
      top: -135px;
      font-size: 18px;
    }
  }
  .selection {
    font-size: 0.875rem;
    border-radius: 3px;
    border: 1px solid #d2d8dd;
    &.wide {
      width: 100%;
    }
  }
  .car_checkboxes {
    .field {
      width: fit-content !important;
      min-width: 168px !important;
    }
  }
`;

interface IAddCarFormValues {
  carCity: number;
  carDistrict: number;
  carBrand: number;
  carModel: number;
  carYear: number;
  carGearboxType: number;
  carBodyStyle: number;
  carCapasity: number;
  carKmDriven: number;
  carVIN: string;
  carLicensePlates1: number;
  carLicensePlates2: string;
  carLicensePlates3: number;
  carLicensePlates4: number;
  carDescription: string;
}

export default withNamespaces('common')(
  class AddCarForm extends React.Component<{
    token?: string;
    t: any;
    success: boolean;
    name: string;
  }> {
    state = {
      token: '',
      error: '',
      name: null,
      success: false,
      city: null,
      citiesFarsi: [{ text: 'Loading', value: null }],
      citiesEnglish: [{ text: 'Loading', value: null }],
      cityDistrict: null,
      cityDistrictFarsi: [{ text: 'Loading', value: null }],
      cityDistrictEnglish: [{ text: 'Loading', value: null }],
      bodyStyle: null,
      bodyStyleFarsi: [{ text: 'Loading', value: null }],
      bodyStyleEnglish: [{ text: 'Loading', value: null }],
      color: null,
      colorCode: null,
      colorId: null,
      colors: [
        {
          text: 'Loading',
          value: null,
          label: { color: 'red', empty: true, circular: true }
        }
      ],
      brand: null,
      brandsFarsi: [{ text: 'Loading', value: null }],
      brandEnglish: [{ text: 'Loading', value: null }],
      model: null,
      modelsFarsi: [{ text: 'Loading', value: null }],
      modelsEnglish: [{ text: 'Loading', value: null }],
      year: null,
      yearsFarsi: [{ text: 'Loading', value: null }],
      yearsEnglish: [{ text: 'Loading', value: null }],
      checkboxesID: [],
      checkboxes: [
        { id: 0, label: 'loading...', checked: true, parsedID: null }
      ],
      picturesID: [],
      picturesPreview: []
    };

    constructor(props) {
      super(props);
    }

    static async getInitialProps() {
      return {
        namespacesRequired: ['common']
      };
    }

    componentDidMount() {
      this.setState({
        token: window.localStorage.getItem('token')
      });

      //get cities and genrate a dropdown input in form
      axios
        .post('https://otoli.net' + '/core/location/list?limit=100')
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
          this.setState({ error: error, success: false });
        });

      //get body styles and genrate a dropdown input in form
      axios
        .post('https://otoli.net' + '/core/body-style/list?limit=100')
        .then(response => {
          if (response.data.success) {
            const bodyStyleFarsi = response.data.items.map((value, index) => ({
              key: value.id,
              text: value.name.fa,
              value: value.id
            }));
            const bodyStyleEnglish = response.data.items.map(
              (value, index) => ({
                key: value.id,
                text: value.name.en,
                value: value.id
              })
            );
            this.setState({ bodyStyleFarsi, bodyStyleEnglish });
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ error: error, success: false });
        });

      //get car colors and genrate a dropdown input in form
      axios
        .post('https://otoli.net' + '/core/color/list?limit=16')
        .then(response => {
          if (response.data.success) {
            const colors = response.data.items.map((value, index) => ({
              key: value.id,
              text: '',
              value: value.slug.en,
              color: value.code,
              label: { color: value.slug.en, empty: true, circular: true }
            }));
            this.setState({ colors });
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ error: error, success: false });
        });

      //get car brands and genrate a dropdown input in form
      axios
        .post('https://otoli.net' + '/core/brand/list?limit=500')
        .then(response => {
          if (response.data.success) {
            const brandsFarsi = response.data.items.map((value, index) => ({
              key: value.id,
              text: value.name.fa,
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

      //get years and genrate a dropdown input in form
      axios
        .post('https://otoli.net' + '/core/year/list?limit=500')
        .then(response => {
          if (response.data.success) {
            const yearsFarsi = response.data.items.map((value, index) => ({
              key: value.id,
              text: value.name.fa,
              value: value.id
            }));
            const yearsEnglish = response.data.items.map((value, index) => ({
              key: value.id,
              text: value.name.en,
              value: value.id
            }));
            this.setState({ yearsEnglish, yearsFarsi });
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ error: error, success: false });
        });

      //get facilities and genrate checkbox inputs in form
      axios
        .post('https://otoli.net' + '/core/facility/list?limit=10000')
        .then(response => {
          if (response.data.success) {
            let checkboxes = [];
            response.data.items.map((value, index) => {
              checkboxes.push({
                id: value.id,
                label: value.name.fa,
                checked: false,
                parsedID: null
              });
            });
            this.setState({ checkboxes });
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ error: error, success: false });
        });
    }

    setCityDistrict(cityID) {
      this.setState({ city: cityID });
      axios
        .post(
          'https://otoli.net' +
            '/core/location/list?limit=100&parent_id=' +
            cityID
        )
        .then(response => {
          if (
            response.data.success &&
            Object.keys(response.data.items).length >= 1
          ) {
            const cityDistrictFarsi = response.data.items.map(
              (value, index) => ({
                key: value.id,
                text: value.name.fa,
                value: value.id
              })
            );
            const cityDistrictEnglish = response.data.items.map(
              (value, index) => ({
                key: value.id,
                text: value.name.en,
                value: value.id
              })
            );
            this.setState({ cityDistrictFarsi, cityDistrictEnglish });
          } else {
            this.setState({
              cityDistrict: cityID,
              cityDistrictFarsi: [{ text: 'تمام شهر', value: cityID }],
              cityDistrictEnglish: [{ text: 'تمام شهر', value: cityID }]
            });
          }
        })
        .catch(error => {
          // tslint:disable-next-line:no-console
          console.error(error);
          this.setState({ error: error, success: false });
        })
        .then(() => {});
    }

    setModels(brandID) {
      this.setState({ brand: brandID });
      axios
        .post('https://otoli.net' + '/core/car/list?brand_id=' + brandID)
        .then(response => {
          if (
            response.data.success &&
            Object.keys(response.data.items).length >= 1
          ) {
            const modelsFarsi = response.data.items.map((value, index) => ({
              key: value.id,
              text: value.name.fa,
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
              modelsFarsi: [{ text: 'Loading', value: null }],
              modelsEnglish: [{ text: 'Loading', value: null }]
            });
          }
        })
        .catch(error => {
          // tslint:disable-next-line:no-console
          console.error(error);
          this.setState({ error: error, success: false });
        })
        .then(() => {});
    }

    setFasalities(index) {
      const { checkboxes } = this.state;

      checkboxes[index].checked = !checkboxes[index].checked;
      if (checkboxes[index].checked) {
        checkboxes[index].parsedID = checkboxes[index].id;
      } else {
        checkboxes[index].parsedID = null;
      }
      let checkboxesID = [];
      checkboxes.map((value, index) => {
        if (value.parsedID) {
          checkboxesID.push(value.parsedID);
        }
      });

      this.setState({
        checkboxes,
        checkboxesID
      });
    }

    removePicture(i) {
      var picturesPreview = this.state.picturesPreview;
      var picturesID = this.state.picturesID;
      console.log(picturesID);
      var picturesPreviewIndex = picturesPreview.indexOf(i);
      var picturesIDIndex = picturesID.indexOf(i);
      console.log('going to delte');
      picturesPreview.splice(i, 1);
      picturesID.splice(i, 1);
      console.log(picturesID);
      this.setState({ picturesID, picturesPreview });
    }

    render() {
      const { checkboxes, token, error } = this.state;
      const { t } = this.props;
      const fieldErrorGenrator = fieldName => {
        return (
          t('forms.error_filed_required1') +
          fieldName +
          t('forms.error_filed_required2')
        );
      };
      if (true) {
        return (
          <Formik
            initialValues={{
              carCity: null,
              carDistrict: null,
              carBrand: null,
              carModel: null,
              carYear: null,
              carGearboxType: null,
              carBodyStyle: null,
              carCapasity: null,
              carKmDriven: null,
              carVIN: null,
              carLicensePlates1: null,
              carLicensePlates2: null,
              carLicensePlates3: null,
              carLicensePlates4: null,
              carColor: null,
              carDescription: null
            }}
            onSubmit={(
              values: IAddCarFormValues,
              actions: FormikActions<IAddCarFormValues>
            ) => {
              actions.setSubmitting(true);
              this.setState({ error: '' });
              console.log(values);
              const {
                carCity,
                carDistrict,
                carBrand,
                carModel,
                carYear,
                carGearboxType,
                carBodyStyle,
                carCapasity,
                carKmDriven,
                carVIN,
                carLicensePlates1,
                carLicensePlates2,
                carLicensePlates3,
                carLicensePlates4,
                carDescription
              } = values;
              axios
                .post(
                  'https://otoli.net' + '/core/rental-car/new',
                  {
                    car_id: carModel,
                    location_id: carDistrict,
                    year_id: carYear,
                    transmission_type_id: carGearboxType,
                    body_style_id: carBodyStyle,
                    mileage_range_id: carKmDriven,
                    color_id: this.state.colorId,
                    special_type_id: 1,
                    vin: carVIN,
                    registration_plate_first_part: carLicensePlates1,
                    registration_plate_second_part: carLicensePlates2,
                    registration_plate_third_part: carLicensePlates3,
                    registration_plate_forth_part: carLicensePlates4,
                    days_to_get_reminded: 3, // sample
                    min_days_to_rent: 1, // sample
                    capacity: carCapasity,
                    deliver_at_renters_place: 0, // sample
                    facility_id: this.state.checkboxesID,
                    description: carDescription,
                    media_id: this.state.picturesID
                  },
                  {
                    headers: {
                      Authorization: 'Bearer ' + this.state.token
                    }
                  }
                )
                .then(response => {
                  if (response.data.success) {
                    console.log(response.data);
                  }
                })
                .catch(error => {
                  // tslint:disable-next-line:no-console
                  console.error(error);
                  this.setState({ error: error, success: false });
                })
                .then(() => {
                  actions.setSubmitting(false);
                });
              setTimeout(() => {
                console.log(values);

                actions.setSubmitting(false);
              }, 3000);
            }}
            validationSchema={Yup.object().shape({
              carCity: Yup.number()
                .required(fieldErrorGenrator(t('carProperty.city')))
                .typeError(fieldErrorGenrator(t('carProperty.city'))),
              carDistrict: Yup.number()
                .required(fieldErrorGenrator(t('carProperty.district')))
                .typeError(fieldErrorGenrator(t('carProperty.district'))),
              carBrand: Yup.number()
                .required(fieldErrorGenrator(t('carProperty.brand')))
                .typeError(fieldErrorGenrator(t('carProperty.brand'))),
              carModel: Yup.number()
                .required(fieldErrorGenrator(t('carProperty.model')))
                .typeError(fieldErrorGenrator(t('carProperty.model'))),
              carYear: Yup.number()
                .required(fieldErrorGenrator(t('carProperty.year')))
                .typeError(fieldErrorGenrator(t('carProperty.year'))),
              carGearboxType: Yup.number()
                .required(fieldErrorGenrator(t('carProperty.gearBoxType')))
                .typeError(fieldErrorGenrator(t('carProperty.gearBoxType')))
                .min(1)
                .max(2),
              carBodyStyle: Yup.number()
                .required(fieldErrorGenrator(t('carProperty.cassis')))
                .typeError(fieldErrorGenrator(t('carProperty.cassis'))),
              carCapasity: Yup.number()
                .required(fieldErrorGenrator(t('carProperty.capasity')))
                .typeError(fieldErrorGenrator(t('carProperty.capasity'))),
              carKmDriven: Yup.number()
                .required(fieldErrorGenrator(t('carProperty.kmDriven')))
                .typeError(fieldErrorGenrator(t('carProperty.kmDriven'))),
              carVIN: Yup.string()
                .required(fieldErrorGenrator(t('carProperty.VIN')))
                .typeError(fieldErrorGenrator(t('carProperty.VIN')))
                .matches(/[A-HJ-NPR-Z0-9]{17}/, t('forms.error_VIN_not_valid')),
              carLicensePlates1: Yup.number()
                .required(fieldErrorGenrator(t('carProperty.licensePlates')))
                .typeError(fieldErrorGenrator(t('carProperty.licensePlates')))
                .min(10, t('forms.error_licensePlates1_not_valid'))
                .max(99, t('forms.error_licensePlates1_not_valid')),
              carLicensePlates2: Yup.string()
                .required(fieldErrorGenrator(t('carProperty.licensePlates')))
                .typeError(fieldErrorGenrator(t('carProperty.licensePlates'))),
              carLicensePlates3: Yup.number()
                .required(fieldErrorGenrator(t('carProperty.licensePlates')))
                .typeError(fieldErrorGenrator(t('carProperty.licensePlates')))
                .min(100, t('forms.error_licensePlates3_not_valid'))
                .max(999, t('forms.error_licensePlates3_not_valid')),
              carLicensePlates4: Yup.number()
                .required(fieldErrorGenrator(t('carProperty.licensePlates')))
                .typeError(fieldErrorGenrator(t('carProperty.licensePlates')))
                .min(10, t('forms.error_licensePlates4_not_valid'))
                .max(99, t('forms.error_licensePlates4_not_valid')),
              carColor: Yup.mixed()
                .required(fieldErrorGenrator(t('carProperty.color')))
                .typeError(fieldErrorGenrator(t('carProperty.color')))
              // carOptions: [string]:Yup.number().required( t('forms.error_filed_required1') +                   t('carProperty.city') + t('forms.error_filed_required2') ),
              // carDescription: Yup.string()
            })}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting,
              setFieldValue,
              setFieldTouched,
              submitCount,
              values,
              errors,
              touched
            }) => (
              <BoxAccount className="box_account">
                <Form onSubmit={handleSubmit}>
                  <h3 className="new_client">{t('add_car')}</h3>
                  {/* <small className="float-right pt-2">* {$required_fields}</small> */}
                  <Segment>
                    {/* <label>ماشین شما کجاست؟</label> */}
                    <Form.Field style={{ margin: 0 }}>
                      <label>ماشین شما کجاست؟</label>
                    </Form.Field>
                    <Form.Group>
                      <Form.Field>
                        <Form.Dropdown
                          name="carCity"
                          id="carCity"
                          placeholder="شهر"
                          search
                          selection
                          loading={this.state.citiesFarsi[0].value == null}
                          options={
                            i18n.language === 'en'
                              ? this.state.citiesEnglish
                              : this.state.citiesFarsi
                          }
                          error={Boolean(errors.carCity && touched.carCity)}
                          onChange={(e, data) => {
                            if (data && data.name) {
                              setFieldValue(data.name, data.value);
                              setFieldValue('carDistrict', undefined);
                              this.setCityDistrict(data.value);
                            }
                          }}
                          onClose={(e, data) => {
                            console.log(e);
                            if (data && data.name) {
                              setFieldTouched(data.name);
                            }
                          }}
                          value={values.carCity}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Form.Dropdown
                          name="carDistrict"
                          id="carDistrict"
                          search
                          placeholder="محله"
                          selection
                          loading={
                            this.state.cityDistrictFarsi[0].value == null
                          }
                          disabled={
                            this.state.cityDistrictFarsi[0].value == null
                          }
                          options={
                            i18n.language === 'en'
                              ? this.state.cityDistrictEnglish
                              : this.state.cityDistrictFarsi
                          }
                          error={Boolean(
                            errors.carDistrict && touched.carDistrict
                          )}
                          onChange={(e, data) => {
                            if (data && data.name) {
                              setFieldValue(data.name, data.value);
                            }
                          }}
                          onClose={(e, data) => {
                            if (data && data.name) {
                              setFieldTouched(data.name);
                            }
                          }}
                          value={values.carDistrict}
                        />
                      </Form.Field>
                    </Form.Group>

                    <Form.Group>
                      <Form.Dropdown
                        name="carBrand"
                        id="carBrand"
                        label="برند"
                        placeholder="برند"
                        search
                        selection
                        loading={this.state.brandsFarsi[0].value == null}
                        options={
                          i18n.language === 'en'
                            ? this.state.brandEnglish
                            : this.state.brandsFarsi
                        }
                        error={Boolean(errors.carBrand && touched.carBrand)}
                        onChange={(e, data) => {
                          if (data && data.name) {
                            setFieldValue(data.name, data.value);
                            this.setModels(data.value);
                          }
                        }}
                        onClose={(e, data) => {
                          if (data && data.name) {
                            setFieldTouched(data.name);
                          }
                        }}
                        value={values.carBrand}
                      />
                      <Form.Dropdown
                        name="carModel"
                        id="carModel"
                        search
                        placeholder="مدل"
                        label="مدل"
                        selection
                        loading={this.state.modelsFarsi[0].value == null}
                        disabled={this.state.modelsFarsi[0].value == null}
                        options={
                          i18n.language === 'en'
                            ? this.state.modelsEnglish
                            : this.state.modelsFarsi
                        }
                        error={Boolean(errors.carModel && touched.carModel)}
                        onChange={(e, data) => {
                          if (data && data.name) {
                            setFieldValue(data.name, data.value);
                          }
                        }}
                        onClose={(e, data) => {
                          if (data && data.name) {
                            setFieldTouched(data.name);
                          }
                        }}
                        value={values.carModel}
                      />
                      <Form.Dropdown
                        name="carYear"
                        id="carYear"
                        search
                        placeholder="سال"
                        label="سال"
                        selection
                        loading={this.state.yearsFarsi[0].value == null}
                        disabled={this.state.yearsFarsi[0].value == null}
                        options={
                          i18n.language === 'en'
                            ? this.state.yearsEnglish
                            : this.state.yearsFarsi
                        }
                        error={Boolean(errors.carYear && touched.carYear)}
                        onChange={(e, data) => {
                          if (data && data.name) {
                            setFieldValue(data.name, data.value);
                          }
                        }}
                        onClose={(e, data) => {
                          if (data && data.name) {
                            setFieldTouched(data.name);
                          }
                        }}
                        value={values.carYear}
                      />
                    </Form.Group>

                    <Form.Field style={{ margin: 0 }}>
                      <label>نوع دنده</label>
                    </Form.Field>
                    <Form.Group inline>
                      <Form.Radio
                        label="دستی"
                        value={1}
                        name="carGearboxType"
                        checked={values.carGearboxType === 1}
                        onChange={(e, data) => {
                          if (data && data.name) {
                            setFieldValue(data.name, data.value);
                          }
                        }}
                        onClick={(e, data) => {
                          if (data && data.name) {
                            setFieldTouched(data.name);
                          }
                        }}
                      />
                      <Form.Radio
                        label="اتوماتیک"
                        value={2}
                        name="carGearboxType"
                        checked={values.carGearboxType === 2}
                        onChange={(e, data) => {
                          if (data && data.name) {
                            setFieldValue(data.name, data.value);
                          }
                        }}
                        onClick={(e, data) => {
                          if (data && data.name) {
                            setFieldTouched(data.name);
                          }
                        }}
                      />
                    </Form.Group>

                    <Form.Dropdown
                      name="carBodyStyle"
                      id="carBodyStyle"
                      placeholder="نوع شاسی"
                      search
                      selection
                      loading={this.state.bodyStyleFarsi[0].value == null}
                      options={
                        i18n.language === 'en'
                          ? this.state.bodyStyleEnglish
                          : this.state.bodyStyleFarsi
                      }
                      error={Boolean(
                        errors.carBodyStyle && touched.carBodyStyle
                      )}
                      onChange={(e, data) => {
                        if (data && data.name) {
                          setFieldValue(data.name, data.value);
                        }
                      }}
                      onClose={(e, data) => {
                        if (data && data.name) {
                          setFieldTouched(data.name);
                        }
                      }}
                      value={values.carBodyStyle}
                    />

                    <Form.Input
                      label="ظرفیت خودرو"
                      name="carCapasity"
                      inputmode="numeric"
                      type="number"
                      pattern="[0-9]*"
                      error={Boolean(errors.carCapasity && touched.carCapasity)}
                      onChange={(e, data) => {
                        if (data && data.name) {
                          setFieldValue(data.name, data.value);
                          setFieldTouched(data.name);
                        }
                      }}
                      value={values.carCapasity}
                    />

                    <Form.Group>
                      <Form.Dropdown
                        name="carKmDriven"
                        id="carKmDriven"
                        label="کارکرد ماشین"
                        placeholder="کارکرد ماشین"
                        className="ltr"
                        selection
                        options={
                          i18n.language === 'en'
                            ? kmDrivenEnglish
                            : kmDrivenFarsi
                        }
                        error={Boolean(
                          errors.carKmDriven && touched.carKmDriven
                        )}
                        onChange={(e, data) => {
                          if (data && data.name) {
                            setFieldValue(data.name, data.value);
                          }
                        }}
                        onClose={(e, data) => {
                          if (data && data.name) {
                            setFieldTouched(data.name);
                          }
                        }}
                        value={values.carKmDriven}
                      />
                    </Form.Group>

                    <Form.Input
                      label="کد شناسایی خودرو"
                      name="carVIN"
                      error={Boolean(errors.carVIN && touched.carVIN)}
                      onChange={(e, data) => {
                        if (data && data.name) {
                          setFieldValue(data.name, data.value);
                          setFieldTouched(data.name);
                        }
                      }}
                      value={values.carVIN}
                    />

                    <Grid columns={2}>
                      <Grid.Column width={16}>
                        <Form.Field style={{ margin: 0 }}>
                          <label>پلاک خودرو</label>
                        </Form.Field>
                        <Form.Group>
                          <div className="pelak" style={{}}>
                            <Form.Input
                              name="carLicensePlates1"
                              id="carLicensePlates1"
                              inputmode="numeric"
                              type="number"
                              pattern="[0-9]*"
                              min="10"
                              max="99"
                              error={Boolean(
                                errors.carLicensePlates1 &&
                                  touched.carLicensePlates1
                              )}
                              onChange={(e, data) => {
                                if (data && data.name) {
                                  setFieldValue(data.name, data.value);
                                  setFieldTouched(data.name);
                                }
                              }}
                              value={values.carLicensePlates1}
                            />
                            <Form.Input
                              name="carLicensePlates2"
                              id="carLicensePlates2"
                              control="select"
                              error={Boolean(
                                errors.carLicensePlates2 &&
                                  touched.carLicensePlates2
                              )}
                              onChange={handleChange}
                              value={values.carLicensePlates2}
                            >
                              <option value="" selected disabled hidden>
                                ...
                              </option>
                              <option value="الف">الف</option>
                              <option value="ب">ب</option>
                              <option value="ج">ج</option>
                              <option value="د">د</option>
                              <option value="ژ">ژ</option>
                              <option value="س">س</option>
                              <option value="ٌص">ص</option>
                              <option value="ط">ط</option>
                              <option value="ق">ق</option>
                              <option value="ل">ل</option>
                              <option value="م">م</option>
                              <option value="ن">ن</option>
                              <option value="و">و</option>
                              <option value="ه">هـ</option>
                              <option value="ی">ی</option>
                              <option value="گ">گ</option>
                              <option value="ت">ت</option>
                            </Form.Input>
                            <Form.Input
                              name="carLicensePlates3"
                              id="carLicensePlates3"
                              inputmode="numeric"
                              type="number"
                              pattern="[0-9]*"
                              min="100"
                              max="999"
                              error={Boolean(
                                errors.carLicensePlates3 &&
                                  touched.carLicensePlates3
                              )}
                              onChange={(e, data) => {
                                if (data && data.name) {
                                  setFieldValue(data.name, data.value);
                                  setFieldTouched(data.name);
                                }
                              }}
                              value={values.carLicensePlates3}
                            />
                            <Form.Input
                              name="carLicensePlates4"
                              id="carLicensePlates4"
                              inputmode="numeric"
                              type="number"
                              pattern="[0-9]*"
                              min="10"
                              max="99"
                              error={Boolean(
                                errors.carLicensePlates4 &&
                                  touched.carLicensePlates4
                              )}
                              onChange={(e, data) => {
                                if (data && data.name) {
                                  setFieldValue(data.name, data.value);
                                  setFieldTouched(data.name);
                                }
                              }}
                              value={values.carLicensePlates4}
                            />
                          </div>
                        </Form.Group>
                      </Grid.Column>
                      <Grid.Column width={5} />
                    </Grid>

                    <Form.Field style={{ margin: 0 }}>
                      <label>امکانات ماشین</label>
                    </Form.Field>
                    <Form.Group
                      style={{ flexWrap: 'wrap' }}
                      className="car_checkboxes"
                    >
                      {checkboxes.map((checkbox, index) => (
                        <Form.Field
                          control={Checkbox}
                          checked={checkbox.checked}
                          onChange={this.setFasalities.bind(this, index)}
                          label={checkbox.label}
                        />
                      ))}
                    </Form.Group>

                    <Form.Field style={{ margin: 0 }}>
                      <label>بارگذاری تصویر</label>
                      <Dropzone
                        accept="image/jpeg, image/png"
                        onDrop={acceptedFiles => {
                          acceptedFiles.forEach(file => {
                            let form = new FormData();
                            form.append('media', file);
                            axios
                              .post(
                                'https://otoli.net' +
                                  '/core/rental-car/media/new',
                                form,
                                {
                                  headers: {
                                    Authorization: 'Bearer ' + this.state.token,
                                    'Content-Type':
                                      'application/x-www-form-urlencoded'
                                  }
                                }
                              )
                              .then(response => {
                                if (response.data.success) {
                                  const { picturesID } = this.state;
                                  picturesID.push(response.data.data.id);
                                  this.setState({
                                    picturesID
                                  });
                                }
                              })
                              .catch(error => {
                                console.error(error);
                                this.setState({ error: error, success: false });
                              });
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onabort = () =>
                              console.log('file reading was aborted');
                            reader.onerror = () =>
                              console.log('file reading has failed');
                            reader.onload = () => {
                              console.log('file reading was susceed');
                              const { picturesPreview } = this.state;
                              picturesPreview.push(reader.result);
                              this.setState({
                                picturesPreview
                              });
                            };
                          });
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <DropZoneDiv className="container">
                            <div {...getRootProps({ className: 'dropzone' })}>
                              <input {...getInputProps()} />
                              <p>
                                Drag 'n' drop some files here, or click to
                                select files
                              </p>
                            </div>
                            <aside>
                              <div className="flexParentCards">
                                {this.state.picturesPreview.map(
                                  (image, index) => (
                                    <div className="flexItem">
                                      <Label
                                        onClick={() =>
                                          this.removePicture(index)
                                        }
                                        index={index}
                                      >
                                        <Icon name="delete" />
                                      </Label>
                                      <Card raised image={image} />
                                    </div>
                                  )
                                )}
                              </div>
                            </aside>
                          </DropZoneDiv>
                        )}
                      </Dropzone>
                    </Form.Field>

                    <Form.Group>
                      <Form.Field
                        control={TextArea}
                        label="توضیحات"
                        id="carDescription"
                        name="carDescription"
                        placeholder="توضیحات اضافی در مورد شرایط خودرو..."
                        error={Boolean(
                          errors.carDescription &&
                            touched.carDescriptionLicensePlates4
                        )}
                        onChange={(e, data) => {
                          if (data && data.name) {
                            setFieldValue(data.name, data.value);
                            setFieldTouched(data.name);
                          }
                        }}
                        onBlur={handleBlur}
                        value={values.carDescription}
                      />
                    </Form.Group>

                    <Form.Field style={{ margin: 0 }}>
                      <label>رنگ خودرو</label>
                    </Form.Field>
                    <Form.Field>
                      <Dropdown
                        text="رنگ خودرو"
                        icon={this.state.colorIcon || `paint brush`}
                        id="carColor"
                        name="carColor"
                        floating
                        labeled
                        button
                        className={`icon colorpicker color${(
                          this.state.colorCode || 'cc'
                        ).substr(1)}`}
                        error={Boolean(errors.carColor && touched.carColor)}
                        onBlur={handleBlur}
                        value={values.carColor}
                      >
                        <Dropdown.Menu>
                          {/* <Dropdown.Header
                                icon="tags"
                                content="Tag Label"
                              /> */}
                          <Dropdown.Menu scrolling>
                            {this.state.colors.map(option => (
                              <Dropdown.Item
                                onClick={(e, data) => {
                                  if (data && data.value) {
                                    setFieldValue('carColor', data.value);
                                    this.setState({
                                      color: data.value,
                                      colorCode: data.color,
                                      colorIcon: 'car',
                                      colorId: option.key
                                    });
                                  }
                                }}
                                key={option.value}
                                {...option}
                              />
                            ))}
                          </Dropdown.Menu>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Form.Field>

                    <Form.Field
                      style={{ textAlign: 'center', fontSize: '0.8em' }}
                    >
                      <Button
                        loading={isSubmitting}
                        primary
                        type="submit"
                        className="btn_1 full-width"
                      >
                        {t('signup')}
                      </Button>
                    </Form.Field>

                    {error && (
                      <Label attached="bottom" color="red">
                        {t('forms.error')}
                      </Label>
                    )}
                    {Object.keys(errors).length >= 1 && submitCount >= 1 && (
                      <Label attached="bottom" color="red">
                        {Object.values(errors)[0]}
                      </Label>
                    )}
                  </Segment>
                </Form>
              </BoxAccount>
            )}
          </Formik>
        );
      } else {
        return <Error404 />;
      }
    }
  }
);
