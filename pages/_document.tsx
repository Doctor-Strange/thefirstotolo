import * as React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import {
  DEV,
  FB_TRACKING_ID,
  SENTRY_TRACKING_ID,
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_NAME,
  SITE_TITLE
} from '../src/constants/env';
import * as Sentry from '@sentry/browser';

process.on('unhandledRejection', (err) => {
  Sentry.captureException(err);
});

process.on('uncaughtException', (err) => {
  Sentry.captureException(err);
});


export default class extends Document {
  static async getInitialProps(...args) {
    const { req, renderPage } = args[0];
    // Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();
    // Retrieve styles from components in the page
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    // Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    const documentProps = await Document.getInitialProps(...args);

    return { ...documentProps, ...page, styleTags };
  }
  props: any; // fixme

  render() {
    return (
      <html lang="fa">
        <Head>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
          />
          {/* Import CSS for nprogress */}
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />

          <meta name="theme-color" content="#00ACC1" />
          <link rel="apple-touch-icon" href="/static/icon.png" />
          <meta name="apple-mobile-web-app-title" content="Otoli Alpha!" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />


          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={SITE_NAME} />
          <meta property="og:title" content={SITE_TITLE} />
          <meta property="og:description" content={SITE_DESCRIPTION} />
          <meta property="og:image" content={SITE_IMAGE} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={SITE_NAME} />
          <meta name="twitter:title" content={SITE_TITLE} />
          <meta name="twitter:description" content={SITE_DESCRIPTION} />
          <meta property="twitter:image" content={SITE_IMAGE} />
          <meta
            name="format-detection"
            content="telephone=no, address=no, email=no"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
            integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Array.prototype.find,Array.prototype.includes,String.prototype.includes,Array.prototype.findIndex,Object.entries" />
          {!DEV && FB_TRACKING_ID && (
            <script
              dangerouslySetInnerHTML={{
                __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0'; n.queue=[];t=b.createElement(e);t.async=!0; t.src=v;s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)}(window,document,'script', 'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', '${FB_TRACKING_ID}');
fbq('track', 'PageView'); `
              }}
            />
          )}
          {!DEV && FB_TRACKING_ID && (
            <noscript>
              <img
                height="1"
                width="1"
                src={`//www.facebook.com/tr?id=${FB_TRACKING_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          )}
          {!DEV && SENTRY_TRACKING_ID && (
            <>
              <script
                src="https://cdn.ravenjs.com/3.17.0/raven.min.js"
                {...{ crossOrigin: 'anonymous' }}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `Raven.config('https://${SENTRY_TRACKING_ID}@sentry.io/156600').install()`
                }}
              />
            </>
          )}
          {/* Output the styles in the head */}
          {this.props.styleTags}
        </Head>
        <body>
          <div id="page">
            <Main />
          </div>
          <NextScript />
        </body>
      </html>
    );
  }
}
