import * as React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import { Button, Icon, Image, Label, Grid, Segment } from 'semantic-ui-react'
import { Pelak,sizeType} from './index';
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

export const RequestCard: React.FunctionComponent<{
    status: any;
    carName: string;
    start: any;
    end: any;
    price: number;
    ownerName: string;
    ownerPhone: string;
    pelak: any;
    picture?: any;
    style?: any;
}> = ({ status, carName, start, price, ownerName, ownerPhone, pelak, picture, style = {} }) => (
    <Card className="request_card">
        <Segment padded>
            <Label attached='top right'>{status}</Label>
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
                                <Grid.Column width={8} className="left">
                                    <div className="date" style={{ float: 'left', textAlign: 'left' }}>
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
                                <Grid.Column width={8} className="left">
                                    <strong>۶۰۰ هزار تومان</strong>
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
                                    <strong>حاج مهراد روستا و دوستان</strong>
                                </Grid.Column>
                                <Grid.Column width={6} className="left" style={{ padding: 0, color: '#00ACC1' }}>
                                    نمایش شماره تماس
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
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
            </Grid>
        </Segment>
    </Card>
);
