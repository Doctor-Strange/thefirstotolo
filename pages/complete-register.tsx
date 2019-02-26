import * as React from 'react';
import styled from 'styled-components';
import { Button, Input, Radio } from 'semantic-ui-react';
import { Section } from '../src/components/row/Sections';
import { BoxedList } from '../src/components/Cards/BoxedList';
import { Layout } from '../src/components/Layout';
import { Margin } from '../src/theme/globalStyle';
import { Box, Flex } from '@rebass/grid';
import * as NewUser from '../static/new_user.svg';
import { Select } from 'semantic-ui-react';
import { countryOptions } from '../src/constants/options';

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

export default props => (
  <Layout haveSubHeader={true} pageTitle={'list Your Car'}>
    <Section justifyCenter={true}>
      <Flex justifyContent="space-around" style={{ width: '450px' }}>
        <Box width={1 / 1} px={2}>
          <BoxAccount className="box_account">
            <h3 className="new_client">New Client</h3>
            <small className="float-right pt-2">* Required Fields</small>
            <div className="form_container">
              <div className="form-group">
                <label className="floatLabel">Name*</label>
                <Input placeholder="You'r Name*" type="text" />
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
        </Box>
      </Flex>
    </Section>
  </Layout>
);
