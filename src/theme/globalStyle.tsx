import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
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
    font-family: Poppins, Helvetica, sans-serif;
    color: #555;
    font-weight: 400;
    text-align: left;
    display: block;
    padding: 0;
    margin: 0;
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
      -ms-flex: 0 0 50%;
      flex: 0 0 50%;
      max-width: 50%;
    }
    .col-lg-3 {
        flex: 0 0 25%;
        max-width: 25%;
    }
  }

  .mt-1 {
      margin-top: .25rem!important;
  }

  .float-right {
      float: right!important;
  }

  .float-left {
      float: left!important;
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

  .form-group {
    margin-bottom: 1rem;
  }
  
  .text-center {
      text-align: center!important;
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
    position: absolute;
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
    padding: 15px 30px;
    color: #fff;
    font-weight: 600;
    text-align: center;
    line-height: 1;
    transition: all 0.3s ease-in-out;
    border-radius: 3px;

    :hover {
      background-color: #FFC107;
      color: #222 !important;
    }

    &.full-width {
      display: block;
      width: 100%;
      text-align: center;
      margin-bottom: 5px;

      .purchase {
        background-color: #004dda;
        :hover {
          background-color: #32a067;
          color: #fff !important;
        }
      }
      
      .wishlist {
        border-color: #555;
        color: #555;
        :hover {
          color: #fff !important;
          background-color: #555;
          border-color: #555;
        }
      }

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
        color: #fff;
        border-color: #0054a6;
      }

      :focus {
        outline: none;
      }
    }
  }

  /**============================== Forms Style ==============================**/
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
`;

const lightTheme = {
  main: '#fff'
};

const darkTheme = {
  main: '#000'
};

export { GlobalStyle, lightTheme, darkTheme };
