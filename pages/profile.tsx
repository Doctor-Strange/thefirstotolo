import * as React from 'react';

import { Section } from '../src/components/row/Sections';
import Layout from '../src/components/Layout';
import SetCarTimingForm from '../src/components/Forms/SetCarTimingForm';
import { Box, Flex } from '@rebass/grid';
import { Icon, Segment, Button, Popup } from 'semantic-ui-react';
import Router from 'next/router';
import { PriceCard, UserCard, CarCard, CarCardPlaceholder } from '../src/components/Cards'
import { Details, CarNav } from '../src/components/Car'
import { i18n, withNamespaces } from '../src/i18n';
import { REQUEST_getCar } from '../src/API';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../src/lib/numbers';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ResultsCards } from '../src/components/Search';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment-jalaali';
moment.loadPersian();

export default withNamespaces('common')(
    class extends React.Component<{ t: any, rentalCarID: number, start: any, end: any, search_id: string }> {

        static async getInitialProps(props) {
            if (typeof window === 'undefined') {
                console.log('Server Side Router Query', props.query);
            } else {
                console.log('Client side Router Query', props.query);
            }
            // const res = await REQUEST_getCar({
            //     id: props.query.id
            // })
            return {
                namespacesRequired: ['common'],
                profileID: props.query.id,
                // ...res
            };
        }

        state = {
            token: '',
            error: '',
            cars: [],
            name: '',
        };


        render() {
            const { t/*, profileID*/ } = this.props;
            const { error } = this.state;
            // const {  } = this.props;
            return (
                <Layout haveSubHeader={true} pageTitle={'list Your Car'}>
                    {/* {isMobile &&
                        <CarNav startDate={start_date} endDate={end_date} />
                    } */}
                    <Section justifyCenter={true} style={{ marginTop: '24px' }}>
                        <ResultsCards
                            t={t}
                            nextPage={null}
                            showNextPage={true}
                            results={null}
                            loadingResults={true}
                            lodingMore={false}
                            noResult={false}
                            showMore={true}
                            dateURL={null}
                            colClass="col-lg-8"
                            marginClass=""
                        />
                        {isBrowser &&
                            <aside className="col-lg-4" id="sidebar">
                                <div className="box_detail booking">
                                    <div
                                        className="score"
                                    >
                                        <UserCard
                                            id={22}
                                            name={"مراد فلی‌زاده"}
                                            responceTime="میانگین زمان پاسخگویی: نامشخص"
                                            image={"http://s8.picofile.com/file/8361901168/photo_2019_05_25_03_29_46.jpg"}
                                        />
                                    </div>
                                    <br />
                                    <Button
                                        style={{ height: '48px' }}
                                        size='large'
                                        fluid
                                        color='teal'>ویرایش پروفایل</Button>
                                    {/* <div
                                        style={{ marginTop: '8px' }}
                                        className="text-center"
                                    >
                                    </div> */}
                                </div>
                                <ul className="share-buttons">
                                    <Popup
                                        position='bottom right'
                                        size='tiny'
                                        content='توییت کنید'
                                        inverted
                                        trigger={
                                            <Button circular icon='twitter' />
                                        }
                                    />
                                    <Popup
                                        position='bottom right'
                                        size='tiny'
                                        content='ارسال از طریق ایمیل'
                                        inverted
                                        trigger={
                                            <Button circular icon='mail' />
                                        }
                                    />
                                    <Popup
                                        position='bottom right'
                                        size='tiny'
                                        content='ارسال به تلگرام'
                                        inverted
                                        trigger={
                                            <Button circular icon='telegram' />
                                        }
                                    />
                                    <Popup
                                        position='bottom right'
                                        size='tiny'
                                        content='کپی پیوند پروفایل'
                                        inverted
                                        trigger={
                                            <CopyToClipboard
                                                text={window.location.href}
                                                onCopy={() => alert("کپی شد")}
                                            >
                                                <Button circular icon='copy' />
                                            </CopyToClipboard>
                                        }
                                    />
                                </ul>
                            </aside>
                        }
                    </Section>
                    {isMobile &&
                        <Button
                            style={{
                                zIndex: '55',
                                bottom: '0',
                                position: 'fixed',
                                borderRadius: '0',
                                margin: '0',
                                height: '56px'
                            }}
                            primary
                            type="submit"
                            className="btn_1 full-width"
                        >
                            ویرایش پروفایل
                    </Button>
                    }
                </Layout >
            );
        }
    }
);
