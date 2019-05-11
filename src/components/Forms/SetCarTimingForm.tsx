/* tslint:disable */
import * as React from 'react';
import { useCallback } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment-jalaali';
moment.loadPersian();
import {
  Form,
  Divider,
  Header,
  Label,
  Segment,
  Button,
  Checkbox,
  Grid,
  Progress,
  Icon,
  Radio,
  TextArea,
  Image,
  Input,
  Item
} from 'semantic-ui-react';
import jsCookie from 'js-cookie';
import Error404 from '../404';
import { i18n, withNamespaces } from '../../i18n';
import { Formik, FormikActions, withFormik } from 'formik';
import * as Yup from 'yup';
// import { setLocale } from 'yup';
// setLocale({
//   number: {
//     min: 'مقدار وارد شده از ${min} کمتر است',
//     max: 'مقدار وارد شده از ${max} بیشتر است'
//   }
// });
import axios from 'axios';
import * as NewUser from '../../../static/new_user.svg';
import * as Pelak from '../../../static/pelak2.png';
import { Box, Flex } from '@rebass/grid';
import { kmDrivenEnglish, kmDrivenFarsi } from '../../constants/options';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../../lib/numbers';

function clearNumber(x) {
  return convertNumbers2English(x.toString())
    .replace(/,/g, '')
    .replace(/\./g, '')
    .replace(/\D/g, '');
}

const BoxAccount = styled.div`
  margin-bottom: 25px;
  margin-top: 25px;
  .ui.segments {
    .segment.timingEntery {
      min-height: 225px;
    }
  }
  .DateInput {
    max-width: 105px;
  }
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
    height: 40px;
    width: 170px;
    background-size: contain;
    #carLicensePlates1 {
      position: relative;
      direction: ltr;
      left: -125px;
      top: 11px;
      font-size: 25px;
    }
    #carLicensePlates2 {
      position: relative;
      direction: ltr;
      left: -80px;
      top: 11px;
      font-size: 25px;
    }
    #carLicensePlates3 {
      position: relative;
      direction: ltr;
      left: 10px;
      top: 11px;
      font-size: 25px;
    }
    #carLicensePlates4 {
      position: relative;
      direction: ltr;
      left: 25px;
      top: 15px;
      font-size: 25px;
    }
  }
  .ui.input {
    float: right;
    flex-direction: row;
    &.labeled.icon.button {
      /* padding-left: 2.5em !important;
      padding-right: 0em !important; */
    }
    &.numstep {
      height: 32px !important;
      max-width: 150px;
      margin-right: 5px;
      margin-left: 5px;
      input {
        width: 70px !important;
        height: 32px !important;
        margin: 0px 5px;
        z-index: 2;
        text-align: center !important;
      }
      .label {
        z-index: 2;
        border: none;
        cursor: pointer;
        background-color: #85b7d924;
        i.minus.icon,
        i.plus.icon {
          margin: 0px;
          line-height: 15px;
          z-index: 2;
          color: #85b7d9;
        }
        &:hover {
          border-color: #85b7d9;
        }
      }
      span {
        position: absolute;
        line-height: 32px;
        z-index: 1;
      }
      &.daysToGetReminded {
        span {
          width: 200px;
        }
      }
      &.minDaysToRent {
        span {
          width: 175px;
        }
      }
    }
  }
  .extraKm,
  .distanceLimit {
    max-width: 150px !important;
    margin: 0 !important;
    div {
      max-width: 300px !important;
      input {
        max-width: 300px !important;
      }
    }
  }
  .DateRangePicker {
    float: right;
    position: relative;
    top: -24px;
    .DateRangePickerInput {
      border: none !important;
    }
  }
  i.close,
  i.edit.outline {
    float: left;
    position: relative;
    top: -20px;
    font-size: 24px;
    cursor: pointer;
  }
  .ui.form input[type='text'] {
    direction: ltr;
  }
`;

interface ISetCarTimingFormValues {
  daysToGetReminded: string;
  minDaysToRent: string;
  deliverAtRentersPlace: boolean;
  distanceLimit: string;
  extraKm: string;
  radioGroup: boolean;
  start_date: string;
  end_date: string;
  price: string;
  availableInAllPrice: string;
  cancellationPolicy: string;
}

export default withNamespaces('common')(
  class SetCarTimingForm extends React.Component<{
    token?: string;
    t: any;
    success: boolean;
    name: string;
    rentalCarID: string;
  }> {
    state = {
      token: '',
      error: '',
      name: null,
      success: false,
      carName: '',
      carBrand: '',
      carPelak: '',
      carColor: '',
      carYear: null,
      carMin_days_to_rent: null,
      carDeliver_at_renters_place: null,
      carDays_to_get_reminded: null,
      carLocation: null,
      carDescription: '',
      carMedia_set: [],
      plate1: null,
      plate2: null,
      plate3: null,
      plate4: null,
      carTimings: [],
      price: '',
      startDate: moment(),
      endDate: moment(),
      focusedInput: 'startDate',
      showNewEntery: true,
      openEditFor: null,
      submittingSteps: 0
    };

    constructor(props) {
      super(props);
    }

    componentWillMount() {
      this.setState({
        token: jsCookie.get('token')
      });
    }

    componentDidMount() {
      //get rental car and genrate preview for it
      this.getRentalCarInfo(this.props.rentalCarID, this.state.token)
        .then(response => {
          console.error(response);
          this.setState({
            carName: response.model.fa,
            carBrand: response.brand.fa,
            carPelak: '',
            carColor: response.color,
            carYear: response.year.fa,
            carMin_days_to_rent: response.min_days_to_rent,
            carDeliver_at_renters_place: response.deliver_at_renters_place,
            carLocation: response.location.fa,
            carDescription: response.description,
            carMedia_set: response.media_set,
            plate1: response.registration_plate_first_part,
            plate2: response.registration_plate_second_part,
            plate3: response.registration_plate_third_part,
            plate4: response.registration_plate_forth_part
          });
        })
        .catch(error => {
          console.error(error);
          this.setState({ error: true, success: false });
        });
    }

    getRentalCarInfo(rentalCarID, token) {
      console.log('getRentalCarInfo');
      return new Promise(function(resolve, reject) {
        axios
          .get(
            'https://otoli.net' +
              '/core/rental-car/get?is_mine=1&id=' +
              rentalCarID,
            {
              headers: {
                authorization: 'Bearer ' + token
              }
            }
          )
          .then(response => {
            let output = {};
            if (response.data.success) {
              const {
                car,
                year,
                color,
                min_days_to_rent,
                deliver_at_renters_place,
                location,
                description,
                media_set,
                registration_plate_first_part,
                registration_plate_second_part,
                registration_plate_third_part,
                registration_plate_forth_part
              } = response.data.data;
              if (car) {
                output['model'] = car.name;
                output['brand'] = car.brand.name;
              }
              if (year) output['year'] = year.name;
              if (location) output['location'] = location.name;
              if (description) output['description'] = description;
              if (media_set) output['media_set'] = media_set;
              if (min_days_to_rent)
                output['min_days_to_rent'] = min_days_to_rent;
              if (deliver_at_renters_place)
                output['deliver_at_renters_place'] = deliver_at_renters_place;
              if (registration_plate_first_part) {
                output[
                  'registration_plate_first_part'
                ] = registration_plate_first_part;

                output[
                  'registration_plate_second_part'
                ] = registration_plate_second_part;

                output[
                  'registration_plate_third_part'
                ] = registration_plate_third_part;

                output[
                  'registration_plate_forth_part'
                ] = registration_plate_forth_part;
              }
              resolve(output);
              console.log('getRentalCarInfo resolved');
            } else {
              reject(new Error('Error in loading rental car data!'));
            }
          })
          .catch(error => {
            // tslint:disable-next-line:no-console
            console.error(error);
            reject(new Error('Error in loading rental car data!'));
          });
      });
    }

    render() {
      const {
        token,
        error,
        carName,
        carBrand,
        carPelak,
        carColor,
        carYear,
        carMin_days_to_rent,
        carDeliver_at_renters_place,
        carLocation,
        carDescription,
        carMedia_set,
        plate1,
        plate2,
        plate3,
        plate4
      } = this.state;
      const { t } = this.props;
      const fieldErrorGenrator = fieldName => {
        return (
          t('forms.error_filed_required1') +
          fieldName +
          t('forms.error_filed_required2')
        );
      };
      const MaxErrorGenrator = (fieldName, val) => {
        return `${t('forms.error_filed_maxmin_required1')} ${fieldName} ${t(
          'forms.error_filed_max_required2'
        )} (${convertNumbers2Persian(val)}) ${t(
          'forms.error_filed_max_required3'
        )}`;
      };
      const MinErrorGenrator = (fieldName, val) => {
        return `${t('forms.error_filed_maxmin_required1')} ${fieldName} ${t(
          'forms.error_filed_min_required2'
        )} (${convertNumbers2Persian(val)}) ${t(
          'forms.error_filed_min_required3'
        )}`;
      };

      if(this.state.token) return (
        <Formik
          initialValues={{
            daysToGetReminded: 1,
            minDaysToRent: 3,
            deliverAtRentersPlace: false,
            distanceLimit: null,
            extraKm: null,
            radioGroup: false,
            cancellationPolicy: ''
          }}
          onSubmit={(
            values: ISetCarTimingFormValues,
            actions: FormikActions<ISetCarTimingFormValues>
          ) => {
            actions.setSubmitting(true);
            this.setState({ error: '' });
            console.log(values);
            let {
              availableInAllPrice,
              cancellationPolicy,
              daysToGetReminded,
              deliverAtRentersPlace,
              distanceLimit,
              extraKm,
              minDaysToRent,
              radioGroup
            } = values;
            if (!deliverAtRentersPlace) deliverAtRentersPlace = 0;
            const header = {
              headers: {
                Authorization: 'Bearer ' + this.state.token
              }
            };
            const id = this.props.rentalCarID;
            axios
              .post(
                'https://otoli.net' +
                  '/core/rental-car/set-deliver-at-renters-place',
                {
                  id,
                  value: deliverAtRentersPlace
                },
                header
              )
              .then(response => {
                if (response.data.success) {
                  console.log(1);
                  this.setState({ submittingSteps: 1 });
                  axios
                    .post(
                      'https://otoli.net' +
                        '/core/rental-car/set-max-km-per-day',
                      {
                        id,
                        value: distanceLimit
                      },
                      header
                    )
                    .then(response => {
                      if (response.data.success) {
                        console.log(2);
                        this.setState({ submittingSteps: 2 });
                        axios
                          .post(
                            'https://otoli.net' +
                              '/core/rental-car/set-extra-km-price',
                            {
                              id,
                              value: extraKm
                            },
                            header
                          )
                          .then(response => {
                            if (response.data.success) {
                              console.log(3);
                              this.setState({ submittingSteps: 3 });
                              axios
                                .post(
                                  'https://otoli.net' +
                                    '/core/rental-car/set-cancellation-policy',
                                  {
                                    id,
                                    value: cancellationPolicy
                                  },
                                  header
                                )
                                .then(response => {
                                  if (response.data.success) {
                                    console.log(4);
                                    this.setState({ submittingSteps: 4 });
                                    axios
                                      .post(
                                        'https://otoli.net' +
                                          '/core/rental-car/set-days-to-get-reminded',
                                        {
                                          id,
                                          value: daysToGetReminded
                                        },
                                        header
                                      )
                                      .then(response => {
                                        if (response.data.success) {
                                          console.log(5);
                                          this.setState({
                                            submittingSteps: 5
                                          });
                                          axios
                                            .post(
                                              'https://otoli.net' +
                                                '/core/rental-car/set-min-days-to-rent',
                                              {
                                                id,
                                                value: minDaysToRent
                                              },
                                              header
                                            )
                                            .then(response => {
                                              if (response.data.success) {
                                                console.log(6);
                                                this.setState({
                                                  submittingSteps: 6
                                                });
                                                if (radioGroup == false) {
                                                  axios
                                                    .post(
                                                      'https://otoli.net' +
                                                        '/core/rental-car/availability/new',
                                                      {
                                                        rental_car_id: id,
                                                        is_all_time: 1,
                                                        price: clearNumber(
                                                          availableInAllPrice
                                                        ),
                                                        status_id: 'available'
                                                      },
                                                      header
                                                    )
                                                    .then(response => {
                                                      if (
                                                        response.data.success
                                                      ) {
                                                        this.setState({
                                                          submittingSteps: 7
                                                        });
                                                        setTimeout(() => {
                                                          actions.setSubmitting(
                                                            false
                                                          );
                                                          Router.push({
                                                            pathname: '/done',
                                                            query: {
                                                              car_id:
                                                                response.data
                                                                  .data.id
                                                            }
                                                          });
                                                        }, 1000);
                                                      }
                                                    });
                                                } else {
                                                  this.state.carTimings.map(
                                                    (val, index) => {
                                                      axios
                                                        .post(
                                                          'https://otoli.net' +
                                                            '/core/rental-car/availability/new',
                                                          {
                                                            rental_car_id: id,
                                                            start_date: val.startDate.format(
                                                              'jYYYY/jMM/jDD'
                                                            ),
                                                            end_date: val.endDate.format(
                                                              'jYYYY/jMM/jDD'
                                                            ),
                                                            price: clearNumber(
                                                              val.price
                                                            ),
                                                            status_id:
                                                              'available'
                                                          },
                                                          header
                                                        )
                                                        .then(response => {
                                                          if (
                                                            response.data
                                                              .success
                                                          ) {
                                                            console.log(
                                                              response.data
                                                                .data.id
                                                            );
                                                          }
                                                        });
                                                    }
                                                  );
                                                  this.setState({
                                                    submittingSteps: 7
                                                  });
                                                  setTimeout(() => {
                                                    actions.setSubmitting(
                                                      false
                                                    );
                                                    Router.push({
                                                      pathname: '/done',
                                                      query: {
                                                        car_id:
                                                          response.data.data
                                                            .id
                                                      }
                                                    });
                                                  }, 1000);
                                                }
                                              }
                                            });
                                        }
                                      });
                                  }
                                });
                            }
                          });
                      }
                    });
                }
              })
              .catch(error => {
                console.error(error);
                this.setState({ error: true, success: false });
              });
          }}
          validationSchema={Yup.object().shape({
            daysToGetReminded: Yup.number()
              .required(fieldErrorGenrator(t('carTiming.daysToGetReminded')))
              .typeError(fieldErrorGenrator(t('carTiming.daysToGetReminded')))
              .min(1, MinErrorGenrator(t('carTiming.daysToGetReminded'), 1))
              .max(
                31,
                MaxErrorGenrator(t('carTiming.daysToGetReminded'), 31)
              ),
            minDaysToRent: Yup.number()
              .required(fieldErrorGenrator(t('carTiming.minDaysToRent')))
              .typeError(fieldErrorGenrator(t('carTiming.minDaysToRent')))
              .min(1, MinErrorGenrator(t('carTiming.minDaysToRent'), 1))
              .max(31, MaxErrorGenrator(t('carTiming.minDaysToRent'), 31)),
            distanceLimit: Yup.number()
              .required(fieldErrorGenrator(t('carTiming.distanceLimit')))
              .typeError(fieldErrorGenrator(t('carTiming.distanceLimit')))
              .min(50, MinErrorGenrator(t('carTiming.distanceLimit'), 50)),
            extraKm: Yup.number()
              .required(fieldErrorGenrator(t('carTiming.extraKmCost')))
              .typeError(fieldErrorGenrator(t('carTiming.extraKmCost')))
              .max(
                10000000,
                MaxErrorGenrator(t('carTiming.extraKmCost'), 10000000)
              ),
            cancellationPolicy: Yup.string()
              .required(fieldErrorGenrator(t('carTiming.cancellationPolicy')))
              .typeError(
                fieldErrorGenrator(t('carTiming.cancellationPolicy'))
              )
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
          }) => {
            let radioPad;
            if (values.radioGroup == false) {
              radioPad = '16px';
            } else {
              radioPad = '0px';
            }
            return (
              <BoxAccount className="box_account">
                <Form onSubmit={handleSubmit}>
                  <h3 className="new_client">{t('add_car')}</h3>
                  {/* <small className="float-right pt-2">* {$required_fields}</small> */}
                  <Segment>
                    {/* <Divider horizontal>
                    <Header as="h4">
                      <Icon name="car" />
                      پیشنمایش خودرو
                    </Header>
                  </Divider> */}
                    <Item.Group>
                      <Item>
                        <Item.Image
                          src={(carMedia_set[0] || { url: '' }).url}
                        />
                        <Item.Content>
                          <Item.Header as="a">
                            {`${carBrand} - ${carName}`}.
                          </Item.Header>
                          <Item.Meta>{carDescription}</Item.Meta>
                          <Item.Description>
                            <div className="pelak" style={{}}>
                              <span id="carLicensePlates1">
                                {convertNumbers2Persian(plate1)}
                              </span>
                              <span id="carLicensePlates2">{plate2}</span>
                              <span id="carLicensePlates3">
                                {convertNumbers2Persian(plate3)}
                              </span>
                              <span id="carLicensePlates4">
                                {convertNumbers2Persian(plate4)}
                              </span>
                            </div>
                          </Item.Description>
                          <Item.Extra>{carLocation}</Item.Extra>
                        </Item.Content>
                      </Item>
                      {/* carPelak, carColor, carYear, carMin_days_to_rent,
                          carDeliver_at_renters_place, , ,
                            */}
                    </Item.Group>
                    {/* ===================================================================== */}
                    <Divider horizontal>
                      <Header as="h4">
                        <Icon name="edit" />
                        شرایط اجاره
                      </Header>
                    </Divider>
                    {/* ===================================================================== */}
                    <Form.Field style={{ margin: 0 }}>
                      <label>{t('carTiming.daysToGetReminded')}</label>
                    </Form.Field>
                    <Input
                      name="daysToGetReminded"
                      className="numstep daysToGetReminded"
                      error={Boolean(
                        errors.daysToGetReminded && touched.daysToGetReminded
                      )}
                      onChange={(e, data) => {
                        if (data && data.name) {
                          setFieldValue(data.name, clearNumber(data.value));
                          setFieldTouched(data.name);
                        }
                      }}
                      value={convertNumbers2Persian(values.daysToGetReminded)}
                    >
                      <Label
                        basic
                        onClick={(e, data) => {
                          if (values.daysToGetReminded < 31) {
                            let val = Number(values.daysToGetReminded);
                            setFieldValue('daysToGetReminded', ++val);
                          }
                        }}
                      >
                        <Icon name="plus" />
                      </Label>
                      <input inputMode="numeric" />
                      <Label
                        basic
                        onClick={(e, data) => {
                          if (values.daysToGetReminded > 1) {
                            let val = Number(values.daysToGetReminded);
                            setFieldValue('daysToGetReminded', --val);
                          }
                        }}
                      >
                        <Icon name="minus" />
                      </Label>
                      <span>روز قبل</span>
                    </Input>
                    {/* ===================================================================== */}
                    <Form.Field style={{ margin: 0 }}>
                      <label>{t('carTiming.minDaysToRent')}</label>
                    </Form.Field>
                    <Input
                      name="minDaysToRent"
                      className="numstep minDaysToRent"
                      inputMode="numeric"
                      error={Boolean(
                        errors.minDaysToRent && touched.minDaysToRent
                      )}
                      onChange={(e, data) => {
                        if (data && data.name) {
                          setFieldValue(data.name, clearNumber(data.value));
                          setFieldTouched(data.name);
                        }
                      }}
                      value={convertNumbers2Persian(values.minDaysToRent)}
                    >
                      <Label
                        basic
                        onClick={(e, data) => {
                          if (clearNumber(values.minDaysToRent) < 31) {
                            let val = Number(
                              clearNumber(values.minDaysToRent)
                            );
                            setFieldValue(
                              'minDaysToRent',
                              clearNumber(++val)
                            );
                          }
                        }}
                      >
                        <Icon name="plus" />
                      </Label>
                      <input inputMode="numeric" />
                      <Label
                        basic
                        onClick={(e, data) => {
                          if (clearNumber(values.minDaysToRent) > 1) {
                            let val = Number(
                              clearNumber(values.minDaysToRent)
                            );
                            setFieldValue(
                              'minDaysToRent',
                              clearNumber(--val)
                            );
                          }
                        }}
                      >
                        <Icon name="minus" />
                      </Label>
                      <span>روز</span>
                    </Input>
                    {/* ===================================================================== */}
                    <Form.Field style={{ margin: 0 }}>
                      <label>{t('carTiming.distanceLimit')}</label>
                    </Form.Field>
                    <Form.Input
                      // icon="search"
                      // iconPosition="left"
                      name="distanceLimit"
                      className="distanceLimit"
                      error={Boolean(
                        errors.distanceLimit && touched.distanceLimit
                      )}
                      onChange={(e, data) => {
                        if (data && data.name) {
                          setFieldValue(data.name, clearNumber(data.value));
                          setFieldTouched(data.name);
                        }
                      }}
                      value={
                        values.distanceLimit
                          ? convertNumbers2Persian(
                              numberWithCommas(values.distanceLimit)
                            )
                          : values.distanceLimit
                      }
                    >
                      <input inputMode="numeric" />
                    </Form.Input>
                    <span
                      style={{
                        float: 'right',
                        lineHeight: '48px',
                        marginRight: '8px'
                      }}
                    >
                      کیلومتر در روز
                    </span>
                    {/* ===================================================================== */}
                    <Form.Field style={{ margin: 0 }}>
                      <label>{t('carTiming.extraKmCost')}</label>
                    </Form.Field>
                    <Form.Input
                      // icon="search"
                      // iconPosition="left"
                      name="extraKm"
                      className="extraKm"
                      inputMode="numeric"
                      //   type="number"
                      error={Boolean(errors.extraKm && touched.extraKm)}
                      onChange={(e, data) => {
                        if (data && data.name) {
                          setFieldValue(data.name, clearNumber(data.value));
                          setFieldTouched(data.name);
                        }
                      }}
                      value={
                        values.extraKm
                          ? convertNumbers2Persian(
                              numberWithCommas(values.extraKm)
                            )
                          : values.extraKm
                      }
                    >
                      <input inputMode="numeric" />
                    </Form.Input>
                    <span
                      style={{
                        float: 'right',
                        lineHeight: '48px',
                        marginRight: '8px'
                      }}
                    >
                      تومان
                    </span>
                    {/* ===================================================================== */}
                    <Form.Field>
                      <Checkbox
                        label={t('carTiming.deliver_at_renters_place')}
                        name="deliverAtRentersPlace"
                        id="deliverAtRentersPlace"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.deliverAtRentersPlace}
                      />
                    </Form.Field>
                    <br />
                    {/* ===================================================================== */}
                    {/* ===================================================================== */}
                    <Divider horizontal>
                      <Header as="h4">
                        <Icon name="calendar alternate outline" />
                        {t('carTiming.rentDateAndPrice')}
                      </Header>
                    </Divider>
                    {/* ===================================================================== */}
                    <Form.Field>
                      <Radio
                        label={t(
                          'carTiming.availableInAllDatesWithSamePrice'
                        )}
                        name="radioGroup"
                        value={false}
                        checked={values.radioGroup === false}
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
                    </Form.Field>
                    {values.radioGroup == false && (
                      <div>
                        {/* <Form.Field style={{ margin: 0 }}>
                        <label>{t('carTiming.extraKmCost')}</label>
                      </Form.Field> */}
                        <Input
                          // icon="search"
                          // iconPosition="left"
                          name="availableInAllPrice"
                          className="extraKm"
                          error={Boolean(
                            errors.availableInAllPrice &&
                              touched.availableInAllPrice
                          )}
                          onChange={(e, data) => {
                            if (data && data.name) {
                              setFieldValue(
                                data.name,
                                clearNumber(data.value)
                              );
                              setFieldTouched(data.name);
                            }
                          }}
                          value={
                            values.availableInAllPrice
                              ? convertNumbers2Persian(
                                  numberWithCommas(values.availableInAllPrice)
                                )
                              : values.availableInAllPrice
                          }
                        >
                          <input inputMode="numeric" />
                        </Input>
                        <span
                          style={{
                            float: 'right',
                            lineHeight: '48px',
                            marginRight: '8px'
                          }}
                        >
                          {t('carTiming.toman')}
                        </span>
                      </div>
                    )}

                    <Form.Field style={{ paddingTop: radioPad }}>
                      <Radio
                        label={t(
                          'carTiming.availableInDifferentDateRangesWithDifferentPrice'
                        )}
                        name="radioGroup"
                        value={true}
                        checked={values.radioGroup === true}
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
                    </Form.Field>
                    {values.radioGroup == true && (
                      <div style={{ maxWidth: '370px' }}>
                        <Segment.Group style={{ marginBottom: '12px' }}>
                          {this.state.carTimings.map((val, index) => {
                            if (this.state.openEditFor == index) {
                              if (
                                this.state.startDate === null ||
                                this.state.endDate === null ||
                                this.state.price === null
                              ) {
                                this.setState({
                                  startDate: val.startDate,
                                  endDate: val.endDate,
                                  price: val.price
                                });
                              }
                              return (
                                <Segment
                                  key={index}
                                  style={{ textAlign: 'right' }}
                                >
                                  <Form.Group>
                                    <Form.Field
                                      style={{ margin: 0, maxWidth: '47%' }}
                                    >
                                      <label>{t('carTiming.from')}</label>
                                    </Form.Field>
                                    <Form.Field
                                      style={{ margin: 0, maxWidth: '47%' }}
                                    >
                                      <label>{t('carTiming.to')}</label>
                                    </Form.Field>
                                  </Form.Group>
                                  <DateRangePicker
                                    isRTL
                                    startDate={this.state.startDate}
                                    startDateId="unique_start_date_id"
                                    endDate={this.state.endDate}
                                    endDateId="unique_end_date_id"
                                    onDatesChange={({ startDate, endDate }) =>
                                      this.setState({ startDate, endDate })
                                    }
                                    focusedInput={this.state.focusedInput}
                                    onFocusChange={focusedInput =>
                                      this.setState({ focusedInput })
                                    }
                                    startDatePlaceholderText="تاریخ شروع"
                                    endDatePlaceholderText="تاریخ پایان"
                                    // minimumNights={1}
                                    monthFormat={'jMMMM jYYYY'}
                                    numberOfMonths={1}
                                    renderMonthText={month =>
                                      moment(month).format('jMMMM jYYYY')
                                    }
                                    renderDayContents={day =>
                                      moment(day).format('jD')
                                    }
                                  />
                                  <Form.Input
                                    style={{ width: '47%' }}
                                    placeholder="قیمت"
                                    label={t('carTiming.price')}
                                    onChange={(e, data) => {
                                      if (data) {
                                        this.setState({
                                          price: clearNumber(data.value)
                                        });
                                      }
                                    }}
                                    value={
                                      this.state.price
                                        ? convertNumbers2Persian(
                                            numberWithCommas(this.state.price)
                                          )
                                        : this.state.price
                                    }
                                  >
                                    <input inputMode="numeric" />
                                  </Form.Input>
                                  <Button.Group
                                    size="tiny"
                                    style={{
                                      flexDirection: 'row-reverse',
                                      position: 'relative',
                                      bottom: '-5px',
                                      left: '-70px'
                                    }}
                                  >
                                    <Button
                                      positive
                                      type="button"
                                      onClick={e => {
                                        console.log(e);
                                        let data = this.state.carTimings;
                                        if (
                                          this.state.startDate &&
                                          this.state.endDate &&
                                          this.state.price
                                        ) {
                                          data.splice(index, 1, {
                                            startDate: this.state.startDate,
                                            endDate: this.state.endDate,
                                            price: this.state.price
                                          });
                                          this.setState({
                                            carTimings: data,
                                            startDate: moment(),
                                            endDate: moment(),
                                            price: '',
                                            showNewEntery: false,
                                            openEditFor: null
                                          });
                                        }
                                      }}
                                    >
                                      ثبت
                                    </Button>
                                    <Button
                                      type="button"
                                      onClick={e => {
                                        this.setState({
                                          startDate: moment(),
                                          endDate: moment(),
                                          price: '',
                                          showNewEntery: false,
                                          openEditFor: null
                                        });
                                      }}
                                    >
                                      لغو
                                    </Button>
                                  </Button.Group>
                                </Segment>
                              );
                            } else {
                              return (
                                <Segment
                                  key={index}
                                  style={{ textAlign: 'right' }}
                                >
                                  <span>
                                    <label>از</label>{' '}
                                    {val.startDate.format('jDD jMMMM jYY')}{' '}
                                    <label>تا</label>{' '}
                                    {val.endDate.format('jDD jMMMM jYY')}{' '}
                                    <br />
                                    <label>با قیمت</label>{' '}
                                    {convertNumbers2Persian(
                                      numberWithCommas(val.price)
                                    )}{' '}
                                    تومان
                                  </span>
                                  <Icon
                                    name="close"
                                    onClick={e => {
                                      let data = this.state.carTimings;
                                      data.splice(index, 1);
                                      this.setState({
                                        carTimings: data
                                      });
                                    }}
                                  />
                                  <Icon
                                    name="edit outline"
                                    onClick={e => {
                                      this.setState({
                                        showNewEntery: false,
                                        openEditFor: index,
                                        startDate: null,
                                        endDate: null,
                                        price: null
                                      });
                                    }}
                                  />
                                </Segment>
                              );
                            }
                          })}

                          {/* ======================  new form ========================= */}
                          {this.state.showNewEntery && (
                            <Segment className="timingEntery">
                              <Form.Group>
                                <Form.Field
                                  style={{ margin: 0, maxWidth: '47%' }}
                                >
                                  <label>{t('carTiming.from')}</label>
                                </Form.Field>
                                <Form.Field
                                  style={{ margin: 0, maxWidth: '47%' }}
                                >
                                  <label>{t('carTiming.to')}</label>
                                </Form.Field>
                              </Form.Group>
                              <DateRangePicker
                                isRTL
                                startDate={this.state.startDate}
                                startDateId="your_unique_start_date_id"
                                endDate={this.state.endDate}
                                endDateId="your_unique_end_date_id"
                                onDatesChange={({ startDate, endDate }) =>
                                  this.setState({ startDate, endDate })
                                }
                                focusedInput={this.state.focusedInput}
                                onFocusChange={focusedInput =>
                                  this.setState({ focusedInput })
                                }
                                startDatePlaceholderText="تاریخ شروع"
                                endDatePlaceholderText="تاریخ پایان"
                                // minimumNights={1}
                                monthFormat={'jMMMM jYYYY'}
                                numberOfMonths={1}
                                renderMonthText={month =>
                                  moment(month).format('jMMMM jYYYY')
                                }
                                renderDayContents={day =>
                                  moment(day).format('jD')
                                }
                              />
                              <Form.Input
                                style={{ width: '47%' }}
                                name="price"
                                placeholder="قیمت"
                                label={t('carTiming.price')}
                                onChange={(e, data) => {
                                  if (data && data.name) {
                                    this.setState({
                                      price: clearNumber(data.value)
                                    });
                                  }
                                }}
                                value={
                                  this.state.price
                                    ? convertNumbers2Persian(
                                        numberWithCommas(this.state.price)
                                      )
                                    : this.state.price
                                }
                              >
                                <input inputMode="numeric" />
                              </Form.Input>
                              <Button.Group
                                size="tiny"
                                style={{
                                  flexDirection: 'row-reverse',
                                  position: 'relative',
                                  bottom: '-30px',
                                  left: '-15px'
                                }}
                              >
                                <Button
                                  positive
                                  type="button"
                                  onClick={e => {
                                    console.log(e);
                                    let data = this.state.carTimings;
                                    if (
                                      this.state.startDate &&
                                      this.state.endDate &&
                                      this.state.price
                                    ) {
                                      data.push({
                                        startDate: this.state.startDate,
                                        endDate: this.state.endDate,
                                        price: this.state.price
                                      });
                                      this.setState({
                                        carTimings: data,
                                        startDate: moment(),
                                        endDate: moment(),
                                        price: '',
                                        showNewEntery: false
                                      });
                                    }
                                  }}
                                >
                                  ثبت
                                </Button>
                                <Button
                                  type="button"
                                  onClick={e => {
                                    this.setState({
                                      showNewEntery: false
                                    });
                                  }}
                                >
                                  حذف
                                </Button>
                              </Button.Group>
                            </Segment>
                          )}
                        </Segment.Group>
                        <Button
                          icon
                          labelPosition="left"
                          type="button"
                          style={{ marginBottom: '12px' }}
                          onClick={e => {
                            this.setState({
                              showNewEntery: true,
                              openEditFor: null,
                              startDate: moment(),
                              endDate: moment(),
                              price: ''
                            });
                          }}
                        >
                          <Icon name="plus" />
                          افزودن
                        </Button>
                      </div>
                    )}
                    {/* ===================================================================== */}
                    <Form.Group>
                      <Form.Field
                        control={TextArea}
                        label={t('carTiming.cancellationPolicy')}
                        id="cancellationPolicy"
                        name="cancellationPolicy"
                        placeholder={t('carTiming.cancellationPolicy')}
                        style={{ minHeight: 150 }}
                        error={Boolean(
                          errors.cancellationPolicy &&
                            touched.cancellationPolicy
                        )}
                        onChange={(e, data) => {
                          if (data && data.name) {
                            setFieldValue(data.name, data.value);
                            setFieldTouched(data.name);
                          }
                        }}
                        onBlur={handleBlur}
                        value={values.cancellationPolicy}
                      />
                    </Form.Group>
                    {/* ===================================================================== */}
                    <Form.Field
                      style={{ textAlign: 'center', fontSize: '0.8em' }}
                    >
                      <Button
                        loading={isSubmitting}
                        primary
                        type="submit"
                        className="btn_1 full-width"
                      >
                        {t('signin')}
                      </Button>
                      {isSubmitting && (
                        <Progress
                          value={this.state.submittingSteps}
                          total="7"
                          indicating={isSubmitting}
                          success={this.state.submittingSteps == 7}
                        />
                      )}
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
            );
          }}
        </Formik>
      )
      else return (
        <Error404 token={this.state.token} openModal={this.props.openModal} />
      )
    }
  }
);
