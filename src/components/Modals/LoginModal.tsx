import * as React from 'react';
import styled from 'styled-components';
import { ModalWrapper } from './ModalWrapper';

const LoginForm = styled.form`
  .form-group {
    position: relative;

    input.form-control {
      padding-left: 40px;
    }

    i {
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

  render() {
    return (
      // tslint:disable-next-line:jsx-no-lambda
      <ModalWrapper title="Sign In" onRef={ref => (this.modalwrapper = ref)}>
        <LoginForm>
          <div className="sign-in-wrapper">
            <a href="#0" className="social_bt facebook">
              Login with Facebook
            </a>
            <a href="#0" className="social_bt google">
              Login with Google
            </a>
            <div className="divider">
              <span>Or</span>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                onChange={this.handleSubmit}
                type="email"
                className="form-control"
                name="email"
                id="email"
              />
              <i className="icon_mail_alt"> X </i>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                onChange={this.handleSubmit}
                type="password"
                className="form-control"
                name="password"
                id="password"
                value=""
              />
              <i className="icon_lock_alt"> X </i>
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
                <input type="submit" value="Reset Password" className="btn_1" />
              </div>
            </div>
          </div>
        </LoginForm>
      </ModalWrapper>
    );
  }
}
