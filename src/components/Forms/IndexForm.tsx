/* tslint:disable */
import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import DatePicker from 'react-persian-calendar-date-picker';
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
import { REQUEST_getLocations } from '../../API';
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

interface IIndexForm {
  t: any;
  success: boolean;
  name: string;
}

const IndexForm: React.SFC<IIndexForm> = ({t}) => {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
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

  useEffect(() => {
    fetchAPI();
  }, []);

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
        console.log(date);
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
        Router.push(href, as, { shallow: true })
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
                      console.log(e);
                      if (data && data.name) {
                        setFieldTouched(data.name);
                      }
                    }}
                    value={values.carCity}
                  />
                </Box>
                <Box className="indexFullOnMobile" width={[6 / 12, 1, 1]} style={{ minWidth: '300px' }}>
                  <DatePicker
                    selectedDayRange={date}
                    onChange={setDate}
                    inputPlaceholder="انتخاب روزهای نمایش"
                    isDayRange
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
export default withNamespaces('common')(IndexForm);