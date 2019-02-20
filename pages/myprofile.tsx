import * as React from 'react';
import styled from 'styled-components';
import { Section } from '../src/components/row/Sections';
import { BoxedList } from '../src/components/Cards/BoxedList';
import { Layout } from '../src/components/Layout';
import { Margin } from '../src/theme/globalStyle';
import { Box, Flex } from '@rebass/grid';
import * as NewUser from '../static/new_user.svg';

const BoxAccount = styled.div`
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
    hr {
      margin: 0 0 10px 0;
    }
  }
`;

export default props => (
  <Layout haveSubHeader={true} pageTitle={'Hello World'}>
    <Section justifyCenter={true}>
      <Flex justifyContent="space-around">
        <Box width={1 / 1} px={2}>
          <BoxAccount className="box_account">
            <h3 className="new_client">New Client</h3>
            <small className="float-right pt-2">* Required Fields</small>
            <div className="form_container">
              <div className="form-group">
                <label className="floatLabel">Email Address</label>
                <input
                  type="email"
                  className="form-control question"
                  name="email"
                  id="email"
                  placeholder="Email*"
                />
              </div>
              <div className="form-group">
                <label className="floatLabel">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password_in_2"
                  id="password_in_2"
                  value=""
                  placeholder="Password*"
                />
              </div>
              <hr />
              <div className="form-group">
                <label
                  className="container_radio"
                  style={{ display: 'inline-block', marginRight: '15px' }}
                >
                  Private
                  <input
                    type="radio"
                    name="client_type"
                    checked
                    value="private"
                  />
                  <span className="checkmark" />
                </label>
                <label
                  className="container_radio"
                  style={{ display: 'inline-block' }}
                >
                  Company
                  <input type="radio" name="client_type" value="company" />
                  <span className="checkmark" />
                </label>
              </div>
              <div className="private box">
                <div className="row no-gutters">
                  <div className="col-6 pr-1">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name*"
                      />
                    </div>
                  </div>
                  <div className="col-6 pl-1">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name*"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Full Address*"
                      />
                    </div>
                  </div>
                </div>

                <div className="row no-gutters">
                  <div className="col-6 pr-1">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="City*"
                      />
                    </div>
                  </div>
                  <div className="col-6 pl-1">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Postal Code*"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <div className="custom-select-form">
                        <select
                          className="wide add_bottom_10"
                          name="country"
                          id="country"
                        >
                          <option value="" selected>
                            Country*
                          </option>
                          <option value="Europe">Europe</option>
                          <option value="United states">United states</option>
                          <option value="Asia">Asia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Telephone *"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="company box" style={{ display: 'none' }}>
                <div className="row no-gutters">
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Company Name*"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Full Address"
                      />
                    </div>
                  </div>
                </div>

                <div className="row no-gutters">
                  <div className="col-6 pr-1">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="City*"
                      />
                    </div>
                  </div>
                  <div className="col-6 pl-1">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Postal Code*"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <div className="custom-select-form">
                        <select
                          className="wide add_bottom_10"
                          name="country"
                          id="country"
                        >
                          <option value="" selected>
                            Country*
                          </option>
                          <option value="Europe">Europe</option>
                          <option value="United states">United states</option>
                          <option value="Asia">Asia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Telephone *"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr />
              <div className="form-group">
                <label className="container_check">
                  Accept <a href="#0">Terms and conditions</a>
                  <input type="checkbox" />
                  <span className="checkmark" />
                </label>
              </div>
              <div className="text-center">
                <input
                  type="submit"
                  value="Register"
                  className="btn_1 full-width"
                />
              </div>
            </div>
          </BoxAccount>
        </Box>
      </Flex>
    </Section>
  </Layout>
);
