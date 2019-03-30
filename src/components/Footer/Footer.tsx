/* tslint:disable */
import * as React from 'react';
import styled from 'styled-components';
import * as CardsAll from '../../../static/cards_all.svg';

const FooterTag = styled.footer`
  border-top: 1px solid #ededed;
  background-color: #fff;
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
      border-bottom: 1px solid #ededed;
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
        color: #555;
        :hover {
          color: #004dda;
          opacity: 1;
        }
        a,
        a i {
          margin-right: 10px;
          color: #fff;
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
          color: #004dda;
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
      color: #004dda;
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
        color: #555;
        opacity: 0.6;
        :hover {
          opacity: 1;
          color: #004dda;
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
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    border-radius: 3px;
    padding-right: 35px;
    position: relative;
  }

  .styled-select#lang-selector {
    color: #555;
  }

  .styled-select#currency-selector:after {
    color: #555;
    position: absolute;
    right: 10px;
    top: 0;
  }

  select {
    background: transparent;
    width: 110%;
    padding-left: 10px;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    height: 30px;
    color: #555;
    font-size: 12px;
    font-size: 0.75rem;
    margin: 0;
    font-weight: 500;
    cursor: pointer;
    outline: none;
    :focus {
      color: #555;
      outline: none;
      box-shadow: none;
    }
  }

  hr {
    margin: 30px 0 30px 0;
    border-color: #ddd;
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
    font-size: 0.875rem;
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
    background-color: #004dda;
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
      <div className="container margin_60_35">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <a
              data-toggle="collapse"
              data-target="#collapse_ft_1"
              aria-expanded="false"
              aria-controls="collapse_ft_1"
              className="collapse_bt_mobile"
            >
              <h3>Quick Links</h3>
              <div className="circle-plus closed">
                <div className="horizontal" />
                <div className="vertical" />
              </div>
            </a>
            <div className="collapse show" id="collapse_ft_1">
              <ul className="links">
                <li>
                  <a href="#0">About us</a>
                </li>
                <li>
                  <a href="#0">Faq</a>
                </li>
                <li>
                  <a href="#0">Help</a>
                </li>
                <li>
                  <a href="#0">My account</a>
                </li>
                <li>
                  <a href="#0">Create account</a>
                </li>
                <li>
                  <a href="#0">Contacts</a>
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
              <h3>Categories</h3>
              <div className="circle-plus closed">
                <div className="horizontal" />
                <div className="vertical" />
              </div>
            </a>
            <div className="collapse show" id="collapse_ft_2">
              <ul className="links">
                <li>
                  <a href="#0">Shops</a>
                </li>
                <li>
                  <a href="#0">Hotels</a>
                </li>
                <li>
                  <a href="#0">Restaurants</a>
                </li>
                <li>
                  <a href="#0">Bars</a>
                </li>
                <li>
                  <a href="#0">Events</a>
                </li>
                <li>
                  <a href="#0">Fitness</a>
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
              <h3>Contacts</h3>
              <div className="circle-plus closed">
                <div className="horizontal" />
                <div className="vertical" />
              </div>
            </a>
            <div className="collapse show" id="collapse_ft_3">
              <ul className="contacts">
                <li>
                  <i className="ti-home" />
                  97845 Baker st. 567
                  <br />
                  Los Angeles - US
                </li>
                <li>
                  <i className="ti-headphone-alt" />
                  +39 06 97240120
                </li>
                <li>
                  <i className="ti-email" />
                  <a href="#0">info@sparker.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <a
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
            </a>
            <div className="collapse show" id="collapse_ft_4">
              <Newsletter id="newsletter">
                <div id="message-newsletter" />
                <form
                  method="post"
                  action="assets/newsletter.php"
                  name="newsletter_form"
                  id="newsletter_form"
                >
                  <div className="form-group">
                    <input
                      type="email"
                      name="email_newsletter"
                      id="email_newsletter"
                      className="form-control"
                      placeholder="Your email"
                    />
                    <input
                      type="submit"
                      value="Submit"
                      id="submit-newsletter"
                    />
                  </div>
                </form>
              </Newsletter>
              <div className="follow_us">
                <h5>Follow Us</h5>
                <ul>
                  <li>
                    <a href="#0">
                      <i className="ti-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <i className="ti-twitter-alt" />
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <i className="ti-google" />
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <i className="ti-pinterest" />
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <i className="ti-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-6">
            <FooterSelector id="footer-selector">
              <li>
                <div className="styled-select" id="lang-selector">
                  <button onClick={changeLangFunc}>CHANGE LANG</button>
                  <select>
                    <option value="English" selected>
                      English
                    </option>
                    <option value="French">French</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Russian">Russian</option>
                  </select>
                </div>
              </li>
              <li>
                <div className="styled-select" id="currency-selector">
                  <select>
                    <option value="US Dollars" selected>
                      US Dollars
                    </option>
                    <option value="Euro">Euro</option>
                  </select>
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
                <a href="#0">Terms and conditions</a>
              </li>
              <li>
                <a href="#0">Privacy</a>
              </li>
              <li>
                <span>© 2018 Sparker</span>
              </li>
            </AdditionalLinks>
          </div>
        </div>
      </div>
    </FooterTag>
  </>
);

export default Footer;
