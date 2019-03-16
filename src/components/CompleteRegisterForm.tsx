import * as React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Label, Segment } from 'semantic-ui-react';
import { i18n, withNamespaces } from '../i18n';
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Input,
  Radio,
  TextArea
} from 'formik-semantic-ui';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import * as NewUser from '../../static/new_user.svg';
import { Box, Flex } from '@rebass/grid';
import { monthsEnglish } from '../constants/options';

const BoxAccount = styled.form`
  margin-bottom: 25px;

  h3 {
    font-size: 21px;
    font-size: 1.3125rem;
    padding-left: 30px;
    height: 30px;
    padding-top: 5px;
    display: inline-block;
    margin-bottom: 15px;
    &.new_client {
      background: url(${NewUser}) center left no-repeat;
    }
  }

  .selection {
    height: calc(2.55rem + 2px);
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
  }> {
    state = {
      phone: '',
      token: '',
      error: ''
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
        phone: window.localStorage.getItem('phone'),
        token: window.localStorage.getItem('token')
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
        $email,
        $password,
        $subscribe_checkbox,
        $signup,
        $new_client,
        $agreement_sentence
      } = this.props.strings;
      const { phone, token, error } = this.state;
      const { t } = this.props;
      return (
        <Form
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
            { setSubmitting }
          ) => {
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
                'https://otoli.net' + '/core/user/info',
                {
                  first_name: firstName,
                  last_name: lastName,
                  national_id: nationalid,
                  birth_date: `${year}/${month}/${day}`
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
                  alert('Your registration has been completed.');
                }
              })
              .catch(error => {
                // tslint:disable-next-line:no-console
                console.error(error);
                this.setState({ error: error });
              })
              .then(() => {
                setSubmitting(false);
              });
            setTimeout(() => {
              console.log(values);
              setSubmitting(false);
            }, 3000);
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required(t('forms.error_filed_required')),
            lastName: Yup.string().required(t('forms.error_filed_required')),
            nationalid: Yup.string()
              .ensure() //convert undefined values to an empety string
              .trim()
              .required(t('forms.error_filed_required'))
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
                    (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11)
                  );
                }
              ),
            email: Yup.string().email(t('forms.error_email_not_valid')),
            day: Yup.number().typeError(t('forms.error_filed_required')),
            month: Yup.number().typeError(t('forms.error_filed_required')),
            year: Yup.number().typeError(t('forms.error_filed_required'))
          })}
        >
          {({
            handleSubmit,
            handleChange,
            isSubmitting,
            values,
            errors,
            touched
          }) => (
            <BoxAccount onSubmit={handleSubmit} className="box_account">
              <h3 className="new_client">{$new_client}</h3>
              <small className="float-right pt-2">* {$required_fields}</small>
              <Segment>
                {error && (
                  <Label attached="top" color="red">
                    {t('forms.error')}
                  </Label>
                )}

                <Form.Group widths="2">
                  <Input label={$firstname} name="firstName" />
                  <Input label={$lastname} name="lastName" />
                </Form.Group>
                <Input label={$national_id} name="nationalid" />
                {/* <Form.Field>
                <label>{$phone_number}</label>
                <input name="phone" value={this.state.phone} disabled />
              </Form.Field> */}

                <Form.Group widths="3">
                  <Input
                    label={$day}
                    name="day"
                    inputProps={{
                      type: 'number',
                      min: '1',
                      max: '31'
                    }}
                  />
                  <Dropdown
                    label={$month}
                    name="month"
                    options={monthsEnglish}
                  />
                  <Input
                    label={$year}
                    name="year"
                    inputProps={{
                      type: 'number',
                      min: '1300',
                      max: '1397'
                    }}
                  />
                </Form.Group>

                <Input label={$email} name="emailAddress" />

                {/* <Input
                label={$password}
                name="password"
                inputProps={{
                  type: 'password'
                }}
              /> */}

                <Checkbox label={$subscribe_checkbox} name="subscribe" />

                <Form.Field style={{ textAlign: 'center', fontSize: '0.8em' }}>
                  <Button.Submit
                    loading={isSubmitting}
                    primary
                    type="submit"
                    className="btn_1 full-width"
                  >
                    {$signup}
                  </Button.Submit>
                  <span>{$agreement_sentence}</span>
                </Form.Field>
              </Segment>
            </BoxAccount>
          )}
        </Form>
      );
    }
  }
);
