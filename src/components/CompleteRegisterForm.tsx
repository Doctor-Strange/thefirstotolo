import * as React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Label, Segment } from 'semantic-ui-react';
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

export class CompleteRegisterForm extends React.Component<{
  phone?: string;
  token?: string;
}> {
  state = {
    phone: '',
    token: '',
    error: ''
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      phone: window.localStorage.getItem('phone'),
      toekn: window.localStorage.getItem('token')
    });
  }

  render() {
    const { phone, token, error } = this.state;
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
        onSubmit={(values: ICompleteRegisterFormValues, { setSubmitting }) => {
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
          firstName: Yup.string().required('Please fill out this field'),
          lastName: Yup.string().required('Please fill out this field'),
          nationalid: Yup.string()
            .ensure() //convert undefined values to an empety string
            .trim()
            .required('Please fill out this field')
            .length(10, 'National IDs are 10 charechters long.')
            .test(
              'Validate National ID',
              "Your ID doesn't seems right",
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
          email: Yup.string().email('Please enter valid email adress'),
          day: Yup.number().typeError('Please fill out birth day'),
          month: Yup.number().typeError('Please fill out the month'),
          year: Yup.number().typeError('Please fill out your birth year')
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
            <h3 className="new_client">New Client</h3>
            <small className="float-right pt-2">* Required Fields</small>
            <Segment>
              {error && (
                <Label attached="top" color="red">
                  Ops! An error happend. It's all our fault. try again in a
                  minute.
                </Label>
              )}

              <Form.Group widths="2">
                <Input label="First Name" name="firstName" />
                <Input label="Last Name" name="lastName" />
              </Form.Group>
              <Input label="National ID" name="nationalid" />
              <Form.Field>
                <label>Phone Number</label>
                <input name="phone" value={this.state.phone} disabled />
              </Form.Field>

              <Form.Group widths="3">
                <Input
                  label="Day"
                  name="day"
                  inputProps={{
                    type: 'number',
                    min: '1',
                    max: '31'
                  }}
                />
                <Dropdown label="Month" name="month" options={monthsEnglish} />
                <Input
                  label="Year"
                  name="year"
                  inputProps={{
                    type: 'number',
                    min: '1300',
                    max: '1397'
                  }}
                />
              </Form.Group>
              <Input label="Email" name="emailAddress" />
              <Input
                label="Password"
                name="password"
                inputProps={{
                  type: 'password'
                }}
              />

              {/* <TextArea label="Notes" name="notes" /> */}
              <Checkbox label="I like subscribing" name="subscribe" />
              <Form.Field>
                <Button.Submit
                  loading={isSubmitting}
                  primary
                  type="submit"
                  className="btn_1 full-width"
                >
                  Sign Up
                </Button.Submit>
              </Form.Field>
            </Segment>
          </BoxAccount>
        )}
      </Form>
    );
  }
}
