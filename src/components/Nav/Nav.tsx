import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Navigation = styled.div`
    nav#menu.main-menu {
      display: block !important;
    }

    /* Menu */
    .main-menu {
      position: relative;
      z-index: 9;
      width: auto;
      top: 8px;
      right: 0px;
      float: right;
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
      padding: 0 8px 0px 24px;
      font-size: 14px;
      font-weight: 500;
      :first-child {
        padding-right: 0px;
      }
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
      box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.175);
      transform: scale(0.4);
      transform-origin: 10% top;
      transition: 0.15s linear, 0.1s opacity cubic-bezier(0.39, 0.575, 0.565, 1),
        0.15s transform cubic-bezier(0.1, 1.26, 0.83, 1);
      opacity: 0;
      transition: all 0.2s ease;
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
      transform: scale(1);
      transition-delay: 0.2s;
      transition-duration: 0s, 0.2s, 0.2s;
    }

    .main-menu ul ul li:first-child a:hover {
      border-radius: 3px 3px 0 0;
    }
    .main-menu ul ul li:last-child a {
      border-bottom: none;
    }
    .main-menu ul ul li:last-child a:hover {
      border-radius: 0 0 3px 3px;
    }
    .main-menu ul ul li:hover > a {
      background-color: #f9f9f9;
      color: #004dda;
      padding-left: 15px;
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
`;

export const Nav: React.FunctionComponent = ({ children, isMobile = false }) => (
  <Navigation>
    <nav id="menu" className="main-menu">
      <ul>
        {!isMobile &&
          <li>
            <span>
              <a>بیشتر بدانید</a>
            </span>
            <ul>
              <li>
                <Link href="/what_is_otoli">
                  <a>اتولی چیست؟</a>
                </Link>
              </li>
              <li>
                <Link href="/add-car">
                  <a>افزودن خودرو</a>
                </Link>
              </li>
            </ul>
          </li>
        }
        <li>
          <span>
            <Link href="/requests">
              <a>سفارش‌های من</a>
            </Link>
          </span>
        </li>
        {children}
      </ul>
    </nav>
  </Navigation>
);
