import * as React from 'react';
import Header from './Header';
import { SubHeader } from './SubHeader';
import Footer from './Footer';
import Head from 'next/head';

export const Layout: React.FunctionComponent<{
  haveSubHeader: boolean;
  pageTitle: string;
}> = ({ children, haveSubHeader, pageTitle }) => (
  <div id="layout">
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
    </Head>
    <Header />
    {haveSubHeader ? <SubHeader title={pageTitle} /> : null}
    <main>{children}</main>
    <Footer />
  </div>
);
