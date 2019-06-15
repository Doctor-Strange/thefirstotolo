import * as React from 'react';
import styled from 'styled-components';
import { Section } from '../src/components/row/Sections';
import IndexForm from '../src/components/Forms/IndexForm';
import Layout from '../src/components/Layout';
import { Margin } from '../src/theme/globalStyle';
import { Box, Flex } from '@rebass/grid';
import * as backgroundImage from '../static/back.jpg';
import { i18n, Link, withTranslation } from '../src/i18n';

export default withTranslation('common')(props => (
  <Layout haveSubHeader={true} pageTitle={'Hello World'}>
    <Section justifyCenter={true}>
      <div className="hero_single version_4">
        <Flex justifyContent="space-around" className="wrapper">
          <Box width={2 / 2} px={2}>
            <h3>ماشین اجاره کردن خیلی راحت‌تره!</h3>
            <p>
              ماشینی که دوست دارید رو پیدا کنید و در سریع‌ترین زمان اجاره کنید
            </p>
            <IndexForm t={props.t} />
            <ul className="counter">
              <li>
                <strong>۶</strong> شهر
              </li>
              <li>
                <strong>۳۴٫۰۰۰</strong> ماشین
              </li>
            </ul>
          </Box>
        </Flex>
      </div>
    </Section>
    {/* <Section bgColor="#fff" justifyCenter={true} margin={Margin.Bitter}>
      <Flex justifyContent="space-around" flexWrap="wrap">
        <Box px={3}>
          <BoxedList title="Need Help? Contact us">
            Cum appareat maiestatis interpretaris et, et sit.
          </BoxedList>
        </Box>
        <Box px={3}>
          <BoxedList title="Payments">
            Qui ea nemore eruditi, magna prima possit eu mei.
          </BoxedList>
        </Box>
        <Box px={3}>
          <BoxedList title="Cancel Policy">
            Hinc vituperata sed ut, pro laudem nonumes ex.
          </BoxedList>
        </Box>
      </Flex>
    </Section> */}
  </Layout>
));
