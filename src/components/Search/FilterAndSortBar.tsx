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
import InputRange from 'react-input-range';
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
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../../lib/numbers';

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
`;

let FiltersDiv = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #ededed;
  overflow: hidden;
  h6 {
      margin-bottom: 15px;
      font-size: 16px;
      font-size: 1rem;
      text-align: right
  }
  ul li small {
    font-weight: 600;
    float: left;
    position: relative;
    top: 4px;
  }
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
  toggleShowFilters: any;
  toggleDeliverAtRentersPlace: any;
  setBrandAndGetModels: any;
  setModel: any;
  setPrice: any;
  brand: any;
  model: any;
  brands: any;
  models: any;
  price: any;
  deliverAtRentersPlace: any;
}> {
  state = {
    error: '',
  };

  constructor(props) {
    super(props);
  }


  render() {
    const { t, showFilters, brands, brand, models, model, deliverAtRentersPlace, price } = this.props;
    const { setBrandAndGetModels, setModel, toggleShowFilters, toggleDeliverAtRentersPlace, setPrice } = this.props;
    const { brandsEnglish, brandsFarsi } = brands;
    const { modelsEnglish, modelsFarsi } = models;
    return (
      <Form>
        <FilterAndSort className="filters_listing sticky_horizontal">
          <div className="container">
            <ul className="clearfix">
              <li>
                <div className="switch-field">
                  <input
                    type="radio"
                    id="all"
                    name="listing_filter"
                    value="all"
                    checked
                  />
                  <label>All</label>
                  <input
                    type="radio"
                    id="popular"
                    name="listing_filter"
                    value="popular"
                  />
                  <label>Popular</label>
                  <input
                    type="radio"
                    id="latest"
                    name="listing_filter"
                    value="latest"
                  />
                  <label>Latest</label>
                </div>
              </li>
              <li>
                <a
                  className="btn_filt"
                  data-toggle="collapse"
                  aria-expanded="false"
                  aria-controls="filters"
                  onClick={() => { toggleShowFilters(!showFilters) }}
                >{showFilters ? "Less filters" : "More filters"}</a
                >
              </li>
              <li>
                <div className="layout_view">
                  <a href="#0" class="active"><i class="icon-th"></i></a>
                  <a href="/listing-2"><i class="icon-th-list"></i></a>
                  <a href="/list-map"><i class="icon-map"></i></a>
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
            <div className="container margin_30_5">
              <div className="row">
                <div className="col-md-2">
                  <h6>نوع شاسی</h6>
                  <ul>
                    <li>
                      <label className="container_check"> سواری <small>67</small>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check"> مینی ون <small>89</small>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check">  هاچ‌بک <small>45</small>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check">شاسی‌بلند<small>78</small>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>

                  </ul>
                </div>
                <div className="col-md-2" style={{ marginTop: '30px' }}>
                  <ul>
                    <li>
                      <label className="container_check">کروک<small>78</small>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check">کوپه<small>78</small>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check">ون <small>78</small>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check">وانت<small>78</small>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3">

                  <Form.Dropdown
                    name="carBrand"
                    id="carBrand"
                    label={t('carProperty.brand')}
                    placeholder={t('carProperty.brand')}
                    noResultsMessage={t('forms.error_no_result_found')}
                    search
                    selection
                    loading={brandsFarsi[0].value == null}
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
                    // loading={this.state.shouldModelLoad}
                    // disabled={this.state.modelsFarsi[0].value == null}
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
                {/* <div className="col-md-1">
                </div> */}
                <div className="col-md-4">
                  <div className="add_bottom_30">
                    <h6>قیمت</h6>
                    <InputRange
                      maxValue={1000000}
                      minValue={0}
                      step={10000}
                      formatLabel={value => `${convertNumbers2Persian(
                        numberWithCommas(value)
                      )} تومان`}
                      value={price}
                      onChange={price => setPrice(price)}
                    // onChangeComplete={value => console.log(value)}
                    />

                    <br /><br />
                    <ul>
                      <li>
                        <label className="container_check">تحویل در محل<small>12</small>
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
              </div>
            </div>
          </FiltersDiv>
        </Transition>
      </Form>
    )
  }
}