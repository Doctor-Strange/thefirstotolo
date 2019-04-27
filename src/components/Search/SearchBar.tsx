import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Form,
  Grid,
  Icon,
  Label,
  Segment,
  TextArea
} from 'semantic-ui-react';
import { Formik, FormikActions, withFormik } from 'formik';
import * as Yup from 'yup';
import jsCookie from 'js-cookie';
import axios from 'axios';
import { i18n, withNamespaces } from '../../i18n';
import {
  DateRangePicker,
  DayPickerRangeController,
  SingleDatePicker
} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment-jalaali';
moment.loadPersian();
import { Box, Flex } from '@rebass/grid';

const SearchResult = styled.div`
  padding: 20px 0;
  color: #fff;
  background: #004dda;
  position: relative;
  z-index: 999 !important;
  @media (max-width: 767px) {
    padding: 12px 0;
  }
  &.is_stuck {
    z-index: 99;
    padding: 10px 0;
  }
  h4 {
    color: #fff;
    margin: 12px 0 0 0;
    padding: 0;
    line-height: 1;
    font-size: 16px;
    font-size: 1rem;
    direction: rtl;
    @media (max-width: 991px) {
      margin: 5px 0 0 0;
    }
    @media (max-width: 767px) {
      margin: 3px 0 0 0;
    }
  }
  &.map_view {
    padding: 10px 0;
    margin: 0 -15px;
    h4 {
      margin: 3px 0 0 0;
    }
  }
  .DateRangePickerInput__withBorder {
    border: none;
  }
  @media (max-width: 991px) {
    .custom-search-input-2.inner {
        display: none;
    }
  }
`;

interface ISearchResultFormValues {
  carCity: number;
  startDate: any;
  endDate: any;
}

export class SearchBar extends React.Component<{
  count?: number;
  t?: any;
}> {
  state = {
    token: '',
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
  }

  render() {
    const { t } = this.props;
    return (
      <Formik
        initialValues={{ carCity: null }}
        onSubmit={(
          values: ISearchResultFormValues,
          actions: FormikActions<ISearchResultFormValues>
        ) => {
          actions.setSubmitting(true);
          this.setState({ error: '' });
          console.log(values);
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
            <SearchResult id="results">
              <div className="container">
                <Flex justifyContent="space-around" className="row">
                  <Box width={3 / 12} px={2}>
                    <h4>
                      <strong>{this.props.count}</strong> نتیجه برای جست‌وجو
                    </h4>
                  </Box>
                  <Box width={9 / 12} px={2}>
                    <Form onSubmit={handleSubmit}>
                      {/* <a href="#0" className="side_panel btn_search_mobile" /> */}
                      <Flex
                        justifyContent="space-around"
                        flexDirection="row"
                        className="row no-gutters custom-search-input-2 inner"
                      >
                        <Box width={3 / 10}>
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
                        <Box width={5 / 10} style={{ textAlign: 'center' }}>
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
                        <Box width={2 / 10}>
                          <Form.Field
                            style={{ textAlign: 'center', fontSize: '0.8em' }}
                          >
                            <Button
                              // loading={isSubmitting}
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
                  </Box>
                </Flex>
              </div>
            </SearchResult>
          );
        }}
      </Formik>
    );
  }
}
