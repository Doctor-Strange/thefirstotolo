import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import { Section } from '../src/components/row/Sections';
import IndexForm from '../src/components/Forms/IndexForm';
import { RequestCard } from '../src/components/Cards';
import Layout from '../src/components/Layout';
import { REQUEST_getOrderRequests } from '../src/API';
import { Margin } from '../src/theme/globalStyle';
import { Box, Flex } from '@rebass/grid';
import jsCookie from 'js-cookie';
import moment from 'moment-jalaali';
moment.loadPersian();

export default props => {

    const [requests, setRequests] = useState([{}]);
    const [requestsCount, setRequestsCount] = useState(0);

    async function fetchAPI() {
        const res = await REQUEST_getOrderRequests({ token: jsCookie.get('token') });
        setRequests(res.items);
        setRequestsCount(res.count);
    }

    useEffect(() => {
        fetchAPI();
    }, []);


    return (
        <Layout haveSubHeader={true} pageTitle={'Hello World'}>
            <Section justifyCenter={true}>
                <Flex className="wrapper">
                    <Box width={2 / 2} px={2}>
                        <Item.Group divided style={{ maxWidth: '530px' }}>
                            {(requestsCount >= 1) ? requests.map((value, index) => {
                                console.log(requests);
                                const rentDump = value.rent_search_dump;
                                return (
                                    <RequestCard
                                        key={index}
                                        status={'new'}
                                        statusOwner={'renter'}
                                        carName={`${rentDump.car.brand.name.fa} ${rentDump.car.name.fa}`}
                                        start={moment()}
                                        end={moment()}
                                        price={600000}
                                        ownerName={"حاج مهراد روستا و دوستان"}
                                        ownerPhone={"09190722999"}
                                        pelak={"۱۲ ب ۳۶۵ ۱۱"}
                                        picture={rentDump.media_set[0].url}
                                    />
                                )
                            }
                            )
                                : <span>در حال حاظر درخواستی برای شما ثبت نشده</span>}
                        </Item.Group>
                    </Box>
                </Flex>
            </Section>
        </Layout>
    );
}
