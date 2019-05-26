import * as React from 'react';
import styled from 'styled-components';
import { Section } from '../src/components/row/Sections';
import IndexForm from '../src/components/Forms/IndexForm';
import Layout from '../src/components/Layout';
import { Margin } from '../src/theme/globalStyle';
import { Box, Flex } from '@rebass/grid';

export default props => (
    <Layout haveSubHeader={true} pageTitle={'Hello World'}>
        <Section justifyCenter={true}>
            <div className="hero_single version_4">
                <Flex justifyContent="space-around" className="wrapper">
                    <Box width={2 / 2} px={2}>
                        <h3>پروفایل شخصی</h3>
                    </Box>
                </Flex>
            </div>
        </Section>
    </Layout>
);
