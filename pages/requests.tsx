import * as React from 'react';
import styled from 'styled-components';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import { Section } from '../src/components/row/Sections';
import IndexForm from '../src/components/Forms/IndexForm';
import { RequestCard } from '../src/components/Cards';
import Layout from '../src/components/Layout';
import { Margin } from '../src/theme/globalStyle';
import { Box, Flex } from '@rebass/grid';

export default props => (
    <Layout haveSubHeader={true} pageTitle={'Hello World'}>
        <Section justifyCenter={true}>
            <Flex className="wrapper">
                <Box width={2 / 2} px={2}>
                    <Item.Group divided style={{maxWidth: '530px'}}>
                        <RequestCard
                            status={1}
                            carName={"جیلی امگراند  آر وی ۷"}
                            start={""}
                            end={""}
                            price={600000}
                            ownerName={"حاج مهراد روستا و دوستان"}
                            ownerPhone={"09190722999"}
                            pelak={"۱۲ ب ۳۶۵ ۱۱"}
                            picture={"https://otoli.net/media/17/i/20190507/1557234331_15e443c2e330.jpg"}
                        />
                        <RequestCard
                            status={2}
                            carName={"جیلی امگراند  آر وی ۷"}
                            start={""}
                            end={""}
                            price={600000}
                            ownerName={"حاج مهراد روستا و دوستان"}
                            ownerPhone={"09190722999"}
                            pelak={"۱۲ ب ۳۶۵ ۱۱"}
                            picture={"https://otoli.net/media/17/i/20190507/1557234331_15e443c2e330.jpg"}
                        />
                        <RequestCard
                            status={3}
                            carName={"جیلی امگراند  آر وی ۷"}
                            start={""}
                            end={""}
                            price={600000}
                            ownerName={"حاج مهراد روستا و دوستان"}
                            ownerPhone={"09190722999"}
                            pelak={"۱۲ ب ۳۶۵ ۱۱"}
                            picture={"https://otoli.net/media/17/i/20190507/1557234331_15e443c2e330.jpg"}
                        />
                        <RequestCard
                            status={4}
                            carName={"جیلی امگراند  آر وی ۷"}
                            start={""}
                            end={""}
                            price={600000}
                            ownerName={"حاج مهراد روستا و دوستان"}
                            ownerPhone={"09190722999"}
                            pelak={"۱۲ ب ۳۶۵ ۱۱"}
                            picture={"https://otoli.net/media/17/i/20190507/1557234331_15e443c2e330.jpg"}
                        />
                        <RequestCard
                            status={5}
                            carName={"جیلی امگراند  آر وی ۷"}
                            start={""}
                            end={""}
                            price={600000}
                            ownerName={"حاج مهراد روستا و دوستان"}
                            ownerPhone={"09190722999"}
                            pelak={"۱۲ ب ۳۶۵ ۱۱"}
                            picture={"https://otoli.net/media/17/i/20190507/1557234331_15e443c2e330.jpg"}
                        />
                        <RequestCard
                            status={6}
                            carName={"جیلی امگراند  آر وی ۷"}
                            start={""}
                            end={""}
                            price={600000}
                            ownerName={"حاج مهراد روستا و دوستان"}
                            ownerPhone={"09190722999"}
                            pelak={"۱۲ ب ۳۶۵ ۱۱"}
                            picture={"https://otoli.net/media/17/i/20190507/1557234331_15e443c2e330.jpg"}
                        />
                    </Item.Group>
                </Box>
            </Flex>
        </Section>
    </Layout>
);
