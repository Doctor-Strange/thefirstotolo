import 'isomorphic-fetch';
import * as React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { getStore } from '../src/store';
import { rtlTheme } from '../src/theme/directions';
import { GlobalStyle, lightTheme } from '../src/theme/globalStyle';

export default class extends App {
  static async getInitialProps({ Component, router, ctx }) {
    const server = !!ctx.req;
    const store = getStore(undefined, server);
    const state = store.getState();
    const out = { state, server } as any;

    if (Component.getInitialProps) {
      return {
        ...out,
        pageProps: {
          ...(await Component.getInitialProps(ctx))
        }
      };
    }

    return out;
  }

  render() {
    const { props } = this as any;
    const { Component, pageProps } = props;

    return (
      <Container>
        <GlobalStyle />
        <Provider store={getStore(undefined, props.server)}>
          <ThemeProvider theme={rtlTheme}>
            <ThemeProvider theme={lightTheme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}
