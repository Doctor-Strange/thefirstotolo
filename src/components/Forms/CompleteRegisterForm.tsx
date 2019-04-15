// import {  } from 'formik-semantic-ui';
import { Formik, FormikActions, withFormik } from 'formik';
import * as React from 'react';
import styled from 'styled-components';
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Input,
  Label,
  Message,
  Radio,
  Segment,
  TextArea
} from 'semantic-ui-react';
import jsCookie from 'js-cookie';
import Error404 from '../404';
import { i18n, withNamespaces } from '../../i18n';
import Router from 'next/router';
import * as Yup from 'yup';
import axios from 'axios';
import * as NewUser from '../../../static/new_user.svg';
import { Box, Flex } from '@rebass/grid';
import { monthsEnglish, monthsFarsi } from '../../constants/options';

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

  .selection {
    font-size: 0.875rem;
    border-radius: 3px;
    border: 1px solid #d2d8dd;
    &.wide {
      width: 100%;
    }
  }
`;

interface ICompleteRegisterFormValues {
  firstName: string;
  lastName: string;
  nationalid: string;
  emailAddress: string;
  password: string;
  day: number;
  month: number;
  year: number;
  subscribe: boolean;
}

export default withNamespaces('common')(
  class CompleteRegisterForm extends React.Component<{
    phone?: string;
    token?: string;
    strings: object;
    success: boolean;
    name: string;
  }> {
    static async getInitialProps() {
      return {
        namespacesRequired: ['common']
      };
    }
    state = {
      phone: '',
      token: '',
      error: '',
      name: null,
      success: false
    };

    constructor(props) {
      super(props);
    }

    componentDidMount() {
      this.setState({
        completeRegister: jsCookie.get('complete_register'),
        phone: jsCookie.get('phone'),
        token: jsCookie.get('token')
      });
    }

    render() {
      const {
        $required_fields,
        $firstname,
        $lastname,
        $national_id,
        $phone_number,
        $day,
        $month,
        $year,
        $year_hint,
        $email,
        $password,
        $subscribe_checkbox,
        $signup,
        $new_client,
        $agreement_sentence,
        $birthdate
      } = this.props.strings;
      const { phone, token, error, completeRegister } = this.state;
      const { t } = this.props;
      if (completeRegister) {
        return (
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              nationalid: '',
              emailAddress: '',
              password: '',
              day: null,
              month: null,
              year: null,
              subscribe: false
            }}
            onSubmit={(
              values: ICompleteRegisterFormValues,
              actions: FormikActions<ICompleteRegisterFormValues>
            ) => {
              actions.setSubmitting(true);
              this.setState({ error: '' });
              console.log(values);
              const {
                firstName,
                lastName,
                nationalid,
                emailAddress,
                password,
                day,
                month,
                year,
                subscribe
              } = values;
              axios
                .post(
                  'https://otoli.net' + '/core/user/update',
                  {
                    first_name: firstName,
                    last_name: lastName,
                    national_id: nationalid,
                    birth_date: `${year}/${month}/${day}`,
                    email: emailAddress,
                    is_ok_to_get_emails: false
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
                    this.setState({
                      success: response.data.success,
                      error: ''
                    });
                    jsCookie.set('first_name', firstName);
                    jsCookie.set('last_name', lastName);
                    localStorage.removeItem('complete_register');
                    Router.push({
                      pathname: '/me',
                      query: {
                        cell: this.state.phone,
                        token: response.data.token
                      }
                    });
                  }
                })
                .catch(error => {
                  // tslint:disable-next-line:no-console
                  console.error(error);
                  this.setState({ error, success: false });
                })
                .then(() => {
                  actions.setSubmitting(false);
                });
              setTimeout(() => {
                console.log(values);
                this.setState({
                  name: values.firstName + ' ' + values.lastName
                });
                actions.setSubmitting(false);
              }, 3000);
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string().required(
                t('forms.error_filed_required1') +
                  $firstname +
                  t('forms.error_filed_required2')
              ),
              lastName: Yup.string().required(
                t('forms.error_filed_required1') +
                  $lastname +
                  t('forms.error_filed_required2')
              ),
              nationalid: Yup.string()
                .ensure() // convert undefined values to an empety string
                .trim()
                .required('')
                .length(10, t('forms.error_nationalID_10_char'))
                .test(
                  'Validate National ID',
                  t('forms.error_nationalID_not_valid'),
                  value => {
                    const check = parseInt(value[9], 10);
                    let sum = 0;
                    let i;
                    for (i = 0; i < 9; ++i) {
                      sum += parseInt(value[i], 10) * (10 - i);
                    }
                    sum %= 11;

                    return (
                      (sum < 2 && check == sum) ||
                      (sum >= 2 && check + sum == 11)
                    );
                  }
                ),
              emailAddress: Yup.string().email(
                t('forms.error_email_not_valid')
              ),
              day: Yup.number()
                .typeError(
                  t('forms.error_filed_required1') +
                    $day +
                    t('forms.error_filed_required2')
                )
                .required(
                  t('forms.error_filed_required1') +
                    $day +
                    t('forms.error_filed_required2')
                )
                .min(1, t('forms.error_day_not_valid'))
                .max(31, t('forms.error_day_not_valid')),
              month: Yup.number()
                .typeError(
                  t('forms.error_filed_required1') +
                    $month +
                    t('forms.error_filed_required2')
                )
                .required(
                  t('forms.error_filed_required1') +
                    $month +
                    t('forms.error_filed_required2')
                ),
              year: Yup.number()
                .typeError(
                  t('forms.error_filed_required1') +
                    $year +
                    t('forms.error_filed_required2')
                )
                .required(
                  t('forms.error_filed_required1') +
                    $year +
                    t('forms.error_filed_required2')
                )
                .min(1300, t('forms.error_year_not_valid'))
                .max(1398, t('forms.error_year_not_valid'))
            })}
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
                  <h3 className="new_client">{$new_client}</h3>
                  {/* <small className="float-right pt-2">* {$required_fields}</small> */}
                  <Segment>
                    <Form.Group widths="2">
                      <Form.Input
                        label={$firstname}
                        name="firstName"
                        error={Boolean(errors.firstName && touched.firstName)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                      />

                      <Form.Input
                        label={$lastname}
                        name="lastName"
                        error={Boolean(errors.lastName && touched.lastName)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                      />
                    </Form.Group>

                    <Form.Input
                      label={$national_id}
                      name="nationalid"
                      error={Boolean(errors.nationalid && touched.nationalid)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nationalid}
                    />
                    {errors.nationalid && touched.nationalid && (
                      <label className="sui-error-message sui-padd">
                        {errors.nationalid}
                      </label>
                    )}

                    {/* <Form.Field>
                <label>{$phone_number}</label>
                <input name="phone" value={this.state.phone} disabled />
              </Form.Field> */}

                    <Form.Group widths="3" className="paddingInMobile">
                      <Form.Input
                        name="day"
                        label={$birthdate}
                        type="number"
                        placeholder={$day}
                        // min="1"
                        // max="31"
                        error={Boolean(errors.day && touched.day)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.day}
                      />

                      <Form.Dropdown
                        // label={$month}
                        name="month"
                        id="month"
                        placeholder={$month}
                        clearable
                        selection
                        options={
                          i18n.language === 'en' ? monthsEnglish : monthsFarsi
                        }
                        style={{ marginTop: '25px' }}
                        error={Boolean(errors.month && touched.month)}
                        onChange={(e, data) => {
                          if (data && data.name) {
                            setFieldValue(data.name, data.value);
                          }
                        }}
                        value={values.month}
                      />

                      <Form.Input
                        name="year"
                        type="number"
                        // min="1300"
                        // max="1397"
                        placeholder={$year + $year_hint}
                        style={{ marginTop: '25px' }}
                        error={Boolean(errors.year && touched.year)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.year}
                      />
                    </Form.Group>
                    {/* {(errors.day || errors.month || errors.year) &&
                    (touched.day || touched.month || touched.year) && (
                      <label className="sui-error-message">
                        {errors.day || errors.month || errors.year}
                      </label>
                    )} */}

                    <Form.Input
                      label={$email}
                      name="emailAddress"
                      type="email"
                      error={Boolean(
                        errors.emailAddress && touched.emailAddress
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.emailAddress}
                    />
                    {errors.emailAddress && touched.emailAddress && (
                      <label className="sui-error-message sui-padd">
                        {errors.emailAddress}
                      </label>
                    )}

                    {/* <Input
                label={$password}
                name="password"
                inputProps={{
                  type: 'password'
                }}
              /> */}
                    {/* <div className="field">
                    <Checkbox
                      label={$subscribe_checkbox}
                      name="subscribe"
                      id="subscribe"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.subscribe}
                    />
                  </div> */}
                    <Form.Field
                      style={{ textAlign: 'center', fontSize: '0.8em' }}
                    >
                      <Button
                        loading={isSubmitting}
                        primary
                        type="submit"
                        className="btn_1 full-width"
                      >
                        {$signup}
                      </Button>
                      <br />
                      <span>{$agreement_sentence}</span>
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

                    {this.state.success && this.state.name && (
                      <Label attached="bottom" color="green">
                        {this.state.name} خوش آمدی!
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
