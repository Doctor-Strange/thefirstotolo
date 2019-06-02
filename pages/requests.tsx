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
                                console.log(rentDump);
                                return (
                                    <RequestCard
                                        id={value.id}
                                        key={index}
                                        status={value.status.id}
                                        statusOwner={value.role}
                                        carName={`${rentDump.car.brand.name.fa} ${rentDump.car.name.fa}`}
                                        start={moment(rentDump.start_date, 'jYYYY/jMM/jDD')}
                                        end={moment(rentDump.end_date, 'jYYYY/jMM/jDD')}
                                        price={rentDump.discounted_total_price}
                                        ownerName={
                                            (value.role === "owner")
                                                ? `${value.renter.first_name} ${value.renter.last_name}`
                                                : `${rentDump.owner.first_name} ${rentDump.owner.last_name}`
                                        }
                                        ownerPhone={
                                            (value.role === "renter")
                                                ? null
                                                : value.renter.cell
                                        }
                                        pelak={{
                                            first: rentDump.registration_plate_first_part,
                                            second: rentDump.registration_plate_second_part,
                                            third: rentDump.registration_plate_third_part,
                                            fourth: rentDump.registration_plate_forth_part
                                        }}
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
