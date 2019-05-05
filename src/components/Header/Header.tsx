import * as React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import jsCookie from 'js-cookie';
import { Nav } from '../Nav';
import { Logo } from '../Logo';
import { i18n, withNamespaces } from '../../i18n';
import ReactModal from 'react-modal';
import LoginModal from '../Modals/LoginModal';

const HeaderSticky = styled.div`
  header {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    padding: 20px 30px;
    z-index: 99999999;
    border-bottom: 1px solid rgba(255, 255, 255, 0);
  }
  @media (max-width: 767px) {
    padding: 15px 15px 5px 15px;
    padding: 0px 15px 0px 15px;
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
    ul#top_menu li a {
      .login,
      .wishlist_bt_top {
        :before {
          color: #444;
        }
      }
    }
  }
  .header_in {
    padding: 10px 0;
    background-color: #fff;
    position: relative;
    border-bottom: 1px solid #ededed;

    ul#top_menu li a {
      color: #444;
    }

    @media (max-width: 991px) {
      margin-top: 5px;
      padding: 0;
      border-bottom: none;
      background: none;

      ul#top_menu {
        position: absolute;
        right: 15px;
        float: none;
      }
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
  ul#top_menu {
    float: right;
    margin: 0 0 0 10px;
    padding: 0;
    font-size: 13px;
    font-size: 0.8125rem;

    @media (max-width: 991px) {
      margin: -2px 0 0 10px;
    }

    li {
      list-style: none;
      float: left;
      margin: 0;
      line-height: 1;
      margin-right: 15px;

      :last-child {
        margin-right: 0;
        position: relative;
        top: 0;
      }
      @media (max-width: 991px) {
        margin: 2px 0 0 10px;
      }
      a {
        color: #444;
        :hover {
          color: #444;
          opacity: 0.7;
        }
        .login,
        .wishlist_bt_top {
          display: block;
          width: 22px;
          height: 23px;
          position: relative;
          top: 8px;
          -moz-transition: opacity 0.5s ease;
          -o-transition: opacity 0.5s ease;
          -webkit-transition: opacity 0.5s ease;
          -ms-transition: opacity 0.5s ease;
          transition: opacity 0.5s ease;

          @media (max-width: 991px) {
            top: 2px;
          }
        }
        .wishlist_bt_top {
          text-indent: -9999px;
          overflow: hidden;
          :before {
            content: \\0043;
          }
        }
        .login {
          text-indent: -9999px;
          overflow: hidden;
          :before {
            content: \\0042;
          }
        }
      }
    }
  }

  #logo {
    float: left;
    @media (max-width: 991px) {
      float: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      text-align: center;
      img {
        width: auto;
        height: 28px;
        margin: 12px 0 0 0;
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
`;

class Header extends React.Component<{
  headerBtn: string;
  openMenu: any;
  changeLang: any;
  firstName?: string;
  lastName?: string;
  token?: string;
}> {
  [x: string]: any;
  static async getInitialProps() {
    return {
      namespacesRequired: ['common']
    };
  }

  state = {
    token: '',
    firstName: '',
    lastName: ''
  };

  onClick = () => {
    this.loginmodal.handleOpenModal(); // do stuff
  };

  logout = () => {
    alert('Loging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    this.setState({
      token: '',
      firstName: '',
      lastName: ''
    });
  };

  doRef = ref => {
    this.loginmodal = ref;
  };

  componentDidMount() {
    this.setState({
      firstName: jsCookie.get('first_name'),
      lastName: jsCookie.get('last_name'),
      token: jsCookie.get('token')
    });
  }

  render() {
    const { t } = this.props;
    return (
      <>
        <HeaderSticky>
          <header className="justInDesktop">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-12 hidden_mobile">
                  <Logo />
                </div>
                <div className="col-lg-9 col-12">
                  <ul id="top_menu">
                    <li>
                      <a href="/account" className="btn_add">
                        {this.props.headerBtn}
                      </a>
                    </li>
                    <li>
                      {!this.state.token && (
                        <a
                          href="#"
                          id="sign-in"
                          className="login"
                          title={t('signup')}
                          onClick={this.onClick}
                        >
                          {t('signup')}
                        </a>
                      )}
                      {this.state.token && (
                        <span>
                          {t('hello')} {this.state.firstName}
                          {/* {', '}
                          <a
                            href="#"
                            id="sign-in"
                            className="login"
                            title={t('logout')}
                            onClick={this.logout}
                          >
                            {t('logout')}
                          </a> */}
                        </span>
                      )}
                    </li>
                  </ul>

                  <Nav />
                </div>
              </div>
            </div>
          </header>
          <header className="justInMobile">
            <Icon name="bars" onClick={this.props.openMenu} />
            <ul id="top_menu">
              <li>
                <a href="/account" className="btn_add">
                  {this.props.headerBtn}
                </a>
              </li>
              <li>
                {!this.state.token && (
                  <a
                    href="#"
                    id="sign-in"
                    className="login"
                    title={t('signup')}
                    onClick={this.onClick}
                  >
                    {t('signup')}
                  </a>
                )}
                {this.state.token && (
                  <span>
                    {t('hello')} {this.state.firstName}
                  </span>
                )}
              </li>
            </ul>
          </header>
        </HeaderSticky>

        <LoginModal onRef={this.doRef} />
      </>
    );
  }
}

export default withNamespaces('common')(Header);
