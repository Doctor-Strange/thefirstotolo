import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Navigation = styled.div`
  @media only screen and (min-width: 992px) {
    #mm-menu.main-menu {
      display: none !important;
    }

    header .btn_mobile {
      display: none !important;
    }

    nav#menu.main-menu {
      display: block !important;
    }

    /* Menu */
    .main-menu {
      position: relative;
      z-index: 9;
      width: auto;
      top: 8px;
      right: 15px;
      float: right;
      -moz-transition: all 0.3s ease-in-out;
      -o-transition: all 0.3s ease-in-out;
      -webkit-transition: all 0.3s ease-in-out;
      -ms-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
      color: #fff;
    }
    .main-menu ul,
    .main-menu ul li {
      position: relative;
      display: inline-block;
      margin: 0;
      padding: 0;
    }
    .main-menu ul a,
    .main-menu ul li a {
      position: relative;
      margin: 0;
      padding: 0;
      display: block;
      padding: 5px 10px;
      white-space: nowrap;
    }

    /*First level styles */
    .main-menu > ul > li span > a {
      color: #444;
      padding: 0 8px 15px 8px;
      font-size: 14px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .main-menu > ul > li span:hover > a {
      opacity: 0.7;
    }

    header.sticky .main-menu > ul > li span > a,
    header.header_in .main-menu > ul > li span > a {
      color: #444;
    }
    header.sticky .main-menu > ul > li span:hover > a,
    header.header_in .main-menu > ul > li span:hover > a {
      opacity: 1;
      color: #004dda;
    }

    /* Submenu*/
    .main-menu ul ul {
      position: absolute;
      z-index: 1;
      visibility: hidden;
      left: 3px;
      top: 93%;
      margin: 0;
      display: block;
      padding: 0;
      background: #fff;
      min-width: 200px;
      -webkit-box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.175);
      -moz-box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.175);
      box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.175);
      transform: scale(0.4);
      transform-origin: 10% top;
      transition: 0.15s linear, 0.1s opacity cubic-bezier(0.39, 0.575, 0.565, 1),
        0.15s transform cubic-bezier(0.1, 1.26, 0.83, 1);
      opacity: 0;
      -moz-transition: all 0.2s ease;
      -o-transition: all 0.2s ease;
      -webkit-transition: all 0.2s ease;
      -ms-transition: all 0.2s ease;
      transition: all 0.2s ease;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      -ms-border-radius: 3px;
      border-radius: 3px;
    }
    .main-menu ul ul:before {
      bottom: 100%;
      left: 15%;
      border: solid transparent;
      content: '';
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
      border-bottom-color: #fff;
      border-width: 7px;
      margin-left: -7px;
    }
    .main-menu ul ul li {
      display: block;
      height: auto;
      padding: 0;
    }
    .main-menu ul ul li a {
      font-size: 13px;
      font-size: 0.8125rem;
      color: #555;
      border-bottom: 1px solid #ededed;
      display: block;
      padding: 15px 10px;
      line-height: 1;
    }

    .main-menu ul li:hover > ul {
      padding: 0;
      visibility: visible;
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transition-delay: 0.2s;
      transition-delay: 0.2s;
      -webkit-transition-duration: 0s, 0.2s, 0.2s;
      transition-duration: 0s, 0.2s, 0.2s;
    }

    .main-menu ul ul li:first-child a:hover {
      -webkit-border-radius: 3px 3px 0 0;
      -moz-border-radius: 3px 3px 0 0;
      -ms-border-radius: 3px 3px 0 0;
      border-radius: 3px 3px 0 0;
    }
    .main-menu ul ul li:last-child a {
      border-bottom: none;
    }
    .main-menu ul ul li:last-child a:hover {
      -webkit-border-radius: 0 0 3px 3px;
      -moz-border-radius: 0 0 3px 3px;
      -ms-border-radius: 0 0 3px 3px;
      border-radius: 0 0 3px 3px;
    }
    .main-menu ul ul li:hover > a {
      background-color: #f9f9f9;
      color: #004dda;
      padding-left: 15px;
    }
  }
  .main-menu {
    ul {
      /* Submenu 2nd level right */
      ul {
        li {
          span {
            a {
              font-weight: normal !important;
              :hover {
                background-color: #f9f9f9;
                color: #004dda;
                padding-left: 18px;
                opacity: 1;
              }
              :after {
                font-family: ElegantIcons;
                float: right;
                font-size: 16px;
                font-size: 1rem;
                margin-top: -2px;
              }
            }
          }
        }
        /* Submenu 3rd level */
        ul.third_level_left {
          right: 100%;
          left: auto;
        }
        ul {
          position: absolute;
          border-top: 0;
          z-index: 1;
          height: auto;
          left: 100%;
          top: 0;
          margin: 0;
          padding: 0;
          background: #fff;
          min-width: 190px;
          -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
          li a {
            border-bottom: 1px solid #ededed !important;
          }
          /* Arrows top 3rd level*/
          :before {
            border-width: 0;
            margin-left: 0;
          }
        }
      }
      ul.second_level_right {
        left: auto;
        right: 3px;
        :before {
          right: 15%;
          left: auto;
        }
      }
    }
  }
  /* All styles for screen size under 991px */
  @media only screen and (max-width: 991px) {
    nav#menu {
      display: none !important;
    }

    .mm-menu {
      background: #fff;
    }

    .main-menu {
      top: 0;
      right: 0;
      float: none;
    }

    ul.mm-listview {
      line-height: 25px;
      li a {
        color: #ccc;
        display: block;
      }
    }
  }
  #menu.fake_menu {
    display: none !important;
    visibility: hidden !important;
  }
`;

export const Nav: React.FunctionComponent = props => (
  <Navigation>
    <nav id="menu" className="main-menu">
      <ul>
        <li>
          <span>
            <Link href="#0">
              <a>صفحه</a>
            </Link>
          </span>
          <ul>
            <li>
              <Link href="/admin_section/index.html">
                <a>تست یک</a>
              </Link>
            </li>
            <li>
              <Link href="/media-gallery">
                <a>تست دوم</a>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <span>
            <Link href="#0">
              <a>بیشتر</a>
            </Link>
          </span>
          <ul>
            <li>
              <Link href="/404">
                <a>فلان بیسار</a>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </Navigation>
);
