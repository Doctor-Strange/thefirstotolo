import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { ltrTheme, rtlTheme } from '../../theme/directions';
import { connect } from 'react-redux';
import { changeLang } from '../../redux/system';
import { Header, SubHeader } from '../Header';
import Footer from '../Footer';
import Head from 'next/head';
import { i18n, withNamespaces } from '../../i18n';

class Layout extends React.Component<{
  haveSubHeader: boolean;
  pageTitle: string;
  t: any;
  changeLang: any;
}> {
  [x: string]: any;

  static async getInitialProps() {
    return {
      namespacesRequired: ['common']
    };
  }

  changeLang_i18n = () => {
    console.log('changeLang happend ', i18n.language);
    i18n.changeLanguage(i18n.language === 'en' ? 'fa' : 'en');
    this.props.changeLang(i18n.language === 'en' ? 'fa' : 'en');
  };

  render() {
    const theme = i18n.language == 'fa' ? rtlTheme : ltrTheme;
    const { t, pageTitle, children } = this.props;
    return (
      <ThemeProvider
        theme={{
          lang: i18n.language,
          direction: theme
        }}
      >
        <div id="layout" className={theme.direction}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
          </Head>
          <Header headerBtn={t('h1')} changeLang={this.changeLang_i18n} />
          {this.propshaveSubHeader ? <SubHeader title={pageTitle} /> : null}
          <main>{children}</main>
          <Footer changeLangFunc={this.changeLang_i18n} />
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({}) => ({});

export default connect(
  mapStateToProps,
  { changeLang }
)(withNamespaces('common')(Layout));
