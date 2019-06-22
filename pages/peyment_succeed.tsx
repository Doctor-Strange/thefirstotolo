import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Icon, Image, Item, Label, Message} from 'semantic-ui-react'
import { Section } from '../src/components/row/Sections';
import IndexForm from '../src/components/Forms/IndexForm';
import { RequestCard, RequestCardPlaceholder } from '../src/components/Cards';
import Layout from '../src/components/Layout';
import { REQUEST_getOrderRequests } from '../src/API';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../src/lib/numbers';
import { Margin } from '../src/theme/globalStyle';
import { Box, Flex } from '@rebass/grid';
import jsCookie from 'js-cookie';
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern' });

const Page = styled.div`
svg {
  width: 100px;
  display: block;
  margin: 0px auto 24px;
}

.path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
  &.circle {
    -webkit-animation: dash .9s ease-in-out;
    animation: dash .9s ease-in-out;
  }
  &.line {
    stroke-dashoffset: 1000;
    -webkit-animation: dash .9s .35s ease-in-out forwards;
    animation: dash .9s .35s ease-in-out forwards;
  }
  &.check {
    stroke-dashoffset: -100;
    -webkit-animation: dash-check .9s .35s ease-in-out forwards;
    animation: dash-check .9s .35s ease-in-out forwards;
  }
}

p {
  text-align: center;
  margin: 20px 0 60px;
  font-size: 1.25em;
  &.success {
    color: #73AF55;
  }
  &.error {
    color: #D06079;
  }
}


@-webkit-keyframes dash {
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@-webkit-keyframes dash-check {
  0% {
    stroke-dashoffset: -100;
  }
  100% {
    stroke-dashoffset: 900;
  }
}

@keyframes dash-check {
  0% {
    stroke-dashoffset: -100;
  }
  100% {
    stroke-dashoffset: 900;
  }
}

.booking {
    margin-top: 32px;
    max-width: 100%;
    width: 375px;
}

h1 {
    font-size: 24px;
    margin-bottom: 32px;
}

h3 {
    margin-top: 8px;
}

.center {
    text-align: center;
}

img{
    max-width:100%;
    width: 260px;
    border-radius: 4px;
    margin-bottom: 8px;
}

.thelist li:last-child {
    font-size: 14px;
    font-weight: 500;
}
`;

export default props => {
    return (
        <Layout haveSubHeader={true} pageTitle={'Hello World'}>
            <Section justifyCenter={true}>
                <br/><br/>
                <Page>
                    {true ?
                     <div className="box_detail booking">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                            <circle className="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                            <polyline className="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                        </svg>
                        <div style={{textAlign:'center'}}>
                            <h1 className="center">پرداخت با موفقیت انجام شد</h1>
                            <img src="https://core.otoli.net/media/17/i/20190507/1557234331_15e443c2e330.jpg"/>
                            <h2 className="center">سایپا تیبا ۱۴۲</h2>
                            <h3 className="center">طاها میرمیرانی</h3>
                        </div>
                         <ul className="thelist">
                            <li>شماره پیگری 
                                <span className="float-left">
                                    ۵۲۵۳۷۳۵۷۴۲۷۴۲
                                 </span>
                             </li>
                             <li>رسید پرداخت
                                <span className="float-left">
                                    ۵۲۵۳۷۳۵۷۴۲۷۴۲
                                 </span>
                             </li>
                             <li>محل تحویل
                                     <span className="float-left">
                                     سعادت آباد
                                 </span>
                             </li>
                             <li>از <span className="float-left">دوشنبه ۱۲ اردیبهشت ۹۷</span></li>
                             <li>تا <span className="float-left">جمعه ۲۴ اردیبهشت ۹۷</span></li>
                             <li>مدت زمان
                                     <span className="float-left">
                                     {convertNumbers2Persian(5)}
                                     <span> روز </span>
                                 </span>
                             </li>
                             <li>مسافت 
                                <span className="float-left">
                                    ۳۰۰ کیلومتر
                                 </span>
                             </li>

                         </ul>
                     </div>
                    :
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                            <circle className="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                            <line className="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
                            <line className="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
                        </svg>
                    }
                </Page>
            </Section>
        </Layout>
    );
}
