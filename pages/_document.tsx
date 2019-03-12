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

import Vazir_eot from '../static/fonts/Vazir.eot';
import Vazir_woff from '../static/fonts/Vazir.woff';
import Vazir_woff2 from '../static/fonts/Vazir.woff2';
import Vazir_ttf from '../static/fonts/Vazir.ttf';

import VazirBold_eot from '../static/fonts/Vazir-Bold.eot';
import VazirBold_woff from '../static/fonts/Vazir-Bold.woff';
import VazirBold_woff2 from '../static/fonts/Vazir-Bold.woff2';
// import VazirBold_ttf from '../static/fonts/Vazir-Bold.ttf';

import VazirBlack_eot from '../static/fonts/Vazir-Black.eot';
import VazirBlack_woff from '../static/fonts/Vazir-Black.woff';
import VazirBlack_woff2 from '../static/fonts/Vazir-Black.woff2';
// import VazirBlack_ttf from '../static/fonts/Vazir-Black.ttf';

import VazirMedium_eot from '../static/fonts/Vazir-Medium.eot';
import VazirMedium_woff from '../static/fonts/Vazir-Medium.woff';
import VazirMedium_woff2 from '../static/fonts/Vazir-Medium.woff2';
// import VazirBlack_ttf from '../static/fonts/Vazir-Medium.ttf';

import VazirLight_eot from '../static/fonts/Vazir-Light.eot';
import VazirLight_woff from '../static/fonts/Vazir-Light.woff';
import VazirLight_woff2 from '../static/fonts/Vazir-Light.woff2';
// import Vazir_ttf from '../static/fonts/Vazir-Light.ttf';

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
      <html lang="ko">
        <Head>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
          />
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
          <style>
            {`
@font-face {
  font-family: Vazir;
  src: url('${Vazir_eot}');
  src: url('${Vazir_eot}?#iefix') format('embedded-opentype'),
       url('${Vazir_woff2}') format('woff2'),
       url('${Vazir_woff}') format('woff'),
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: Vazir;
  src: url('${VazirBold_eot}');
  src: url('${VazirBold_eot}?#iefix') format('embedded-opentype'),
       url('${VazirBold_woff2}') format('woff2'),
       url('${VazirBold_woff}') format('woff'),
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: Vazir;
  src: url('${VazirBlack_eot}.eot');
  src: url('${VazirBlack_eot}?#iefix') format('embedded-opentype'),
       url('${VazirBlack_woff2}') format('woff2'),
       url('${VazirBlack_woff}') format('woff'),
  font-weight: 900;
  font-style: normal;
}
@font-face {
  font-family: Vazir;
  src: url('${VazirMedium_eot}');
  src: url('${VazirMedium_eot}?#iefix') format('embedded-opentype'),
       url('${VazirMedium_woff2}') format('woff2'),
       url('${VazirMedium_woff}') format('woff')
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: Vazir;
  src: url('${VazirLight_eot}');
  src: url('${VazirLight_eot}?#iefix') format('embedded-opentype'),
       url('${VazirLight_woff2}') format('woff2'),
       url('${VazirLight_woff}') format('woff')
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: Vazir;
  src: url('Vazir-Thin.eot');
  src: url('Vazir-Thin.eot?#iefix') format('embedded-opentype'),
       url('Vazir-Thin.woff2') format('woff2'),
       url('Vazir-Thin.woff') format('woff')
  font-weight: 100;
  font-style: normal;
}
            `}
          </style>
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
