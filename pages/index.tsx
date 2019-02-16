import * as React from 'react';
import styled from 'styled-components';
import { Section } from '../src/components/row/Sections';
import { BoxedList } from '../src/components/Cards/BoxedList';
import { Layout } from '../src/components/Layout';
import { Margin } from '../src/theme/globalStyle';
import { Box, Flex } from '@rebass/grid';

export default props => (
  <Layout haveSubHeader={true} pageTitle={'Hello World'}>
    <Section justifyCenter={true}>
      <Flex justifyContent="space-around">
        <Box width={1 / 2} px={2}>
          <h1>hello</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            accumsan rhoncus risus id cursus. Maecenas id feugiat urna. Aenean
            sollicitudin justo ac lorem convallis, quis elementum purus
            placerat. Vestibulum aliquet dapibus felis, eu consequat sem rutrum
            eu. Phasellus at velit dictum, commodo urna non, accumsan nibh.
            Phasellus eu metus eros. Vestibulum semper sem nec mauris placerat,
            nec molestie sem elementum. Suspendisse ultrices nisl vitae varius
            congue. Sed purus ex, imperdiet ut purus eget, feugiat interdum
            ante. Nam tincidunt rutrum semper. Fusce at cursus odio, nec
            pulvinar velit. Ut cursus non odio in ultrices. Sed rhoncus
            ultricies odio, ut porttitor orci bibendum fringilla. Donec sodales
            eu sapien sit amet finibus.
          </p>
        </Box>
      </Flex>
    </Section>
    <Section bgColor="#fff" justifyCenter={true} margin={Margin.Normal}>
      <Flex justifyContent="space-around" flexWrap="wrap">
        <Box width={1 / 3} px={3}>
          <BoxedList title="Need Help? Contact us">
            Cum appareat maiestatis interpretaris et, et sit.
          </BoxedList>
        </Box>
        <Box width={1 / 3} px={3}>
          <BoxedList title="Payments">
            Qui ea nemore eruditi, magna prima possit eu mei.
          </BoxedList>
        </Box>
        <Box width={1 / 3} px={3}>
          <BoxedList title="Cancel Policy">
            Hinc vituperata sed ut, pro laudem nonumes ex.
          </BoxedList>
        </Box>
      </Flex>
    </Section>
  </Layout>
);
