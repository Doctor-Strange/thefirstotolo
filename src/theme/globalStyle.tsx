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
    .col-lg-3 {
        flex: 0 0 25%;
        max-width: 25%;
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
