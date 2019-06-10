import * as React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { GlobalStyle, lightTheme } from '../src/theme/globalStyle';
import "otoli-react-persian-calendar-date-picker/lib/DatePicker.css";
import { appWithTranslation } from '../src/i18n';
import { Provider, actions } from '../src/store';

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});

Router.events.on('hashChangeStart', url => {
  console.log(`hashChangeStart: ${url}`);
});

Router.events.on('routeChangeComplete', () => {
  if (process.env.NODE_ENV !== 'production') {
    const els = document.querySelectorAll('link[href*="/_next/static/css/styles.chunk.css"]');
    const timestamp = new Date().valueOf();
    els[0].href = '/_next/static/css/styles.chunk.css?v=' + timestamp;
  }
  console.log(`Complete loading`);
  NProgress.done()
});

Router.events.on('routeChangeError', (err, url) => {
  console.log(`Error loading: ${url}`);
  console.error(err);
  NProgress.done()
});

class OtoliApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    const server = !!ctx.req;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    // authenticate the user if he is longed in
    actions.auth();
    // todo: redirect user if he wasn't authorized
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('service worker registration successful')
        })
        .catch(err => {
          console.warn('service worker registration failed', err.message)
        })
    }
  }

  render() {
    const { props } = this as any;
    const { Component, pageProps } = props;
    return (
      <Container>
        <GlobalStyle />
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default appWithTranslation(OtoliApp);
