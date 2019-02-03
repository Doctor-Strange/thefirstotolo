import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => (props.whiteColor ? 'white' : 'black')};
  }
`;

const lightTheme = {
  main: '#fff'
};

const darkTheme = {
  main: '#000'
};

export { GlobalStyle, lightTheme, darkTheme };
