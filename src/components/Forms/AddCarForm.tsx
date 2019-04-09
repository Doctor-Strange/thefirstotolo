/* tslint:disable */
import * as React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import {
  Form,
  Label,
  Segment,
  Button,
  Checkbox,
  Message,
  Dropdown,
  Input,
  Radio,
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
    #first {
      background: transparent;
      position: absolute;
      left: 40px;
      width: 40px !important;
      padding: 8px;
      top: -5px;
      font-size: 18px;
    }
    #letter {
      background: transparent;
      position: relative;
      left: -142px;
      width: 70px !important;
      height: 47px;
      padding: 8px;
      top: -28px;
      font-size: 18px;
      text-align: left;
      direction: ltr;
    }
    #second {
      background: transparent;
      position: absolute;
      left: 166px;
      width: 55px !important;
      padding: 8px;
      top: -105px;
      font-size: 18px;
    }
    #estateCode {
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
`;

interface IAddCarFormValues {
  carCity: string;
  carDistrict: string;
  carBrand: string;
  carModel: string;
  carYear: string;
  carGearboxType: string;
  carChassis: string;
  carCapasity: string;
  carKmDriven: string;
  carVIN: string;
  carLicensePlates: string;
  carPictures: string;
  carOptions: [string];
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
      cityDistrictEnglish: [{ text: 'Loading', value: null }]
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
            console.log(response.data.items);
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
            console.log(citiesFarsi);
            this.setState({ citiesFarsi, citiesEnglish });
          }
        })
        .catch(error => {
          // tslint:disable-next-line:no-console
          console.error(error);
          this.setState({ error: error, success: false });
        })
        .then(() => {});
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
              cityDistrict: null,
              cityDistrictFarsi: [{ text: 'Loading', value: null }],
              cityDistrictEnglish: [{ text: 'Loading', value: null }]
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

    render() {
      const { token, error } = this.state;
      const { t } = this.props;
      if (true) {
        return (
          <Formik
            initialValues={{}}
            onSubmit={(
              values: IAddCarFormValues,
              actions: FormikActions<IAddCarFormValues>
            ) => {
              actions.setSubmitting(true);
              this.setState({ error: '' });
              console.log(values);
              const {} = values;
              axios
                .post(
                  'https://otoli.net' + '/core/user/update',
                  {
                    // first_name: firstName,
                    // last_name: lastName,
                    // national_id: nationalid,
                    // birth_date: `${year}/${month}/${day}`,
                    // email: emailAddress,
                    // is_ok_to_get_emails: false
                  },
                  {
                    headers: {
                      Authorization: 'Bearer ' + this.state.token
                    }
                  }
                )
                .then(response => {
                  if (response.data.success) {
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
            validationSchema={Yup.object().shape({})}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting,
              setFieldValue,
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
                              this.setCityDistrict(data.value);
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
                          value={values.carDistrict}
                        />
                      </Form.Field>
                    </Form.Group>

                    <Form.Group>
                      <Form.Input
                        label="برند"
                        name="مدل"
                        // error={Boolean(errors.lastName && touched.lastName)}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        // value={values.lastName}
                      />
                      <Form.Input
                        label="مدل"
                        name="نوع"
                        // error={Boolean(errors.lastName && touched.lastName)}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        // value={values.lastName}
                      />
                      <Form.Input
                        label="سال ساخت"
                        name="نوع"
                        // error={Boolean(errors.lastName && touched.lastName)}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        // value={values.lastName}
                      />
                    </Form.Group>

                    <Form.Field style={{ margin: 0 }}>
                      <label>نوع دنده</label>
                    </Form.Field>
                    <Form.Group inline>
                      <Form.Radio
                        label="دستی"
                        value="sm"
                        // checked={value === 'sm'}
                        // onChange={this.handleChange}
                      />
                      <Form.Radio
                        label="اتوماتیک"
                        value="md"
                        // checked={value === 'md'}
                        // onChange={this.handleChange}
                      />
                    </Form.Group>

                    <Form.Input
                      label="نوع شاسی"
                      name="نوع شاسی"
                      // error={Boolean(errors.lastName && touched.lastName)}
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                      // value={values.lastName}
                    />

                    <Form.Input
                      label="ظرفیت خودرو"
                      name="dhs"
                      type="number"
                      // error={Boolean(errors.lastName && touched.lastName)}
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                      // value={values.lastName}
                    />

                    <Form.Input
                      label="رنگ خودرو"
                      name="dhبب"
                      // error={Boolean(errors.lastName && touched.lastName)}
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                      // value={values.lastName}
                    />

                    <Form.Group>
                      <Form.Dropdown
                        name="kmdriven"
                        id="kmdriven"
                        label="کارکرد ماشین"
                        placeholder="کارکرد ماشین"
                        className="ltr"
                        selection
                        options={
                          i18n.language === 'en'
                            ? kmDrivenEnglish
                            : kmDrivenFarsi
                        }
                        // error={Boolean(errors.month && touched.month)}
                        // onChange={(e, data) => {
                        //   if (data && data.name) {
                        //     setFieldValue(data.name, data.value);
                        //   }
                        // }}
                        // value={values.month}
                      />
                    </Form.Group>

                    <Form.Input
                      label="کد شناسایی خودرو"
                      name="dhبب"
                      // error={Boolean(errors.lastName && touched.lastName)}
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                      // value={values.lastName}
                    />

                    <Form.Field style={{ margin: 0 }}>
                      <label>پلاک خودرو</label>
                    </Form.Field>
                    <Form.Group>
                      <div className="pelak" style={{}}>
                        <Form.Input name="first" id="first" style={{}} />
                        <Form.Input
                          name="letter"
                          id="letter"
                          style={{}}
                          control="select"
                        >
                          <option value="alef">الف</option>
                          <option value="be">ب</option>
                        </Form.Input>
                        <Form.Input name="second" id="second" style={{}} />
                        <Form.Input
                          name="estateCode"
                          id="estateCode"
                          style={{}}
                        />
                      </div>
                    </Form.Group>

                    <Form.Group inline>
                      <label>عکس ماشین</label>
                    </Form.Group>

                    <Form.Group>
                      <label>امکانات ماشین</label>
                    </Form.Group>

                    <Form.Group>
                      <Form.Field
                        control={TextArea}
                        label="توضیحات"
                        placeholder="Tell us more about you..."
                      />
                    </Form.Group>

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
