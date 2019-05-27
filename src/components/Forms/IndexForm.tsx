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
import Error404 from '../404';
import { i18n, withNamespaces } from '../../i18n';
import { Formik, FormikActions, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Box, Flex } from '@rebass/grid';

function numberWithCommas(x) {
  return x
    .toString()
    .replace(',', '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function convertNumbers2Persian(num) {
  if (num !== null) {
    const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/[0-9]/g, function (w) {
      return id[+w];
    });
  } else {
    return num;
  }
}
function convertNumbers2English(string) {
  return string
    .replace(/[\u0660-\u0669]/g, function (c) {
      return c.charCodeAt(0) - 0x0660;
    })
    .replace(/[\u06f0-\u06f9]/g, function (c) {
      return c.charCodeAt(0) - 0x06f0;
    });
}

function clearNumber(x) {
  return convertNumbers2English(x.toString())
    .replace(/,/g, '')
    .replace(/\./g, '')
    .replace(/\D/g, '');
}

const BoxAccount = styled.div`
  .DateInput {
    width: 46%;
  }
  .DateRangePickerInput__withBorder {
    border: none;
  }
`;

interface IIndexFormValues {
  carCity: number;
  startDate: any;
  endDate: any;
}

export default withNamespaces('common')(
  class IndexForm extends React.Component<{
    t: any;
    success: boolean;
    name: string;
    rentalCarID: string;
  }> {
    state = {
      error: '',
      name: null,
      success: false,
      citiesFarsi: [{ text: 'کمی صبر کنید...', value: null }],
      citiesEnglish: [{ text: 'کمی صبر کنید...', value: null }],
      startDate: moment(),
      endDate: moment()
    };

    constructor(props) {
      super(props);
    }

    componentDidMount() {
      //get cities and genrate a dropdown input in form
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
          this.setState({ error: error, success: false });
        });
    }

    render() {
      const { error } = this.state;
      const { t } = this.props;
      const fieldErrorGenrator = fieldName => {
        return (
          t('forms.error_filed_required1') +
          fieldName +
          t('forms.error_filed_required2')
        );
      };

      return (
        <Formik
          initialValues={{ carCity: null }}
          onSubmit={(
            values: IIndexFormValues,
            actions: FormikActions<IIndexFormValues>
          ) => {
            actions.setSubmitting(true);
            let queryString = '';
            let shownURL = '';
            if (values.carCity) {
              queryString = queryString + `location_id=${values.carCity}&`;
              shownURL = shownURL + `city=${values.carCity}&`;
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
            const href = `/search-results?${shownURL}`;
            const as = href;
            Router.push(href, as, { shallow: true })
              .then(response => {
                this.setState({ error: '' });
                actions.setSubmitting(false);
              });

          }}
          validationSchema={Yup.object().shape({})}
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
            return (
              <BoxAccount className="box_account">
                <Form onSubmit={handleSubmit}>
                  <Flex
                    justifyContent="space-around"
                    className="wrapper"
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      maxWidth: '700px',
                      margin: '0 auto'
                    }}
                  >
                    <Box className="indexFullOnMobile" width={[4 / 12, 1, 1]}>
                      <Form.Dropdown
                        name="carCity"
                        id="carCity"
                        placeholder={t('carProperty.city')}
                        noResultsMessage={t('forms.error_no_result_found')}
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
                    </Box>
                    <Box className="indexFullOnMobile" width={[6 / 12, 1, 1]} style={{ minWidth: '300px' }}>
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
                        renderDayContents={day => moment(day).format('jD')}
                      />
                    </Box>
                    <Box className="indexFullOnMobile" width={[2 / 12, 1, 1]}>
                      <Form.Field
                        style={{ textAlign: 'center', fontSize: '0.8em' }}
                      >
                        <Button
                          loading={isSubmitting}
                          primary
                          type="submit"
                          className="btn_1 full-width"
                        >
                          {t('search')}
                        </Button>
                      </Form.Field>
                    </Box>
                  </Flex>
                </Form>
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
              </BoxAccount>
            );
          }}
        </Formik>
      );
    }
  }
);
