import * as React from 'react';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react'
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English, getShortVersion } from '../../lib/numbers';
import * as PelakImage from '../../../static/pelak2.png';

const Card = styled.div`
    margin: 16px auto;
    display: inline-block;
    .large {
        background: url(${PelakImage}) no-repeat;
        height: 70px;
        width: 308px;
        font-size: 32px;
        .first {
            padding-right: 0px !important;
        }
        .second {
            position: relative;
            top:-8px;
        }
    }
    .normal {
        height: 40px;
        width: 175px;
        font-size: 20px;
        .row {
            left: 15px;
            padding-top: 5px;
            padding-bottom: 5px;
            .column {
                border-bottom: 1px solid #6c6c6c;
                border-top: 1px solid #6c6c6c;
                padding: 0;
                text-align: center;
                :first-child{
                    padding-right: 0 !important;
                    border-bottom-left-radius: 5px;
                    border-top-left-radius: 5px;
                    border-left: 1px solid #6c6c6c;
                }
                :nth-child(2) {
                    span{
                        position: relative;
                        top:-3px;
                    }
                }
                :last-child{
                    border-bottom-right-radius: 5px;
                    border-top-right-radius: 5px;
                    border-right: 1px solid #6c6c6c;
                    border-left: 1px solid #6c6c6c;
                    padding: 0;
                    text-align: center;
                }
            }
        }
    }
    .small {

    }
    
`;

const Pelak: React.FunctionComponent<{
    first: string;
    second: string;
    third: string;
    forth: string;
    type?: number;
    size?: sizeType;
    style?: any;
}> = ({ first, second, third, forth, type = 1, size = sizeType.normal },style = {}) => (
    <Card className="pelak">
        <Grid className={`${size} type${type}`} style={style}>
            <Grid.Row columns={4}>
                <Grid.Column width={(size == 'large') ? 5 : 4} className="first">
                    {convertNumbers2Persian(first)}
                </Grid.Column>
                <Grid.Column width={(size == 'large') ? 3 : 3} className="second">
                    <span>{second}</span>
                </Grid.Column>
                <Grid.Column width={(size == 'large') ? 4 : 4} className="third">
                    {convertNumbers2Persian(third)}
                </Grid.Column>
                <Grid.Column width={(size == 'large') ? 4 : 4} className="forth">
                    {convertNumbers2Persian(forth)}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Card>
);

enum sizeType {
    large = 'large',
    normal = 'normal',
    // small = 'small',
    // tiny = 'tiny'
}

export { Pelak, sizeType };



