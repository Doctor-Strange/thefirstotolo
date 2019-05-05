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
import { i18n, withNamespaces } from '../../i18n';
import {
  DateRangePicker,
  DayPickerRangeController,
  SingleDatePicker
} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { Box, Flex } from '@rebass/grid';
import moment from 'moment-jalaali';
moment.loadPersian();
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../../lib/numbers';

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
    line-height: 24px;
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
  .hide_on_desktop {
    text-align: center;
  }
`;

interface ISearchResultFormValues {
  carCity: number;
  startDate: any;
  endDate: any;
}

export class SearchBar extends React.Component<{
  count: number;
  t: any;
  cities?: any;
  city: any;
  cityName: any;
  setCity: any;
  setDate: any;
  startDate: any;
  endDate: any;
  setfocusedInput: any;
  focusedInput: any;
}> {
  state = {
    error: '',
    name: null,
    success: false,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { t, count, cities, startDate, endDate, focusedInput, city, cityName } = this.props;
    const { setCity, setDate, setfocusedInput } = this.props;
    const { citiesFarsi, citiesEnglish } = cities;
    let start = "";
    let end = "";
    let loadingCity = false;
    let text = "نتیجه برای جست‌وجو در ";
    if (startDate && endDate) {
      start = moment(startDate).format('jD jMMMM jYY');
      end = moment(endDate).format('jD jMMMM jYY');
    }
    if (!cityName) {
      loadingCity = true;
      text = `نتیجه برای جست‌وجو در `;
    } else {
      text = `نتیجه برای جست‌وجو در ${cityName}`;
    }
    const textDate = ` از تاریخ ${convertNumbers2Persian(start)} تا ${convertNumbers2Persian(end)}`;
    return (
      <SearchResult id="results">
        <div className="container">
          <Flex justifyContent="space-around" className="row hide_on_mobile">
            <Box width={3 / 12} px={2}>
              <h4>
                <strong>{convertNumbers2Persian(count)}</strong> نتیجه برای جست‌وجو
              </h4>
            </Box>
            <Box width={9 / 12} px={2}>
              <Form>
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
                      loading={citiesFarsi[0].value == null}
                      options={
                        i18n.language === 'en'
                          ? citiesEnglish
                          : citiesFarsi
                      }
                      // error={Boolean(errors.carCity && touched.carCity)}
                      onChange={(e, data) => {
                        if (data && data.name) {
                          setCity(data.value, (
                            i18n.language === 'en' ? citiesEnglish : citiesFarsi
                          )[data.value].text);
                          // setFieldValue(data.name, data.value);
                        }
                      }}
                      // onClose={(e, data) => {
                      //   console.log(e);
                      //   if (data && data.name) {
                      //     setFieldTouched(data.name);
                      //   }
                      // }}
                      value={city}
                    />
                  </Box>
                  <Box width={5 / 10} style={{ textAlign: 'center' }}>
                    <DateRangePicker
                      isRTL
                      startDate={startDate}
                      startDateId="unique_start_date_id"
                      endDate={endDate}
                      endDateId="unique_end_date_id"
                      onDatesChange={({ startDate, endDate }) => {
                        setDate(startDate, endDate);
                      }}
                      focusedInput={focusedInput}
                      onFocusChange={val => {
                        setfocusedInput(val);
                      }}
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
          <div className="hide_on_desktop">
            <h4>
              <strong>{convertNumbers2Persian(count)}</strong> {text}
              {loadingCity ? <Icon loading name='spinner' /> : ""} <br /> {textDate ? textDate : ""}
            </h4>
          </div>
        </div>
      </SearchResult >
    );
  }
}
