import * as React from 'react';
import styled from 'styled-components';
import { Nav } from './Nav';
import { Logo } from './Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/fontawesome-free-regular';
import ReactModal from 'react-modal';
import LoginModal from './Modals/LoginModal';

const HeaderSticky = styled.div`
  header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    padding: 20px 30px;
    z-index: 99999999;
    border-bottom: 1px solid rgba(255, 255, 255, 0);
  }
  @media (max-width: 767px) {
    padding: 15px 15px 5px 15px;
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
      padding: 10px 0 5px 0;

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
  .is_sticky {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
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
  changeLang: any;
}> {
  [x: string]: any;

  onClick = () => {
    this.loginmodal.handleOpenModal(); // do stuff
  };

  doRef = ref => {
    this.loginmodal = ref;
  };

  render() {
    return (
      <>
        <HeaderSticky>
          <header className="header_in is_sticky menu_fixed">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-12">
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
                      <a
                        href="#sign-in-dialog"
                        id="sign-in"
                        className="login"
                        title="Sign In"
                        onClick={this.onClick}
                      >
                        <FontAwesomeIcon size="2x" icon={faSignInAlt} />
                      </a>
                    </li>
                    <li>
                      <a
                        href="/wishlist"
                        className="wishlist_bt_top"
                        title="Your wishlist"
                      >
                        <FontAwesomeIcon size="2x" icon={faHeart} />
                      </a>
                    </li>
                  </ul>
                  <a href="#menu" className="btn_mobile">
                    <div className="hamburger hamburger--spin" id="hamburger">
                      <div className="hamburger-box">
                        <div className="hamburger-inner" />
                      </div>
                    </div>
                  </a>
                  <Nav />
                </div>
              </div>
            </div>
          </header>
        </HeaderSticky>

        <LoginModal onRef={this.doRef} />
      </>
    );
  }
}

export default Header;
