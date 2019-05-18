import * as React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import StarRatingComponent from 'react-star-rating-component';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../../lib/numbers';

const Item = styled.div`
    direction: rtl;
`;

export const Details: React.FunctionComponent<{
    title: any;
    children: any;
    showHr?: boolean;
}> = ({ title, children, showHr = true }) => (
    <Item>
        <h5 className="add_bottom_15not">{title}</h5>
        {children}
        {showHr ? <hr /> : ""}
    </Item>
);
