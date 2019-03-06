import * as React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Button, Dropdown, Input, Radio } from 'semantic-ui-react';
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

interface ICompleteRegisterFormValues {
  name: string;
  nationalid: string;
  email: string;
  password: string;
  birthdayday: number;
  birthdaymonth: number;
  birthdayyear: number;
  subscribe: string;
}

export class CompleteRegisterForm extends React.Component<{
  phone?: string;
}> {
  state = {
    phone: ''
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      phone: window.localStorage.getItem('phone')
    });
  }

  render() {
    const { phone } = this.state;
    return (
      <Formik
        initialValues={{
          name: '',
          nationalid: '',
          email: '',
          password: '',
          birthdayday: 1,
          birthdaymonth: 1,
          birthdayyear: 1300,
          subscribe: ''
        }}
        onSubmit={(values: ICompleteRegisterFormValues, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Please fill out this field'),
          nationalid: Yup.string()
            .required('Please fill out this field')
            .test(
              'length',
              'National IDs are 10 charechters long.',
              value => (value || '').length === 10
            )
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
          birthday: Yup.string().required('Please fill out this field')
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
            <div className="form_container">
              <div className="form-group">
                <label className="floatLabel">Name*</label>
                <Input
                  placeholder="You'r Name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  name="name"
                  id="name"
                />
                {errors.name && touched.name && errors.name}
              </div>
              <div className="form-group">
                <label className="floatLabel">Phone Number*</label>
                <Input
                  placeholder="Phone Number*"
                  type="number"
                  disabled
                  value={phone}
                  name="phone"
                  id="phone"
                />
              </div>
              <div className="form-group">
                <label className="floatLabel">National ID*</label>
                <Input
                  placeholder="National ID"
                  type="text"
                  value={values.nationalid}
                  onChange={handleChange}
                  name="nationalid"
                  id="nationalid"
                />
                {errors.nationalid && touched.nationalid && errors.nationalid}
              </div>
              <div className="form-group">
                <label className="floatLabel">Email Address</label>
                <Input
                  placeholder="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  name="email"
                  id="email"
                />
                {errors.email && touched.email && errors.email}
              </div>

              <div className="form-group">
                <label className="floatLabel">Password</label>
                <Input
                  placeholder="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  id="password"
                />
              </div>
              <hr />

              <div className="form-group">
                <label className="floatLabel">Birthday</label>
                <Flex>
                  <Box width={2 / 3} px={2}>
                    <Input
                      placeholder="Day"
                      type="number"
                      value={values.birthdayday}
                      onChange={handleChange}
                      name="birthdayday"
                      id="birthdayday"
                      min={1}
                      max={31}
                    />
                  </Box>
                  <Box width={1 / 3} px={2}>
                    <Dropdown
                      placeholder="Select Month"
                      name="birthdaymonth"
                      id="birthdaymonth"
                      fluid
                      search
                      selection
                      options={monthsEnglish}
                      value={values.birthdaymonth}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box width={1 / 3} px={2}>
                    <Input
                      placeholder="Year"
                      type="number"
                      value={values.birthdayyear}
                      onChange={handleChange}
                      name="birthdayyear"
                      id="birthdayyear"
                      min={1300}
                      max={1380}
                    />
                  </Box>
                </Flex>
                {errors.birthdayyear &&
                  touched.birthdayyear &&
                  errors.birthdayyear}
              </div>

              <hr />
              {/* <Flex className="form-group">
                <Box width={1 / 6} px={2} style={{ minWidth: '60px' }}>
                  <Radio
                    toggle
                    checked={values.subscribe}
                    onChange={handleChange}
                    name="subscribe"
                    id="subscribe"
                  />
                </Box>
                <Box width={5 / 6} px={2} className="container_check">
                  Do you want to subscribe to our newsletter?
                </Box>
              </Flex> */}
              <div className="text-center">
                <Button
                  loading={isSubmitting}
                  primary
                  type="submit"
                  className="btn_1 full-width"
                >
                  Send Information
                </Button>
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
