/* tslint:disable */
import * as React from 'react';
import { useCallback } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import {
  Form,
  Divider,
  Header,
  Label,
  Segment,
  Button,
  Checkbox,
  Grid,
  Dropdown,
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
import axios from 'axios';
import * as NewUser from '../../../static/new_user.svg';
import * as Pelak from '../../../static/pelak2.png';
import { Box, Flex } from '@rebass/grid';
import { kmDrivenEnglish, kmDrivenFarsi } from '../../constants/options';

function numberWithCommas(x) {
  return x
    .toString()
    .replace(',', '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function clearNumber(x) {
  return x.toString().replace(',', '');
}

const BoxAccount = styled.div`
  margin-bottom: 25px;
  margin-top: 25px;
  .ui.segments {
    .segment:last-child {
      min-height: 225px;
    }
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
      font-size: 20px;
    }
    #carLicensePlates2 {
      position: relative;
      direction: ltr;
      left: -63px;
      top: 11px;
      font-size: 20px;
    }
    #carLicensePlates3 {
      position: relative;
      direction: ltr;
      left: 31px;
      top: 11px;
      font-size: 20px;
    }
    #carLicensePlates4 {
      position: relative;
      direction: ltr;
      left: 45px;
      top: 15px;
      font-size: 20px;
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
      input[type='number'] {
        width: 70px !important;
        height: 32px !important;
        margin: 0px 5px;
        z-index: 2;
        text-align: center !important;
      }
      .label {
        z-index: 2;
        border: none;
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
    max-width: 300px !important;
    margin: 0 !important;
    div {
      max-width: 300px !important;
      input {
        max-width: 300px !important;
      }
    }
  }
`;

interface ISetCarTimingFormValues {
  daysToGetReminded: number;
  minDaysToRent: number;
  deliverAtRentersPlace: boolean;
  distanceLimit: number;
  extraKm: string;
  radioGroup: boolean;
  start_date: string;
  end_date: string;
  price: string;
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
      from: '',
      to: '',
      price: ''
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
          this.setState({ error: error, success: false });
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
      return (
        <Error404 token={this.state.token}>
          <Formik
            initialValues={{
              daysToGetReminded: 1,
              minDaysToRent: 3,
              deliverAtRentersPlace: false,
              distanceLimit: null,
              extraKm: null,
              radioGroup: false
            }}
            onSubmit={(
              values: ISetCarTimingFormValues,
              actions: FormikActions<ISetCarTimingFormValues>
            ) => {
              actions.setSubmitting(true);
              this.setState({ error: '' });
              console.log(values);
              const {
                // carCity,
                // carDistrict,
                // carBrand,
                // carModel,
                // carYear,
              } = values;
              setTimeout(() => {
                console.log(values);

                actions.setSubmitting(false);
              }, 3000);
            }}
            validationSchema={Yup.object().shape({
              daysToGetReminded: Yup.number()
                .required(fieldErrorGenrator(t('carTiming.daysToGetReminded')))
                .typeError(
                  fieldErrorGenrator(t('carTiming.daysToGetReminded'))
                ),
              minDaysToRent: Yup.number()
                .required(fieldErrorGenrator(t('carTiming.minDaysToRent')))
                .typeError(fieldErrorGenrator(t('carTiming.minDaysToRent'))),
              distanceLimit: Yup.number()
                .required(fieldErrorGenrator(t('carTiming.distanceLimit')))
                .typeError(fieldErrorGenrator(t('carTiming.distanceLimit'))),
              extraKm: Yup.number()
                .required(fieldErrorGenrator(t('carTiming.extraKmCost')))
                .typeError(fieldErrorGenrator(t('carTiming.extraKmCost')))
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
                              <span id="carLicensePlates1">{plate1}</span>
                              <span id="carLicensePlates2">{plate2}</span>
                              <span id="carLicensePlates3">{plate3}</span>
                              <span id="carLicensePlates4">{plate4}</span>
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
                      inputMode="numeric"
                      type="number"
                      pattern="[0-9]*"
                      error={Boolean(
                        errors.daysToGetReminded && touched.daysToGetReminded
                      )}
                      onChange={(e, data) => {
                        if (data && data.name) {
                          setFieldValue(data.name, data.value);
                          setFieldTouched(data.name);
                        }
                      }}
                      value={values.daysToGetReminded}
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
                      <input />
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
                      type="number"
                      pattern="[0-9]*"
                      error={Boolean(
                        errors.minDaysToRent && touched.minDaysToRent
                      )}
                      onChange={(e, data) => {
                        if (data && data.name) {
                          setFieldValue(data.name, data.value);
                          setFieldTouched(data.name);
                        }
                      }}
                      value={values.minDaysToRent}
                    >
                      <Label
                        basic
                        onClick={(e, data) => {
                          if (values.minDaysToRent < 31) {
                            let val = Number(values.minDaysToRent);
                            setFieldValue('minDaysToRent', ++val);
                          }
                        }}
                      >
                        <Icon name="plus" />
                      </Label>
                      <input />
                      <Label
                        basic
                        onClick={(e, data) => {
                          if (values.minDaysToRent > 1) {
                            let val = Number(values.minDaysToRent);
                            setFieldValue('minDaysToRent', --val);
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
                      inputMode="numeric"
                      type="number"
                      pattern="[0-9]*"
                      error={Boolean(
                        errors.distanceLimit && touched.distanceLimit
                      )}
                      onChange={(e, data) => {
                        if (data && data.name) {
                          setFieldValue(data.name, data.value);
                          setFieldTouched(data.name);
                        }
                      }}
                      value={values.distanceLimit}
                    />
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
                          ? numberWithCommas(values.extraKm)
                          : values.extraKm
                      }
                    />
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
                        label={t('carTiming.availableInAllDatesWithSamePrice')}
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
                          inputMode="numeric"
                          //   type="number"
                          error={Boolean(
                            errors.availableInAllPrice &&
                              touched.availableInAllPrice
                          )}
                          onChange={(e, data) => {
                            if (data && data.name) {
                              setFieldValue(data.name, clearNumber(data.value));
                              setFieldTouched(data.name);
                            }
                          }}
                          value={
                            values.availableInAllPrice
                              ? numberWithCommas(values.availableInAllPrice)
                              : values.availableInAllPrice
                          }
                        />
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
                    <Form.Field>
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
                          {this.state.carTimings.map((val, index) => (
                            <Segment>
                              از تاریخ {val.from} تا تاریخ {val.from} با قیمت{' '}
                              {val.from} تومان
                              {/* <Form.Group>
                                <Form.Input
                                  disabled
                                  placeholder="تاریخ"
                                  label={t('carTiming.from')}
                                  value={val.from}
                                />
                                <Form.Input
                                  disabled
                                  placeholder="تاریخ"
                                  label={t('carTiming.to')}
                                  value={val.to}
                                />
                              </Form.Group>
                              <Form.Input
                                disabled
                                style={{ width: '47%' }}
                                placeholder="قیمت"
                                label={t('carTiming.price')}
                                value={val.price}
                              /> */}
                            </Segment>
                          ))}

                          {/* ======================  new form ========================= */}
                          <Segment>
                            <Form.Group>
                              <Form.Input
                                placeholder="تاریخ"
                                name="from"
                                label={t('carTiming.from')}
                                onChange={(e, data) => {
                                  if (data && data.name) {
                                    this.setState({ from: data.value });
                                  }
                                }}
                                value={this.state.from}
                              />
                              <Form.Input
                                placeholder="تاریخ"
                                name="to"
                                label={t('carTiming.to')}
                                onChange={(e, data) => {
                                  if (data && data.name) {
                                    this.setState({ to: data.value });
                                  }
                                }}
                                value={this.state.to}
                              />
                            </Form.Group>
                            <Form.Input
                              style={{ width: '47%' }}
                              name="price"
                              placeholder="قیمت"
                              label={t('carTiming.price')}
                              onChange={(e, data) => {
                                if (data && data.name) {
                                  this.setState({ price: data.value });
                                }
                              }}
                              value={
                                this.state.price
                                  ? numberWithCommas(this.state.price)
                                  : this.state.price
                              }
                            />
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
                                onClick={e => {
                                  let data = this.state.carTimings;
                                  if (
                                    this.state.from &&
                                    this.state.to &&
                                    this.state.price
                                  ) {
                                    data.push({
                                      from: this.state.from,
                                      to: this.state.to,
                                      price: this.state.price
                                    });
                                    this.setState({
                                      carTimings: data,
                                      from: '',
                                      to: '',
                                      price: ''
                                    });
                                  }
                                }}
                              >
                                ثبت
                              </Button>
                              <Button>حذف</Button>
                            </Button.Group>
                          </Segment>
                        </Segment.Group>
                        <Button
                          icon
                          labelPosition="left"
                          style={{ marginBottom: '12px' }}
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
        </Error404>
      );
    }
  }
);
