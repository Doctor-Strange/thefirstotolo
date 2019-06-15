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
    background: #fafafa;
    font-size: 1rem;
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
  hr{

  }
  h5{
    color: #555 !important;
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
    .car_det_wrapper {
      z-index: -1;
      &.checkout{
        z-index: 1;
        .car_det {
          padding: 25px 16px 15px 16px;
        }
      }
      .car_det {
        background-color: #fff;
        padding: 25px 25px 15px 25px;
        box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.1);
        border-radius: 3px;
        margin-bottom: 30px;
      }
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
    .profile_page,#checkout{
      flex-direction: column-reverse;
    }
    .hero_single .wrapper {
      flex-direction: unset !important;
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
        width: 340px;
      }
    }
  }
  ul.slider-list {
    max-height: 550px;
  }
  @media (max-width: 768px){
    .slider-control-centerleft,.slider-control-centerright {
        display: none;
    }
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

input[inputmode="numeric"],  div[inputMode='numeric'] input {
    direction: ltr !important;
    text-align: left;
}
.field {
  margin-bottom:18px !important;
}
  .fields:not(.inline) { 
    margin-bottom:0px !important;
    .field {
      width: 100%;
      margin-bottom:18px !important;
    }
  }
  .fields.inline, *[inputmode='numeric'] { 
      margin-bottom:18px !important;
  }
  &.no_margin{
  margin-bottom:0px !important;
}
  .rtl {
    text-align:right;

    .column.row.property {
      direction:rtl;
    }
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
    .basic.button, .basic.buttons .button {
      box-shadow: 0 0 0 1px #00ACC1 inset;
      color: #00ACC1 !important;
    }
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
        color:White;
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
        color: white;
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
  .index-box{
    background-color: #FFFFFF;
    box-shadow: 0 2 0 5px #000000;
    padding: 32px;
    &>div {
      padding: 0px 8px;
    }
    .pickerbox {
      width:50%
    }
    .field {
      margin-bottom: 4px !important;
    }
    
    .btn_1 {
      bottom: -25px;
      position: relative;
    }
    .DatePicker__calendarContainer {
      transition: all .5s;
    }
    input.DatePicker__input {
      cursor: pointer;
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

.DateInput_input{
  text-align:center;
}


.swal-overlay--show-modal .swal-modal {
    animation: none !important;
}

.swal-footer {
    text-align: center;
}

.swal-button {
    color: #fff;
    border: none;
    font-weight: 600;
    font-size: 14px;
    padding: 10px 24px;
    margin: 0;
    cursor: pointer;
    background-color: #00ACC1;
    display: block;
    width: 100%;
    text-align: center;
    margin-bottom: 5px;
    box-shadow: 0 0 0 0 rgba(34,36,38,.15) inset;
    border-radius: .28571429rem;
    font-family: Vazir;
    :focus {
      background-color: #0097A7;
    }
    :focus {
      outline: none;
      box-shadow: none;
    }
}

.ui.horizontal.divider {
  &:before, &:after{
    display:none;
  }
}

.marg8 {
  margin-bottom: 8px !important;
}


.hero_mother {
  @media (max-width: 767px) {
    height: 190px;
  }
}

.hero_in {
  width: 100%;
  height: 450px;
  position: relative;
  overflow: hidden;
  max-width: 1170px;
  margin: 0 auto;
  @media (max-width: 767px) {
    height: 350px;
  }
}

.hero_in.shop_detail {
  height: 550px;
}
@media (max-width: 767px) {
  .hero_in.shop_detail {
    height: 350px;
  }
}
.hero_in.shop_detail:before {
  background: url(../img/hero_in_shop_detail.jpg) center center no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.hero_in.shop_detail .wrapper {
  background-color: black;
  background-color: rgba(0, 0, 0, 0.2);
}
.hero_in.hotels_detail {
  height: 550px;
  @media (max-width: 767px) {
    /* height: 350px; */
    height: 100%;
  }
}
.hero_in.hotels_detail:before {
  background: url(../img/hero_in_hotels_detail.jpg) center center no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.hero_in.hotels_detail .wrapper {
  background-color: black;
  background-color: rgba(0, 0, 0, 0.2);
}
.hero_in.restaurant_detail {
  height: 550px;
}
@media (max-width: 767px) {
  .hero_in.restaurant_detail {
    height: 350px;
  }
}
.hero_in.restaurant_detail:before {
  background: url(../img/hero_in_restaurants_detail.jpg) center center no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.hero_in.restaurant_detail .wrapper {
  background-color: black;
  background-color: rgba(0, 0, 0, 0.2);
}
.hero_in:before {
  animation: pop-in 5s 0.1s cubic-bezier(0, 0.5, 0, 1) forwards;
  content: "";
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
}
.hero_in .wrapper {
  height: 100%;
}
.hero_in a.btn_photos {
  position: absolute;
  left: 20px;
  bottom: 20px;
  background-color: #fff;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  border-radius: 3px;
  -webkit-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);
  line-height: 1;
  padding: 10px 15px;
  color: #444;
  font-weight: 500;
}
.hero_in a.btn_photos:hover {
  color: #004dda;
}

/* Animations */
@keyframes pop-in {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
    transform: scale(1.1);
  }
}
.secondary_nav {
  background: #004dda;
  padding: 15px 0;
}
.secondary_nav.is_stuck {
  z-index: 99;
  width: 100% !important;
  left: 0;
}
.secondary_nav ul {
  margin-bottom: 0;
}
.secondary_nav ul li {
  display: inline-block;
  margin-right: 20px;
  font-weight: 500;
  font-size: 16px;
  font-size: 1rem;
}
.secondary_nav ul li a {
  color: rgba(255, 255, 255, 0.5);
}
.secondary_nav ul li a:hover {
  color: #fff;
  opacity: 1;
}
.secondary_nav ul li a.active {
  color: white;
}
.secondary_nav ul li:last-child {
  display: none;
}
@media (max-width: 575px) {
  .secondary_nav ul li:last-child {
    display: inline-block;
  }
}

.carousel_detail {
  margin-bottom: 40px;
}
.carousel_detail .item {
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  border-radius: 3px;
  overflow: hidden;
}
.carousel_detail .owl-nav {
  position: absolute;
  bottom: 5px;
  right: 5px;
}
.carousel_detail .owl-nav [class*='owl-'] {
  border-radius: 3px !important;
  padding: 4px 5px 2px 5px !important;
  background: #222 !important;
  transition: all 0.3s ease;
}
.carousel_detail .owl-nav [class*='owl-'] i {
  font-size: 24px;
  line-height: 1;
  margin: 0;
}
.carousel_detail .owl-nav [class*='owl-']:hover {
  background: #004dda !important;
}

.detail_title_1 {
  margin-bottom: 25px;
}
.detail_title_1 h1 {
  font-size: 32px;
  font-size: 2rem;
  margin: 0;
}
.detail_title_1 ul {
  float: right;
  margin: 10px 0 0 0;
}
.detail_title_1 ul li {
  display: inline-block;
  margin-right: 20px;
  font-weight: 500;
}

section#description, section#reviews {
  border-bottom: 3px solid #d2d8dd;
  margin-bottom: 30px;
}
section#description h2, section#reviews h2 {
  font-size: 24px;
  font-size: 1.5rem;
}
section#description h3, section#reviews h3 {
  font-size: 21px;
  font-size: 1.3125rem;
}
section#description h4, section#reviews h4 {
  font-size: 18px;
  font-size: 1.125rem;
}
section#description hr, section#reviews hr {
  border-color: #d2d8dd5d;
}

section#reviews {
  border-bottom: none;
}

#review_summary {
  text-align: center;
  background-color: #32a067;
  color: #fff;
  padding: 20px 10px;
  border-radius: 3px 3px 3px 0;
}
@media (max-width: 991px) {
  #review_summary {
    margin-bottom: 15px;
  }
}
#review_summary strong {
  font-size: 42px;
  font-size: 2.625rem;
  display: block;
  line-height: 1;
}
#review_summary em {
  font-style: normal;
  font-weight: 500;
  display: block;
}

.reviews-container .progress {
  margin-bottom: 12px;
}
.reviews-container .progress-bar {
  background-color: #32a067;
}
.reviews-container .review-box {
  position: relative;
  margin-bottom: 25px;
  padding-left: 100px;
  min-height: 100px;
}
@media (max-width: 767px) {
  footer {
    display: none;
  }
  .reviews-container .review-box {
    padding-left: 0;
  }
}
.reviews-container .rev-thumb {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 80px;
  height: 80px;
  background: #ffffff;
  border-radius: 3px;
  overflow: hidden;
}
.reviews-container .rev-thumb img {
  width: 80px;
  height: auto;
}
@media (max-width: 767px) {
  .reviews-container .rev-thumb {
    position: static;
    margin-bottom: 10px;
  }
}
.reviews-container .rev-content {
  position: relative;
  padding: 25px 25px 1px 25px;
  border-radius: 3px;
  background-color: #fff;
}
.reviews-container .rev-info {
  font-size: 12px;
  font-size: 0.75rem;
  font-style: italic;
  color: #777;
  margin-bottom: 10px;
}

.box_detail {
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  margin-bottom: 30px;
}
/* .box_detail .price {
  line-height: 1;
  border-bottom: 1px solid #ededed;
  margin: 0 -25px 25px -25px;
  padding: 0 25px 15px 25px;
}
.box_detail .price > span {
  font-size: 31px;
  font-size: 1.9375rem;
  font-weight: 600;
}
.box_detail .price > span > small {
  font-size: 11px;
  font-size: 0.6875rem;
  font-weight: 500; */
}
.box_detail .price .score {
  float: right;
  top: -10px;
  position: relative;
}
.score strong {
  background-color: #32a067;
  color: #fff;
  line-height: 1;
  border-radius: 5px 5px 5px 0;
  padding: 10px;
  display: inline-block;
}
.score span {
  display: inline-block;
  position: relative;
  top: 7px;
  margin-right: 8px;
  font-size: 12px;
  font-size: 0.75rem;
  text-align: right;
  line-height: 1.1;
  font-weight: 500;
}
.score span em {
  display: block;
  font-weight: normal;
  font-size: 11px;
  font-size: 0.6875rem;
}
.box_detail h3 {
  font-size: 20px;
  font-size: 1.25rem;
  margin: 25px 0 10px 0;
}
.box_detail ul {
  margin-bottom: 0;
}
.box_detail ul li {
  margin-bottom: 5px;
}
.box_detail ul li i {
  margin-right: 8px;
}
.box_detail {
  .usercard {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    .hostDetailCard-responseTime{
      font-size: 13px;
    }
  }
}


ul.share-buttons {
  padding: 0;
  list-style: none;
  text-align: center;
  margin: 0 0 25px 0;
}
ul.share-buttons li {
  display: inline-block;
  margin: 0 5px 5px 5px;
}
ul.share-buttons li a {
  background: #fff;
  border: 1px solid #666;
  border-radius: 50px;
  font-weight: 500;
  font-size: 13px;
  padding: 7px 20px;
  transition: 0.3s;
  display: inline-block;
  line-height: 17px;
  font-weight: 500;
}
ul.share-buttons li a:hover {
  color: #fff;
}
ul.share-buttons li a.fb-share {
  border-color: #3b5998;
  color: #3b5998;
}
ul.share-buttons li a.fb-share:hover {
  background: #3b5998;
  color: #fff;
}
ul.share-buttons li a.gplus-share {
  border-color: #dd4b39;
  color: #dd4b39;
}
ul.share-buttons li a.gplus-share:hover {
  background: #dd4b39;
  color: #fff;
}
ul.share-buttons li a.twitter-share {
  border-color: #1da1f2;
  color: #1da1f2;
}
ul.share-buttons li a.twitter-share:hover {
  background: #1da1f2;
  color: #fff;
}
ul.share-buttons li i {
  font-size: 16px;
  font-size: 1rem;
  position: relative;
  right: 3px;
  top: 2px;
}

a.address {
  display: inline-block;
  font-weight: 500;
  color: #999;
  line-height: 1;
}
a.address:before {
  font-family: 'ElegantIcons';
  content: "\e01c";
  margin-right: 5px;
  display: inline-block;
}
a.address:hover {
  color: #004dda;
}

ul.bullets {
  line-height: 1.8;
  margin: 0;
  padding: 0;
}
ul.bullets li {
  position: relative;
  padding-left: 23px;
}

.h5, h5 {
    font-size: 1.25rem;
}

.table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(0,0,0,.05);
}
.table {
    width: 100%;
    margin-bottom: 1rem;
    background-color: transparent;
    td, th {
      padding: .75rem;
      vertical-align: top;
      /* border-top: 1px solid #dee2e6; */
  }
}

.navbar {
  padding: 20px 0;
  color: #fff;
  background: #004dda;
  position: relative;
  z-index: 999 !important;
  text-align:center;
  h4 {
    color: #fff;
    margin: 12px 0 0 0;
    padding: 0;
    line-height: 1;
    font-size: 16px;
    font-size: 1rem;
    direction: rtl;
    line-height: 24px;
    @media (max-width: 991px) {
      margin: 5px 0 0 0;
    }
    @media (max-width: 767px) {
      margin: 3px 0 0 0;
    }
  }
}

.slider {
    height: 100% !important;
}
.strip.grid.usercard{
  min-width: 300px;
  width: 400px;
  max-width: 100%;
  margin: 10px 10px;
  /* background-color: #fff; */
  display: block;
  position: relative;
  margin-bottom: 30px;
  border-radius: 3px;
  box-shadow: 1px -1px 11px 3px #00000005; 
  margin: 10px auto;
  direction: rtl;
}

.thelist {
  list-style: none;
  margin: 0px 0px 20px;
  padding: 0px;
  li {
    margin-bottom: 8px;
    padding-bottom: 4px;
    font-weight: 500;
    border-bottom: 1px solid rgba(237, 237, 237, 0.36);
    :last-child {
      font-size: 18px;
      font-weight: 600;
    }
  }
}
.float-left {
  float: left !important;
  direction: rtl;
}

.DatePicker__calendarContainer {
  opacity: 1;
  z-index:99;
}

.DatePicker__calendarContainer.fadein {
  opacity: 0;
  animation: fadeIn 0.1s ease-in;
  transition: all 0.1s ease-in;
}

.DatePicker__calendarContainer.fadeout {
  opacity: 0;
  animation: fadeOut 0.4s ease-in;
  transition: all 0.4s ease-in;
  transform: translateX(-50%);
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
