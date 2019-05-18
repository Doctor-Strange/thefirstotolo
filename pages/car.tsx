import * as React from 'react';

import { Section } from '../src/components/row/Sections';
import Layout from '../src/components/Layout';
import SetCarTimingForm from '../src/components/Forms/SetCarTimingForm';
import { Box, Flex } from '@rebass/grid';
import { Icon, Segment, Button } from 'semantic-ui-react';
import Carousel from 'nuka-carousel';
import { PriceCard, UserCard } from '../src/components/Cards'
import { Details, ListDetails, CarNav } from '../src/components/Car'
import { i18n, withNamespaces } from '../src/i18n';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment-jalaali';
moment.loadPersian();

const SearchResult = styled.div`

`;

export default withNamespaces('common')(
    class extends React.Component<{ t: any, rentalCarID: number }> {

        static async getInitialProps(props) {
            if (typeof window === 'undefined') {
                console.log('Server Side Router Query', props.query);
            } else {
                console.log('Client side Router Query', props.query);
            }
            return {
                namespacesRequired: ['common'],
                rentalCarID: props.query.id
            };
        }

        state = {
            token: '',
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
            car: {},
            loaded: false
        };

        mileage_ranges = ['۰ - ۵۰٫۰۰۰ کیلومتر',
            '۵۰٫۰۰۰ - ۱۰۰٫۰۰۰ کیلومتر',
            '۱۰۰٫۰۰۰ - ۲۰۰٫۰۰۰ کیلومتر',
            '+۲۰۰٫۰۰۰  کیلومتر']

        componentDidMount() {
            //get car info
            console.log(this.props.rentalCarID);
            axios
                .post('https://otoli.net' + '/core/rental-car/get?id=' + this.props.rentalCarID)
                .then(response => {
                    if (response.data.success) {
                        const data = response.data.data;
                        let media_set = [];
                        data.media_set.map((value, index) => media_set.push(value.url));
                        this.setState({
                            year: data.year.name,
                            mileage_range: data.mileage_range,
                            owner: data.owner,
                            body_style: data.body_style.name,
                            color: data.color.name,
                            color_code: data.color.code,
                            deliver_at_renters_place: data.deliver_at_renters_place,
                            cancellation_policy: data.cancellation_policy,
                            transmission_type: data.transmission_type.name,
                            location: data.location,
                            max_km_per_day: data.max_km_per_day,
                            description: data.description,
                            capacity: data.capacity,
                            extra_km_price: data.extra_km_price,
                            car: data.car,
                            loaded: true
                        });
                    }
                    console.log(this.state);
                })
                .catch(error => {
                    console.error("error", error);
                    this.setState({ error: error, success: false });
                });
        }

        render() {
            const { t } = this.props;
            const { error, media_set, year, mileage_range, owner, body_style, color, color_code,
                deliver_at_renters_place, cancellation_policy, transmission_type, location,
                max_km_per_day, description, capacity, extra_km_price, car, loaded } = this.state;
            if (loaded) {
                return (
                    <Layout haveSubHeader={true} pageTitle={'list Your Car'}>
                        <CarNav startDate="دوشنبه ۱۴ اردیبهشت" endDate="پنجشنبه ۲۵ خرداد" />
                        <div className="hero_in hotels_detail">
                            <Carousel
                                renderCenterLeftControls={({ previousSlide }) => (
                                    <button
                                        onClick={previousSlide}
                                        aria-label="next"
                                        style={{
                                            border: '0px', background: 'rgba(0, 0, 0, 0.4)', color: 'white', padding: '10px', opacity: '1', cursor: 'pointer'
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
                                            border: '0px', background: 'rgba(0, 0, 0, 0.4)', color: 'white', padding: '10px', opacity: '1', cursor: 'pointer'
                                        }}
                                    >
                                        <Icon name="angle right" />
                                    </button>
                                )}
                            >
                                {(media_set.length >= 1)? media_set.map((value, index) => 
                                    <img key={index} src={value} />
                                ) : <img src="https://i.kinja-img.com/gawker-media/image/upload/s--8Dk6Uk5v--/c_scale,f_auto,fl_progressive,q_80,w_800/qssqrb3mvffcipwl9jn0.jpg" />}
                            </Carousel>
                        </div>

                        <Section justifyCenter={true} style={{ marginTop: '24px' }}>
                            <div className="col-lg-8" style={{
                                position: 'relative',
                                top: '-30px'
                            }}>

                                <section id="description">
                                    ‍<div className="detail_title_1">
                                        <PriceCard style={{
                                            display: 'inline-grid',
                                            left: '10px',
                                            top: '-15px',
                                            position: 'absolute'
                                        }} number={800000}>در روز</PriceCard>
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
                                        <p>{deliver_at_renters_place? "تحویل در محل شما" : ""}</p>
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
                                                    <li>کروز</li>
                                                    <li>پله‌برقی</li>
                                                    <li>شیشه‌شور برقی</li>
                                                    <li>پریز برق صندلی عقب</li>
                                                </ul>
                                            </div>
                                            <div className="col-6">
                                                <ul className="bullets">
                                                    <li>ماساژور صندلی</li>
                                                    <li>دنده ۲۳تایی</li>
                                                    <li>آب‌سرد کن</li>
                                                    <li>نون گرم </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </Details>
                                    {/* <Details title="کارکرد">
                                        {mileage_range ? this.mileage_ranges[mileage_range.id + 1] : "صفر کیلومتر"}
                                    </Details> */}
                                    <Details title="قوانین کنسلی">
                                        {cancellation_policy ? cancellation_policy : "ندارد"}
                                    </Details>
                                    <UserCard
                                        id={owner.id}
                                        name={owner.name}
                                        responceTime="میانگین زمان پاسخگویی: نامشخص"
                                        image={owner.image_url}
                                    />
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
                            {/* <aside className="col-lg-4" id="sidebar">
                                <div className="box_detail booking">
                                    <div className="price">
                                        <span>45$ <small>person</small></span>
                                        <div className="score"><span>Good<em>350 Reviews</em></span><strong>7.0</strong></div>
                                    </div>
    
                                    <div className="form-group" id="input-dates">
                                        <input className="form-control" type="text" name="dates" placeholder="When.." />
                                        <i className="icon_calendar" />
                                    </div>
    
                                    <div className="panel-dropdown">
                                        <a href="#">Guests <span className="qtyTotal">1</span></a>
                                        <div className="panel-dropdown-content right">
                                            <div className="qtyButtons">
                                                <label>Adults</label>
                                                <input type="text" name="qtyInput" value="1" />
                                            </div>
                                            <div className="qtyButtons">
                                                <label>Childrens</label>
                                                <input type="text" name="qtyInput" value="0" />
                                            </div>
                                        </div>
                                    </div>
    
                                    <div className="form-group clearfix">
                                        <div className="custom-select-form">
                                            <select className="wide">
                                                <option>Room Type</option>
                                                <option>Single Room</option>
                                                <option>Double Room</option>
                                                <option>Suite Room</option>
                                            </select>
                                        </div>
                                    </div>
    
                                    <a href="/checkout" className=" add_top_30 btn_1 full-width purchase">Purchase</a>
                                    <a href="/wishlist" className="btn_1 full-width outline wishlist"><i className="icon_heart"></i> Add to wishlist</a>
                                    <div className="text-center"><small>No money charged in this step</small></div>
                                </div>
                                <ul className="share-buttons">
                                    <li><a className="fb-share" href="#0"><i className="social_facebook"></i> Share</a></li>
                                    <li><a className="twitter-share" href="#0"><i className="social_twitter"></i> Tweet</a></li>
                                    <li><a className="gplus-share" href="#0"><i className="social_googleplus"></i> Share</a></li>
                                </ul>
                            </aside> */}
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
                            درخواست اجاره
                        </Button>
                    </Layout >
                );
            }
            else {
                return (
                    <p>در حال بارگذاری...</p>
                )
            }

        }
    }
);
