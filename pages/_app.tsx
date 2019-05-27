import 'isomorphic-fetch';
import * as React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
// import jsCookie from 'js-cookie';
import { GlobalStyle, lightTheme } from '../src/theme/globalStyle';
import { appWithTranslation } from '../src/i18n';
import { Provider, actions } from '../src/store'

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
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    // authenticate the user if he is longed in
    actions.auth();
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
