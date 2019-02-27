import * as React from 'react';
import { Select } from 'semantic-ui-react';
import { Formik, FormikActions } from 'formik';
import * as Yup from 'yup';
import { LoginForm, PhoneRow } from './LoginStyle';
import { ModalWrapper } from './ModalWrapper';
import { PanelsWrapper } from '../Carousel/PanelsWrapper';
import { Panel } from '../Carousel/Panel';
import { mobileNumberOptions } from '../../constants/options';

interface LoginModalValues {
  phone: number;
}

export class LoginModal extends React.Component<
  { onRef: any },
  { showIndex: number; phone: number; prevIndex: number }
> {
  constructor(props) {
    super(props);
    this.state = {
      phone: 0,
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
    if (this.state.showIndex + 1 > 3) return;
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

  render() {
    return (
      // tslint:disable-next-line:jsx-no-lambda
      <ModalWrapper title="Sign In" onRef={ref => (this.modalwrapper = ref)}>
        <PanelsWrapper
          showIndex={this.state.showIndex}
          prevIndex={this.state.prevIndex}
        >
          <Panel>
            <Formik
              initialValues={{ phone: null }}
              onSubmit={(
                values: LoginModalValues,
                actions: FormikActions<LoginModalValues>
              ) => {
                // tslint:disable-next-line: jsx-no-lambda
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  actions.setSubmitting(false);
                }, 400);
              }}
              validationSchema={Yup.object().shape({
                phone: Yup.number().required('Required')
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
                          type="number"
                          className="form-control input"
                          name="phone"
                          id="phone"
                          onChange={handleChange}
                          value={values.phone}
                        />
                        <Select
                          name="country"
                          id="country"
                          className=" form-control country"
                          placeholder="+98"
                          options={mobileNumberOptions}
                        />
                      </PhoneRow>
                      {errors.phone && touched.phone && errors.phone}
                    </div>
                    <div className="clearfix add_bottom_15 flow-root">
                      <div className="checkboxes float-left">
                        <label className="container_check">
                          Remember me
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="float-right mt-1">
                        <a id="forgot" href="javascript:void(0);">
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                    <div className="text-center">
                      <input
                        type="submit"
                        value="Log In"
                        className="btn_1 full-width"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="text-center">
                      Don’t have an account? <a href="/register">Sign up</a>
                    </div>
                    <div id="forgot_pw">
                      <div className="form-group">
                        <label>Please confirm login email below</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email_forgot"
                          id="email_forgot"
                        />
                        <i className="icon_mail_alt" />
                      </div>
                      <p>
                        You will receive an email containing a link allowing you
                        to reset your password to a new preferred one.
                      </p>
                      <div className="text-center">
                        <input
                          type="submit"
                          value="Reset Password"
                          className="btn_1"
                        />
                      </div>
                    </div>
                    <div className="divider">
                      <span>Or</span>
                    </div>
                    <a href="#0" className="social_bt google">
                      Login with Google
                    </a>
                  </div>
                </LoginForm>
              )}
            </Formik>
          </Panel>
          <Panel>
            <LoginForm>
              <div className="sign-in-wrapper">
                <div className="form-group">
                  <label>Enter The Code</label>
                  <input
                    onChange={this.handleSubmit}
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="clearfix add_bottom_15 flow-root">
                  <a id="forgot" href="javascript:void(0);">
                    We will resend the code in 3 minutes.
                  </a>
                </div>
                <div className="text-center">
                  <input
                    type="submit"
                    value="Confirm"
                    className="btn_1 full-width"
                    onClick={this.nextPanel}
                  />
                </div>
                <div className="divider">
                  <span>Or</span>
                </div>
                <br />
                <input
                  type="submit"
                  value="Wrong Number"
                  className="btn_1 full-width"
                  onClick={this.prevPanel}
                />
              </div>
            </LoginForm>
          </Panel>
          <Panel>
            <div>
              <input
                type="submit"
                value="Back"
                className="btn_1 full-width"
                onClick={this.prevPanel}
              />
              panel 3
            </div>
          </Panel>
        </PanelsWrapper>
      </ModalWrapper>
    );
  }
}
