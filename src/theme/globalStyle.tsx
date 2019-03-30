import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: Vazir;
  src: url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir.eot');
  src: url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir.eot?#iefix') format('embedded-opentype'),
       url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir.woff2') format('woff2'),
       url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir.woff') format('woff'),
       url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir.ttf') format('truetype');
  font-weight: normal;
}

@font-face {
  font-family: Vazir;
  src: url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Bold.eot');
  src: url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Bold.eot?#iefix') format('embedded-opentype'),
       url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Bold.woff2') format('woff2'),
       url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Bold.woff') format('woff'),
       url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Bold.ttf') format('truetype');
  font-weight: bold;
}

@font-face {
  font-family: Vazir;
  src: url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Light.eot');
  src: url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Light.eot?#iefix') format('embedded-opentype'),
       url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Light.woff2') format('woff2'),
       url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Light.woff') format('woff'),
       url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Light.ttf') format('truetype');
  font-weight: 300;
}

@font-face {
  font-family: Vazir;
  src: url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Medium.eot');
  src: url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Medium.eot?#iefix') format('embedded-opentype'),
       url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Medium.woff2') format('woff2'),
       url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Medium.woff') format('woff'),
       url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Medium.ttf') format('truetype');
  font-weight: 500;
}

@font-face {
  font-family: Vazir;
  src: url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Thin.eot');
  src: url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Thin.eot?#iefix') format('embedded-opentype'),
       url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Thin.woff2') format('woff2'),
       url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Thin.woff') format('woff'),
       url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Thin.ttf') format('truetype');
  font-weight: 100;
}

@font-face {
  font-family: Vazir;
  src: url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Black.eot');
  src: url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Black.eot?#iefix') format('embedded-opentype'),
       url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Black.woff2') format('woff2'),
       url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Black.woff') format('woff'),
       url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir-Black.ttf') format('truetype');
  font-weight: 900;
}

  @import url('https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700');
  *, ::after, ::before {
    box-sizing: border-box;
  }
  html * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    background: #f8f8f8;
    font-size: 0.875rem;
    line-height: 1.6;
    font-family: Vazir, Poppins, Helvetica, sans-serif;
    color: #555;
    font-weight: 400;
    text-align: left;
    display: block;
    padding: 0;
    margin: 0;
  }
  .ui {
    font-family: Vazir, sans-serif !important;
  }
  a {
    color: #004dda;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    outline: none;
  }
  ul, ol {
    list-style: none;
    margin: 0 0 25px 0;
    padding: 0;
  }
  img {
      vertical-align: middle;
      border-style: none;
  }

  .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    color: #333;
    margin-bottom: .5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
  }
  .margin_60_35 {
    padding-top: 60px;
    padding-bottom: 35px;
  }


  /**============================== Bootstrap Styles ==============================**/
  .container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    @media (min-width: 576px){
      max-width: 540px;
    }
    @media (min-width: 768px){
      max-width: 720px;
    }
    @media (min-width: 992px){
      max-width: 960px;
    }
     @media (min-width: 1200px){
      max-width: 1140px;
    }
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }


  /** col **/
  .col, .col-10, .col-12, .col-2, .col-3, .col-4, .col-6, .col-8, .col-9, .col-lg-1, .col-lg-10,
  .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9,
  .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-8, .col-sm-6, .col-xl-4,
  .col-xl-5, .col-xl-6, .col-xl-7 {
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }

  .col-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .col-lg-9 {
    flex: 0 0 75%;
    max-width: 75%;
  }
  @media (min-width: 992px){
    .col-lg-9 {
      flex: 0 0 75%;
      max-width: 75%;
    }
    .col-lg-6 {
      flex: 0 0 50%;
      max-width: 50%;
    }
    .col-lg-4 {
        flex: 0 0 33.333333%;
        max-width: 33.333333%;
    }
    .col-lg-3 {
        flex: 0 0 25%;
        max-width: 25%;
    }
  }

  @media (min-width: 768px){
    .col-md-5 {
        flex: 0 0 41.666667%;
        max-width: 41.666667%;
    }
  }

  .mt-1 {
      margin-top: .25rem!important;
  }

  .pt-2{
    padding-top:.5rem!important
  }

  .float-right {
      float: right!important;
  }

  .float-left {
      float: left!important;
  }

  .justify-content-center {
    justify-content: center!important;
  }

  .h1, h1 {
    font-size: 2.5rem;
  }

  .form-control {
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }

  .ui.input {
    display: block;
    width: 100%;
    input{
      height: calc(2.55rem + 2px);
      width: 100%;
    }
  }
  
  .text-center {
      text-align: center!important;
  }
  .small, small {
    font-size: 80%;
    font-weight: 400;
  }
  hr {
    margin: 30px 0 30px 0;
    border-color: #ddd;
    box-sizing: content-box;
    height: 0;
    overflow: visible;
    border: 0;
    border-top: 1px solid rgba(0,0,0,.1);
  }

  /*============================== Modal Styles ==============================*/
  .md-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 50%;
    max-width: 630px;
    min-width: 320px;
    height: auto;
    z-index: 2000;
    transform: translateX(-50%) translateY(-50%) scale(.7);
    opacity:0;
    transition: all .3s;
  }

  .md-show.md-modal {
    opacity:1;
    transform: translateX(-50%) translateY(-50%) scale(1);
  }

  .md-overlay{
    text-align: center;
    position: fixed;
    visibility: visible;
    background: hsla(0, 0%, 0%, 0.0);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    padding: 0 18px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 99999999999;
    transition: all .3s;
  }

  .md-show.md-overlay {
    background: hsla(0, 0%, 0%, 0.8);
  }

  /*============================== btn Styles ==============================*/
  .btn_1 {
    border: none;
    color: #fff;
    background: #004dda;
    outline: none;
    cursor: pointer;
    display: inline-block;
    text-decoration: none;
    padding: 17px 30px !important;
    color: #fff;
    font-weight: 600;
    text-align: center;
    line-height: 1;
    transition: all 0.3s ease-in-out;
    border-radius: 3px;

    :hover {
      background-color: #FFC107;
    }

    &.full-width {
      display: block;
      width: 100%;
      text-align: center;
      margin-bottom: 5px;

    }

    .medium {
      font-size: 16px;
      font-size: 1rem;
      padding: 18px 40px;
    }

    .rounded {
      border-radius: 25px !important;
    }

    .outline {
      border: 2px solid #004dda;
      color: #004dda;
      padding: 11px 40px;
      background: none;

      :hover {
        background: #0054a6;
        border-color: #0054a6;
      }

      :focus {
        outline: none;
      }
    }
  }

  /**============================== Forms Style ==============================**/
input{
    width: 100% !important;
}
.form-control {
    height: calc(2.55rem + 2px);
    font-size: 14px;
    font-size: 0.875rem;
    border-radius: 3px;
    border: 1px solid #d2d8dd;
}

/* Checkbox style */
.container_check {
  display: block;
  position: relative;
  font-size: 14px;
  font-size: 0.875rem;
  padding-left: 30px;
  line-height: 1.4;
  margin-bottom: 10px;
  cursor: pointer;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  input:checked ~ .checkmark {
    background-color: #004dda;
    border: 1px solid transparent;
  }
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    border: 1px solid #d2d8dd;
    border-radius: 3px;
    transition: all 0.3s ease-in-out;
    :after {
      content: "";
      position: absolute;
      display: none;
      left: 7px;
      top: 3px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
  input:checked ~ .checkmark:after {
    display: block;
  }
}

/* Radio buttons */
.container_radio {
  display: block;
  position: relative;
  font-size: 15px;
  font-size: 0.9375rem;
  padding-left: 30px;
  line-height: 1.3;
  margin-bottom: 10px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
  }
  input:checked ~ .checkmark:after {
    opacity: 1;
  }
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    border: 1px solid #ccc;
    border-radius: 50%;
    :after {
      display: block;
      content: "";
      position: absolute;
      opacity: 0;
      transition: all 0.3s ease-in-out;
      top: 3px;
      left: 3px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #004dda;
      transition: all 0.3s ease-in-out;
    }
  }
}

input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
 
input[type="number"] {
    -moz-appearance: textfield;
}

/**============================== 3.4 Spacing ==============================*/
.add_bottom_10 {
  margin-bottom: 10px;
}

.add_bottom_15 {
  margin-bottom: 15px;
}

.add_bottom_30 {
  margin-bottom: 30px;
}

.add_bottom_45 {
  margin-bottom: 45px;
}

.add_bottom_60 {
  margin-bottom: 60px;
}

.add_bottom_75 {
  margin-bottom: 75px;
}

.add_top_8 {
  margin-top: 8px;
}

.add_top_10 {
  margin-top: 10px;
}

.add_top_15 {
  margin-top: 15px;
}

.add_top_20 {
  margin-top: 20px;
}

.add_top_30 {
  margin-top: 30px;
}

.add_top_60 {
  margin-top: 60px;
}

.more_padding_left {
  padding-left: 40px;
}

.nomargin_top {
  margin-top: 0;
}

.nopadding {
  margin: 0 !important;
  padding: 0 !important;
}

.nomargin {
  margin: 0 !important;
}

.margin_30 {
  padding-top: 30px;
  padding-bottom: 30px;
}

.margin_30_5 {
  padding-top: 30px;
  padding-bottom: 5px;
}

.margin_60 {
  padding-top: 60px;
  padding-bottom: 60px;
}
@media (max-width: 767px) {
  .margin_60 {
    padding-top: 30px;
    padding-bottom: 30px;
  }
}

.margin_60_35 {
  padding-top: 60px;
  padding-bottom: 35px;
}
@media (max-width: 575px) {
  .margin_60_35 {
    padding-top: 30px;
    padding-bottom: 5px;
  }
}

.margin_80 {
  padding-top: 80px;
  padding-bottom: 80px;
}
@media (max-width: 991px) {
  .margin_80 {
    padding-bottom: 60px;
    padding-top: 60px;
  }
}
@media (max-width: 575px) {
  .margin_80 {
    padding-top: 30px;
    padding-bottom: 30px;
  }
}

.margin_80_55 {
  padding-top: 80px;
  padding-bottom: 55px;
}
@media (max-width: 991px) {
  .margin_80_55 {
    padding-top: 60px;
    padding-bottom: 35px;
  }
}
@media (max-width: 575px) {
  .margin_80_55 {
    padding-top: 45px;
    padding-bottom: 15px;
  }
}

.margin_80_0 {
  padding-top: 80px;
}
@media (max-width: 991px) {
  .margin_80_0 {
    padding-top: 60px;
  }
}
@media (max-width: 575px) {
  .margin_80_0 {
    padding-top: 30px;
  }
}

.margin_30_95 {
  padding-top: 30px;
  padding-bottom: 95px;
}
@media (max-width: 991px) {
  .margin_30_95 {
    padding-top: 15px;
    padding-bottom: 35px;
  }
}
@media (max-width: 575px) {
  .margin_30_95 {
    padding-top: 5px;
    padding-bottom: 5px;
  }
}

@media (max-width: 991px) {
  .hidden_tablet {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .hidden_mobile {
    display: none !important;
  }
}


.react-phone-number-input__country-select{
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    width: 70px;
}


/**============================== Styles based on semantic UI==============================*/
  .ui{
    .button {
      margin: 0 0 0 0;
    }
    .segment {
      box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      padding: 25px;
      position: relative;
      .form-group {
        margin-bottom: 10px;
      }
      hr {
        margin: 0 0 10px 0;
      }
    }
  }
  .field {
    width: 100%;
  }
  .rtl {
      .attached.label {
        text-align: right;
      }
    .ui {
      form {
        direction:rtl;
        input{
          height: 48px;
          &#field_input_lastName {
              text-align: right;
          }
          &#field_input_firstName {
            text-align: right;
          }
        }
      }
      .field {
        text-align: right;
        label {
          direction: rtl;
          text-align: right;
        }
      }
      .checkbox .box, .checkbox label {
        :before,:after {
          right: 0 !important;
        }
      }
      .checkbox label {
        padding-right: 1.85714em;
        padding-left: unset !important;
      }
    }
    .sign-in-wrapper {
      direction: rtl;
      text-align: right;
    }

  }
  input#field_input_phone {
    text-align: left;
    direction: ltr;
    ::placeholder {
      text-align: right;
      direction: rtl;
      font-family: Vazir;
    }
  }
  .ui.loading.form {
    :before {
    content: none;
    }
    :after {
    content: none;
    }
  }
  .sui-error-message {
    display: block;
    margin-top: 4px;
    color: #e81123;
    font-size: 13px;
    font-weight: 300;
  }
  .notShowErrors .sui-error-message {
    display: none;
  }
  .ui.form .field.error input[type=tell]{
    background: #fff6f6;
    border-color: #e0b4b4;
    color: #9f3a38;
    border-radius: '';
    box-shadow: none;
  }



/**============================== Colors of semantic UI==============================*/
  .ui{
    .primary{
      &.button{
        background-color: #00ACC1;
        :hover{
          background-color: #00BCD4;
          color: #fff !important;
        }
        :focus{
          background-color: #0097A7;
        }
      }
    }
  }
`;

const lightTheme = {
  main: '#fff'
};

const darkTheme = {
  main: '#000'
};

enum Margin {
  Normal = 'margin_60',
  Bitter = 'margin_60_35'
}

export { GlobalStyle, lightTheme, darkTheme, Margin };
