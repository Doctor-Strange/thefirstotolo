import 'isomorphic-fetch';
import * as React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
// import jsCookie from 'js-cookie';
import { getStore } from '../src/store';
import { GlobalStyle, lightTheme } from '../src/theme/globalStyle';
import { appWithTranslation } from '../src/i18n';

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});

Router.events.on('hashChangeStart', url => {
  console.log(`hashChangeStart: ${url}`);
});

Router.events.on('routeChangeComplete', () => {
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
    const store = getStore(undefined, server);
    const state = store.getState();
    const out = { state, server } as any;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, ...out };
  }

  componentDidMount() {
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
    // const token = jsCookie.get('token');
    // const url = {
    //   pathname: '/',
    //   query: {
    //     require_signup: true,
    //     go_to: Router.route
    //   }
    // };
    // console.log(Router.route);
    // if (!token && (Router.route == '/add-car'
    //   || Router.route == '/complete-register'
    //   || Router.route == '/set-car-timing')) {
    //   Router.push(url, url)
    //     .then(res => {
    //       console.log(res);
    //     }).catch(error => {
    //       // tslint:disable-next-line:no-console
    //       console.error(error);
    //     });
    // }
  }

  render() {
    const { props } = this as any;
    const { Component, pageProps } = props;
    const store = getStore(undefined, props.server);
    return (
      <Container>
        <GlobalStyle />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default appWithTranslation(OtoliApp);
