import * as React from 'react';
import Router from 'next/router';
import { Button, Grid, Select } from 'semantic-ui-react';
import { Formik, FormikActions } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Countdown from 'react-countdown-now';
import { LoginForm, PhoneRow } from './LoginStyle';
import { ModalWrapper } from './ModalWrapper';
import { PanelsWrapper } from '../Carousel/PanelsWrapper';
import { Panel } from '../Carousel/Panel';
import { mobileNumberOptions } from '../../constants/options';

interface LoginModalValues {
  phone: number;
}

interface LoginModalCodeValues {
  code: number;
}

export class LoginModal extends React.Component<
  { onRef: any },
  {
    showIndex: number;
    prevIndex: number;
    phone?: string;
    code?: number;
    timeToSendSMSAgain?: number;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      timeToSendSMSAgain: null,
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
    if (completed) {
      return (
        <span style={{ cursor: 'pointer' }} onClick={() => this.prevPanel()}>
          Send Again!
        </span>
      );
    } else {
      return (
        <span style={{ cursor: 'default' }}>
          You can resend the code in {minutes}:{seconds} minutes.
        </span>
      );
    }
  };

  render() {
    return (
      <ModalWrapper title="Sign In" onRef={ref => (this.modalwrapper = ref)}>
        <PanelsWrapper
          showIndex={this.state.showIndex}
          prevIndex={this.state.prevIndex}
        >
          <Panel>
            <Formik
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
                    'Phone number is not valid'
                  )
                  .required('A phone number is required.')
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
                <LoginForm onSubmit={handleSubmit}>
                  <div className="sign-in-wrapper">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <PhoneRow>
                        <input
                          type="tell"
                          className="form-control input"
                          name="phone"
                          id="phone"
                          onChange={handleChange}
                          value={values.phone}
                          tabIndex={this.state.showIndex === 0 ? 0 : -1}
                        />
                        <Select
                          name="country"
                          id="country"
                          className=" form-control country"
                          placeholder="+98"
                          options={mobileNumberOptions}
                          tabIndex={this.state.showIndex === 0 ? 0 : -1}
                        />
                      </PhoneRow>
                      {errors.phone && touched.phone && errors.phone}
                    </div>
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
                      <Button
                        loading={isSubmitting}
                        primary
                        type="submit"
                        className="btn_1 full-width"
                        tabIndex={this.state.showIndex === 0 ? 0 : -1}
                      >
                        Log In
                      </Button>
                    </div>
                    <div className="divider">
                      <span>Or</span>
                    </div>
                    <Button
                      style={{ width: '100%' }}
                      color="google plus"
                      content="Login via Google"
                      icon="google"
                      labelPosition="left"
                      tabIndex={this.state.showIndex === 0 ? 0 : -1}
                    />
                  </div>
                </LoginForm>
              )}
            </Formik>
          </Panel>
          <Panel>
            <Formik
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
                    if (response.data.token && !response.data.has_name) {
                      // TODO: add token to local storage and redux;
                      this.setState({
                        code: values.code,
                        timeToSendSMSAgain: null
                      });
                      Router.push({
                        pathname: '/complete-register',
                        query: {
                          cell: this.state.phone,
                          token: response.data.token
                        }
                      });
                    } else if (response.data.token && response.data.has_name) {
                      // TODO: add token to local storage and redux;
                    } else {
                      // tslint:disable-next-line:no-console
                      console.error('error');
                      // TODO: handle errors
                    }
                  })
                  .catch(error => {
                    // tslint:disable-next-line:no-console
                    console.error(error.response.data);
                    alert(error.response.data.message);
                    // TODO: handle errors
                  })
                  .then(() => {
                    actions.setSubmitting(false);
                  });
              }}
              validationSchema={Yup.object().shape({
                code: Yup.number().required('Required')
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
                <LoginForm onSubmit={handleSubmit}>
                  <div className="sign-in-wrapper">
                    <div className="form-group">
                      <label>
                        A code has been sent to {this.state.phone}.{' '}
                        <a
                          className="small"
                          onClick={this.prevPanel}
                          style={{ cursor: 'pointer' }}
                          tabIndex={this.state.showIndex === 1 ? 0 : -1}
                        >
                          (not you?)
                        </a>
                        <br />
                        Enter it in this field:
                      </label>
                      <input
                        onChange={handleChange}
                        value={values.code}
                        type="number"
                        className="form-control"
                        name="code"
                        id="code"
                        tabIndex={this.state.showIndex === 1 ? 0 : -1}
                      />
                      {errors.code && touched.code && errors.code}
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
                      <Button
                        loading={isSubmitting}
                        primary
                        type="submit"
                        className="btn_1 full-width"
                        tabIndex={this.state.showIndex === 1 ? 0 : -1}
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>
                </LoginForm>
              )}
            </Formik>
          </Panel>
        </PanelsWrapper>
      </ModalWrapper>
    );
  }
}
