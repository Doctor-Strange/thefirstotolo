import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
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
  TextArea
} from 'semantic-ui-react';
import { Formik, FormikActions, withFormik } from 'formik';
import * as Yup from 'yup';
import jsCookie from 'js-cookie';
import axios from 'axios';
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

const FilterAndSort = styled.div`
    padding: 10px 0 5px 0;
    background: #fff;
    border-bottom: 1px solid #ededed;
    z-index: 99 !important;
    position: relative;
    ul {
        display: flow-root;
        margin: 0;
        li {
            margin-right: 10px;
            &:first-child {
                float: left;
            }
            &:nth-child(2) {
                float: left;
                margin-right: 0;
            }
            &:nth-child(3) {
                float: right;
                margin-right: 0;
                @media (max-width: 767px) {
                    display: none;
                }
            }
            &:nth-child(4) {
                float: right;
                @media (max-width: 767px) {
                    margin-right: 0;
                }
            }
        }
    }
    .switch-field {
        overflow: hidden;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 3px;
        input {
            position: absolute !important;
            clip: rect(0, 0, 0, 0);
            height: 1px;
            width: 1px;
            border: 0;
            overflow: hidden;
            &:checked + label {
                box-shadow: none;
                color: rgba(0, 0, 0, 0.9);
            }
        }   
        label {
            float: left;
            display: inline-block;
            min-width: 65px;
            color: rgba(0, 0, 0, 0.5);
            font-weight: 600;
            font-size: 12px;
            font-size: 0.75rem;
            text-align: center;
            text-shadow: none;
            padding: 10px 8px 8px 8px;
            line-height: 1;
            border-right: 1px solid rgba(0, 0, 0, 0.08);
            transition: all 0.2s ease-in-out;
            margin: 0;
            @media (max-width: 575px) {
                min-width: inherit;
            }
            &:first-of-type {
                border-left: 0;
            }
            &:last-of-type {
                border-right: 0;
            }
            &:hover {
                cursor: pointer;
                color: #004dda;
            }
        }
    }
    a.btn_filt, a.btn_filt_map {
        border-radius: 3px;
        padding: 8px 12px 8px 10px;
        line-height: 1;
        margin-bottom: 5px;
        display: inline-block;
        border: 1px solid rgba(0, 0, 0, 0.08);
        font-weight: 600;
        font-size: 12px;
        font-size: 0.75rem;
        color: rgba(0, 0, 0, 0.5);
        position: relative;
    }
    a.btn_map {
        border-radius: 3px;
        padding: 8px 12px 8px 10px;
        line-height: 1;
        margin-bottom: 5px;
        display: inline-block;
        border: 1px solid rgba(0, 0, 0, 0.08);
        font-weight: 600;
        font-size: 12px;
        font-size: 0.75rem;
        color: rgba(0, 0, 0, 0.5);
    }
    
`;

// interface ISearchResultFormValues {
//   carCity: number;
//   startDate: any;
//   endDate: any;
// }

export class FilterAndSortBar extends React.Component<{
  count?: number;
  t?: any;
}> {
  state = {
    error: ''
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;
    return (
        <FilterAndSort class="filters_listing sticky_horizontal">
            <div class="container">
                <ul class="clearfix">
                    <li>
                        <div class="switch-field">
                            <input
                            type="radio"
                            id="all"
                            name="listing_filter"
                            value="all"
                            checked
                            />
                            <label for="all">All</label>
                            <input
                            type="radio"
                            id="popular"
                            name="listing_filter"
                            value="popular"
                            />
                            <label for="popular">Popular</label>
                            <input
                            type="radio"
                            id="latest"
                            name="listing_filter"
                            value="latest"
                            />
                            <label for="latest">Latest</label>
                        </div>
                    </li>
                    <li>
                    <a
                        class="btn_filt"
                        data-toggle="collapse"
                        href="#filters"
                        aria-expanded="false"
                        aria-controls="filters"
                        data-text-swap="Less filters"
                        data-text-original="More filters"
                        >More filters</a
                    >
                    </li>
                    <li>
                    <div class="layout_view">
                        <a href="#0" class="active"><i class="icon-th"></i></a>
                        <a href="/listing-2"><i class="icon-th-list"></i></a>
                        <a href="/list-map"><i class="icon-map"></i></a>
                    </div>
                    </li>
                    <li>
                    <a
                        class="btn_map"
                        data-toggle="collapse"
                        href="#collapseMap"
                        aria-expanded="false"
                        aria-controls="collapseMap"
                        data-text-swap="Hide map"
                        data-text-original="View on map"
                        >View on map</a
                    >
                    </li>
                </ul>
            </div>
        </FilterAndSort>
    )}
}