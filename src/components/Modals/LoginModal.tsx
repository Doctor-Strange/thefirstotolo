import * as React from 'react';
import styled from 'styled-components';
import { ModalWrapper } from './ModalWrapper';
import { PanelsWrapper } from '../Carousel/PanelsWrapper';
import { Panel } from '../Carousel/Panel';

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
                  <input
                    onChange={this.handleSubmit}
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                  />
                  <div className="icon_mail_alt box">
                    <select
                      aria-label="Country"
                      className="react-phone-number-input__country-select"
                    >
                      <option value="ZZ">IR</option>
                      <option value="AB">Abkhazia</option>
                      <option value="AF">
                        Afghanistan (&#8235;افغانستان&#8236;&lrm;)
                      </option>
                      <option value="AX">Åland Islands</option>
                      <option value="AL">Albania (Shqipëri)</option>
                      <option value="DZ">
                        Algeria (&#8235;الجزائر&#8236;&lrm;)
                      </option>
                      <option value="AS">American Samoa (Amerika Sāmoa)</option>
                      <option value="AD">Andorra</option>
                      <option value="AO">Angola</option>
                      <option value="AI">Anguilla</option>
                      <option value="AQ">Antarctica</option>
                      <option value="AG">Antigua and Barbuda</option>
                      <option value="AR">Argentina</option>
                      <option value="AM">Armenia (Հայաստան)</option>
                      <option value="AW">Aruba</option>
                      <option value="AU">Australia</option>
                      <option value="AT">Austria (Österreich)</option>
                      <option value="AZ">Azerbaijan (Azərbaycan)</option>
                      <option value="BS">Bahamas</option>
                      <option value="BH">
                        Bahrain (&#8235;البحرين&#8236;&lrm;)
                      </option>
                      <option value="BD">Bangladesh (বাংলাদেশ)</option>
                      <option value="BB">Barbados</option>
                      <option value="BY">Belarus (Беларусь)</option>
                      <option value="BE">Belgium (België)</option>
                      <option value="BZ">Belize</option>
                      <option value="BJ">Benin (Bénin)</option>
                      <option value="BM">Bermuda</option>
                      <option value="BT">Bhutan (འབྲུག)</option>
                      <option value="BO">Bolivia</option>
                      <option value="BA">Bosnia and Herzegovina</option>
                      <option value="BW">Botswana</option>
                      <option value="BV">Bouvet Island</option>
                      <option value="BR">Brazil (Brasil)</option>
                      <option value="IO">British Indian Ocean Territory</option>
                      <option value="VG">British Virgin Islands</option>
                      <option value="BN">
                        Brunei (Negara Brunei Darussalam)
                      </option>
                      <option value="BG">Bulgaria (България)</option>
                      <option value="BF">Burkina Faso</option>
                      <option value="BI">Burundi (Uburundi)</option>
                      <option value="KH">Cambodia (កម្ពុជា)</option>
                      <option value="CM">Cameroon (Cameroun)</option>
                      <option value="CA">Canada</option>
                      <option value="CV">Cape Verde (Kabu Verdi)</option>
                      <option value="BQ">Caribbean Netherlands</option>
                      <option value="KY">Cayman Islands</option>
                      <option value="CF">Central African Republic</option>
                      <option value="TD">Chad (Tchad)</option>
                      <option value="CL">Chile</option>
                      <option value="CN">China (中国)</option>
                      <option value="CX">Christmas Island</option>
                      <option value="CC">Cocos (Keeling) Islands</option>
                      <option value="CO">Colombia</option>
                      <option value="KM">
                        Comoros (&#8235;جزر القمر&#8236;&lrm;)
                      </option>
                      <option value="CD">Congo (DRC) (Kongo)</option>
                      <option value="CG">
                        Congo (Republic) (Congo-Brazzaville)
                      </option>
                      <option value="CK">Cook Islands</option>
                      <option value="CR">Costa Rica</option>
                      <option value="CI">Côte d’Ivoire</option>
                      <option value="HR">Croatia (Hrvatska)</option>
                      <option value="CU">Cuba</option>
                      <option value="CW">Curaçao</option>
                      <option value="CY">Cyprus (Κύπρος)</option>
                      <option value="CZ">
                        Czech Republic (Česká republika)
                      </option>
                      <option value="DK">Denmark (Danmark)</option>
                      <option value="DJ">Djibouti</option>
                      <option value="DM">Dominica</option>
                      <option value="DO">Dominican Republic</option>
                      <option value="EC">Ecuador</option>
                      <option value="EG">Egypt (&#8235;مصر&#8236;&lrm;)</option>
                      <option value="SV">El Salvador</option>
                      <option value="GQ">
                        Equatorial Guinea (Guinea Ecuatorial)
                      </option>
                      <option value="ER">Eritrea</option>
                      <option value="EE">Estonia (Eesti)</option>
                      <option value="ET">Ethiopia</option>
                      <option value="FK">
                        Falkland Islands (Islas Malvinas)
                      </option>
                      <option value="FO">Faroe Islands (Føroyar)</option>
                      <option value="FJ">
                        Fiji (Matanitu Tugalala o Viti)
                      </option>
                      <option value="FI">Finland (Suomi)</option>
                      <option value="FR">France (République française)</option>
                      <option value="GF">
                        French Guiana (Guyane française)
                      </option>
                      <option value="PF">
                        French Polynesia (Polynésie française)
                      </option>
                      <option value="TF">French Southern Territories</option>
                      <option value="GA">Gabon (République gabonaise)</option>
                      <option value="GM">Gambia</option>
                      <option value="GE">Georgia (საქართველო)</option>
                      <option value="DE">Germany (Deutschland)</option>
                      <option value="GH">Ghana (Gaana)</option>
                      <option value="GI">Gibraltar</option>
                      <option value="GR">Greece (Ελλάδα)</option>
                      <option value="GL">Greenland (Kalaallit Nunaat)</option>
                      <option value="GD">Grenada</option>
                      <option value="GP">Guadeloupe</option>
                      <option value="GU">Guam (Guåhån)</option>
                      <option value="GT">Guatemala</option>
                      <option value="GG">Guernsey</option>
                      <option value="GN">Guinea (Guinée)</option>
                      <option value="GW">Guinea-Bissau (Guiné Bissau)</option>
                      <option value="GY">Guyana</option>
                      <option value="HT">Haiti (République d'Haïti)</option>
                      <option value="HM">
                        Heard Island and McDonald Islands
                      </option>
                      <option value="HN">Honduras</option>
                      <option value="HK">Hong Kong (香港)</option>
                      <option value="HU">Hungary (Magyarország)</option>
                      <option value="IS">Iceland (Ísland)</option>
                      <option value="IN">India (भारत)</option>
                      <option value="ID">Indonesia</option>
                      <option value="IR">
                        Iran (&#8235;ایران&#8236;&lrm;)
                      </option>
                      <option value="IQ">
                        Iraq (&#8235;العراق&#8236;&lrm;)
                      </option>
                      <option value="IE">Ireland</option>
                      <option value="IM">Isle of Man</option>
                      <option value="IL">
                        Israel (&#8235;ישראל&#8236;&lrm;)
                      </option>
                      <option value="IT">Italy (Italia)</option>
                      <option value="JM">Jamaica</option>
                      <option value="JP">Japan (日本)</option>
                      <option value="JE">Jersey</option>
                      <option value="JO">
                        Jordan (&#8235;الأردن&#8236;&lrm;)
                      </option>
                      <option value="KZ">Kazakhstan (Казахстан)</option>
                      <option value="KE">Kenya</option>
                      <option value="KI">Kiribati</option>
                      <option value="KW">
                        Kuwait (&#8235;الكويت&#8236;&lrm;)
                      </option>
                      <option value="KG">Kyrgyzstan (Кыргызстан)</option>
                      <option value="LA">Laos (ລາວ)</option>
                      <option value="LV">Latvia (Latvija)</option>
                      <option value="LB">
                        Lebanon (&#8235;لبنان&#8236;&lrm;)
                      </option>
                      <option value="LS">Lesotho</option>
                      <option value="LR">Liberia</option>
                      <option value="LY">
                        Libya (&#8235;ليبيا&#8236;&lrm;)
                      </option>
                      <option value="LI">Liechtenstein</option>
                      <option value="LT">Lithuania (Lietuva)</option>
                      <option value="LU">Luxembourg (Lëtzebuerg)</option>
                      <option value="MO">Macau (澳門)</option>
                      <option value="MK">Macedonia (FYROM) (Македонија)</option>
                      <option value="MG">Madagascar (Madagasikara)</option>
                      <option value="MW">Malawi (Malaŵi)</option>
                      <option value="MY">Malaysia</option>
                      <option value="MV">Maldives</option>
                      <option value="ML">Mali</option>
                      <option value="MT">Malta</option>
                      <option value="MH">Marshall Islands</option>
                      <option value="MQ">Martinique</option>
                      <option value="MR">
                        Mauritania (&#8235;موريتانيا&#8236;&lrm;)
                      </option>
                      <option value="MU">Mauritius (Moris)</option>
                      <option value="YT">Mayotte</option>
                      <option value="MX">Mexico (México)</option>
                      <option value="FM">Micronesia</option>
                      <option value="MD">Moldova (Republica Moldova)</option>
                      <option value="MC">Monaco</option>
                      <option value="MN">Mongolia (Монгол)</option>
                      <option value="ME">Montenegro (Crna Gora)</option>
                      <option value="MS">Montserrat</option>
                      <option value="MA">
                        Morocco (&#8235;المغرب&#8236;&lrm;)
                      </option>
                      <option value="MZ">Mozambique (Moçambique)</option>
                      <option value="MM">Myanmar (Burma) (မြန်မာ)</option>
                      <option value="NA">Namibia (Namibië)</option>
                      <option value="NR">Nauru (Repubrikin Naoero)</option>
                      <option value="NP">Nepal (नेपाल)</option>
                      <option value="NL">Netherlands (Nederland)</option>
                      <option value="NC">
                        New Caledonia (Nouvelle-Calédonie)
                      </option>
                      <option value="NZ">New Zealand</option>
                      <option value="NI">Nicaragua</option>
                      <option value="NE">Niger (Nijar)</option>
                      <option value="NG">Nigeria</option>
                      <option value="NU">Niue (Niuē)</option>
                      <option value="NF">Norfolk Island</option>
                      <option value="KP">
                        North Korea (조선 민주주의 인민 공화국)
                      </option>
                      <option value="MP">Northern Mariana Islands</option>
                      <option value="NO">Norway (Norge)</option>
                      <option value="OM">
                        Oman (&#8235;عُمان&#8236;&lrm;)
                      </option>
                      <option value="PK">
                        Pakistan (&#8235;پاکستان&#8236;&lrm;)
                      </option>
                      <option value="PW">Palau (Beluu er a Belau)</option>
                      <option value="PS">
                        Palestine (&#8235;فلسطين&#8236;&lrm;)
                      </option>
                      <option value="PA">Panama (Panamá)</option>
                      <option value="PG">Papua New Guinea</option>
                      <option value="PY">Paraguay (Tetã Paraguái)</option>
                      <option value="PE">Peru (Perú)</option>
                      <option value="PH">
                        Philippines (Republika ng Pilipinas)
                      </option>
                      <option value="PN">Pitcairn</option>
                      <option value="PL">Poland (Polska)</option>
                      <option value="PT">
                        Portugal (República Portuguesa)
                      </option>
                      <option value="PR">Puerto Rico</option>
                      <option value="QA">Qatar (&#8235;قطر&#8236;&lrm;)</option>
                      <option value="RE">Réunion (La Réunion)</option>
                      <option value="RO">Romania (România)</option>
                      <option value="RU">Russia (Россия)</option>
                      <option value="RW">Rwanda</option>
                      <option value="BL">
                        Saint Barthélemy (Saint-Barthélemy)
                      </option>
                      <option value="SH">Saint Helena</option>
                      <option value="KN">Saint Kitts and Nevis</option>
                      <option value="LC">Saint Lucia</option>
                      <option value="MF">Saint Martin (Saint-Martin)</option>
                      <option value="PM">Saint Pierre and Miquelon</option>
                      <option value="VC">
                        Saint Vincent and the Grenadines
                      </option>
                      <option value="WS">Samoa (Sāmoa)</option>
                      <option value="SM">San Marino</option>
                      <option value="ST">São Tomé and Príncipe</option>
                      <option value="SA">
                        Saudi Arabia (&#8235;المملكة العربية
                        السعودية&#8236;&lrm;)
                      </option>
                      <option value="SN">Senegal (Sénégal)</option>
                      <option value="RS">Serbia (Србија)</option>
                      <option value="SC">Seychelles (Repiblik Sesel)</option>
                      <option value="SL">Sierra Leone</option>
                      <option value="SG">
                        Singapore (Singapura) (新加坡共和国)
                      </option>
                      <option value="SX">Sint Maarten</option>
                      <option value="SK">Slovakia (Slovensko)</option>
                      <option value="SI">Slovenia (Slovenija)</option>
                      <option value="SB">Solomon Islands</option>
                      <option value="SO">Somalia (Soomaaliya)</option>
                      <option value="ZA">South Africa</option>
                      <option value="GS">
                        South Georgia and the South Sandwich Islands
                      </option>
                      <option value="KR">South Korea (대한민국)</option>
                      <option value="OS">South Ossetia</option>
                      <option value="SS">
                        South Sudan (&#8235;جنوب السودان&#8236;&lrm;)
                      </option>
                      <option value="ES">Spain (España)</option>
                      <option value="LK">Sri Lanka (ශ්&zwj;රී ලංකාව)</option>
                      <option value="SD">
                        Sudan (&#8235;السودان&#8236;&lrm;)
                      </option>
                      <option value="SR">Suriname</option>
                      <option value="SJ">Svalbard and Jan Mayen</option>
                      <option value="SZ">Swaziland (Umbuso weSwatini)</option>
                      <option value="SE">Sweden (Sverige)</option>
                      <option value="CH">Switzerland (Schweiz)</option>
                      <option value="SY">
                        Syria (&#8235;سوريا&#8236;&lrm;)
                      </option>
                      <option value="TW">Taiwan (台灣)</option>
                      <option value="TJ">
                        Tajikistan (Ҷумҳурии Тоҷикистон)
                      </option>
                      <option value="TZ">Tanzania</option>
                      <option value="TH">Thailand (ไทย)</option>
                      <option value="TL">Timor-Leste (Timór-Leste)</option>
                      <option value="TG">Togo (République togolaise)</option>
                      <option value="TK">Tokelau</option>
                      <option value="TO">Tonga</option>
                      <option value="TT">Trinidad and Tobago</option>
                      <option value="TN">
                        Tunisia (&#8235;تونس&#8236;&lrm;)
                      </option>
                      <option value="TR">Turkey (Türkiye)</option>
                      <option value="TM">Turkmenistan (Türkmenistan)</option>
                      <option value="TC">Turks and Caicos Islands</option>
                      <option value="TV">Tuvalu</option>
                      <option value="VI">U.S. Virgin Islands</option>
                      <option value="UG">Uganda</option>
                      <option value="UA">Ukraine (Україна)</option>
                      <option value="AE">
                        United Arab Emirates (&#8235;الإمارات العربية
                        المتحدة&#8236;&lrm;)
                      </option>
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="UM">
                        United States Minor Outlying Islands
                      </option>
                      <option value="UY">Uruguay</option>
                      <option value="UZ">Uzbekistan (Oʻzbekiston)</option>
                      <option value="VU">Vanuatu</option>
                      <option value="VA">
                        Vatican City (Città del Vaticano)
                      </option>
                      <option value="VE">Venezuela</option>
                      <option value="VN">Vietnam (Việt Nam)</option>
                      <option value="WF">
                        Wallis and Futuna (Wallis-et-Futuna)
                      </option>
                      <option value="EH">
                        Western Sahara (&#8235;الصحراء الغربية&#8236;&lrm;)
                      </option>
                      <option value="YE">
                        Yemen (&#8235;اليمن&#8236;&lrm;)
                      </option>
                      <option value="ZM">Zambia</option>
                      <option value="ZW">Zimbabwe</option>
                    </select>
                  </div>
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
