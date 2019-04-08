import * as React from 'react';

import { Section } from '../src/components/row/Sections';
import Layout from '../src/components/Layout';
import AddCarForm from '../src/components/Forms/AddCarForm';
import { Box, Flex } from '@rebass/grid';
import { i18n, withNamespaces } from '../src/i18n';

export default withNamespaces('common')(
  class extends React.Component<{ t: any }> {
    static async getInitialProps() {
      return {
        namespacesRequired: ['common']
      };
    }

    render() {
      const { t } = this.props;
      return (
        <Layout haveSubHeader={true} pageTitle={'list Your Car'}>
          <Section justifyCenter={true}>
            <Flex justifyContent="space-around" style={{ width: '600px' }}>
              <Box width={1 / 1} px={2}>
                <AddCarForm t={t} />
              </Box>
            </Flex>
          </Section>
        </Layout>
      );
    }
  }
);
