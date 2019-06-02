import * as React from 'react';

import { Section } from '../src/components/row/Sections';
import Layout from '../src/components/Layout';
import SetCarTimingForm from '../src/components/Forms/SetCarTimingForm';
import { Box, Flex } from '@rebass/grid';
import { Icon, Segment, Button, Popup, Grid } from 'semantic-ui-react';
import Router from 'next/router';
import Carousel from 'nuka-carousel';
import { PriceCard, UserCard, DateGrid } from '../src/components/Cards'
import { Details, CarNav } from '../src/components/Car'
import { i18n, withNamespaces } from '../src/i18n';
import { connect } from '../src/store';
import { REQUEST_getCar, REQUEST_newRentRequest } from '../src/API';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../src/lib/numbers';
import { LongDate, ShortDate } from '../src/lib/date';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import jsCookie from 'js-cookie';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });


export default withNamespaces('common')(
    class extends React.Component<{
        t: any, rentalCarID: number, start: any, end: any, search_id: string, user: any
    }> {

        static async getInitialProps(props) {
            if (typeof window === 'undefined') {
                console.log('Server Side Router Query', props.query);
            } else {
                console.log('Client side Router Query', props.query);
            }
            const res = await REQUEST_getCar({
                start: props.query.start,
                end: props.query.end,
                id: props.query.id
            })
            return {
                namespacesRequired: ['common'],
                rentalCarID: props.query.id,
                start: props.query.start,
                end: props.query.end,
                search_id: props.query.search_id,
                ...res
            };
        }

        state = {
            error: '',
            media_set: [],
            year: {},
            mileage_range: {},
            owner: {},
            body_style: {},
            color: {},
            color_code: null,
            deliver_at_renters_place: null,
            cancellation_policy: null,
            transmission_type: {},
            location: {},
            max_km_per_day: null,
            description: null,
            capacity: null,
            extra_km_price: null,
            facility_set: [],
            discount_percent: null,
            discounted_total_price: null,
            total_price: null,
            avg_price_per_day: null,
            car: {},
            no_of_days: null,
            loaded: false
        };

        mileage_ranges = ['۰ - ۵۰٫۰۰۰ کیلومتر',
            '۵۰٫۰۰۰ - ۱۰۰٫۰۰۰ کیلومتر',
            '۱۰۰٫۰۰۰ - ۲۰۰٫۰۰۰ کیلومتر',
            '+۲۰۰٫۰۰۰  کیلومتر']

        componentDidMount() {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 0);
            //get car info
            this.setState({ ...this.props });
            // const res = await REQUEST_getCar({
            //     start: this.props.start,
            //     end: this.props.end,
            //     id: this.props.rentalCarID
            // })
        }

        async reserve(search_id) {
            const res = await REQUEST_newRentRequest({
                search_id,
                token: jsCookie.get('token')
            })
            if (res) {
                Router.push({
                    pathname: '/requests',
                    query: {
                        id: search_id
                    }
                });
            }
        }

        render() {
            const { t, start, end, search_id } = this.props;
            let start_date, end_date = null;
            let startDate, endDate = null;
            if (start && end) {
                startDate = moment(start, 'jYYYY/jMM/jDD');
                endDate = moment(end, 'jYYYY/jMM/jDD');
            }
            const { error, media_set, year, mileage_range, owner, body_style, color, color_code,
                deliver_at_renters_place, cancellation_policy, transmission_type, location, facility_set,
                max_km_per_day, description, capacity, extra_km_price, car, loaded, discount_percent,
                discounted_total_price, total_price, avg_price_per_day, no_of_days } = this.state;
            if (loaded) {
                return (
                    <Layout haveSubHeader={true} pageTitle={'list Your Car'}>
                        <Section justifyCenter={true} style={{ marginTop: '24px' }}>
                            <div className="col-lg-8 car_det_wrapper checkout" style={{
                                position: 'relative'
                            }}>

                                <section id="description_" className="car_det box_detail">
                                    <Grid>
                                        <Grid.Row columns={2} centered className="property">
                                            <Grid.Column width={9} className="right" style={{ paddingRight: '0' }}><div>
                                                <h1 style={{ fontSize: '20px', textAlign: 'right', paddingBottom: '8px' }}>
                                                    {`${car.brand.name.fa} ${car.name.fa}`}
                                                </h1>
                                                <br />
                                                {/* <DateGrid start={startDate} end={endDate} /> */}
                                                {/* <span>{year.fa}</span> <br /> */}
                                            </div>
                                                <Details title="محل خودرو" showHr={false}>
                                                    <p>{location.name.breadcrumb_fa}</p>
                                                    <p>{deliver_at_renters_place ? "تحویل در محل شما" : ""}</p>
                                                </Details>
                                                <Details title="قوانین کنسلی" showHr={false}>
                                                    {cancellation_policy ? cancellation_policy : "ندارد"}
                                                </Details>
                                                <Details title="محدودیت مسافت" showHr={false}>
                                                    <ul className="">
                                                        <li>{max_km_per_day ? max_km_per_day + "کیلومتر" : "ندارد"}</li>
                                                        <li>{extra_km_price ? `هزینه هر کیلومتر اضافه ${extra_km_price} هزار تومان` : ""}</li>
                                                    </ul>
                                                </Details>
                                                <Details title="توضیحات" showHr={false}>
                                                    {description ? description : "ندارد"}
                                                </Details>
                                            </Grid.Column>
                                            <Grid.Column width={6} className="left" style={{ padding: '0' }}>
                                                {(media_set.length >= 1)
                                                    ? <img key="1" src={media_set[0]} style={{ width: '100%' }} />
                                                    : <img src="https://i.kinja-img.com/gawker-media/image/upload/s--8Dk6Uk5v--/c_scale,f_auto,fl_progressive,q_80,w_800/qssqrb3mvffcipwl9jn0.jpg" />
                                                }
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </section>
                            </div>
                            <aside className="col-lg-4" id="sidebar">
                                <div className="box_detail booking">
                                    <ul className="thelist">
                                        <li>قیمت روزانه
                                                <span className="float-left">
                                                <span>{convertNumbers2Persian(numberWithCommas(avg_price_per_day))}</span>
                                                {' '}
                                                <span> تومان </span>
                                            </span>
                                        </li>
                                        <li>از <span className="float-left">{LongDate(startDate)}</span></li>
                                        <li>تا <span className="float-left">{LongDate(endDate)}</span></li>
                                        <li>مدت زمان
                                                <span className="float-left">
                                                {convertNumbers2Persian(no_of_days)}
                                                <span> روز </span>
                                            </span>
                                        </li>
                                        <li>هزینه کل
                                                <span className="float-left">
                                                <span>{convertNumbers2Persian(numberWithCommas(total_price || 0))}</span>
                                                <span> تومان </span>
                                            </span>
                                        </li>
                                        {discount_percent &&
                                            <li> هزینه پس از کاستن تخفیف
                                                    <span className="float-left">
                                                    <span>{convertNumbers2Persian(numberWithCommas(discounted_total_price || 0))}</span>
                                                    <span> تومان </span>
                                                </span>
                                            </li>
                                        }
                                    </ul>
                                    {isBrowser && <>
                                        <br />
                                        <Button
                                            style={{ height: '48px' }}
                                            size='large'
                                            fluid
                                            onClick={() => {
                                                this.reserve(search_id);
                                            }}
                                            color='teal'>ثبت درخواست</Button>
                                        <div
                                            style={{ marginTop: '8px' }}
                                            className="text-center"
                                        >
                                            <small>دراین مرحله هزینه‌ای اخذ نمی‌شود.</small>
                                        </div>
                                    </>
                                    }
                                </div>
                            </aside>

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
                                onClick={
                                    () => this.reserve(search_id)
                                }
                                className="btn_1 full-width"
                            >
                                ثبت درخواست
                            </Button>
                        }
                    </Layout >
                );
            }
            else {
                return (
                    <></>
                )
            }

        }
    }
);