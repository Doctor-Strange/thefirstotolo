import * as React from 'react';
import Header from './Header';
import { SubHeader } from './SubHeader';
import Footer from './Footer';
import Head from 'next/head';
import { i18n, withNamespaces } from '../i18n';

class Layout extends React.Component<{
  haveSubHeader: boolean;
  pageTitle: string;
  t: any;
}> {
  [x: string]: any;

  static async getInitialProps() {
    return {
      namespacesRequired: ['common']
    };
  }

  changeLang = () => {
    console.log('changeLang happend ', i18n.language);
    i18n.changeLanguage(i18n.language === 'en' ? 'fa' : 'en');
  };

  render() {
    const { t, pageTitle, children } = this.props;
    return (
      <div id="layout">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        <Header headerBtn={t('h1')} changeLang={this.changeLang} />
        {this.propshaveSubHeader ? <SubHeader title={pageTitle} /> : null}
        <main>{children}</main>
        <Footer changeLangFunc={this.changeLang} />
      </div>
    );
  }
}

export default withNamespaces('common')(Layout);
