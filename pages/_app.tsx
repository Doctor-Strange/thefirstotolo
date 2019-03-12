import 'isomorphic-fetch';
import * as React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { getStore } from '../src/store';
import { ltrTheme, rtlTheme } from '../src/theme/directions';
import { GlobalStyle, lightTheme } from '../src/theme/globalStyle';
import { appWithTranslation } from '../src/i18n';

class OtoliApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    const server = !!ctx.req;
    const store = getStore(undefined, server);
    const state = store.getState();
    const out = { state, server } as any;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, ...out };
  }

  render() {
    const { props } = this as any;
    const { Component, pageProps } = props;
    const store = getStore(undefined, props.server);
    return (
      <Container>
        <GlobalStyle />

        <Provider store={store}>
          <ThemeProvider
            theme={{
              direction:
                store.getState().system.lang === 'fa' ? rtlTheme : ltrTheme,
              mode: lightTheme
            }}
          >
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default appWithTranslation(OtoliApp);
