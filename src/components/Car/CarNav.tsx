import * as React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import StarRatingComponent from 'react-star-rating-component';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../../lib/numbers';

const Line = styled.nav`

`;

export const CarNav: React.FunctionComponent<{
    startDate: string;
    endDate: string;
}> = ({ startDate, endDate }) => (
    <Line className="secondary_nav sticky_horizontal_2 navbar">
        <div className="container">
            <h4> از {startDate} تا {endDate} </h4>
        </div>
    </Line>
);
