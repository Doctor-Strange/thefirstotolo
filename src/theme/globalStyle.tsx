import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
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


  /** bootstrap styles **/
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
  /** to remove **/
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
  
`;

const lightTheme = {
  main: '#fff'
};

const darkTheme = {
  main: '#000'
};

export { GlobalStyle, lightTheme, darkTheme };
