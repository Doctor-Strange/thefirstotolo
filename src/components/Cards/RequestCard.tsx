import * as React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import { Button, Icon, Image, Label, Grid, Segment } from 'semantic-ui-react'
import { Pelak, sizeType } from './index';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English, getShortVersion } from '../../lib/numbers';

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
        img {
            /* width: 150px; */
            height: auto;
            border-radius: .28571429rem;
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

enum statusType {
    newRequest = 1,
    cancelled = 2,
    notPeyed = 3,
    ready = 4,
    inRent = 5,
    doneRent = 6,
}

export const RequestCard: React.FunctionComponent<{
    status: statusType;
    carName: string;
    start: any;
    end: any;
    price: number;
    ownerName: string;
    ownerPhone: string;
    pelak: any;
    picture?: any;
    style?: any;
}> = ({ status, carName, start, price, ownerName, ownerPhone, pelak, picture, style = {} }) => {
    let title;
    let actions;
    switch (status) {
        case 1:
            title = <span><Icon name="calendar check" /> درخواست اجاره</span>;
            actions = <>
                <Grid.Row className="buttons">
                    <Grid.Column width={8}>
                        <div style={{ marginLeft: '8px' }}>
                            <Button primary fluid className="left">قبول</Button>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <div style={{ marginRight: '8px' }}>
                            <Button basic fluid className="right">رد</Button>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </>;
            break;
        case 2:
            title = <span><Icon name="credit card outline" /> در انتظار پرداخت</span>;
            break;
        case 3:
            title = <span style={{ color: '#a00000de'}}><Icon name="calendar times" /> لغو شد</span>;
            break;
        case 4:
            title = <span><Icon name="map marker alternate" /> در انتظار تحویل خودرو</span>;
            break;
        case 5:
            title = <span>
                <Icon.Group>
                    <Icon name='road' />
                    <Icon corner='bottom right' name='car' />
                </Icon.Group> در حال سفر</span>;
            actions = <>
                <Grid.Row className="buttons">
                    <Grid.Column width={16}>
                        <div style={{ marginLeft: '8px' }}>
                            <Button primary fluid className="left">خودرو را تحویل گرفتم</Button>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </>;
            break;
        case 6:
            title = <span><Icon name="flag checkered" /> پایان اجاره</span>;
            actions = <>
                <Grid.Row className="buttons">
                    <Grid.Column width={16}>
                        <div style={{ marginLeft: '8px' }}>
                            <Button primary fluid className="left">ثبت نظر</Button>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </>;
            break;
        default:
        // code block
    }
    return (
        <Card className="request_card">
            <Segment padded>
                <Label attached='top right'>{title}</Label>
                <Grid className="margintop8">
                    <Grid.Row columns={2} style={{ margin: '0 auto', marginTop: '8px' }}>
                        <Grid.Column width={11} style={{ paddingLeft: '24px', paddingRight: '0' }}>
                            <h3>{carName}</h3>
                            <Grid className="property-row">
                                <Grid.Row columns={2} centered className="property">
                                    <Grid.Column width={8} className="right">
                                        <div className="date" style={{ float: 'right', textAlign: 'right' }}>
                                            <strong>سه‌شنبه</strong> <br />
                                            ۹۸/۰۵/۲۴
                                    </div>
                                    </Grid.Column>
                                    <Grid.Column width={7} className="left">
                                        <div className="date" style={{ float: 'right', textAlign: 'right' }}>
                                            <strong>جمعه</strong><br />
                                            ۹۸/۰۵/۳۰
                                    </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Grid className="property-row">
                                <Grid.Row columns={2} centered className="property">
                                    <Grid.Column width={8} className="right">
                                        هزینه اجاره
                                </Grid.Column>
                                    <Grid.Column width={7} className="left">
                                        <div style={{ float: 'right', textAlign: 'right' }}>
                                            <strong style={{ fontSize: '14px' }}>۶۰۰ هزار تومان</strong>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column width={5} className="img_wrapper">
                            <img src={picture} alt={carName} />
                            <Pelak
                                first="22"
                                second="ص"
                                third="546"
                                forth="22"
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
                                        <strong><Icon name="user circle" />  حاج مهراد روستا و دوستان</strong>
                                    </Grid.Column>
                                    <Grid.Column width={6} className="left" style={{ padding: 0, color: '#00ACC1' }}>
                                        نمایش شماره تماس
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
