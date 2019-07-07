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
  TextArea,
  Transition
} from 'semantic-ui-react';
import Nouislider from "nouislider-react";
import { Formik, FormikActions, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { i18n, withTranslation } from '../../i18n';
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern' });
import { Box, Flex } from '@rebass/grid';
import { FilterType } from "./FilterType";
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English, getShortVersion } from '../../lib/numbers';
import { PriceCard } from '../Cards'

const FilterAndSort = styled.div`
    width: 100vw;
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
                float: right;
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
        cursor: pointer;
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


  .noUi-target,
  .noUi-target * {
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-user-select: none;
    -ms-touch-action: none;
    touch-action: none;
    -ms-user-select: none;
    -moz-user-select: none;
    user-select: none;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .noUi-target {
    position: relative;
    direction: ltr;
  }
  .noUi-base,
  .noUi-connects {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }
  /* Wrapper for all connect elements. */
  .noUi-connects {
    overflow: hidden;
    z-index: 0;
  }
  .noUi-connect,
  .noUi-origin {
    will-change: transform;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    -ms-transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    -webkit-transform-style: preserve-3d;
    transform-origin: 0 0;
    transform-style: flat;
    background: ${({theme}:{theme:ITheme}) => theme.color.mainForeground} !important;
  }
  /* Offset direction
  */
  html:not([dir="rtl"]) .noUi-horizontal .noUi-origin {
    left: auto;
    right: 0;
  }
  /* Give origins 0 height/width so they don't interfere with clicking the
  * connect elements.
  */
  .noUi-vertical .noUi-origin {
    width: 0;
  }
  .noUi-horizontal .noUi-origin {
    height: 0;
  }
  .noUi-handle {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    position: absolute;
  }
  .noUi-touch-area {
    height: 100%;
    width: 100%;
  }
  .noUi-state-tap .noUi-connect,
  .noUi-state-tap .noUi-origin {
    -webkit-transition: transform 0.3s;
    transition: transform 0.3s;
  }
  .noUi-state-drag * {
    cursor: inherit !important;
  }
  /* Slider size and handle placement;
  */
  .noUi-horizontal {
    height: 18px;
  }
  .noUi-horizontal .noUi-handle {
    width: 34px;
    height: 28px;
    left: -17px;
    top: -6px;
  }
  .noUi-vertical {
    width: 18px;
  }
  .noUi-vertical .noUi-handle {
    width: 28px;
    height: 34px;
    left: -6px;
    top: -17px;
  }
  html:not([dir="rtl"]) .noUi-horizontal .noUi-handle {
    right: -17px;
    left: auto;
  }
  /* Styling;
  * Giving the connect element a border radius causes issues with using transform: scale
  */
  .noUi-target {
    background: #FAFAFA;
    border-radius: 4px;
    border: 1px solid #D3D3D3;
    box-shadow: inset 0 1px 1px #F0F0F0, 0 3px 6px -5px #BBB;
  }
  .noUi-connects {
    border-radius: 3px;
  }
  .noUi-connect {
    background: #3FB8AF;
  }
  /* Handles and cursors;
  */
  .noUi-draggable {
    cursor: ew-resize;
  }
  .noUi-vertical .noUi-draggable {
    cursor: ns-resize;
  }
  .noUi-handle {
    border: 1px solid #D9D9D9;
    border-radius: 3px;
    background: #FFF;
    cursor: default;
    box-shadow: inset 0 0 1px #FFF, inset 0 1px 7px #EBEBEB, 0 3px 6px -3px #BBB;
  }
  .noUi-active {
    box-shadow: inset 0 0 1px #FFF, inset 0 1px 7px #DDD, 0 3px 6px -3px #BBB;
  }
  /* Handle stripes;
  */
  .noUi-handle:before,
  .noUi-handle:after {
    content: "";
    display: block;
    position: absolute;
    height: 14px;
    width: 1px;
    background: #E8E7E6;
    left: 14px;
    top: 6px;
  }
  .noUi-handle:after {
    left: 17px;
  }
  .noUi-vertical .noUi-handle:before,
  .noUi-vertical .noUi-handle:after {
    width: 14px;
    height: 1px;
    left: 6px;
    top: 14px;
  }
  .noUi-vertical .noUi-handle:after {
    top: 17px;
  }
  /* Disabled state;
  */
  [disabled] .noUi-connect {
    background: #B8B8B8;
  }
  [disabled].noUi-target,
  [disabled].noUi-handle,
  [disabled] .noUi-handle {
    cursor: not-allowed;
  }
  /* Base;
  *
  */
  .noUi-pips,
  .noUi-pips * {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .noUi-pips {
    position: absolute;
    color: #999;
  }
  /* Values;
  *
  */
  .noUi-value {
    position: absolute;
    white-space: nowrap;
    text-align: center;
  }
  .noUi-value-sub {
    color: #ccc;
    font-size: 10px;
  }
  /* Markings;
  *
  */
  .noUi-marker {
    position: absolute;
    background: #CCC;
  }
  .noUi-marker-sub {
    background: #AAA;
  }
  .noUi-marker-large {
    background: #AAA;
  }
  /* Horizontal layout;
  *
  */
  .noUi-pips-horizontal {
    padding: 10px 0;
    height: 80px;
    top: 100%;
    left: 0;
    width: 100%;
  }
  .noUi-value-horizontal {
    transform: translate(-50%, 50%);
  }
  .noUi-rtl .noUi-value-horizontal {
    transform: translate(50%, 50%);
  }
  .noUi-marker-horizontal.noUi-marker {
    margin-left: -1px;
    width: 2px;
    height: 5px;
  }
  .noUi-marker-horizontal.noUi-marker-sub {
    height: 10px;
  }
  .noUi-marker-horizontal.noUi-marker-large {
    height: 15px;
  }
  /* Vertical layout;
  *
  */
  .noUi-pips-vertical {
    padding: 0 10px;
    height: 100%;
    top: 0;
    left: 100%;
  }
  .noUi-value-vertical {
    transform: translate(0, -50%);
    padding-left: 25px;
  }
  .noUi-rtl .noUi-value-vertical {
    transform: translate(0, 50%);
  }
  .noUi-marker-vertical.noUi-marker {
    width: 5px;
    height: 2px;
    margin-top: -1px;
  }
  .noUi-marker-vertical.noUi-marker-sub {
    width: 10px;
  }
  .noUi-marker-vertical.noUi-marker-large {
    width: 15px;
  }
  .noUi-tooltip {
    display: block;
    position: absolute;
    border: 1px solid #D9D9D9;
    border-radius: 3px;
    background: #fff;
    color: #000;
    padding: 5px;
    text-align: center;
    white-space: nowrap;
  }
  .noUi-horizontal .noUi-tooltip {
    transform: translate(-50%, 0);
    left: 50%;
    bottom: 120%;
  }
  .noUi-vertical .noUi-tooltip {
    transform: translate(0, -50%);
    top: 50%;
    right: 120%;
  }
`;

const FiltersDiv = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #ededed;
  overflow: hidden;
  .rangeclass{
    padding: 5px 30px;
  }
  h6 {
      margin-bottom: 15px;
      font-size: 16px;
      font-size: 1rem;
      text-align: right
  }
  /* ul li small {
    font-weight: 600;
    float: left;
    position: relative;
    top: 4px;
  } */
  
  /* &:not(.show) {
    display: none;
  } */

`;

// interface ISearchResultFormValues {
//   carCity: number;
//   startDate: any;
//   endDate: any;
// }

export class FilterAndSortBar extends React.Component<{
  t?: any;
  showFilters: boolean;
  toggleToCarBodyType: any;
  toggleShowFilters: any;
  toggleDeliverAtRentersPlace: any;
  togglePriceSort: any;
  setBrandAndGetModels: any;
  setModel: any;
  setPrice: any;
  brand: any;
  model: any;
  brands: any;
  models: any;
  brandLoading: any;
  modelLoading: any;
  price: any;
  priceSort: any;
  deliverAtRentersPlace: any;
  carBodyType: any;
  stats?: any;
}> {
  state = {
    error: '',
  };

  constructor(props) {
    super(props);
  }

  onSlide = (render, handle, value, un, percent) => {
    this.props.setPrice(value);
  };

  render() {
    const { t, showFilters, brands, brand, models, model, deliverAtRentersPlace, price, priceSort,
      brandLoading, modelLoading } = this.props;
    const { setBrandAndGetModels, setModel, toggleShowFilters, togglePriceSort,
      toggleDeliverAtRentersPlace, setPrice, toggleToCarBodyType, carBodyType, stats } = this.props;
    const { brandsEnglish, brandsFarsi } = brands;
    const { modelsEnglish, modelsFarsi } = models;
    const az = <span style={{}}>از</span>;
    const ta = <span style={{}}>تا</span>;
    return (
      <>
        <Form>
          <FilterAndSort className="filters_listing sticky_horizontal hide_on_desktop">
            <div className="container">
              <ul className="clearfix">
                <li>
                  <div className="switch-field">
                    <input
                      type="radio"
                      id="all"
                      name="listing_filter"
                      value="all"
                      checked={priceSort == "price"}
                    />
                    <label onClick={(e) => { togglePriceSort("price") }}>قیمت کم به زیاد</label>
                    <input
                      type="radio"
                      id="latest"
                      name="listing_filter"
                      value="latest"
                      checked={priceSort == "-price"}
                    />
                    <label onClick={(e) => { togglePriceSort("-price") }} >قیمت زیاد به کم</label>
                  </div>
                </li>
                <li>
                  <a
                    className="btn_filt"
                    data-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="filters"
                    onClick={() => { toggleShowFilters(!showFilters) }}
                  ><Icon name='options' /> {showFilters ? "گزینه‌های کمتر" : "گزینه‌های بیشتر"}</a
                  >
                </li>
                <li>
                  <div className="layout_view">
                    <a href="#0" className="active"><i className="icon-th"></i></a>
                    <a href="/listing-2"><i className="icon-th-list"></i></a>
                    <a href="/list-map"><i className="icon-map"></i></a>
                  </div>
                </li>
                {/* <li>
                    <a
                        className="btn_map"
                        data-toggle="collapse"
                        href="#collapseMap"
                        aria-expanded="false"
                        aria-controls="collapseMap"
                        data-text-swap="Hide map"
                        data-text-original="View on map"
                        >View on map</a
                    >
                    </li> */}
              </ul>
            </div>
          </FilterAndSort>
          <Transition visible={showFilters} duration={300}>
            <FiltersDiv className="collapse" id="filters">
              <div className="container margin_16">
                <div className="row">
                  <div className="col-12">
                    <h6>قیمت</h6>
                    <div className="rangeclass">
                      <div className="row" style={{ padding: '20px', paddingTop: '0px' }}>
                        <div className="col-6">
                          <PriceCard number={price[0]} preNumber={az} fontSize={25}>
                            در روز
                          </PriceCard>
                        </div>
                        <div className="col-6">
                          <PriceCard number={price[1]} preNumber={ta} fontSize={25}>
                            در روز
                          </PriceCard>
                        </div>
                      </div>
                      <Nouislider
                        range={{ min: 0, max: 2000000 }}
                        start={price}
                        margin={100000}
                        connect
                        direction={'rtl'}
                        onSlide={this.onSlide}
                        step={100000}
                      />
                    </div>
                  </div>
                </div>
                <div className="row margin_30_5">
                  <div className="col-12">
                    <h6>تحویل در محل</h6>
                    <ul>
                      <li>
                        <label className="container_check"> تحویل در محل <small>{stats.deliver_at_renters_place}</small>
                          <input
                            onClick={() => { toggleDeliverAtRentersPlace(!deliverAtRentersPlace) }}
                            type="checkbox"
                            checked={deliverAtRentersPlace}
                          />
                          <span className="checkmark" />
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <h6 style={{ width: '100%', paddingRight: '15px', paddingLeft: '15px', paddingBottom: '0px', margin: '0 0 .48571429rem 0' }}>نوع شاسی</h6>
                  <div className="col-6">
                    <ul>
                      <li>
                        <label

                          className="container_check" > سواری <small
                          >{stats.body_style_set.find(x => x.id === 1).count}</small>
                          <input onClick={(e) => { toggleToCarBodyType(1) }} type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check"
                        > مینی ون <small>{stats.body_style_set.find(x => x.id === 7).count}</small>
                          <input onClick={(e) => { toggleToCarBodyType(7) }} type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check"
                        >  هاچ‌بک <small>{stats.body_style_set.find(x => x.id === 1).count}</small>
                          <input onClick={(e) => { toggleToCarBodyType(9) }} type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check"
                        > شاسی‌بلند <small>{stats.body_style_set.find(x => x.id === 2).count}</small>
                          <input onClick={(e) => { toggleToCarBodyType(2) }}
                            type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check"
                        > کراس‌اور <small>{stats.body_style_set.find(x => x.id === 8).count}</small>
                          <input onClick={(e) => { toggleToCarBodyType(8) }}
                            type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>

                    </ul>
                  </div>
                  <div className="col-6" >
                    <ul>
                      <li>
                        <label className="container_check"

                        > کروک <small>{stats.body_style_set.find(x => x.id === 3).count}</small>
                          <input onClick={(e) => { toggleToCarBodyType(3) }} type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check"
                        > کوپه <small>{stats.body_style_set.find(x => x.id === 4).count}</small>
                          <input onClick={(e) => { toggleToCarBodyType(4) }} type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check"
                        > ون <small>{stats.body_style_set.find(x => x.id === 5).count}</small>
                          <input onClick={(e) => { toggleToCarBodyType(5) }} type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check"
                        > وانت <small>{stats.body_style_set.find(x => x.id === 6).count}</small>
                          <input onClick={(e) => { toggleToCarBodyType(6) }} type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Form.Dropdown
                      name="carBrand"
                      id="carBrand"
                      label={t('carProperty.brand')}
                      placeholder={t('carProperty.brand')}
                      noResultsMessage={t('forms.error_no_result_found')}
                      search
                      selection
                      clearable
                      loading={brandLoading}
                      options={
                        i18n.language === 'en'
                          ? brandsEnglish
                          : brandsFarsi
                      }
                      // error={Boolean(errors.carBrand && touched.carBrand)}
                      onChange={(e, data) => {
                        if (data && data.name) {
                          setBrandAndGetModels(data.value, "");
                          // setFieldValue(data.name, data.value);
                        }
                      }}
                      // onClose={(e, data) => {

                      // }}
                      // defaultValue={brand[0].value}
                      value={brand}
                    />
                    <Form.Dropdown
                      name="carModel"
                      id="carModel"
                      search
                      placeholder={t('carProperty.model')}
                      noResultsMessage={t('forms.error_no_result_found')}
                      // label={t('carProperty.model')}
                      selection
                      clearable
                      loading={modelLoading && !(brand == null || brand == "")}
                      disabled={brand == null || brand == ""}
                      options={
                        i18n.language === 'en'
                          ? modelsEnglish
                          : modelsFarsi
                      }
                      // error={Boolean(errors.carModel && touched.carModel)}
                      onChange={(e, data) => {
                        if (data && data.name) {
                          setModel(data.value, "");
                          // setFieldValue(data.name, data.value);
                        }
                      }}
                      // onClose={(e, data) => {
                      //   if (data && data.name) {
                      //     setFieldTouched(data.name);
                      //   }
                      // }}
                      // defaultValue={model[0].value}
                      value={model}
                    />
                  </div>
                </div>
              </div>
            </FiltersDiv>
          </Transition>
        </Form>

        <aside className="col-lg-3 hide_on_mobile margin_16 " id="sidebar">
          <Form>
            <div id="filters_col">
              <a
                data-toggle="collapse"
                href="#collapseFilters"
                aria-expanded="false"
                aria-controls="collapseFilters"
                id="filters_col_bt"
              >گزینه‌ها
              </a>
              <div className="collapse show" id="collapseFilters">
                <FilterType title='قیمت'>
                  <div className="rangeclass">
                    <div className="row" style={{ padding: '20px', paddingTop: '0px' }}>
                      <div className="col-6">
                        <PriceCard number={price[0]} preNumber={az} fontSize={25}>
                          در روز
                        </PriceCard>
                      </div>
                      <div className="col-6">
                        <PriceCard moreThan={(price[1] >= 2000000)} number={price[1]} preNumber={ta} fontSize={25}>
                          در روز
                        </PriceCard>
                      </div>
                    </div>
                    <Nouislider
                      range={{ min: 0, max: 2000000 }}
                      start={price}
                      margin={100000}
                      connect
                      direction={'rtl'}
                      onSlide={this.onSlide}
                      step={100000}
                    />
                  </div>
                  <br /><br />
                  <ul>
                    <li>
                      <label className="container_check">تحویل در محل<small>{stats.deliver_at_renters_place}</small>
                        <input
                          onClick={() => { toggleDeliverAtRentersPlace(!deliverAtRentersPlace) }}
                          type="checkbox"
                          checked={deliverAtRentersPlace}
                        />
                        <span className="checkmark" />
                      </label>
                    </li>
                  </ul>
                </FilterType>
                <FilterType title='نوع شاسی'>
                  <ul>
                    <li>
                      <label

                        className="container_check"
                      > سواری <small>{stats.body_style_set.find(x => x.id === 1).count}</small>
                        <input onClick={(e) => { toggleToCarBodyType(1) }} type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check"
                      > مینی ون <small>{stats.body_style_set.find(x => x.id === 7).count}</small>
                        <input onClick={(e) => { toggleToCarBodyType(7) }} type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check"
                      >  هاچ‌بک <small>{stats.body_style_set.find(x => x.id === 9).count}</small>
                        <input onClick={(e) => { toggleToCarBodyType(9) }} type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check"
                      >شاسی‌بلند<small>{stats.body_style_set.find(x => x.id === 2).count}</small>
                        <input onClick={(e) => { toggleToCarBodyType(2) }}
                          type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check"
                      >کراس‌اور<small>{stats.body_style_set.find(x => x.id === 8).count}</small>
                        <input onClick={(e) => { toggleToCarBodyType(8) }}
                          type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check"

                      >کروک<small>{stats.body_style_set.find(x => x.id === 3).count}</small>
                        <input onClick={(e) => { toggleToCarBodyType(3) }} type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check"
                      >کوپه<small>{stats.body_style_set.find(x => x.id === 4).count}</small>
                        <input onClick={(e) => { toggleToCarBodyType(4) }} type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check"
                      >ون <small>{stats.body_style_set.find(x => x.id === 5).count}</small>
                        <input onClick={(e) => { toggleToCarBodyType(5) }} type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check"
                      >وانت<small>{stats.body_style_set.find(x => x.id === 6).count}</small>
                        <input onClick={(e) => { toggleToCarBodyType(6) }} type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                  </ul>
                </FilterType>
                <FilterType title='برند'>
                  <Form.Dropdown
                    name="carBrand"
                    id="carBrand"
                    // label={t('carProperty.brand')}
                    placeholder={t('carProperty.brand')}
                    noResultsMessage={t('forms.error_no_result_found')}
                    search
                    selection
                    clearable
                    loading={brandLoading}
                    options={
                      i18n.language === 'en'
                        ? brandsEnglish
                        : brandsFarsi
                    }
                    // error={Boolean(errors.carBrand && touched.carBrand)}
                    onChange={(e, data) => {
                      if (data && data.name) {
                        setBrandAndGetModels(data.value, "");
                        // setFieldValue(data.name, data.value);
                      }
                    }}
                    // onClose={(e, data) => {

                    // }}
                    // defaultValue={brand[0].value}
                    value={brand}
                  />
                  <Form.Dropdown
                    name="carModel"
                    id="carModel"
                    search
                    placeholder={t('carProperty.model')}
                    noResultsMessage={t('forms.error_no_result_found')}
                    // label={t('carProperty.model')}
                    selection
                    clearable
                    loading={modelLoading && !(brand == null || brand == "")}
                    disabled={!brand}
                    options={
                      i18n.language === 'en'
                        ? modelsEnglish
                        : modelsFarsi
                    }
                    // error={Boolean(errors.carModel && touched.carModel)}
                    onChange={(e, data) => {
                      if (data && data.name) {
                        setModel(data.value, "");
                        // setFieldValue(data.name, data.value);
                      }
                    }}
                    // onClose={(e, data) => {
                    //   if (data && data.name) {
                    //     setFieldTouched(data.name);
                    //   }
                    // }}
                    // defaultValue={model[0].value}
                    value={model}
                  />
                </FilterType>
              </div>
            </div>
          </Form>
        </aside>
      </>

    )
  }
}