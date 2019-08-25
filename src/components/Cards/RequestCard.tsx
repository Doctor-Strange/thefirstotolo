import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import Router from 'next/router';
import { Button, Icon, Form, Label, Grid, Segment, Rating, TextArea } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from '@sweetalert/with-react'
import { Pelak, DateGrid } from './index';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English, getShortVersion } from '../../utils/numbers';
import jsCookie from 'js-cookie';
import { REQUEST_setOrderStatus } from '../../API';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern' });
import { ITheme } from "../../theme/Interfaces";

const Card = styled.div`
    direction: rtl;
    margin-top: 16px;
    margin-bottom: 16px;
    .label{
        background: ${({theme}:{theme:ITheme}) => theme.color.cardLabels};
    }
    .maincolor { 
        color: ${({theme}:{theme:ITheme}) => theme.color.mainForeground};
    }
    .ui.padded.segment {
        padding: 8px 8px 16px 8px;
    }
    .margintop8 {
        margin-top: 8px !important;
        top: -20px;
        position: relative;
        padding: 0 16px;
    }
    h3 {
        margin-bottom: 16px;
    }
    .img_wrapper{
        padding: 0 !important;
        text-align:center;
        img {
            /* width: 150px; */
            height: auto;
            border-radius: .28571429rem;
            max-height: 105px;
        }
    }
    .property {
        padding: 0 !important;
        margin-top: 8px;
        .column {
            font-size: 1.2em;
            &.right{
                text-align: right !important;
            }
            &.left {
                text-align: left !important;
            }
        }
        .date {
            width: 80px;
            text-align: center;
        }
    }
    .buttons{
        padding-bottom: 0px !important;
        margin: 0 !important;
        button {
            height: 40px;
            margin: 0;
            font-weight: 500;
            &.left{
            }
            &.right{
            }
        }
        .column {
            padding: 0 !important;
        }
    }
    .pelak {
        margin-top: 16px;
        .four.column.row {
            width: 170px !important;
            left: 0 !important;
        }
    }
`;

interface IRequestCard {
    id: any;
    status: 'new' | 'rejected' | 'approved' | 'paid' | 'cancelled' | 'not_delivered' | 'delivered' | 'returned',
    statusOwner: 'owner' | 'renter',
    carName: string;
    start: any;
    end: any;
    price: number;
    ownerName: string;
    ownerPhone: string;
    pelak: any;
    picture?: any;
    style?: any;
    refresh?: any;
    reviewStatus?: any;
}

interface IdoAction {
    id: string;
    action:
    | 'approve'
    | 'reject'
    | 'pay'
    | 'cancel'
    | 'deliver'
    | 'return'
    | 'rate';
    payload?: {
        toRate: 'owner' | 'renter'; // only in rate action
        type: 'user' | 'rent-order'; // only in rate action
        user_profile_id?: string; // only in rate action
        rate?: number; // only in rate action
        review?: string; // only in rate action
    };
}

export const RequestCard: React.SFC<IRequestCard> = ({
    id,
    status,
    statusOwner,
    carName,
    start,
    end,
    price = 10,
    ownerName,
    ownerPhone,
    userID,
    pelak = { first: "", second: "", third: "", forth: "" },
    picture,
    style = {},
    refresh,
    reviewStatus
}) => {
    const [star1, setStar1] = useState();
    const [star2, setStar2] = useState();
    const [text, setText] = useState();
    const [canRate, setCanRate] = useState(false);

    const doAction = async (data: IdoAction) => {
        const res = await REQUEST_setOrderStatus({ ...data, token: jsCookie.get('token') });
        if (data.action == 'pay') {
            Router.push(res.redirect_to, res.redirect_to, { shallow: false });
        }
        else {
            refresh();
        }
    }


    const openPhoneModal = (id) => {
        swal(
            <div>
                <h1>شماره تلفن اجاره‌گیرنده</h1>
                <span>{convertNumbers2Persian("0" + ownerPhone)}</span>
            </div>,
            {
                button: {
                    text: "بستن",
                    closeModal: true,
                },
            }
        );
    }

    const openRatingModal = (id) => {
        let localStar1;
        let localStar2;
        let localText;
        const settingStar1 = (e, data) => {
            localStar1 = data.rating;
        }

        const settingStar2 = (e, data) => {
            localStar2 = data.rating;
        }

        const settingText = (e, data) => {
            localText = data.value;
        }
        swal(
            <div>
                <h3>اامتیاز دهید</h3>
                <Form>
                    <Form.Field>
                        <label>امتیاز به
                            {statusOwner === 'renter' ? 'اجاره‌دهنده' : 'اجاره‌گیرنده'}
                        </label>
                        <Rating
                            maxRating={5}
                            defaultRating={star1}
                            icon='star'
                            size='huge'
                            onRate={settingStar1}
                        />
                    </Form.Field>
                    {statusOwner === 'renter' &&
                        <Form.Field>
                            <label>امتیاز به خودرو</label>
                            <Rating
                                maxRating={5}
                                defaultRating={star2}
                                icon='star'
                                size='huge'
                                onRate={settingStar2}
                            />
                        </Form.Field>
                    }
                    <Form.Field>
                        <label>تظر شما راجع به
                        {statusOwner === 'renter' ? 'خودرو' : 'اجاره‌گیرنده'}
                        </label>
                        <TextArea
                            placeholder='راستشو بگو...'
                            value={text}
                            onChange={settingText}
                        />
                    </Form.Field>
                </Form>
            </div>, {
                buttons: {
                    cancel: "لغو",
                    catch: {
                        text: "ثبت امتیاز",
                        value: "done",
                    }
                },
            })
            .then((value) => {
                trigerDoAction(value,id,{localStar1,localStar2,localText});
            });
    }

    const trigerDoAction = async (value,id,localData) => {
        const {localStar1,localStar2,localText} = localData;
        setStar1(localStar1);
        setStar2(localStar2);
        setText(localText);
        switch (value) {
            case "done":
                try {
                    const res1 = await doAction({
                        id,
                        action: 'rate',
                        payload: {
                            toRate: statusOwner,
                            type: 'rent-order',
                            rate: localStar1,
                            review: localText,
                        }
                    });
                    const res2 = await doAction({
                        id,
                        action: 'rate',
                        payload: {
                            toRate: statusOwner,
                            user_profile_id: userID,
                            type: 'user',
                            rate: localStar2,
                        }
                    });
                    toast.success('نظر شما با موفقیت ثبت شد', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }
                catch(error) {
                    toast.error('مشکلی پیش آمد', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }
                setStar1(null);
                setStar2(null);
                setText(null);
                break;
            default:
                //console.log('canceled');
        }
    }

    if(!canRate){
        if(statusOwner === "owner" && 
            (reviewStatus.has_owner_reviewed_rent_order || reviewStatus.has_owner_reviewed_renter)
        ) {
            setCanRate(true);
        }
        else if(statusOwner === "renter" && 
            (reviewStatus.has_renter_reviewed_owner || reviewStatus.has_renter_reviewed_rent_order)
        ) {
            setCanRate(true);
        }
    }
    

    let title;
    let actions;
    switch (status) {
        case 'new':
            statusOwner === "owner"
                ? title = <span><Icon name="calendar check" /> درخواست اجاره</span>
                : title = <span><Icon name="calendar check" />  درخواست اجاره (در انتظار تایید)</span>
            actions = <>
                {statusOwner === "owner" &&
                    <Grid.Row className="buttons">
                        <Grid.Column width={8}>
                            <div style={{ marginLeft: '8px' }}>
                                <Button
                                    onClick={() => doAction({ id, action: 'approve' })}
                                    primary
                                    fluid
                                    className="left">
                                    قبول
                            </Button>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <div style={{ marginRight: '8px' }}>
                                <Button
                                    onClick={() => doAction({ id, action: 'reject' })}
                                    basic
                                    fluid
                                    className="right">
                                    رد
                                </Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                }
            </>;
            break;
        case 'approved':
            title = <span><Icon name="credit card outline" /> در انتظار پرداخت</span>;
            actions = <>
                {statusOwner === "renter" &&
                    <Grid.Row className="buttons">
                        <Grid.Column width={16}>
                            <div style={{ marginLeft: '8px' }}>
                                <Button
                                    onClick={() => doAction({ id, action: 'pay' })}
                                    primary
                                    fluid
                                    className="left">
                                    پرداخت
                                </Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                }
            </>;
            break;
        case 'rejected':
            title = <span><Icon name="calendar times" /> رد شد</span>;
            break;
        case 'cancelled':
            title = <span><Icon name="calendar times" /> لغو شد</span>;
            break;
        case 'paid':
            title = <span><Icon name="map marker alternate" /> در انتظار تحویل خودرو</span>;
            actions = <>
                {statusOwner === "renter" &&
                    <Grid.Row className="buttons">
                        <Grid.Column width={16}>
                            <div style={{ marginLeft: '8px' }}>
                                <Button
                                    primary
                                    fluid
                                    onClick={() => doAction({ id, action: 'deliver' })}
                                >
                                    خودرو را تحویل گرفتم
                                </Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                }
            </>
            break;
        case 'not_delivered':
            title = <span>
                <Icon.Group>
                    <Icon name='calendar times' />
                    <Icon corner='bottom right' name='car' />
                </Icon.Group> سفر به شکل دستی لغو شد </span>;
            break;
        case 'delivered':
            title = <span>
                <Icon.Group>
                    <Icon name='road' />
                    <Icon corner='bottom right' name='car' />
                </Icon.Group> در حال سفر</span>;
            actions = <>
                {statusOwner === "owner" &&
                    <Grid.Row className="buttons">
                        <Grid.Column width={16}>
                            <div style={{ marginLeft: '8px' }}>
                                <Button
                                    primary
                                    fluid
                                    onClick={() => doAction({ id, action: 'return' })}
                                >
                                    خودرو را بازتحویل گرفتم
                                </Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                }
            </>;
            break;
        case 'returned':
            title = <span><Icon name="flag checkered" /> پایان اجاره</span>;
            actions = <>
                {canRate &&
                    <Grid.Row className="buttons">
                        <Grid.Column width={16}>
                            <div style={{ marginLeft: '8px' }}>
                                <Button
                                    primary
                                    fluid
                                    className="left"
                                    onClick={() => openRatingModal(id)}
                                >
                                    ثبت نظر
                                </Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                }
            </>;
            break;
        default:
    }

    return (
        <Card className="request_card">
            <Segment padded>
                <Label attached='top right'>{title}</Label>
                <Grid className="margintop8">
                    <Grid.Row columns={2} style={{ margin: '0 auto', marginTop: '8px', paddingBottom: 0 }}>
                        <Grid.Column width={11} style={{ paddingLeft: '24px', paddingRight: '0' }}>
                            <h3>{carName}</h3>
                            <DateGrid start={start} end={end} />
                            <Grid className="property-row">
                                <Grid.Row columns={2} centered className="property">
                                    <Grid.Column width={8} className="right">
                                        هزینه اجاره
                                </Grid.Column>
                                    <Grid.Column width={7} className="left">
                                        <div style={{ float: 'right', textAlign: 'right' }}>
                                            <strong style={{ fontSize: '14px' }}>
                                                {convertNumbers2Persian(numberWithCommas(price))}{' '}
                                                تومان
                                            </strong>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column width={5} className="img_wrapper">
                            <img src={picture} alt={carName} />
                            <Pelak
                                first={pelak.first}
                                second={pelak.second}
                                third={pelak.third}
                                forth={pelak.fourth}
                                type={1}
                                size={"small"}
                                style={{}}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ margin: '0 auto' }}>
                        <Grid.Column>
                            <Grid className="property-row">
                                <Grid.Row columns={2} centered className="property">
                                    <Grid.Column width={10} className="right" style={{ paddingRight: '0' }}>
                                        <strong><Icon name="user circle" /> {ownerName} </strong>
                                    </Grid.Column>
                                    <Grid.Column width={6} className="left" style={{ padding: 0, }}>
                                        {statusOwner === "owner" &&
                                            <>
                                                {isMobile &&
                                                    <a href={`tel:${ownerPhone}`} className="maincolor">
                                                        تماس با  درخواست‌دهنده
                                                </a>
                                                }
                                                {isBrowser &&
                                                    <Button
                                                        basic
                                                        className="maincolor"
                                                        style={{ boxShadow: 'none' }}
                                                        onClick={() => openPhoneModal()}
                                                    >
                                                        تماس با  درخواست‌دهنده
                                                    </Button>
                                                }
                                            </>
                                        }
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                    {actions}
                </Grid>
            </Segment>
        </Card>
    )
};
