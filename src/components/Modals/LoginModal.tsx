import * as React from 'react';
import Router from 'next/router';
import { Button, Form, Input } from 'formik-semantic-ui';
import { Formik, FormikActions } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Countdown from 'react-countdown-now';
import { LoginForm, PhoneRow } from './LoginStyle';
import { ModalWrapper } from './ModalWrapper';
import { PanelsWrapper } from '../Carousel/PanelsWrapper';
import { Panel } from '../Carousel/Panel';
// import { mobileNumberOptions } from '../../constants/options';
import { i18n, withNamespaces } from '../../i18n';

interface LoginModalValues {
  phone: number;
}

interface LoginModalCodeValues {
  code: number;
}

export default withNamespaces('common')(
  class extends React.Component<
    { onRef: any; t: any },
    {
      showIndex: number;
      prevIndex: number;
      phone?: string;
      code?: number;
      timeToSendSMSAgain?: number;
      codeError?: string;
    }
  > {
    constructor(props) {
      super(props);
      this.state = {
        phone: '',
        timeToSendSMSAgain: null,
        codeError: null,
        prevIndex: 0,
        showIndex: 0
      };
      this.nextPanel = this.nextPanel.bind(this);
      this.prevPanel = this.prevPanel.bind(this);
    }
    [x: string]: any;
    handleOpenModal = () => {
      this.modalwrapper.handleOpenModal(); // do stuff
    };

    componentDidMount() {
      this.props.onRef(this);
    }
    componentWillUnmount() {
      this.props.onRef(undefined);
    }

    nextPanel() {
      if (this.state.showIndex + 1 > 2) return;
      this.setState({
        prevIndex: this.state.showIndex,
        showIndex: this.state.showIndex + 1
      });
    }

    prevPanel() {
      if (this.state.showIndex - 1 < 0) return;
      this.setState({
        prevIndex: this.state.showIndex,
        showIndex: this.state.showIndex - 1
      });
    }

    renderTimeTOSend = ({ hours, minutes, seconds, completed }) => {
      const { t } = this.props;
      if (completed) {
        return (
          <span style={{ cursor: 'pointer' }} onClick={() => this.prevPanel()}>
            {t('send_again')}
          </span>
        );
      } else {
        return (
          <span style={{ cursor: 'default' }}>
            {t('you_can_resend_code1')}
            {minutes}:{seconds}
            {t('you_can_resend_code2')}
          </span>
        );
      }
    };

    static async getInitialProps() {
      return {
        namespacesRequired: ['common']
      };
    }

    render() {
      const { t } = this.props;
      return (
        <ModalWrapper
          title={t('signup')}
          onRef={ref => (this.modalwrapper = ref)}
        >
          <PanelsWrapper
            showIndex={this.state.showIndex}
            prevIndex={this.state.prevIndex}
          >
            <Panel>
              <Form
                initialValues={{ phone: Number(this.state.phone) || null }}
                onSubmit={(
                  values: LoginModalValues,
                  actions: FormikActions<LoginModalValues>
                ) => {
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
                        this.setState({
                          phone: validPhoneFormated,
                          timeToSendSMSAgain: Date.now() + 30000
                        });
                        this.nextPanel();
                      }
                    })
                    .catch(error => {
                      // tslint:disable-next-line:no-console
                      console.error(error.response.data);
                      alert(error.response.data.message);
                    })
                    .then(() => {
                      actions.setSubmitting(false);
                    });
                }}
                validationSchema={Yup.object().shape({
                  phone: Yup.string()
                    .matches(
                      /(^[0][9][1-2][0-9]{8,8}$|^[9][1-2][0-9]{8,8}$)/,
                      t('forms.error_phone_not_valid')
                    )
                    .required(t('forms.error_phone_required'))
                    .typeError(t('forms.error_phone_required'))
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
                  <LoginForm className="sign-in-wrapper">
                    <label>{t('phone_number')}</label>
                    <Input
                      className="form-control input"
                      name="phone"
                      inputProps={{
                        type: 'tell',
                        tabIndex: this.state.showIndex === 0 ? 0 : -1
                      }}
                    />
                    {/* <Select
                          name="country"
                          id="country"
                          className=" form-control country"
                          placeholder="+98"
                          options={mobileNumberOptions}
                          tabIndex={this.state.showIndex === 0 ? 0 : -1}
                        /> */}

                    <div className="clearfix add_bottom_15 flow-root">
                      {/* <div className="checkboxes float-left">
                        <label className="container_check">
                          Remember me
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                      </div> */}
                      {/* <div className="float-right mt-1">
                        <a id="forgot" href="javascript:void(0);">
                          Forgot Password?
                        </a>
                      </div> */}
                    </div>
                    <div className="text-center">
                      <Button.Submit
                        loading={isSubmitting}
                        primary
                        type="submit"
                        className="btn_1 full-width"
                        tabIndex={this.state.showIndex === 0 ? 0 : -1}
                      >
                        {t('login')}
                      </Button.Submit>
                    </div>
                    <div className="divider">
                      <span>{t('or')}</span>
                    </div>
                    <Button
                      style={{ width: '100%' }}
                      color="google plus"
                      content={t('login_with_google')}
                      icon="google"
                      labelPosition="left"
                      tabIndex={this.state.showIndex === 0 ? 0 : -1}
                    />
                  </LoginForm>
                )}
              </Form>
            </Panel>
            <Panel>
              <Form
                initialValues={{ code: null }}
                onSubmit={(
                  values: LoginModalCodeValues,
                  actions: FormikActions<LoginModalCodeValues>
                ) => {
                  axios
                    .post('https://otoli.net' + '/core/device/login', {
                      cell: this.state.phone,
                      code: values.code
                    })
                    .then(response => {
                      console.error('Sent');
                      if (response.data.token && !response.data.has_name) {
                        // tslint:disable-next-line:no-console
                        console.error(response.data);
                        this.setState({
                          code: values.code,
                          codeError: null,
                          timeToSendSMSAgain: null
                        });
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('phone', this.state.phone);
                        // TODO: add token to redux;
                        Router.push({
                          pathname: '/complete-register',
                          query: {
                            cell: this.state.phone,
                            token: response.data.token
                          }
                        });
                      } else if (
                        response.data.token &&
                        response.data.has_name
                      ) {
                        // TODO: add token to redux;
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('phone', this.state.phone);
                      } else {
                        // tslint:disable-next-line:no-console
                        console.error('error');
                        // TODO: handle errors
                      }
                    })
                    .catch(error => {
                      // tslint:disable-next-line:no-console
                      console.error(error.response.data);
                      this.setState({
                        codeError: error.response.data.message
                      });
                    })
                    .then(() => {
                      actions.setSubmitting(false);
                    });
                }}
                validationSchema={Yup.object().shape({
                  code: Yup.number()
                    .required(t('forms.error_filed_required'))
                    .typeError(t('forms.error_filed_required'))
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
                  <LoginForm className="sign-in-wrapper">
                    <div className="form-group">
                      <label>
                        {t('a_code_has_been_sent_to')} {this.state.phone}.{' '}
                        <a
                          className="small"
                          onClick={this.prevPanel}
                          style={{ cursor: 'pointer' }}
                          tabIndex={this.state.showIndex === 1 ? 0 : -1}
                        >
                          {t('not_you')}
                        </a>
                        <br />
                        {t('enter_code_in_field')}
                      </label>
                      <Input
                        className="form-control input"
                        name="code"
                        inputProps={{
                          type: 'number',
                          tabIndex: this.state.showIndex === 1 ? 0 : -1
                        }}
                      />
                      {this.state.codeError || null}
                    </div>
                    <div className="clearfix add_bottom_15 flow-root">
                      <a
                        tabIndex={this.state.showIndex === 1 ? 0 : -1}
                        className="small"
                        href="javascript:void(0);"
                      >
                        <Countdown
                          date={this.state.timeToSendSMSAgain}
                          renderer={this.renderTimeTOSend}
                        />
                      </a>
                    </div>
                    <div className="text-center">
                      <Button.Submit
                        loading={isSubmitting}
                        primary
                        type="submit"
                        className="btn_1 full-width"
                        tabIndex={this.state.showIndex === 0 ? 0 : -1}
                      >
                        {t('confirm')}
                      </Button.Submit>
                    </div>
                  </LoginForm>
                )}
              </Form>
            </Panel>
          </PanelsWrapper>
        </ModalWrapper>
      );
    }
  }
);
