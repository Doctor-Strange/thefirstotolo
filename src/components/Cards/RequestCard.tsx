import * as React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import { Button, Icon, Image, Label, Grid, Segment } from 'semantic-ui-react'
import swal from '@sweetalert/with-react'
import { Pelak, sizeType, DateGrid } from './index';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English, getShortVersion } from '../../lib/numbers';
import jsCookie from 'js-cookie';
import { REQUEST_setOrderStatus } from '../../API';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import moment from 'moment-jalaali';
moment.loadPersian();

const Card = styled.div`
    direction: rtl;
    margin-top: 16px;
    margin-bottom: 16px;
    .label{
        background: #f7f7f7;
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
}

interface IdoAction {
    id: any;
    action: 'approve' | 'reject' | 'pay' | 'cancel' | 'deliver' | 'return' | 'rate';
}


export const RequestCard: React.FunctionComponent<IRequestCard> = ({
    id,
    status,
    statusOwner,
    carName,
    start,
    end,
    price = 10,
    ownerName,
    ownerPhone,
    pelak = { first: "", second: "", third: "", forth: "" },
    picture,
    style = {}
}) => {

    const doAction = async (data: IdoAction) => {
        const res = await REQUEST_setOrderStatus({ id: data.id, action: data.action, token: jsCookie.get('token') });
        console.log(res);
    }

    const openPhoneModal = () => {
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
                                    خودرو را تحویل گرفتم
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
                <Grid.Row className="buttons">
                    <Grid.Column width={16}>
                        <div style={{ marginLeft: '8px' }}>
                            <Button
                                primary
                                fluid
                                className="left"
                                onClick={() => doAction({ id, action: 'rate' })}
                            >
                            ثبت نظر
                            </Button>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </>;
            break;
        default:
    }

    return (
        <Card className="request_card">
            <Segment padded>
                <Label attached='top right'>{title}</Label>
                <Grid className="margintop8">
                    <Grid.Row columns={2} style={{ margin: '0 auto', marginTop: '8px',paddingBottom: 0 }}>
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
                                size={sizeType.small}
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
                                                    <a href={`tel:${ownerPhone}`} style={{ color: '#00ACC1' }}>
                                                        تماس با  درخواست‌دهنده
                                                </a>
                                                }
                                                {isBrowser &&
                                                    <Button
                                                        basic
                                                        style={{ color: '#00ACC1', boxShadow: 'none'}}
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
