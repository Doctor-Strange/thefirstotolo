/* tslint:disable */
import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import "otoli-react-persian-calendar-date-picker/lib/DatePicker.css";
import DatePicker from 'otoli-react-persian-calendar-date-picker';
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
import Error404 from '../404';
import { REQUEST_getCarIsMine, REQUEST_getCarAvailabilities } from '../../API';
import { i18n, withNamespaces } from '../../i18n';
import { connect } from '../../store';
import { Formik, FormikActions, withFormik } from 'formik';
import * as Yup from 'yup';
import jsCookie from 'js-cookie';
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
import {
  convertDateToMoment,
  convertRangeDateToMoment,
  convertMomentsToDateRange,
  getBetweenRange
} from '../../lib/date';

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
    max-width: 128px;
    margin-top: 5px;

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
      left: -115px;
      top: 11px;
      font-size: 25px;
    }
    #carLicensePlates2 {
      position: relative;
      direction: ltr;
      left: -64px;
      top: 11px;
      font-size: 25px;
    }
    #carLicensePlates3 {
      position: relative;
      direction: ltr;
      left: 36px;
      top: 11px;
      font-size: 25px;
    }
    #carLicensePlates4 {
      position: relative;
      direction: ltr;
      left: 42px;
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
      margin-bottom: 18px;
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
        position: relative;
        min-width: 100px;
        padding-right: 5px;
        /* position: absolute; */
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
  button#pos_bott, button#pos_bott2, button.pos_bott {
    box-shadow: none !important;
    font-size: 14px !important;
    padding: 14px !important;
    background: none !important;
  }

  i.icon.edit, i.icon.calendar {
    margin-right: 0px !important;
    :before {
      right: -5px;
      position: relative;
    }
  }
`;

interface ISetCarTimingFormValues {
  daysToGetReminded: number;
  minDaysToRent: number;
  deliverAtRentersPlace: boolean;
  distanceLimit: string;
  extraKm: string;
  radioGroup: boolean;
  date: IRange;
  price: string;
  radiGoroup: boolean;
  availableInAllPrice: string;
  cancellationPolicy: string;
}

interface IDate {
  year: number;
  month: number;
  day: number;
}

interface IRange {
  from: IDate;
  to: IDate;
}

interface ISetCarTimingForm {
  user: any;
  t: any;
  success: boolean;
  name: string;
  rentalCarID: string;
}

interface ICar {
  carName: string,
  carBrand: string,
  carPelak: string,
  carColor: string,
  carYear: any,
  carMin_days_to_rent: any,
  carDeliver_at_renters_place: any,
  carDays_to_get_reminded: any,
  carLocation: any,
  carDescription: string,
  carMedia_set: [any],
  plate1: any,
  plate2: any,
  plate3: any,
  plate4: any,
}

const SetCarTimingForm: React.SFC<ISetCarTimingForm> = ({ t, id, }) => {

  const carSample = {
    registration_plate_first_part: "",
    max_km_per_day: 0,
    extra_km_price: 0,
    cancellation_policy: "",
    color: {
      priority: 1,
      name: { fa: "", en: "Black" },
      id: 5,
      slug: { fa: "", en: "black" },
      code: "#000000"
    },
    body_style: {
      id: 0,
    },
    registration_plate_forth_part: "",
    media_set: [
      {
        id: 0,
        thumbnail_url: null,
        url: ""
      }
    ],
    deliver_at_renters_place: true,
    car: {
      brand: {
        name: { fa: "", en: "" },
        id: 0,
        description: { fa: null, en: null }
      },
      media_set: [],
      id: 0,
      differential: null,
      slug: { fa: "", en: "" },
      description: { fa: "", en: "" },
      transmission_type: null,
      facility_set: [],
      capacity: 0,
      body_style: null,
      name: { fa: "", en: "" }
    },
    capacity: 0,
    vin: "",
    owner: {
    },
    location: {
      id: 0,
      name: {
        breadcrumb_en: "",
        fa: "",
        en: "",
        breadcrumb_fa: ""
      }
    },
    description: "",
    registration_plate_third_part: "",
    days_to_get_reminded: 0,
    min_days_to_rent: "",
    id: 0,
    registration_plate_second_part: "",
    mileage_range: {},
    transmission_type: {},
    facility_set: [],
    year: {}
  }

  const empetyDate = {
    from: null,
    to: null
  };

  const [error, setError] = useState(false);
  const [car, setCar] = useState({ ...carSample });
  const [mapApiToFormik, setMapApiToFormik] = useState(false);
  const [name, setName] = useState(null);
  const [carTimings, setCarTimings] = useState([]);
  const [isIsAllTime, setIsIsAllTime] = useState(false);
  const [isAllTimePrice, setIsAllTimePrice] = useState(0);
  const [success, setSuccess] = useState('');
  const [price, setPrice] = useState(null);
  const [date, setDate] = useState(empetyDate);
  const [showNewEntery, setShowNewEntery] = useState(true);
  const [openEditFor, setOpenEditFor] = useState(null);
  const [submittingSteps, setSubmittingSteps] = useState(0);
  const [disabledDays, setDisabledDays] = useState([]);

  const modifyCarTimings = async (array, curentRange = [] /* fixme */) => {
    setCarTimings(array);
    let out = [];
    var disabledDaysFiltered = array.filter((range) => {
      if (array.is_all_time) {
        return false; // skip
      }
      return true;
    }).map((value, index) => {
      console.log("index:", index)
      var days = getBetweenRange(value.date);
      out.push(...days);
    });
    await setDisabledDays(out);
    console.log("disabledDays is: ", disabledDays);
  }

  const fetchAPI = async () => {
    const carRes = await REQUEST_getCarIsMine({ id, token: jsCookie.get('token') });
    const timeRes = await REQUEST_getCarAvailabilities({ id, token: jsCookie.get('token') });
    console.log(carRes);
    console.log(timeRes);
    setCar(carRes);
    const results = timeRes.map((value, index) => {
      console.log("34", value.is_all_time);
      if (value.is_all_time) {
        setIsIsAllTime(true);
        setIsAllTimePrice(value.price_per_day);
        console.log("isIsAllTime======> ", value.price_per_day);
      }
      else {
        const s = value.start_date.jalali;
        const e = value.end_date.jalali;
        return {
          id: value.id,
          price: value.price_per_day,
          date:  {
            from: {
              year: s.y,
              month: s.m,
              day: s.d 
            },
            to: {
              year: e.y,
              month: e.m,
              day: e.d 
            }
          }
        }
      }
    });
    modifyCarTimings(results);
    setMapApiToFormik(true);
    console.log(results);
  }

  useEffect(() => {
    fetchAPI();
  }, []);

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

  return (
    <Formik
      initialValues={{
        daysToGetReminded: 1,
        minDaysToRent: 3,
        deliverAtRentersPlace: false,
        availableInAllPrice: null,
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
        setError(false);
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
        if (!deliverAtRentersPlace) deliverAtRentersPlace = false;
        const header = {
          headers: {
            Authorization: 'Bearer ' + jsCookie.get('token')
          }
        };
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
              setSubmittingSteps(1);
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
                    setSubmittingSteps(2);
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
                          setSubmittingSteps(3);
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
                                setSubmittingSteps(4);
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
                                      setSubmittingSteps(5);
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
                                            setSubmittingSteps(6);
                                            if (radioGroup == false) {
                                              axios
                                                .post(
                                                  'https://otoli.net' +
                                                  '/core/rental-car/availability/new',
                                                  {
                                                    rental_car_id: id,
                                                    is_all_time: 1,
                                                    price_per_day: clearNumber(
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
                                                    setSubmittingSteps(7);
                                                    setTimeout(() => {
                                                      actions.setSubmitting(
                                                        false
                                                      );
                                                      Router.push({
                                                        pathname: '/car',
                                                        query: {
                                                          id:
                                                            response.data
                                                              .data.id
                                                        }
                                                      });
                                                    }, 1000);
                                                  }
                                                });
                                            } else {
                                              carTimings.map(
                                                (val, index) => {
                                                  axios
                                                    .post(
                                                      'https://otoli.net' +
                                                      '/core/rental-car/availability/new',
                                                      {
                                                        rental_car_id: id,
                                                        start_date: convertDateToMoment(val.date.from).format(
                                                          'jYYYY/jMM/jDD'
                                                        ),
                                                        end_date: convertDateToMoment(val.date.to).format(
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
                                              setSubmittingSteps(7);
                                              setTimeout(() => {
                                                actions.setSubmitting(
                                                  false
                                                );
                                                Router.push({
                                                  pathname: '/car',
                                                  query: {
                                                    id:
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
            setError(true);
            setSuccess(false);
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
          ),
        availableInAllPrice: Yup.mixed()
          .when('radioGroup', {
            is: false, // alternatively: (val) => val == true
            then: Yup.number().required(fieldErrorGenrator(t('carTiming.price'))).typeError(fieldErrorGenrator(t('carTiming.price'))),
            otherwise: Yup.number(),
          })
          .when('$other', (other, schema) => (other === 4 ? schema.max(6) : schema)),
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
          radioPad = '0px';
        } else {
          radioPad = '0px';
        }
        if (mapApiToFormik) {
          setMapApiToFormik(false);
          setFieldValue('distanceLimit', car.max_km_per_day);
          setFieldValue('extraKm', car.extra_km_price);
          setFieldValue('cancellationPolicy', car.cancellation_policy);
          setFieldValue('deliverAtRentersPlace', car.deliver_at_renters_place);
          setFieldValue('daysToGetReminded', car.days_to_get_reminded);
          setFieldValue('minDaysToRent', car.min_days_to_rent);
          console.log("isAllTimePrice: ", isAllTimePrice);
          if (isIsAllTime) {
            console.log("setting is all time price", isAllTimePrice);
            setFieldValue('availableInAllPrice', isAllTimePrice);
          }
          else {
            console.log("setFieldValue", values.radioGroup);
            setFieldValue('radioGroup', true);
            console.log("setFieldValue", values.radioGroup);
          }
        }
        return (
          <BoxAccount className="box_account">
            <Form onSubmit={handleSubmit}>
              <h3 className="new_client">{t('add_car')}</h3>
              {/* <small className="float-right pt-2">* {$required_fields}</small> */}
              <Segment>
                <Item.Group>
                  <Item>
                    <Item.Image
                      src={(car.media_set[0] || { url: '' }).url}
                    />
                    <Item.Content>
                      <Item.Header as="a">
                        {`${car.car.brand.name.fa} - ${car.car.name.fa}`}
                      </Item.Header>
                      {/* <Item.Meta>{carDescription}</Item.Meta> */}
                      <Item.Description>
                        <div className="pelak" style={{}}>
                          <span id="carLicensePlates1">
                            {convertNumbers2Persian(car.registration_plate_first_part)}
                          </span>
                          <span id="carLicensePlates2">{car.registration_plate_second_part}</span>
                          <span id="carLicensePlates3">
                            {convertNumbers2Persian(car.registration_plate_third_part)}
                          </span>
                          <span id="carLicensePlates4">
                            {convertNumbers2Persian(car.registration_plate_forth_part)}
                          </span>
                        </div>
                      </Item.Description>
                      {/* <Item.Extra>{carLocation}</Item.Extra> */}
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
                </Form.Field>
                {/* ===================================================================== */}
                <Form.Field style={{ margin: 0 }}>
                  <label>{t('carTiming.minDaysToRent')}</label>
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
                </Form.Field>
                {/* ===================================================================== */}
                <Form.Field style={{ margin: 0 }}>
                  <label>{t('carTiming.distanceLimit')}</label>

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
                </Form.Field>
                {/* ===================================================================== */}
                <Form.Field style={{ margin: 0 }}>
                  <label>{t('carTiming.extraKmCost')}</label>

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
                </Form.Field>
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
                <Form.Field className="marg8">
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
                {/* ===================================================================== */}
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
                      {carTimings.map((val, index) => {
                        if (val == undefined) {
                          return <></>;
                        }
                        if (openEditFor == index) {
                          console.log("date is: ", date);
                          console.log("price is: ", price);
                          if (
                            date.to === null &&
                            date.from === null &&
                            price === null
                          ) {
                            setDate({ from: val.date.from, to: val.date.to });
                            setPrice(val.price);
                            console.log("date and price setted from carTiming: ", date);
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
                              </Form.Group>
                              <DatePicker
                                selectedDayRange={date}
                                onChange={(value) => {
                                  console.log("val ", value);
                                  setDate({ from: value.from, to: value.to });
                                  console.log("date ", date);
                                }}
                                inputPlaceholder="انتخاب روزهای نمایش"
                                isDayRange
                                disableBackward
                                disabledDays={disabledDays}
                                colorPrimary={"#00ACC1"}
                                colorPrimaryLight={"#00acc147"}
                              />
                              <Form.Input
                                style={{ width: '47%' }}
                                placeholder="قیمت"
                                label={t('carTiming.price')}
                                onChange={(e, data) => {
                                  if (data) {
                                    setPrice(clearNumber(data.value));
                                  }
                                }}
                                value={
                                  price
                                    ? convertNumbers2Persian(
                                      numberWithCommas(price)
                                    )
                                    : price
                                }
                              >
                                <input inputMode="numeric" />
                                <span
                                  style={{
                                    float: 'right',
                                    lineHeight: '48px',
                                    marginRight: '8px'
                                  }}
                                >
                                  {t('carTiming.toman')}
                                </span>
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
                                  type="button"
                                  className="pos_bott"
                                  onClick={e => {
                                    setDate(empetyDate);
                                    setPrice('');
                                    setShowNewEntery(false);
                                    setOpenEditFor(null);
                                  }}
                                >
                                  لغو
                                  </Button>
                                <Button
                                  color='blue'
                                  basic
                                  type="button"
                                  id="pos_bott2"
                                  className="pos_bott"
                                  onClick={e => {
                                    console.log(e);
                                    let data = carTimings;
                                    if (
                                      date.from &&
                                      date.to &&
                                      price
                                    ) {
                                      data.splice(index, 1, {
                                        date,
                                        price
                                      });
                                      modifyCarTimings(data);
                                      setDate(empetyDate);
                                      setPrice('');
                                      setShowNewEntery(false);
                                      setOpenEditFor(null);
                                    }
                                  }}
                                >
                                  ثبت
                                  </Button>
                              </Button.Group>
                            </Segment>
                          );
                        }
                        else {
                          return (
                            <Segment
                              key={index}
                              style={{ textAlign: 'right' }}
                            >
                              <span>
                                <label>از</label>{' '}
                                {convertNumbers2Persian(convertDateToMoment(val.date.from).format('jDD jMMMM jYY'))}{' '}
                                <label>تا</label>{' '}
                                {convertNumbers2Persian(convertDateToMoment(val.date.to).format('jDD jMMMM jYY'))}{' '}
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
                                  let data = carTimings;
                                  data.splice(index, 1);
                                  console.log(data);
                                  modifyCarTimings(data);
                                  setShowNewEntery(false);
                                  setPrice(null);
                                  setDate(empetyDate);
                                }}
                              />
                              <Icon
                                name="edit outline"
                                onClick={e => {
                                  setShowNewEntery(false);
                                  setOpenEditFor(index);
                                  setPrice(null);
                                  setDate(empetyDate);
                                }}
                              />
                            </Segment>
                          );
                        }
                      })}

                      {/* ======================  new form ========================= */}
                      {showNewEntery && (
                        <Segment className="timingEntery">
                          <Form.Group>
                            <Form.Field
                              style={{ margin: 0, maxWidth: '100%' }}
                            >
                              <label>{t('carTiming.from')}</label>
                              <DatePicker
                                selectedDayRange={date}
                                onChange={setDate}
                                inputPlaceholder="انتخاب روزهای نمایش"
                                isDayRange
                                disableBackward
                                disabledDays={disabledDays}
                                colorPrimary={"#00ACC1"}
                                colorPrimaryLight={"#00acc147"}
                              />
                            </Form.Field>
                          </Form.Group>
                          <Form.Input
                            style={{ width: '47%' }}
                            name="price"
                            placeholder="قیمت"
                            label={t('carTiming.price')}
                            onChange={(e, data) => {
                              if (data && data.name) {
                                setPrice(clearNumber(data.value));
                              }
                            }}
                            value={
                              price
                                ? convertNumbers2Persian(
                                  numberWithCommas(price)
                                )
                                : price
                            }
                          >
                            <input inputMode="numeric" />
                            <span
                              style={{
                                float: 'right',
                                lineHeight: '48px',
                                marginRight: '8px'
                              }}
                            >
                              تومان
                              </span>
                          </Form.Input>
                          <Button.Group
                            size="tiny"
                            style={{
                              flexDirection: 'row-reverse',
                              position: 'relative',
                              bottom: '-20px',
                              left: '-75px'
                            }}
                          >
                            <Button
                              basic
                              type="button"
                              className="pos_bott"
                              onClick={e => {
                                setShowNewEntery(false);
                              }}
                            >
                              حذف
                              </Button>
                            <Button
                              color='blue'
                              basic
                              type="button"
                              className="pos_bott"
                              id="pos_bott"
                              onClick={e => {
                                console.log(e);
                                let data = carTimings;
                                if (
                                  date.from &&
                                  date.to &&
                                  price
                                ) {
                                  data.push({
                                    date,
                                    price
                                  });
                                  modifyCarTimings(data);
                                  setDate(empetyDate);
                                  setPrice('');
                                  setShowNewEntery(false);
                                }
                              }}
                            >
                              ثبت
                              </Button>
                          </Button.Group>
                        </Segment>
                      )}
                    </Segment.Group>
                    <div style={{
                      textAlign: 'right',
                      marginBottom: '24px'
                    }}>
                      <Button
                        icon
                        labelPosition="right"
                        type="button"
                        basic
                        color='blue'
                        onClick={e => {
                          setDate(empetyDate);
                          setPrice('');
                          setShowNewEntery(true);
                          setOpenEditFor(null);
                        }}
                      >
                        افزودن
                          <Icon name="plus" />
                      </Button>
                    </div>
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
                  {/* {isSubmitting && (
                      <Progress
                        value={this.state.submittingSteps}
                        total="7"
                        indicating={isSubmitting}
                        success={this.state.submittingSteps == 7}
                      />
                    )} */}
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
}

export default withNamespaces('common')(connect(state => state)(SetCarTimingForm));