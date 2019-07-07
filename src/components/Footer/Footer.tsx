/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import { Button, Icon } from 'semantic-ui-react'
import * as CardsAll from '../../../static/cards_all.svg';
import { ITheme } from "../../theme/Interfaces";

const FooterTag = styled.footer`
  border-top: 1px solid ${({theme}:{theme:ITheme}) => theme.color.cardLabels};
  background-color: #fff;
  .container{
    padding-top: 60px;
    padding-bottom: 35px;
  }
  h3 {
    margin: 0 0 15px 0;
    font-size: 18px;
    font-size: 1.125rem;
    @media (max-width: 575px) {
      font-size: 16px;
      font-size: 1rem;
      margin: 0;
    }
  }
  a.collapse_bt_mobile {
    position: relative;
    display: block;
    cursor: default;
    @media (max-width: 575px) {
      border-bottom: 1px solid ${({theme}:{theme:ITheme}) => theme.color.cardLabels};
      padding: 12px 0;
    }
    .circle-plus {
      display: none;
      @media (max-width: 575px) {
        display: block;
        position: absolute;
        top: 8px;
        right: 0;
      }
    }
  }

  hr {
    @media (max-width: 575px) {
      display: none;
    }
  }

  ul {
    li {
      margin-bottom: 5px;
      a {
        transition: all 0.3s ease-in-out;
        display: inline-block;
        position: relative;
        color: ${({theme}:{theme:ITheme}) => theme.color.textThird};
        :hover {
          color:${({theme}:{theme:ITheme}) => theme.color.mainForeground};
          opacity: 1;
        }
      }
    }
    @media (max-width: 575px) {
      padding-top: 15px;
    }
  }

  ul.links {
    li {
      a {
        :hover {
          transform: translate(5px, 0);
        }
        :hover:after {
          opacity: 1;
          color: ${({theme}:{theme:ITheme}) => theme.color.mainForeground};
        }
      }
    }
  }

  ul.contacts li {
    padding-left: 30px;
    position: relative;
    margin-bottom: 20px;
    :last-child {
      margin-bottom: 0;
    }
    i {
      position: absolute;
      top: 0;
      left: 0;
      color: ${({theme}:{theme:ITheme}) => theme.color.textThird};
      line-height: 1;
      font-size: 18px;
      font-size: 1.125rem;
    }
  }

  .follow_us {
    animation-delay: 1.1s;
    h5 {
      font-size: 16px;
      font-size: 1rem;
      margin-top: 35px;
    }
    ul li {
      display: inline-block;
      margin-right: 5px;
      font-size: 20px;
      font-size: 1.25rem;
      a i {
        opacity: 0.6;
        :hover {
          opacity: 1;
        }
      }
    }
  }

  .styled-select {
    width: 100%;
    overflow: hidden;
    height: 30px;
    line-height: 30px;
    border: none;
    background-color: black;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    padding-right: 35px;
    position: relative;
  }

  hr {
    margin: 30px 0 30px 0;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const AdditionalLinks = styled.ul`
  margin: 0;
  padding: 8px 0 0 0;
  color: #555;
  font-size: 13px;
  font-size: 0.8125rem;
  float: right;
  @media (max-width: 991px) {
    float: none;
    margin-top: 10px;
  }
  li {
    display: inline-block;
    margin-right: 15px;
    :first-child {
      margin-right: 20px;
    }
    :last-child:after {
      content: '';
    }
    span {
      color: #555;
      opacity: 0.8;
    }
    a {
      color: #555;
      opacity: 0.8;
      transition: all 0.3s ease-in-out;
      :hover {
        opacity: 1;
      }
    }
    :after {
      content: '|';
      font-weight: 300;
      position: relative;
      left: 10px;
    }
  }
`;

const Newsletter = styled.div`
  @media (max-width: 575px) {
    padding-top: 15px;
  }
  .form-group {
    position: relative;
  }
  .loader {
    position: absolute;
    right: -20px;
    top: 11px;
    color: #444;
    font-size: 12px;
    font-size: 0.75rem;
  }
  h6 {
    margin: 15px 0 15px 0;
  }
  .form-group {
    position: relative;
  }

  input[type='email'] {
    border: 0;
    height: 40px;
    border-radius: 0;
    padding-left: 15px;
    font-size: 14px;
    font-size: 14px;
    background-color: black;
    background-color: rgba(0, 0, 0, 0.06);
    :focus {
      border: 0;
      box-shadow: none;
    }
  }
  input[type='submit'] {
    position: absolute;
    right: 0;
    color: #fff;
    font-size: 13px;
    font-size: 0.8125rem;
    font-weight: 600;
    top: 0;
    border: 0;
    padding: 0 12px;
    height: 40px;
    line-height: 42px;
    cursor: pointer;
    border-radius: 0 3px 3px 0;
    background-color: ${({theme}:{theme:ITheme}) => theme.color.mainForeground};
    transition: all 0.3s ease-in-out;
    outline: none;

    :hover {
      background-color: #ffc107;
      color: #222;
    }
  }
`;

const FooterSelector = styled.ul`
  margin: 0 0 0 0;
  padding: 0;
  list-style: none;
  @media (max-width: 575px) {
    margin-top: 30px;
  }
  li {
    float: left;
    margin-right: 10px;
  }
  :last-child {
    @media (max-width: 575px) {
      margin-top: 5px;
    }
  }
`;

const Footer: React.FunctionComponent = ({ changeLangFunc }) => (
  <>
    <div id="toTop" />
    <FooterTag className="plus_border">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <a
              data-toggle="collapse"
              data-target="#collapse_ft_1"
              aria-expanded="false"
              aria-controls="collapse_ft_1"
              className="collapse_bt_mobile"
            >
              {/* <h3>پیوندهای مفید</h3> */}
              <div className="circle-plus closed">
                <div className="horizontal" />
                <div className="vertical" />
              </div>
            </a>
            <div className="collapse show" id="collapse_ft_1">
              <ul className="links">
                <li>
                  <a href="#0">اتولی چگونه کار می‌کند؟</a>
                </li>
                <li>
                  <a href="#0">چرا اتولی؟</a>
                </li>
                <li>
                  <a href="#0">چگونه خودرو ثبت کنم؟</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <a
              data-toggle="collapse"
              data-target="#collapse_ft_2"
              aria-expanded="false"
              aria-controls="collapse_ft_2"
              className="collapse_bt_mobile"
            >
              <h3>پیوندهای مفید</h3>
              <div className="circle-plus closed">
                <div className="horizontal" />
                <div className="vertical" />
              </div>
            </a>
            <div className="collapse show" id="collapse_ft_2">
              <ul className="links">
                <li>
                  <a href="#0">درباره ما</a>
                </li>
                <li>
                  <a href="#0">سوالات متداول</a>
                </li>
                <li>
                  <a href="#0">بیمه</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <a
              data-toggle="collapse"
              data-target="#collapse_ft_3"
              aria-expanded="false"
              aria-controls="collapse_ft_3"
              className="collapse_bt_mobile"
            >
              <h3>تماس</h3>
              <div className="circle-plus closed">
                <div className="horizontal" />
                <div className="vertical" />
              </div>
            </a>
            <div className="collapse show" id="collapse_ft_3">
              <ul className="contacts">
                <li>
                  <i className="ti-home" />
                  ایران، تهران
                  <br />
                  شهرک غرب، بلوار شهید دادمان
                </li>
                <li>
                  <i className="ti-headphone-alt" />
                  ۰۲۱ -  ۸۸ ۵۶ ۷۷ ۵۹
                </li>
                <li>
                  <i className="ti-email" />
                  <a href="mailto:info@otoli.net">info@otoli.net</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            {/* <a
              data-toggle="collapse"
              data-target="#collapse_ft_4"
              aria-expanded="false"
              aria-controls="collapse_ft_4"
              className="collapse_bt_mobile"
            >
              <div className="circle-plus closed">
                <div className="horizontal" />
                <div className="vertical" />
              </div>
              <h3>Keep in touch</h3>
            </a> */}
            <div className="follow_us">
              <h3>دنبالمان کنید</h3>
              <Icon name='facebook' />
              <Icon name='twitter' />
              <Icon name='google plus' />
              <Icon name='vk' />
              <Icon name='linkedin' />
              <Icon name='instagram' />
              <Icon name='youtube' />
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-6">
            <FooterSelector id="footer-selector">
              <li>
                <div className="styled-select" id="lang-selector">
                  <button onClick={changeLangFunc}>تغیر زبان</button>
                  {/* <select>
                    <option value="English" selected>
                      English
                    </option>
                    <option value="French">French</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Russian">Russian</option>
                  </select> */}
                </div>
              </li>
              <li>
                <div className="styled-select" id="currency-selector">
                  {/* <select>
                    <option value="US Dollars" selected>
                      US Dollars
                    </option>
                    <option value="Euro">Euro</option>
                  </select> */}
                </div>
              </li>
              <li>
                <img src={CardsAll} alt="" />
              </li>
            </FooterSelector>
          </div>
          <div className="col-lg-6">
            <AdditionalLinks>
              <li>
                <a href="#0">ارتباط با ما</a>
              </li>
              <li>
                <a href="#0">شرایط و قوانین استفاده</a>
              </li>
              <li>
                <span>۱۳۹۸ اتولی ©</span>
              </li>
            </AdditionalLinks>
          </div>
        </div>
      </div>
    </FooterTag>
  </>
);

export default Footer;
