import * as React from 'react';
import NextSeo from 'next-seo';
import { Section } from '../src/components/row/Sections';
import Layout from '../src/components/Layout';
import SetCarTimingForm from '../src/components/Forms/SetCarTimingForm';
import { Box, Flex } from '@rebass/grid';
import { Icon, Segment, Button, Popup } from 'semantic-ui-react';
import Router from 'next/router';
import Carousel from 'nuka-carousel';
import { PriceCard, UserCard } from '../src/components/Cards';
import { Details, CarNav, CarSideCard } from '../src/components/Car';
import { i18n, withTranslation } from '../src/i18n';
import { REQUEST_getCar } from '../src/API';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern' });

const SearchResult = styled.div`

`;

export default withTranslation('common')(
    class extends React.Component<{ t: any, rentalCarID: number, start_date: any, end_date: any, search_id: string }> {

        static async getInitialProps(props) {
            if (typeof window === 'undefined') {
                console.log('Server Side Router Query', props.query);
            } else {
                console.log('Client side Router Query', props.query);
            }
            let res;
            if (props.query.search_id)
                res = await REQUEST_getCar({
                    search_id: props.query.search_id,
                });
            else if (props.query.id)
                res = await REQUEST_getCar({
                    id: props.query.id,
                });
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
            token: '',
            error: '',
            media_set: [],
            avg_price_per_day: null,
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
            car: {},
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
        }

        reserve(search_id) {
            // const { search_id, rentalCarID } = this.props;
            const href = `/checkout?search_id=${search_id}`;
            // const as = `/checkout/${rentalCarID}/${search_id}`;
            Router.push(href, href, { shallow: true });
        }

        render() {
            const { t, start_date, end_date, search_id } = this.props;
            let start, end = null;
            let startDate, endDate = null;
            console.log(start_date);
            if (start_date && end_date) {
                startDate = moment(start_date, 'jYYYY/jMM/jDD');
                endDate = moment(end_date, 'jYYYY/jMM/jDD');
                console.log(startDate);
            }
            if (startDate && endDate) {
                start = moment(startDate).format('jD jMMMM jYY');
                end = moment(endDate).format('jD jMMMM jYY');
                console.log(start);
            }
            const { media_set, year, mileage_range, owner, body_style, color, color_code,
                deliver_at_renters_place, cancellation_policy, transmission_type, location, facility_set,
                max_km_per_day, description, capacity, extra_km_price, car, loaded, avg_price_per_day } = this.props;
            let metaImagesArr = [];
            media_set.length >= 1 ? media_set.map((value, index) =>
                metaImagesArr.push({
                    url: value,
                    alt: 'Og Image Alt',
                })
            ) : <img src="https://i.kinja-img.com/gawker-media/image/upload/s--8Dk6Uk5v--/c_scale,f_auto,fl_progressive,q_80,w_800/qssqrb3mvffcipwl9jn0.jpg" />
            return (
                <Layout haveSubHeader={true} pageTitle={'list Your Car'}>
                    <NextSeo
                        config={{
                            title: `اجاره ${car.brand.name.fa} ${car.name.fa} در اتولی`,
                            description: description ? description : "همین حالا اجاره کنید",
                            openGraph: {
                                title: `اجاره ${car.brand.name.fa} ${car.name.fa} در اتولی`,
                                description: description ? description : "همین حالا اجاره کنید",
                                images: metaImagesArr,
                                site_name: 'اتولی',
                            },
                            twitter: {
                                handle: '@otoli_net',
                                site: '@otoli_net',
                                cardType: 'summary_large_image',
                            },
                        }}
                    />
                    {isMobile &&
                        <CarNav startDate={start} endDate={end} />
                    }
                    <div className="hero_mother">
                        <div className="hero_in hotels_detail" style={{ maxWidth: '1111px' }}>
                            <Carousel
                                heightMode="current"
                                initialSlideWidth={isBrowser ? 970 : undefined}
                                renderCenterLeftControls={({ previousSlide }) => (
                                    <button
                                        onClick={previousSlide}
                                        aria-label="next"
                                        style={{
                                            border: '0px',
                                            background: 'rgba(0, 0, 0, 0.4)',
                                            color: 'white',
                                            padding: '10px',
                                            opacity: '1',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Icon name="angle left" />
                                    </button>
                                )}
                                renderCenterRightControls={({ nextSlide }) => (
                                    <button
                                        onClick={nextSlide}
                                        aria-label="next"
                                        style={{
                                            border: '0px',
                                            background: 'rgba(0, 0, 0, 0.4)',
                                            color: 'white',
                                            padding: '10px',
                                            opacity: '1',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Icon name="angle right" />
                                    </button>
                                )}
                            >
                                {(media_set.length >= 1) ? media_set.map((value, index) =>
                                    <img key={index} src={value} />
                                ) : <img src="https://i.kinja-img.com/gawker-media/image/upload/s--8Dk6Uk5v--/c_scale,f_auto,fl_progressive,q_80,w_800/qssqrb3mvffcipwl9jn0.jpg" />}
                            </Carousel>
                        </div>
                    </div>

                    <Section justifyCenter={true} style={{ marginTop: '24px' }}>
                        {isBrowser &&
                            <aside className="col-lg-4" id="sidebar">
                                <CarSideCard
                                    date={{
                                        start: startDate,
                                        end: endDate
                                    }}
                                    price={avg_price_per_day}
                                    user={{
                                        id: owner.id,
                                        name: owner.name,
                                        image_url: owner.image_url
                                    }}
                                    reserveFunction={() => { this.reserve(search_id) }}
                                />
                            </aside>
                        }
                        <div className="col-lg-8 car_det_wrapper" style={{
                            position: 'relative',
                            top: '-30px'
                        }}>

                            <section id="description" className="car_det">
                                ‍<div className="detail_title_1">
                                    {isMobile &&
                                        <PriceCard style={{
                                            display: 'inline-grid',
                                            left: '10px',
                                            top: '-15px',
                                            position: 'absolute'
                                        }} number={avg_price_per_day}>در روز</PriceCard>
                                    }
                                    {/* <div className="cat_star">
                                    <i className="icon_star" /><i className="icon_star" /><i className="icon_star"></i
                                    ><i className="icon_star" />
                                </div> */}
                                    <h1 style={{ fontSize: '22px' }}>{`${car.brand.name.fa} ${car.name.fa}`}</h1>
                                    <span>{year.fa}</span> <br />
                                    {/* <a
                                    className="address"
                                    href="https://www.goog504327!2d48.8568361"
                                >۱۰ سفر  با امتیاز پنج ستاره</a
                                > */}
                                </div>
                                <hr />
                                <Details title="محل خودرو">
                                    <p>{location.name.breadcrumb_fa}</p>
                                    <p>{deliver_at_renters_place ? "تحویل در محل شما" : ""}</p>
                                </Details>
                                <Details title="محدودیت مسافت">
                                    <ul className="">
                                        <li>{max_km_per_day ? max_km_per_day + "کیلومتر" : "ندارد"}</li>
                                        <li>{extra_km_price ? `هزینه هر کیلومتر اضافه ${extra_km_price} هزار تومان` : ""}</li>
                                    </ul>
                                </Details>
                                <Details title="توضیحات">
                                    {description ? description : "ندارد"}
                                </Details>
                                <Details title="مشخصات فنی">
                                    <ul className="bullets">
                                        <li>نوع بدنه: {body_style.fa}</li>
                                        <li>دهنده {transmission_type.fa}</li>
                                        <li>کارکرد: {mileage_range ? this.mileage_ranges[mileage_range.id + 1] : "صفر کیلومتر"}</li>
                                        <li>ظرفیت: {capacity}</li>
                                    </ul>
                                </Details>
                                <Details title="امکانات">
                                    <div className="row add_bottom_30not">
                                        <div className="col-6">
                                            <ul className="bullets">
                                                {facility_set.map((value, index) => (<li>{value.name}</li>))}
                                            </ul>
                                        </div>
                                        {/* <div className="col-6">
                                        <ul className="bullets">
                                            <li>ماساژور صندلی</li>
                                            <li>دنده ۲۳تایی</li>
                                            <li>آب‌سرد کن</li>
                                            <li>نون گرم </li>
                                        </ul>
                                    </div> */}
                                    </div>
                                </Details>
                                {/* <Details title="کارکرد">
                                {mileage_range ? this.mileage_ranges[mileage_range.id + 1] : "صفر کیلومتر"}
                            </Details> */}
                                <Details title="قوانین کنسلی">
                                    {cancellation_policy ? cancellation_policy : "ندارد"}
                                </Details>
                                {isMobile &&
                                    <div className="strip grid usercard">
                                        <UserCard
                                            id={owner.id}
                                            name={owner.name}
                                            responceTime="میانگین زمان پاسخگویی: نامشخص"
                                            image={owner.image_url}
                                        />
                                    </div>
                                }
                                {/* <h3>Prices</h3>
                            <table className="table table-striped add_bottom_45">
                                <tbody>
                                    <tr>
                                        <td>Low (from 23/03 to 31/05)</td>
                                        <td>140$</td>
                                    </tr>
                                    <tr>
                                        <td>Middle (from 23/03 to 31/05)</td>
                                        <td>180$</td>
                                    </tr>
                                    <tr>
                                        <td>High (from 23/03 to 31/05)</td>
                                        <td>200$</td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <h3>Location</h3>
                            <div id="map" className="map map_single add_bottom_45"></div> */}
                            </section>
                        </div>
                    </Section>
                    <Section id="reviews" justifyCenter={false}>
                        {/* <h2>نظرات</h2> */}
                        {/* <div className="reviews-container add_bottom_30">
                        <div className="row">
                            <div className="col-lg-3">
                                <div id="review_summary">
                                    <strong>8.5</strong>
                                    <em>Superb</em>
                                    <small>Based on 4 reviews</small>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="row">
                                    <div className="col-lg-10 col-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: '90%' }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-3"><small><strong>5 stars</strong></small></div>
                                </div>
                
                                <div className="row">
                                    <div className="col-lg-10 col-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: '95%' }}
                                                aria-valuenow={95} aria-valuemin={0} aria-valuemax={100}></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-3"><small><strong>4 stars</strong></small></div>
                                </div>
                
                                <div className="row">
                                    <div className="col-lg-10 col-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: '60%' }}
                                                aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-3"><small><strong>3 stars</strong></small></div>
                                </div>
                
                                <div className="row">
                                    <div className="col-lg-10 col-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: '20%' }}
                                                aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-3"><small><strong>2 stars</strong></small></div>
                                </div>
                
                                <div className="row">
                                    <div className="col-lg-10 col-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: '0%' }}
                                                aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-3"><small><strong>1 stars</strong></small></div>
                                </div>
                
                            </div>
                        </div>
                    </div>
                
                    <div className="reviews-container">
                
                        <div className="review-box clearfix">
                            <figure className="rev-thumb"><img src="img/avatar1.jpg" alt="" />
                            </figure>
                            <div className="rev-content">
                                <div className="rating">
                                    <i className="icon_star voted"></i>
                                    <i className="icon_star voted"></i>
                                    <i className="icon_star voted"></i>
                                    <i className="icon_star voted"></i
                                    ><i className="icon_star"></i>
                                </div>
                                <div className="rev-info">
                                    Admin – April 03, 2016:
                                    </div>
                                <div className="rev-text">
                                    <p>
                                        Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="review-box clearfix">
                            <figure className="rev-thumb"><img src="img/avatar2.jpg" alt="" />
                            </figure>
                            <div className="rev-content">
                                <div className="rating">
                                    <i className="icon-star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star"></i>
                                </div>
                                <div className="rev-info">
                                    Ahsan – April 01, 2016:
                                </div>
                                <div className="rev-text">
                                    <p>
                                        Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="review-box clearfix">
                            <figure className="rev-thumb"><img src="img/avatar3.jpg" alt="" />
                            </figure>
                            <div className="rev-content">
                                <div className="rating">
                                    <i className="icon-star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star"></i>
                                </div>
                                <div className="rev-info">
                                    Sara – March 31, 2016:
                                </div>
                                <div className="rev-text">
                                    <p>
                                        Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
                                    </p>
                                </div>
                            </div>
                        </div>
                
                    </div>
                    */}
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
                            درخواست اجاره
                    </Button>
                    }
                </Layout >
            );
        }
    }
);
