import * as React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Button, Grid, Input, Radio, Select } from 'semantic-ui-react';
import { Formik, FormikActions } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { BoxedList } from './Cards/BoxedList';
import { Margin } from '../theme/globalStyle';
import * as NewUser from '../../static/new_user.svg';
import { Box, Flex } from '@rebass/grid';

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

  .form_container {
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    padding: 25px;
    position: relative;
    .form-group {
      margin-bottom: 10px;
    }
    hr {
      margin: 0 0 10px 0;
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

interface CompleteRegisterFormValues {
  phone: string;
}

export class CompleteRegisterForm extends React.Component<{
  phone?: string;
}> {
  constructor(props) {
    super(props);
    this.state = {
      phone: ''
    };
  }

  componentDidMount() {
    this.setState({
      phone: window.localStorage.getItem('phone')
    });
  }

  render() {
    return (
      <Formik
        initialValues={{ phone: this.state.phone || null }}
        onSubmit={(values: CompleteRegisterFormValues, { setSubmitting }) => {
          let validPhoneFormated;
          const phone = values.phone.toString();
          if (/^[0][9][1-2][0-9]{8,8}$/.test(phone)) {
            validPhoneFormated = phone;
          } else if (/^[9][1-2][0-9]{8,8}$/.test(phone)) {
            validPhoneFormated = '0' + phone;
          } else {
            validPhoneFormated = phone;
          }
          axios
            .post('https://otoli.net' + '/core/device/send-code', {
              cell: validPhoneFormated
            })
            .then(response => {
              if (response.data.success) {
                // do something
              }
            })
            .catch(error => {
              // tslint:disable-next-line:no-console
              console.error(error.response.data);
            })
            .then(() => {
              setSubmitting(false);
            });
        }}
        validationSchema={Yup.object().shape({})}
      >
        {({
          handleSubmit,
          handleChange,
          isSubmitting,
          values,
          errors,
          touched
        }) => (
          <BoxAccount className="box_account">
            <h3 className="new_client">New Client</h3>
            <small className="float-right pt-2">* Required Fields</small>
            <div className="form_container">
              <div className="form-group">
                <label className="floatLabel">Name*</label>
                <Input placeholder="You'r Name*" type="text" />
              </div>
              <div className="form-group">
                <label className="floatLabel">Phone Number*</label>
                <Input
                  placeholder="Phone Number*"
                  type="number"
                  disabled
                  value={this.state.phone}
                />
              </div>
              <div className="form-group">
                <label className="floatLabel">National ID*</label>
                <Input placeholder="National ID" type="number" />
              </div>
              <div className="form-group">
                <label className="floatLabel">Email Address</label>
                <Input placeholder="Email" type="email" />
              </div>

              <div className="form-group">
                <label className="floatLabel">Password</label>
                <Input placeholder="Password" type="password" />
              </div>
              <hr />

              <div className="form-group">
                <label className="floatLabel">Birthday</label>
                <Input type="date" />
              </div>

              <hr />
              <Flex className="form-group">
                <Box width={1 / 6} px={2} style={{ minWidth: '60px' }}>
                  <Radio toggle />
                </Box>
                <Box width={5 / 6} px={2} className="container_check">
                  Do you want to subscribe to our newsletter?
                </Box>
              </Flex>
              <div className="text-center">
                <input
                  type="submit"
                  value="Register"
                  className="btn_1 full-width"
                />
                <label>
                  By Clicking Register, You Accept
                  <a href="#0"> Terms and conditions</a>
                </label>
              </div>
            </div>
          </BoxAccount>
        )}
      </Formik>
    );
  }
}
