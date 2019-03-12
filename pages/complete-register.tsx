import * as React from 'react';

import { Section } from '../src/components/row/Sections';
import Layout from '../src/components/Layout';
import { CompleteRegisterForm } from '../src/components/CompleteRegisterForm';
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
                <CompleteRegisterForm
                  strings={{
                    $required_fields: t('required_fields'),
                    $firstname: t('firstname'),
                    $lastname: t('lastname'),
                    $national_id: t('national_id'),
                    $phone_number: t('phone_number'),
                    $day: t('day'),
                    $month: t('month'),
                    $year: t('year'),
                    $email: t('email'),
                    $password: t('password'),
                    $subscribe_checkbox: t('subscribe_checkbox'),
                    $signup: t('signup'),
                    $new_client: t('new_client')
                  }}
                />
              </Box>
            </Flex>
          </Section>
        </Layout>
      );
    }
  }
);
