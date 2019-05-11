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

  input,.dropdown[name="month"]{
    height:48px;
    
  }
  @media (min-width: 768px){
    #field_input_year,#field_dropdown_month{
      margin-top:25px;
    }
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
  .container_on_desktop{
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    @media (min-width: 992px){
      max-width: 960px;
      padding-right: 15px;
      padding-left: 15px;
    }
     @media (min-width: 1200px){
      max-width: 1140px;
      padding-right: 15px;
      padding-left: 15px;
    }
  }

  @media (min-width: 992px){
    .justInMobile{
      display:none;
    }
  }
  @media (max-width: 992px){
    .justInDesktop{
      display:none;
    }
  }
  

  .row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }


  .container {
    @media (min-width: 576px){
      .carcard{
      }
    }
    @media (min-width: 768px){
      .carcard{
      }
    }
    @media (min-width: 992px){
      .carcard{
        width: 300px;
      }
    }
     @media (min-width: 1200px){
      .carcard{
        width: 380px;
      }
    }
  }
  @media (max-width: 768px){
    .carcards_section{
      padding-right: 0px !important;
      padding-left: 0px !important;
    }
    .carcard {
      width: 97vw !important;
      max-width: 400px !important;
    }
  }


  /** col **/
  .col,.col-10,.col-12,.col-2,.col-3,.col-4,.col-6,.col-8,.col-9,
  .col-lg-1,.col-lg-10,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,
  .col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-8,.col-sm-6,.col-xl-4,.col-xl-5,.col-xl-6,
  .col-xl-7{
    position:relative;
    width:100%;
    min-height:1px;
    padding-right:15px;
    padding-left:15px
}
.col{
    flex-basis:0;
    flex-grow:1;
    max-width:100%
}
.col-2{
    flex:0 0 16.666667%;
    max-width:16.666667%
}
.col-3{
    flex:0 0 25%;
    max-width:25%
}
.col-4{
    flex:0 0 33.333333%;
    max-width:33.333333%
}
.col-6{
    flex:0 0 50%;
    max-width:50%
}
.col-8{
    flex:0 0 66.666667%;
    max-width:66.666667%
}
.col-9{
    flex:0 0 75%;
    max-width:75%
}
.col-10{
    flex:0 0 83.333333%;
    max-width:83.333333%
}
.col-12{
    flex:0 0 100%;
    max-width:100%
}
.order-last{
    order:13
}
@media (min-width:576px){
    .col-sm-6{
        flex:0 0 50%;
        max-width:50%
    }
    .order-sm-last{
        order:13
    }
}
@media (min-width:768px){
    .col-md-2{
        flex:0 0 16.666667%;
        max-width:16.666667%
    }
    .col-md-3{
        flex:0 0 25%;
        max-width:25%
    }
    .col-md-4{
        flex:0 0 33.333333%;
        max-width:33.333333%
    }
    .col-md-5{
        flex:0 0 41.666667%;
        max-width:41.666667%
    }
    .col-md-6{
        flex:0 0 50%;
        max-width:50%
    }
    .col-md-8{
        flex:0 0 66.666667%;
        max-width:66.666667%
    }
    .col-md-12{
        flex:0 0 100%;
        max-width:100%
    }
    .order-md-last{
        order:13
    }
}
@media (min-width:992px){
    .col-lg-1{
        flex:0 0 8.333333%;
        max-width:8.333333%
    }
    .col-lg-2{
        flex:0 0 16.666667%;
        max-width:16.666667%
    }
    .col-lg-3{
        flex:0 0 25%;
        max-width:25%
    }
    .col-lg-4{
        flex:0 0 33.333333%;
        max-width:33.333333%
    }
    .col-lg-5{
        flex:0 0 41.666667%;
        max-width:41.666667%
    }
    .col-lg-6{
        flex:0 0 50%;
        max-width:50%
    }
    .col-lg-7{
        flex:0 0 58.333333%;
        max-width:58.333333%
    }
    .col-lg-8{
        flex:0 0 66.666667%;
        max-width:66.666667%
    }
    .col-lg-9{
        flex:0 0 75%;
        max-width:75%
    }
    .col-lg-10{
        flex:0 0 83.333333%;
        max-width:83.333333%
    }
    .col-lg-12{
        flex:0 0 100%;
        max-width:100%
    }
}
@media (min-width:1200px){
    .col-xl-4{
        flex:0 0 33.333333%;
        max-width:33.333333%
    }
    .col-xl-5{
        flex:0 0 41.666667%;
        max-width:41.666667%
    }
    .col-xl-6{
        flex:0 0 50%;
        max-width:50%
    }
    .col-xl-7{
        flex:0 0 58.333333%;
        max-width:58.333333%
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
      font-size: 1re                  m;
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

@media (max-width: 767px){
    .paddingInMobile {
      padding-top: 16px;
      padding-bottom: 16px;
    }
    .wrapper {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column !important;
      .indexFullOnMobile{
        width:100%;
        margin: 0 auto;
        margin-bottom:10px;
      }
    }
}

@media (max-width: 991px) {
  .hide_on_mobile {
      display: none !important;
  }
}
@media (min-width: 991px) {
  .hide_on_desktop {
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

.sidebar.menu {
    min-height: 100vh;
}

.ui.form input:not([type]), .ui.form input[type=date], .ui.form input[type=datetime-local],
.ui.form input[type=email], .ui.form input[type=file], .ui.form input[type=number],
.ui.form input[type=password], .ui.form input[type=search], .ui.form input[type=tel],
.ui.form input[type=text], .ui.form input[type=time], .ui.form input[type=url] {
  font-family: Vazir !important;
}

  .button {
    margin: 0 0 0 0;
  }
  .input {
    display: block;
    width: 100%;
    input{
      height: 48px;
      width: 100%;
    }
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
  form {
    .dropdown {
      &.icon {
        top: 1.4em !important;
      }
      .text {
        line-height: 24px;
      }
    }
  }

  
  .fields:not(.inline) { 
    margin-bottom:0px !important;
    .field {
      width: 100%;
      margin-bottom:24px !important;
    }
  }
  .fields.inline, *[inputmode='numeric'] { 
      margin-bottom:24px !important;
  }
  .rtl {
    .carcard {
      text-align:right;
      direction:rtl;
    }
    .message {
      text-align: right;
    }
    h3.new_client {
      background-position: right !important;
    }
    .attached.label {
      text-align: right;
    }
    .icon.message {
      direction: rtl;
      text-align: right;
      .icon{
        margin: 0 0 0 .6em;
        margin-right: 0 !important;
      }
    }    
      form {
        direction:rtl;
        .field {
          label {
            direction: rtl;
            text-align: right;
          }
          &:not(.ltr) {
            text-align: right;
            .dropdown {
              text-align:right;
              &.icon {
                left: 1em;
                right: unset !important;
              }
              .menu>.item {
                text-align: right;
              }
              &.colorpicker{
                &.icon {
                left: 0em !important;
                }
              }
            }
          }
        }
        input{
          height: 48px;
          ::placeholder {
            text-align: right;
            direction: rtl;
            font-family: Vazir !important;
          }
          &[name="firstName"] {
              text-align: right;
          }
          &[name="lastName"]{
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
    .ui.items>.item>.image+.content {
      padding-right: 1.5em;
      padding-left: 0;
      margin-right: 0;
      direction:rtl;
      text-align:right;
    }
    .ui.header {
      margin-left: 0.75rem;
     .icon:only-child {
        margin-left: .25rem;
      }
    }
    .ui.labeled.input:not([class*="corner labeled"]) .label:first-child+input {
      width: 87% !important;
    }
    .ui.input {
      flex-direction: row-reverse;
    }
    

  }
  /** end of RTL **/
  input {
    &#field_input_phone,&#field_input_code,&[name="nationalid"] {
      text-align: left;
      direction: ltr;
      ::placeholder {
        text-align: right;
        direction: rtl;
        font-family: Vazir;
      }
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
    text-align:initial;
    color: #e81123;
    font-size: 13px;
    font-weight: 300;
    margin-top: 8px;
    &.sui-padd{
      margin-top: -10px;
      margin-bottom: 10px;
    }
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
  .ui .segment {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 30px 0px;
    padding: 25px;
}

/**============================== Forms Style ==============================**/
input{
    width: 100% !important;
}
.visible.menu {
    height: 50vh !important;
    /* max-height: 250px !important; */
    max-height: fit-content !important;
}
#kmdriven {
  direction: ltr;
  .visible.menu {
    max-height: fit-content !important;
    text-align: left;
    direction: ltr;
  }
}
.form-control {
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
  padding-right: 25px;
  line-height: 1.4;
  margin-bottom: 10px;
  text-align: right;
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
    right: 0;
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
  padding-right: 30px;
  line-height: 1.3;
  margin-bottom: 10px;
  cursor: pointer;
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
    right: 0;
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

input[type='number'] {
  -moz-appearance: textfield;/*For FireFox*/
  direction:ltr !important;
  text-align:left !important;

  &::-webkit-inner-spin-button, &::-webkit-outer-spin-button { /*For Webkits like Chrome and Safari*/
    -webkit-appearance: none;
    margin: 0;
  }
}

input[type="email"] {
    text-align: left;
    direction: ltr;
}

.colorpicker {
  &.dropdown.icon{
    top: 0 !important;
  }
  background: #fff !important;
  border: 1px solid rgba(34,36,38,.15) !important;

  &.visible{
    .menu {
        width: 222px !important;
        display: flex !important;
        flex-direction: row-reverse;
        flex-wrap: wrap;
        align-content: flex-start;
        align-items: flex-start;
        >.item {
          border-top: none;
          display: inline-block;
          width: auto;
          padding: 5px 0px 0px 13px;
        }
      .circular.label {
        width: 2.5em;
        height: 2.5em;
        border: solid 2px;
      }
    }
  }
}

.item[color~="#FFFFFF"],.colorFFFFFF {
  .label, i {
    background-color: #FFFFFF !important;
  }
}
.item[color~="#000000"], .color000000 {
  .label, i{
    background-color: #000000 !important;
    color: white;
  }
}
.item[color~="#C0C0C0"], .colorC0C0C0 {
  .label, i{
    background-color: #C0C0C0 !important;
  }
}
.item[color~="#808080"], .color808080{
  .label, i{
    background-color: #808080 !important;
  }
}
.item[color~="#FF0000"], .colorFF0000{
  .label, i{
    background-color: #FF0000 !important;
    color: white;
  }
}
.item[color~="#0000FF"], .color0000FF {
  .label, i{
    background-color: #0000FF !important;
    color: white;
  }
}
.item[color~="#CD853F"], .colorCD853F  {
  .label, i {
    background-color: #CD853F !important;
  }
}
.item[color~="#008000"], .color008000  {
  .label, i{ 
    background-color: #008000 !important;
    color: white;
  }
}
.item[color~="#FFFF00"], .colorFFFF00  {
  .label, i {
    background-color: #FFFF00 !important;
  }
}

.error input {
    background: #fff6f6 !important;
    border-color: #e0b4b4 !important;
    color: #9f3a38 !important;
}


.form .disabled.field, .ui.form .disabled.fields .field, .ui.form .field :disabled {
    opacity: 1 !important;
}

.form .field>.selection.dropdown {
    min-height: 48px;
}
/**============================== Colors of semantic UI==============================*/

/** focus colors **/
.ui.checkbox input:checked~.box:after, .ui.checkbox input:checked~label:after,
.ui.checkbox input:focus~.box:after, .ui.checkbox input:focus~label:after  {
    color: rgb(51, 172, 193) !important;
    background: rgba(51, 172, 193, 0.05) !important;
    border-color: rgb(51, 172, 193) !important;
}

.ui.radio.checkbox input:checked~.box:after, .ui.radio.checkbox input:checked~label:after {
    background-color: rgb(51,172,193) !important;
}

.ui.checkbox input:focus~.box:before, .ui.checkbox input:focus~label:before {
    background: rgba(51, 172, 193, 0.05);
}

.ui.dropdown .menu>.item:hover, .ui.dropdown .menu>.item:focus {
    background: rgba(51, 172, 193, 0.05);
}

.ui.dropdown .menu .selected.item, .ui.dropdown.selected {
  background: rgba(51, 172, 193, 0.05);
}
.ui.input input:focus {
    background: rgba(51, 172, 193, 0.05) !important;
}

/** end of focus colors **/

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


.hero_single {
  direction: rtl;
  width: 100%;
  position: relative;
  text-align: center;
  margin: 0;
  .wrapper {
    flex-direction: column;
    justify-content: center;
    height: 100%;
    h3 {
      font-size: 52px;
      font-size: 3.25rem;
      margin: 0;
      text-transform: uppercase;
      font-weight: 700;
      @media (max-width: 767px) {
        font-size: 21px;
        font-size: 1.3125rem;
      }
      @media (max-width: 575px) {
          font-size: 23px;
          font-size: 1.4375rem;
      }
    }
    p {
      font-weight: 300;
      margin: 10px 0 0 0;
      padding: 0 20%;
      font-size: 24px;
      font-size: 1.5rem;
      line-height: 1.4;
      @media (max-width: 767px) {
        padding: 0;
        font-size: 18px;
        font-size: 1.125rem;
      }
      strong {
        font-weight: 600;
      }
    }
  }
  &.short {
    height: 600px;
  }
  &.version_4 {
    height: 620px;
    .wrapper {
      h3 {
        font-size: 42px;
        font-size: 2.625rem;
        text-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);
        @media (max-width: 767px) {
          font-size: 26px;
          font-size: 1.625rem;
          margin-top: 30px;
        }
        @media (max-width: 575px) {
          font-size: 22px;
          font-size: 1.375rem;
        }
      }
      p {
        font-weight: 400;
        margin: 5px 0 20px 0;
        padding: 0;
        font-size: 21px;
        font-size: 1.3125rem;
        text-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);
        @media (max-width: 767px) {
          padding: 0;
          font-size: 14px;
          font-size: 0.875rem;
        }
        strong {
          font-weight: 600;
        } 
      }
      input[type='submit'] {
        color: #222;
        background-color: #FFC107;
        @media (max-width: 991px) {
          margin: 20px 0 0 0;
          border-radius: 3px;
        }
        &:hover {
          background-color: #32a067;
          color: #fff;
        }
      }
    }
  }
  ul.counter {
    margin: 10px 0 0 0;
    padding: 0;
    text-align: center;
    /* @media (max-width: 767px) {
        display: none;
    } */
    li {
      padding: 0  10px;
      display: inline-block;
      font-size: 18px;
      font-size: 1.125rem;
      border-right: 1px solid #fff;
      text-align: right;
      :last-child {
        border-right: none;
        text-align: left;
      }
    }
  }
}
div#filters{
    min-height: 0px;
    height: 0px;
    transition: all .3s;
    overflow: initial;
  }
  div#filters.in {
    min-height: 190px;
    height: auto;
    transition: all .3s;
    overflow: hidden;
  }
  div#filters.visible{
    min-height: 190px;
    height: auto;
    transition: all 1s;
  }
  div#filters.out {
    min-height: 0px;
    height: 0px !important;
    transition: all .3s;
    overflow: hidden;
  }
  div#filters.hidden {
    min-height: 0px;
    height: 0px;
    visibility: hidden;
    overflow: hidden;
  }



  /*   react-input-range */
  .input-range__slider {
    appearance: none;
    background: #ffffff;
    border: 2px solid #3f51b5;
    border-radius: 100%;
    cursor: pointer;
    display: block;
    height: 1.1rem;
    margin-left: -0.5rem;
    margin-top: -0.65rem;
    outline: none;
    position: absolute;
    top: 50%;
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
    width: 1.1rem;
    :active {
      transform: scale(1.3);
    }
    :focus {
      box-shadow: 0 0 0 5px rgba(63, 81, 181, 0.2);
    }
  }
  .input-range--disabled .input-range__slider {
    background: #cccccc;
    border: 1px solid #cccccc;
    box-shadow: none;
    transform: none; }

.input-range__slider-container {
  transition: left 0.3s ease-out; }

.input-range__label {
  color: #aaaaaa;
  font-family: "Helvetica Neue", san-serif;
  font-size: 0.8rem;
  transform: translateZ(0);
  white-space: nowrap; }

.input-range__label--min,
.input-range__label--max {
  bottom: -1.4rem;
  position: absolute; }

.input-range__label--min {
  left: 0; }

.input-range__label--max {
  right: 0; }

.input-range__label--value {
  position: absolute;
  top: -1.8rem; }

.input-range__label-container {
  left: -50%;
  position: relative; }
  .input-range__label--max .input-range__label-container {
    left: 50%; }

.input-range__track {
  background: #eeeeee;
  border-radius: 0.3rem;
  cursor: pointer;
  display: block;
  height: 0.3rem;
  position: relative;
  transition: left 0.3s ease-out, width 0.3s ease-out; }
  .input-range--disabled .input-range__track {
    background: #eeeeee; }

.input-range__track--background {
  left: 0;
  margin-top: -0.15rem;
  position: absolute;
  right: 0;
  top: 50%; }

.input-range__track--active {
  background: #3f51b5; }

.input-range {
  height: 1rem;
  position: relative;
  width: 100%;
  direction: ltr;
}

.noUi-horizontal {
  height: 8px !important;
  border: 1px solid #00000024;
  background: none !important;
}

.noUi-handle {
  top: -8px !important;
  width: 25px !important;
  height: 25px !important;
  border-radius: 50% !important;
  box-shadow: none !important;
}
.noUi-handle:before, .noUi-handle:after {
    content: none !important;
}

#filters_col {
  margin-top: 10px;
  box-shadow: 1px -1px 11px 3px #0000000f;
  width: 260px;
  background-color: #fff;
  padding: 20px 20px 15px 20px;
  margin-bottom: 25px;
  border: 1px solid #ededed;
  label {
    color: #333;
    font-weight: normal;
  }
}
a#filters_col_bt {
  display: block;
  color: #333;
  position: relative;
  font-size: 16px;
  font-size: 1rem;
  font-weight: 600;
  direction: rtl;
  text-align: start;
}
.filter_type {
  h6 {
    border-top: 1px solid #ededed;
    margin: 15px 0;
    padding: 15px 0 0 0;
    font-size: 13px !important;
    font-size: 0.8125rem;
    direction: rtl;
    text-align:right;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 15px 0;
    li {
      margin-bottom: 5px;
      :last-child {
        margin-bottom: 0;
      }
      small {
        float: left;
        position: relative;
        top: 4px;
      }
    }
  }
}

label.dv-star-rating-star {
    float: left !important;
}
.dv-star-rating {
    top: -10px;
    right: -7px;
}



.noUi-target,
.noUi-target * {
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-user-select: none;
  -ms-touch-action: none;
  touch-action: none;
  -ms-user-select: none;
  -moz-user-select: none;
  user-select: none;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.noUi-target {
  position: relative;
  direction: ltr;
}
.noUi-base,
.noUi-connects {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}
/* Wrapper for all connect elements.
 */
.noUi-connects {
  overflow: hidden;
  z-index: 0;
}
.noUi-connect,
.noUi-origin {
  will-change: transform;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  -ms-transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
  -webkit-transform-style: preserve-3d;
  transform-origin: 0 0;
  transform-style: flat;
  background: #00ACC1 !important;
}
/* Offset direction
 */
html:not([dir="rtl"]) .noUi-horizontal .noUi-origin {
  left: auto;
  right: 0;
}
/* Give origins 0 height/width so they don't interfere with clicking the
 * connect elements.
 */
.noUi-vertical .noUi-origin {
  width: 0;
}
.noUi-horizontal .noUi-origin {
  height: 0;
}
.noUi-handle {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  position: absolute;
}
.noUi-touch-area {
  height: 100%;
  width: 100%;
}
.noUi-state-tap .noUi-connect,
.noUi-state-tap .noUi-origin {
  -webkit-transition: transform 0.3s;
  transition: transform 0.3s;
}
.noUi-state-drag * {
  cursor: inherit !important;
}
/* Slider size and handle placement;
 */
.noUi-horizontal {
  height: 18px;
}
.noUi-horizontal .noUi-handle {
  width: 34px;
  height: 28px;
  left: -17px;
  top: -6px;
}
.noUi-vertical {
  width: 18px;
}
.noUi-vertical .noUi-handle {
  width: 28px;
  height: 34px;
  left: -6px;
  top: -17px;
}
html:not([dir="rtl"]) .noUi-horizontal .noUi-handle {
  right: -17px;
  left: auto;
}
/* Styling;
 * Giving the connect element a border radius causes issues with using transform: scale
 */
.noUi-target {
  background: #FAFAFA;
  border-radius: 4px;
  border: 1px solid #D3D3D3;
  box-shadow: inset 0 1px 1px #F0F0F0, 0 3px 6px -5px #BBB;
}
.noUi-connects {
  border-radius: 3px;
}
.noUi-connect {
  background: #3FB8AF;
}
/* Handles and cursors;
 */
.noUi-draggable {
  cursor: ew-resize;
}
.noUi-vertical .noUi-draggable {
  cursor: ns-resize;
}
.noUi-handle {
  border: 1px solid #D9D9D9;
  border-radius: 3px;
  background: #FFF;
  cursor: default;
  box-shadow: inset 0 0 1px #FFF, inset 0 1px 7px #EBEBEB, 0 3px 6px -3px #BBB;
}
.noUi-active {
  box-shadow: inset 0 0 1px #FFF, inset 0 1px 7px #DDD, 0 3px 6px -3px #BBB;
}
/* Handle stripes;
 */
.noUi-handle:before,
.noUi-handle:after {
  content: "";
  display: block;
  position: absolute;
  height: 14px;
  width: 1px;
  background: #E8E7E6;
  left: 14px;
  top: 6px;
}
.noUi-handle:after {
  left: 17px;
}
.noUi-vertical .noUi-handle:before,
.noUi-vertical .noUi-handle:after {
  width: 14px;
  height: 1px;
  left: 6px;
  top: 14px;
}
.noUi-vertical .noUi-handle:after {
  top: 17px;
}
/* Disabled state;
 */
[disabled] .noUi-connect {
  background: #B8B8B8;
}
[disabled].noUi-target,
[disabled].noUi-handle,
[disabled] .noUi-handle {
  cursor: not-allowed;
}
/* Base;
 *
 */
.noUi-pips,
.noUi-pips * {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.noUi-pips {
  position: absolute;
  color: #999;
}
/* Values;
 *
 */
.noUi-value {
  position: absolute;
  white-space: nowrap;
  text-align: center;
}
.noUi-value-sub {
  color: #ccc;
  font-size: 10px;
}
/* Markings;
 *
 */
.noUi-marker {
  position: absolute;
  background: #CCC;
}
.noUi-marker-sub {
  background: #AAA;
}
.noUi-marker-large {
  background: #AAA;
}
/* Horizontal layout;
 *
 */
.noUi-pips-horizontal {
  padding: 10px 0;
  height: 80px;
  top: 100%;
  left: 0;
  width: 100%;
}
.noUi-value-horizontal {
  transform: translate(-50%, 50%);
}
.noUi-rtl .noUi-value-horizontal {
  transform: translate(50%, 50%);
}
.noUi-marker-horizontal.noUi-marker {
  margin-left: -1px;
  width: 2px;
  height: 5px;
}
.noUi-marker-horizontal.noUi-marker-sub {
  height: 10px;
}
.noUi-marker-horizontal.noUi-marker-large {
  height: 15px;
}
/* Vertical layout;
 *
 */
.noUi-pips-vertical {
  padding: 0 10px;
  height: 100%;
  top: 0;
  left: 100%;
}
.noUi-value-vertical {
  transform: translate(0, -50%);
  padding-left: 25px;
}
.noUi-rtl .noUi-value-vertical {
  transform: translate(0, 50%);
}
.noUi-marker-vertical.noUi-marker {
  width: 5px;
  height: 2px;
  margin-top: -1px;
}
.noUi-marker-vertical.noUi-marker-sub {
  width: 10px;
}
.noUi-marker-vertical.noUi-marker-large {
  width: 15px;
}
.noUi-tooltip {
  display: block;
  position: absolute;
  border: 1px solid #D9D9D9;
  border-radius: 3px;
  background: #fff;
  color: #000;
  padding: 5px;
  text-align: center;
  white-space: nowrap;
}
.noUi-horizontal .noUi-tooltip {
  transform: translate(-50%, 0);
  left: 50%;
  bottom: 120%;
}
.noUi-vertical .noUi-tooltip {
  transform: translate(0, -50%);
  top: 50%;
  right: 120%;
}


input[type="color"],
input[type="date"],
input[type="datetime"],
input[type="datetime-local"],
input[type="email"],
input[type="month"],
input[type="number"],
input[type="password"],
input[type="search"],
input[type="tel"],
input[type="text"],
input[type="time"],
input[type="url"],
input[type="week"],
select:focus,
textarea {
  /* font-size: 16px !important; */
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
