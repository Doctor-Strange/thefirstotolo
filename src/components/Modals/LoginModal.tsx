import * as React from 'react';
import { Select } from 'semantic-ui-react';
import styled from 'styled-components';
import { ModalWrapper } from './ModalWrapper';
import { PanelsWrapper } from '../Carousel/PanelsWrapper';
import { Panel } from '../Carousel/Panel';
import { mobileNumberOptions } from '../../constants/options';

const PhoneRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  .input {
    width: 80%;
    float: right;
  }
  #country {
    width: 20%;
    min-width: 90px;
    float: left;
  }
`;

const LoginForm = styled.form`
  .form-group {
    position: relative;

    input.form-control {
      padding-left: 40px;
    }

    .box {
      font-size: 21px;
      font-size: 1.3125rem;
      position: absolute;
      left: 12px;
      top: 25px;
      color: #ccc;
      width: 25px;
      height: 25px;
      display: block;
      font-weight: 400 !important;
    }

    .my-toggle {
      background: transparent;
      border: 0;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      -ms-border-radius: 3px;
      border-radius: 3px;
      color: #888;
      cursor: pointer;
      font-size: 10px;
      font-size: 10px;
      font-size: 0.625rem;
      font-weight: bold;
      margin-right: 5px;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      text-transform: uppercase;
      -moz-appearance: none;
      -webkit-appearance: none;
      background-color: #fff;
      :hover,
      :focus {
        background-color: #eee;
        color: #555;
        outline: transparent;
      }
    }
  }

  .hideShowPassword-wrapper {
    width: 100% !important;
  }

  .checkboxes label {
    color: #999;
    margin-top: 5px;
  }

  a#forgot {
    color: #999;
    font-weight: 500;
    font-size: 13px;
    font-size: 0.8125rem;
  }

  #forgot_pw {
    background-color: #fff;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 99;
    min-height: 430px;
    display: none;
    padding: 25px;

    @media (max-width: 767px) {
      padding: 0;
    }

    label {
      font-weight: 500;
    }
  }

  .sign-in-wrapper {
    position: relative;
    height: 100%;
  }

  a.social_bt {
    border-radius: 3px;
    text-align: center;
    color: #fff;
    min-width: 200px;
    margin-bottom: 15px;
    display: block;
    padding: 12px;
    line-height: 1;
    position: relative;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    :hover {
      filter: brightness(115%);
    }
  }

  a.social_bt.facebook,
  a.social_bt.google,
  a.social_bt.linkedin {
    :before {
      position: absolute;
      left: 12px;
      top: 10px;
      font-size: 1rem;
      color: #fff;
    }
  }

  a.social_bt.facebook {
    background-color: #3b5998;
    :before {
      content: 'f';
    }
  }

  a.social_bt.google {
    background-color: #dc4e41;
    :before {
      content: 'g';
    }
  }

  .divider {
    text-align: center;
    height: 1px;
    margin: 30px 0 20px 0;
    background-color: #e1e8ed;
    span {
      position: relative;
      top: -20px;
      background-color: #fff;
      display: inline-block;
      padding: 10px;
      font-style: italic;
    }
  }
  .flow-root {
    display: flow-root;
  }
`;

export class LoginModal extends React.Component<{ onRef: any }> {
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

  handleSubmit(e) {
    // tslint:disable-next-line:no-console
    console.log('form handled!');
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
            <LoginForm>
              <div className="sign-in-wrapper">
                <div className="form-group">
                  <label>Phone Number</label>
                  <PhoneRow>
                    <input
                      onChange={this.handleSubmit}
                      type="email"
                      className="form-control input"
                      name="email"
                      id="email"
                    />
                    <Select
                      name="country"
                      id="country"
                      className=" form-control country"
                      placeholder="+98"
                      options={mobileNumberOptions}
                    />
                  </PhoneRow>
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
                    onClick={this.nextPanel}
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
                    You will receive an email containing a link allowing you to
                    reset your password to a new preferred one.
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
