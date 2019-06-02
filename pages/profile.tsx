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
            results: [
                {
                    id: 30,
                    avg_price_per_day: 10,
                    body_style: {
                        priority: 1,
                        name: {
                            "fa": "شاسی بلند",
                            "en": "SUV"
                        }
                    },
                    cancellation_policy: "کنسل کنی بیچاره‌ت میکنم",
                    capacity: 5,
                    car: {
                        "differential": null,
                        "transmission_type": {
                            "id": 1,
                            "priority": 0,
                            "slug": {
                                "fa": "اتوماتیک",
                                "en": "automatic"
                            },
                            "name": {
                                "fa": "اتوماتیک",
                                "en": "Automatic"
                            }
                        },
                        brand: {
                            "description": {
                                "fa": null,
                                "en": null
                            },
                            "id": 4,
                            "slug": {
                                "fa": "کیا",
                                "en": "kia"
                            },
                            "name": {
                                "fa": "کیا",
                                "en": "Kia"
                            }
                        },
                        slug: {
                            "fa": "اسپورتیج",
                            "en": "sportage"
                        },
                        capacity: 5,
                        body_style: {
                            "id": 2,
                            "priority": 1,
                            "slug": {
                                "fa": "شاسی-بلند",
                                "en": "suv"
                            },
                            "name": {
                                "fa": "شاسی بلند",
                                "en": "SUV"
                            }
                        },
                        id: 385,
                        facility_set: [
                            {
                                "priority": 0,
                                "slug": {},
                                "id": 18,
                                "is_filter": false,
                                "description": {},
                                "name": {}
                            },
                            {
                                "priority": 0,
                                "slug": {},
                                "id": 16,
                                "is_filter": false,
                                "description": {},
                                "name": {}
                            },
                            {
                                "priority": 0,
                                "slug": {},
                                "id": 30,
                                "is_filter": false,
                                "description": {},
                                "name": {}
                            },
                            {
                                "priority": 0,
                                "slug": {},
                                "id": 29,
                                "is_filter": false,
                                "description": {},
                                "name": {}
                            },
                            {
                                "priority": 0,
                                "slug": {},
                                "id": 35,
                                "is_filter": false,
                                "description": {},
                                "name": {}
                            },
                            {
                                "priority": 0,
                                "slug": {},
                                "id": 20,
                                "is_filter": false,
                                "description": {},
                                "name": {}
                            },
                            {
                                "priority": 0,
                                "slug": {},
                                "id": 7,
                                "is_filter": false,
                                "description": {},
                                "name": {}
                            }
                        ],
                        "media_set": [],
                        "description": {
                            "fa": "",
                            "en": ""
                        },
                        "name": {
                            "fa": "اسپورتیج",
                            "en": "Sportage"
                        }
                    },
                    color: {
                        "id": 1,
                        "priority": 0,
                        "slug": {
                            "fa": "سفید",
                            "en": "white"
                        },
                        "code": "#FFFFFF",
                        "name": {
                            "fa": "سفید",
                            "en": "White"
                        }
                    },
                    deliver_at_renters_place: true,
                    description: "اجاره استپورتیج با راننده \n",
                    extra_km_price: 600000,
                    location: {
                        "child_set": [],
                        "priority": 0,
                        "slug": {
                            "fa": "آجودانیه",
                            "en": null
                        },
                        "id": 330,
                        "parent_id": 1,
                        "center": {
                            "wkt": "POINT (51.48377448660698 35.80814287941573)",
                            "x": 51.483774486606976,
                            "y": 35.808142879415726
                        },
                        "name": {
                            "breadcrumb_en": "Tehran > ",
                            "breadcrumb_fa": "تهران > آجودانیه",
                            "fa": "آجودانیه",
                            "en": null
                        }
                    },
                    max_km_per_day: 100,
                    media_set: [
                        {
                            "id": 110,
                            "url": "https://otoli.net/media/15/i/20190506/1557147124_fe28e325e2e8.jpg",
                            "thumbnail_url": null
                        }
                    ],
                    mileage_range: {
                        "end": 100000,
                        "priority": 1,
                        "slug": {
                            "fa": "۵۰۰۰۰-تا-۱۰۰۰۰۰-کم",
                            "en": "50000-100000-km"
                        },
                        "id": 2,
                        "start": 50000,
                        "name": {
                            "fa": "۵۰٫۰۰۰ تا ۱۰۰٫۰۰۰ ک.م",
                            "en": "50,000-100,000 KM"
                        }
                    },
                    min_days_to_rent: 3,
                    no_of_days: 4,
                    owner: {
                        "is_online": false,
                        "birth_date": {
                            "jalali": {
                                "m": 12,
                                "d": 9,
                                "y": 1359
                            },
                            "gregorian": {
                                "m": 2,
                                "d": 28,
                                "y": 1981
                            },
                            "name": {
                                "fa": "۰۹ اسفند ۵۹، شنبه",
                                "en": "81 Feb 28, Saturday"
                            }
                        },
                        "last_name": "دتاتات",
                        "image_url": "https://otoli.net/static/core/default_profile_pic.png",
                        "id": 13,
                        "username": "",
                        "last_seen_time": {
                            "timestamp": 1558348554,
                            "name": "۳۱ دقیقه پیش"
                        },
                        "thumbnail_url": "https://otoli.net/static/core/default_profile_pic.png",
                        "first_name": "تتتتت",
                        "name": "تتتتت دتاتات"
                    },
                    total_price: 40,
                    transmission_type: {
                        "priority": 0,
                        "name": {
                            "fa": "اتوماتیک",
                            "en": "Automatic"
                        },
                        "slug": {
                            "fa": "اتوماتیک",
                            "en": "automatic"
                        },
                        "id": 1
                    },
                    year: {
                        "id": 142,
                        "priority": 2,
                        "slug": {
                            "fa": "۲۰۱۷-۱۳۹۶",
                            "en": "2017-1396"
                        },
                        "name": {
                            "fa": "۲۰۱۷ - ۱۳۹۶",
                            "en": "2017 - 1396"
                        }
                    },
                    search_i: "05d11361-5ea9-4bef-adee-b92932eccde0"
                }
            ]
        }


        render() {
            const { t/*, profileID*/ } = this.props;
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
                            results={this.state.results}
                            loadingResults={false}
                            lodingMore={false}
                            noResult={false}
                            showMore={true}
                            dateURL={null}
                            colClass="col-lg-8"
                            marginClass=""
                            showInProfile={true}
                            userOwnPage={true}
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
