import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Section } from '../row/Sections';
import {
    Button,
    Card,
    Checkbox,
    Dropdown,
    Form,
    Grid,
    Icon,
    Label,
    Segment,
    TextArea,
    Transition
} from 'semantic-ui-react';
import { CarCard, CarCardPlaceholder } from '../Cards';
import { BulletList } from "react-content-loader";
import { i18n, withNamespaces } from '../../i18n';
import {
    DateRangePicker,
    DayPickerRangeController,
    SingleDatePicker
} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment-jalaali';
moment.loadPersian();
import { Box, Flex } from '@rebass/grid';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../../lib/numbers';

const Results = styled.div`
`;

// interface ISearchResultFormValues {
//   carCity: number;
//   startDate: any;
//   endDate: any;
// }

export class ResultsCards extends React.Component<{
    t?: any;
    results?: any;
    loadingResults: boolean;
    showMore: boolean;
    lodingMore: boolean;
    noResult: boolean;
    nextPage?: any;
    dateURL?: string;
    colClass?: string;
    marginClass?: string;
    showInProfile?: boolean;
    userOwnPage?: boolean;
}> {
    state = {
        error: '',
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { t,
            results,
            loadingResults,
            noResult,
            showMore = false,
            nextPage,
            dateURL,
            lodingMore,
            colClass = "col-lg-9",
            marginClass = "margin_60_35",
            showInProfile = false,
            userOwnPage = false,
        } = this.props;
        return (
            <>
                <Section justifyCenter={false} justifyContent={'flex-end'} className={`${colClass} ${marginClass} carcards_section`}>
                    {(loadingResults === true) ?
                        (
                            <>
                                <CarCardPlaceholder />
                                <CarCardPlaceholder />
                                <CarCardPlaceholder />
                                <br />
                                <CarCardPlaceholder />
                                <CarCardPlaceholder />
                                <CarCardPlaceholder />
                            </>
                        ) : (
                            results.map((value, index) =>
                                <CarCard
                                    key={index}
                                    id={value.id}
                                    title={value.car.brand.name.fa + " " + value.car.name.fa}
                                    year={value.year.name.fa}
                                    img={
                                        (value.media_set[0]
                                            || { url: "http://www.sirjanamlak.com/images/estate_images/default.jpg" })
                                            .url
                                    }
                                    price={value.avg_price_per_day}
                                    description={value.description}
                                    deliver_at_renters_place={value.deliver_at_renters_place}
                                    // text2={value.text2}
                                    score={"8.4"}
                                    dateURL={dateURL}
                                    search_id={value.search_id}
                                    simpleMode={showInProfile}
                                    showEditButtons={userOwnPage}
                                />
                            )
                        )
                    }
                    {noResult ?
                        (
                            <span>
                                نتیجه‌ای برای جست‌وجوی شما یافت نشد
                           </span>
                        ) : <></>
                    }
                    {showMore ? (
                        <p className="text-center" style={{ width: '100%', marginTop: '20px' }}>
                            <Button basic loading={lodingMore} onClick={() => { nextPage() }}>بیشتر بارگذاری کن</Button>
                        </p>) : (<> </>)}
                </Section>
            </>
        )
    }
}