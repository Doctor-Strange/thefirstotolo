/* tslint:disable */
import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import "otoli-react-persian-calendar-date-picker/lib/DatePicker.css";
import DatePicker from 'otoli-react-persian-calendar-date-picker';
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern' });
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
import { i18n, withTranslation } from '../../i18n';
import { Formik, FormikActions, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { REQUEST_getLocations } from '../../API';
import { Box, Flex } from '@rebass/grid';
import {
  convertDateToMoment,
  convertMomentToDate,
  convertRangeDateToMoment,
  convertMomentsToDateRange,
  getBetweenRange
} from '../../utils/date';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../../utils/numbers';
import { lightTheme } from "../../theme/Colors"; // fixme: serve colors only from styled-component


function clearNumber(x) {
  return convertNumbers2English(x.toString())
    .replace(/,/g, '')
    .replace(/\./g, '')
    .replace(/\D/g, '');
}

const BoxAccount = styled.div`
  .index-box {
    .field>.selection.dropdown {
      min-width: 149px !important;
    }
    .field>label {
      font-weight: 500;
    }
    background-color: #FFFFFF;
    border-radius: 4px;
    box-shadow: 0 2 0 5px #000000;
    padding: 32px;
    width: 100%;
    @media (min-width: 768px) {
      width: 100٪;
    }
    @media (min-width: 768px) {
      width: 723px;
    }
    @media (min-width: 992px) {
      width: 933px;
    }
    @media (min-width: 1200px) {
      width: 1056px;
    }
    &>div {
      padding: 0px 8px;
      @media (min-width: 992px) {
        :nth-child(2) {
          padding-left: 0px;
          input.DatePicker__input {
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
            border-left:none;
          }
        }
        :nth-child(3) {
          padding-right: 0px;
          input.DatePicker__input {
            border-bottom-right-radius: 0;
            border-top-right-radius: 0;
          }
        }
      }
    }
    .pickerbox {
      width:50%
    }
    .field {
      margin-bottom: 4px !important;
    }

    .btn_1 {
      bottom: -25px;
      position: relative;
    }
    input.DatePicker__input {
      cursor: pointer;
    }
  }
`;

interface IIndexFormValues {
  carCity: number;
  startDate: any;
  endDate: any;
}

interface IIndexForm {
  success: boolean;
  name: string;
}

const IndexForm: React.SFC<IIndexForm> = ({}) => {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
  const [datepicker_animation, setDPA] = useState(`.DatePicker__calendarContainer {
  transform: translateX(-22%);
}
`);
  const [citiesFarsi, setCitiesFarsi] = useState([{ text: 'کمی صبر کنید...', value: null }]);
  const [citiesEnglish, setCitiesEnglish] = useState([{ text: 'کمی صبر کنید...', value: null }]);
  const [date, setDate] = useState({
    from: null,
    to: null
  });

  async function fetchAPI() {
    //get cities and genrate a dropdown input in form
    const res = await REQUEST_getLocations({ brief: true });
    setCitiesFarsi(res.citiesFarsi);
    setCitiesEnglish(res.citiesEnglish);
  }

  const getSelectedDayValue = date => {
    if (!date) return '';
    return convertNumbers2Persian(
      moment(
        convertDateToMoment(date)
      ).format('dddd jD jMMMM jYY')
    );
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const setCalStart = () => {
    if (date.from && !date.to) {
      setCalEnd();
      return;
    }
    else {
      setDPA(`.DatePicker__calendarContainer {
        transform: translateX(-25%);
      }`);
      setDate({
        from: null,
        to: date.to
      });
    }
  }

  const setCalEnd = () => {
    setDPA(`.DatePicker__calendarContainer {
      transform: translateX(-75%);
    }`);
    setDate({
      from: date.from,
      to: null
    });
    document.activeElement.blur();
  }

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
        // console.log(date);
        if (date.from) {
          queryString = queryString +
            `start_date=${date.from.year}/${date.from.month}/${date.from.day}` +
            `&end_date=${date.to.year}/${date.to.month}/${date.to.day}&`;
          shownURL = shownURL +
            `start=${date.from.year}/${date.from.month}/${date.from.day}` +
            `&end=${date.to.year}/${date.to.month}/${date.to.day}&`;
        }
        const href = `/search-results?${shownURL}`;
        const as = href;
        Router.push(href, as)
          .then(response => {
            setError('');
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
              <style>
                {datepicker_animation}
              </style>
              <DatePicker
                selectedDayRange={date}
                onChange={(v) => {
                  // console.log("fe", v);
                  if (!v.to) {
                    setCalEnd();
                  }
                  setDate(v)
                }}
                inputPlaceholder="انتخاب روزهای نمایش"
                isDayRange
                renderInput={({ ref, onFocus, onBlur }) => {
                  return (
                    <Flex
                      justifyContent="space-around"
                      className="wrapper index-box"
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        margin: '0 auto'
                      }}
                    >
                      <Box className="indexFullOnMobile" width={[4 / 16]}>
                        <Form.Dropdown
                          label={'خودرو را کجا تحویل می‌گیرید؟'}
                          name="carCity"
                          id="carCity"
                          placeholder={'شهر'}
                          noResultsMessage={'نتیجه‌ای یافت نشد'}
                          selection
                          loading={citiesFarsi[0].value == null}
                          options={
                            i18n.language === 'en'
                              ? citiesEnglish
                              : citiesFarsi
                          }
                          error={Boolean(errors.carCity && touched.carCity)}
                          onChange={(e, data) => {
                            if (data && data.name) {
                              setFieldValue(data.name, data.value);
                            }
                          }}
                          onClose={(e, data) => {
                            // console.log(e);
                            if (data && data.name) {
                              setFieldTouched(data.name);
                            }
                          }}
                          value={values.carCity}
                          // onBlur={() => { console.log("on Blur for To")}}
                          
                        />
                        
                      </Box>
                      <Box className="indexFullOnMobile" width={[4 / 16]}>
                        <Form.Field style={{ margin: 0 }}>
                          <label>از تاریخ</label>
                        </Form.Field>
                        <input
                          readOnly
                          ref={ref}
                          onFocus={() => { setCalStart(); onFocus() }}
                          // onBlur={() => { console.log("on Blur for from")}}

                          value={getSelectedDayValue(date.from)}
                          placeholder="از تاریخ"
                          className="DatePicker__input index"
                          aria-label="انتخاب تاریخ"
                        />
                      </Box>
                      <Box className="indexFullOnMobile" width={[4 / 16]}>
                        <Form.Field style={{ margin: 0 }}>
                          <label>تا تاریخ</label>
                        </Form.Field>
                        <input
                          readOnly
                          ref={ref}
                          onFocus={() => { setCalEnd(); onFocus() }}
                          // onBlur={() => { console.log("on Blur for To")}}
                          value={getSelectedDayValue(date.to)}
                          placeholder="تا تاریخ"
                          className="DatePicker__input"
                          aria-label="انتخاب تاریخ"
                        />
                      </Box>
                      <Box className="indexFullOnMobile" width={[4 / 16]}>
                        <Form.Field
                          style={{ textAlign: 'center', fontSize: '0.8em' }}
                        >
                          <Button
                            loading={isSubmitting}
                            primary
                            type="submit"
                            className="btn_1 full-width"
                          >
                            {'جستجو'}
                          </Button>
                        </Form.Field>
                      </Box>
                    </Flex>
                  );
                }}
                disabledDays={[
                  {
                    year: Number(moment().format('jYYYY')),
                    month: Number(moment().format('jM')),
                    day: Number(moment().format('jD')),
                  }
                ]}
                disableBackward
                colorPrimary={lightTheme.mainForeground}
                colorPrimaryLight={lightTheme.secondForeground}
              />
            </Form>
            {error && (
              <Label attached="bottom" color="red">
                {'خطایی رخ داد'}
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
export default IndexForm;