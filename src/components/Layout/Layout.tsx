import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  Header as SemanticHeader,
  Icon,
  Menu,
  Segment,
  Sidebar
} from 'semantic-ui-react';
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

  state = { visible: false };

  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });
  handleSidebarHide = () => this.setState({ visible: false });

  changeLang_i18n = () => {
    console.log('changeLang happend ', i18n.language);
    i18n.changeLanguage(i18n.language === 'en' ? 'fa' : 'en');
    this.props.changeLang(i18n.language === 'en' ? 'fa' : 'en');
  };

  render() {
    const theme = i18n.language == 'en' ? ltrTheme : rtlTheme;
    console.log(i18n.language);
    const { t, pageTitle, children } = this.props;
    return (
      <ThemeProvider
        theme={{
          lang: i18n.language,
          direction: theme
        }}
      >
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="push"
            icon="labeled"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={this.state.visible}
            width="thin"
          >
            <Menu.Item as="a">
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="gamepad" />
              Games
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="camera" />
              Channels
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={this.state.visible}>
            <div id="layout" className={theme.direction}>
              <Head>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
              </Head>
              <Header
                openMenu={this.handleShowClick}
                headerBtn={t('add_car')}
                changeLang={this.changeLang_i18n}
              />
              {this.propshaveSubHeader ? <SubHeader title={pageTitle} /> : null}
              <main>{children}</main>
              <Footer changeLangFunc={this.changeLang_i18n} />
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({}) => ({});

export default connect(
  mapStateToProps,
  { changeLang }
)(withNamespaces('common')(Layout));
