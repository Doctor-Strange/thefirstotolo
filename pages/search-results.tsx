import * as React from 'react';
import styled from 'styled-components';
import { Section } from '../src/components/row/Sections';
import IndexForm from '../src/components/Forms/IndexForm';
import Layout from '../src/components/Layout';
import { Margin } from '../src/theme/globalStyle';
import { Box, Flex } from '@rebass/grid';
import { i18n, withNamespaces } from '../src/i18n';
import { FilterAndSortBar, SearchBar } from '../src/components/Search';
import { CarCard } from '../src/components/Cards';

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
        <Layout haveSubHeader={true} pageTitle={'Hello World'}>
          <SearchBar count={43} t={t} />
          <FilterAndSortBar t={t} />
          <Section justifyCenter={true}>
            <Box width={4 / 12} px={2}>
              <CarCard
                title="The Sample Title"
                img="http://localhost:3000/img/location_1.jpg"
                descrabtion="God himself did made this car."
                text2="tet" 
                score="8.4"/>
            </Box>
            <Box width={4 / 12} px={2}>
            <CarCard
                title="The Sample Title"
                img="http://localhost:3000/img/location_1.jpg"
                descrabtion="God himself did made this car."
                text2="tet" 
                score="8.4"/>
              </Box>
            <Box width={4 / 12} px={2}>
              <CarCard
                title="The Sample Title"
                img="http://localhost:3000/img/location_1.jpg"
                descrabtion="God himself did made this car."
                text2="tet" 
                score="8.4"/>
            </Box>
            <Box width={4 / 12} px={2}>
              <CarCard
                title="The Sample Title"
                img="http://localhost:3000/img/location_1.jpg"
                descrabtion="God himself did made this car."
                text2="tet" 
                score="8.4"/>
            </Box>
            <Box width={4 / 12} px={2}>
              <CarCard
                title="The Sample Title"
                img="http://localhost:3000/img/location_1.jpg"
                descrabtion="God himself did made this car."
                text2="tet" 
                score="8.4"/>
            </Box>
          </Section>
        </Layout>
      );
    }
  }
);
