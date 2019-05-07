import * as React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English, getShortVersion } from '../../lib/numbers';

const Card = styled.div`
    left: 20px;
    box-shadow: 5px -4px 6px 0px #0000000a;
    text-align: center;
    border-radius: 5px;
    background: white;
    width: 80px;
    height: 80px;
    padding: 5px;
    margin: 0 auto;
    .number{
        height: 34px;
        line-height: 43px;
        display: block;
        width: 65px;
        margin: 0 auto;
        font-weight: 500;
    }
    .unit{
        padding: 0px;
        display: block;
        .strong{
            font-size: 14px;
            display: block;
            font-weight: 400;
        }
    }
`;

export const PriceCard: React.FunctionComponent<{
    number: any;
    preNumber?: any;
    fontSize?: number;
}> = ({ children, number, preNumber, fontSize = 30 }) => (
    <Card className="price">
        <span className="number" style={{ fontSize: fontSize + 'px' }}>{preNumber} {convertNumbers2Persian(getShortVersion(number).number)} </span>
        <span className="unit">
            <span className="strong">{getShortVersion(number).unit} تومان</span>
            <span>{children}</span>
        </span>
    </Card>
);