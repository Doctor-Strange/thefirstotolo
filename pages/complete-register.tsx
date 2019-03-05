import * as React from 'react';

import { Section } from '../src/components/row/Sections';
import { Layout } from '../src/components/Layout';
import { CompleteRegisterForm } from '../src/components/CompleteRegisterForm';
import { Box, Flex } from '@rebass/grid';

export default props => (
  <Layout haveSubHeader={true} pageTitle={'list Your Car'}>
    <Section justifyCenter={true}>
      <Flex justifyContent="space-around" style={{ width: '450px' }}>
        <Box width={1 / 1} px={2}>
          <CompleteRegisterForm />
        </Box>
      </Flex>
    </Section>
  </Layout>
);
