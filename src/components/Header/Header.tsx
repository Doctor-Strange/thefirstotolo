import * as React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { Nav } from '../Nav';
import { Logo } from '../Logo';
import Router from 'next/router';
import Link from 'next/link';
import { i18n, withTranslation } from '../../i18n';
import ReactModal from 'react-modal';
import LoginModal from '../Modals/LoginModal';
import { connect } from '../../store';

const HeaderSticky = styled.div`
  height: 64px;
  padding-top: 12px;
  background-color:#1B1B1B;
  p, span, a {
    color: #f9f9f9 !important;
  }
  header {
    
  }
  @media (max-width: 767px) {
    padding:0;
    height: 56px;
    .main-menu {
      top: 16px;
    }
  }
  /* .logo_sticky {
    display: none;
  } */
  .sticky {
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    border-bottom: 1px solid #ededed;
    background-color: #fff;
    padding: 15px 20px;
    @media (max-width: 991px) {
      padding: 15px 15px 5px 15px;
    }
    .logo_normal {
      display: none;
    }
    .logo_sticky {
      display: inline-block;
    }
  }
  .header_in {
    padding: 10px 0;
    background-color: #fff;
    position: relative;
    border-bottom: 1px solid #ededed;
    @media (max-width: 991px) {
      margin-top: 5px;
      padding: 0;
      border-bottom: none;
      background: none;
      #logo a {
        z-index: 9;
        position: relative;
      }
    }
  }

  .map_view {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
  }

  .sub_header_in {
    background-color: #004dda;
    padding: 20px 0;
    h1 {
      color: #fff;
      margin: 0;
      font-size: 26px;
      font-size: 1.625rem;
      @media (max-width: 575px) {
        font-size: 18px;
        font-size: 1.125rem;
      }
    }
  }
  .sub_header_in.sticky_header {
    margin-top: 58px;
    @media (max-width: 991px) {
      margin-top: 48px;
    }
  }

  #logo {
    float: left;
    @media (max-width: 991px) {
      position: absolute;
      top: 12px;
      left: 12px;
      img {
        float: left;
        width: auto;
        height: 28px;
      }
    }
  }

  .sticky .hamburger-inner,
  .sticky .hamburger-inner::before,
  .sticky .hamburger-inner::after,
  .header_in .hamburger-inner,
  .header_in .hamburger-inner::before,
  .header_in .hamburger-inner::after {
    background-color: #444;
  }

  @media (max-width: 991px) {
    .header_in #logo img {
      margin: 0;
    }
  }

  a.btn_add,
  .btn_add {
    border: none;
    color: #fff;
    background: #004dda;
    outline: none;
    cursor: pointer;
    display: inline-block;
    text-decoration: none;
    color: #fff !important;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
    border-radius: 3px;
    line-height: 1 !important;
    padding: 10px 15px !important;
    position: relative;
    top: 2px;

    @media (max-width: 991px) {
      display: none;
    }

    :hover {
      background-color: #ffc107;
      color: #222 !important;
      opacity: 1 !important;
    }
  }
  .img-header {
    height: 24px;
    width: 24px;
    border-radius: 999em;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.13)
  }
`;

class Header extends React.Component<{
  headerBtn: string;
  openMenu: any;
  changeLang: any;
  user: any;
  onRef?: any;
}> {
  [x: string]: any;
  static async getInitialProps() {
    return {
      namespacesRequired: ['common']
    };
  }

  constructor(props) {
    super(props);
  }

  onClick = () => {
    this.loginmodal.handleOpenModal(); // do stuff
  };

  logout = () => {
    // alert('Loging out...');
    // localStorage.removeItem('token');
    // localStorage.removeItem('first_name');
    // localStorage.removeItem('last_name');
    // this.setState({
    //   token: '',
    //   firstName: '',
    //   lastName: ''
    // });
  };

  doRef = ref => {
    this.loginmodal = ref;
  };

  updateInfo = () => { }

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  render() {
    let { t, user } = this.props;
    console.log(user);
    if (!user) {
      user = { token: "", user_id: "", phone: "", first_name: "", last_name: "" };
    }
    const { token, user_id, phone, first_name, last_name } = user;
    return (
      <>
        <HeaderSticky>
          <header>
            <div className="container">
              <div className="row">
                <div className="col-lg-3">
                  <Logo />
                </div>
                <div className="col-lg-9 hidden_mobile">
                  <Nav>
                    <>
                      <li>
                        {!token && (
                          <a
                            href="#"
                            id="sign-in"
                            className="login"
                            title={t('signin')}
                            onClick={this.onClick}
                          >
                            {t('signin')}
                          </a>
                        )}
                        {token && (
                          <span>
                            <a href={`/profile?id=${user_id}`}>
                              {first_name} {last_name}
                              {' '}
                              <Icon name="user circle" size='big' className="img-header" />
                              {/* <img
                                src={"https://core.otoli.net/static/core/default_profile_pic.png"}
                                className="img-header"
                                alt=""
                              /> */}
                            </a>
                          </span>
                        )}
                      </li>
                    </>
                  </Nav>
                </div>
                <div className="col-lg-9 justInMobile">
                  <Nav isMobile={true}>
                    <>
                      <li>
                        {!token && (
                          <a
                            href="#"
                            id="sign-in"
                            className="login"
                            title={t('signin')}
                            onClick={this.onClick}
                          >
                            {t('signin')}
                          </a>
                        )}
                        {token && (
                          <span>
                            <a href={`/profile?id=${user_id}`}>
                              {first_name} {last_name}
                              {' '}
                              <Icon name="user circle" size='big' className="img-header" />
                              {/* <img
                                src={"https://core.otoli.net/static/core/default_profile_pic.png"}
                                className="img-header"
                                alt=""
                              /> */}
                            </a>
                          </span>
                        )}
                      </li>
                    </>
                  </Nav>
                </div>
              </div>
            </div>
          </header>
        </HeaderSticky>

        <LoginModal onRef={this.doRef} updateInfo={this.updateInfo} />
      </>
    );
  }
}

export default withTranslation('common')(connect(state => state)(Header));