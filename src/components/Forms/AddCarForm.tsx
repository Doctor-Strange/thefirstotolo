import * as React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Label, Segment } from 'semantic-ui-react';
import { i18n, withNamespaces } from '../../i18n';
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
import * as NewUser from '../../../static/new_user.svg';
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

interface IAddCarFormValues {
  city: string;
  district: string;
  brand: string;
  model: string;
  year: number;
  autogearbox: boolean;
  shasi: string;
  capaicty: number;
  color: string;
  karkard: string;
  NIN: string;
  pelak: string;
  picture: string;
  options: [string];
  descrition: string;
}

export default withNamespaces('common')(
  class AddCarForm extends React.Component<{
    token?: string;
  }> {
    state = {
      token: ''
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
    }

    render() {
      const { token, error } = this.state;
      const { t } = this.props;
      return (
        <Form
          initialValues={{}}
          onSubmit={(values: IAddCarFormValues, { setSubmitting }) => {}}
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
            <BoxAccount onSubmit={handleSubmit} className="box_account">
              <Segment>
                {error && (
                  <Label attached="top" color="red">
                    {t('forms.error')}
                  </Label>
                )}

                <Form.Field style={{ textAlign: 'center', fontSize: '0.8em' }}>
                  <Button.Submit
                    loading={isSubmitting}
                    primary
                    type="submit"
                    className="btn_1 full-width"
                  >
                    Add car
                  </Button.Submit>
                  <span>n</span>
                </Form.Field>
              </Segment>
            </BoxAccount>
          )}
        </Form>
      );
    }
  }
);
