import * as React from 'react';
import Router from 'next/router';
import { ThemeProvider } from 'styled-components';
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
import { ltrTheme, rtlTheme } from '../../theme/directions';

function convertToEnglishNum(s) {
  var a = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  var p = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  for (var i = 0; i < 10; i++) {
    s = s.replace(new RegExp(a[i], 'g'), i).replace(new RegExp(p[i], 'g'), i);
  }
  return s;
}
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
      height: number;
    }
  > {
    constructor(props) {
      super(props);
      this.state = {
        phone: '',
        timeToSendSMSAgain: null,
        codeError: null,
        prevIndex: 0,
        showIndex: 0,
        height: 245
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
        showIndex: this.state.showIndex + 1,
        height: 290,
        codeError: null
      });
    }

    prevPanel() {
      if (this.state.showIndex - 1 < 0) return;
      this.setState({
        prevIndex: this.state.showIndex,
        showIndex: this.state.showIndex - 1,
        height: 280,
        codeError: null
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
          <span style={{ cursor: 'default', paddingTop: '8px' }}>
            {t('you_can_resend_code1')} {seconds} {t('you_can_resend_code2')}
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
      const theme = i18n.language == 'fa' ? rtlTheme : ltrTheme;
      return (
        <ThemeProvider
          theme={{
            lang: i18n.language,
            direction: theme
          }}
        >
          <ModalWrapper
            title={''}
            onRef={ref => (this.modalwrapper = ref)}
            direction={theme.direction}
            height={this.state.height}
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
                    const phone = convertToEnglishNum(values.phone.toString());
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
                        /(^[0][9][1-2][0-9]{8,8}$|^[9][1-2][0-9]{8,8}$|^[\u06F0][\u06F9][\u06F1-\u06F2][\u06F0-\u06F9]{8,8}$|^[\u06F9][\u06F1-\u06F2][\u06F0-\u06F9]{8,8}$)/,
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
                    <LoginForm
                      onSubmit={handleSubmit}
                      className="sign-in-wrapper"
                    >
                      <label>{t('phone_number')}</label>
                      <Input
                        name="phone"
                        inputProps={{
                          type: 'tel',
                          tabIndex: this.state.showIndex === 0 ? 0 : -1,
                          className: 'add_top_8',
                          placeholder: t('please_enter_phone_number'),
                          autofocus: 'enabled'
                        }}
                      />

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
                        {/* <br />
                        <small>ما از شماره‌ی شما سوءاستفاده نمی‌کنیم </small> */}
                      </div>
                      {/* <div className="divider">
                        <span>{t('or')}</span>
                      </div>
                      <Button
                        style={{ width: '100%' }}
                        color="google plus"
                        content={t('login_with_google')}
                        icon="google"
                        labelPosition="left"
                        tabIndex={this.state.showIndex === 0 ? 0 : -1}
                      /> */}
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
                        code: convertToEnglishNum(values.code)
                      })
                      .then(response => {
                        console.error('Sent');
                        if (response.data.token && !response.data.has_name) {
                          // tslint:disable-next-line:no-console
                          console.error(response.data);
                          this.setState({
                            code: convertToEnglishNum(values.code),
                            codeError: null,
                            timeToSendSMSAgain: null
                          });
                          localStorage.setItem('token', response.data.token);
                          localStorage.setItem('phone', this.state.phone);
                          localStorage.setItem('complete_register', 'true');
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
                      .required(t('forms.error_code_filed_required'))
                      .typeError(t('forms.error_code_filed_required'))
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
                          {t('a_code_has_been_sent_to')} {this.state.phone}
                          {t('a_code_has_been_sent_to2')}.{' '}
                          <a
                            className="small"
                            onClick={this.prevPanel}
                            style={{ cursor: 'pointer' }}
                            tabIndex={this.state.showIndex === 1 ? 0 : -1}
                          >
                            {t('not_you')}
                          </a>
                        </label>
                        {/* <div className="notShowErrors"> */}
                        <Input
                          name="code"
                          inputProps={{
                            type: 'number',
                            tabIndex: this.state.showIndex === 1 ? 0 : -1,
                            className: 'add_top_8',
                            placeholder: t('enter_code_in_field')
                          }}
                        />
                      </div>
                      <span className="sui-error-message">
                        {this.state.codeError || null}
                      </span>
                      {/* </div> */}
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
                          {t('enter')}
                        </Button.Submit>
                      </div>
                    </LoginForm>
                  )}
                </Form>
              </Panel>
            </PanelsWrapper>
          </ModalWrapper>
        </ThemeProvider>
      );
    }
  }
);
