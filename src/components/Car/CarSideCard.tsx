import * as React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import StarRatingComponent from 'react-star-rating-component';
import { Icon, Segment, Button, Popup } from 'semantic-ui-react';
import { UserCard } from '../Cards';
import {
    convertDateToMoment,
    convertMomentToDate,
    convertRangeDateToMoment,
    convertMomentsToDateRange,
    getBetweenRange
} from '../../utils/date';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English, getShortVersion } from '../../utils/numbers';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CarDateRange } from './index';

const Card = styled.nav`
    .DatePicker__calendarContainer {
        display: none;
    }
    .DatePicker__input {
        font-size: 15px;
        font-family: Vazir;
    }
    .price {
        top: -20px;
        position: relative;
        text-align: center;
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
    }
`;

const CarideCard: React.FunctionComponent<{
    date: any;
    price: any;
    user: any;
    reserveFunction: any;
}> = ({ date, price, user, reserveFunction }) => {
    return (
        <Card>
            {(price > 0) &&
                <div className="price">
                    <span className="number" style={{ fontSize: 30 + 'px' }}>
                        <span>
                            {convertNumbers2Persian(getShortVersion(price).number)}
                        </span>
                    </span>
                    <span className="unit">
                        <span className="strong">{getShortVersion(price).unit} تومان</span>
                        <span>در روز</span>
                    </span>
                </div>
            }
            <CarDateRange from={convertMomentToDate(date.start)} to={convertMomentToDate(date.end)} />
            <UserCard
                id={user.id}
                firstname={user.first_name}
                lastname={user.last_name}
                username={user.username}
                responceTime="میانگین زمان پاسخگویی: نامشخص"
                image={user.image_url}
            />
            <Button
                style={{ height: '48px' }}
                size='large'
                fluid
                onClick={reserveFunction}
                color='teal'>درخواست اجاره</Button>
            <div
                style={{ marginTop: '8px' }}
                className="text-center"
            >
                <small>دراین مرحله هزینه‌ای اخذ نمی‌شود.</small>
            </div>
        </Card>
    )
};

export default CarideCard;

interface IDate {
    year: number;
    month: number;
    day: number;
}

interface IRange {
    from: IDate;
    to: IDate;
}

