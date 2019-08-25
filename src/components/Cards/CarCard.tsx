import * as React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import Link from 'next/link';
import Router from 'next/router';
import StarRatingComponent from 'react-star-rating-component';
import { Icon, Button, Grid } from 'semantic-ui-react';
import { PriceCard } from './index'
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../../utils/numbers';
import { ITheme } from "../../theme/Interfaces";

const Card = styled.div`
  max-height: 300px;
  min-width: 300px;
  width: 340px;
  max-width: 100%;
  margin: 10px 10px;
  background-color: ${({theme}:{theme:ITheme}) => theme.color.whiteBackground};
  display: block;
  position: relative;
  border-radius: 4px;
  box-shadow: 0px 1px 5px 1px #0000000f;
  @media (max-width: 768px){
    width: 97vw;
    max-width: 400px;
  }
  .img-fluid {
    max-width: 100%;
    min-width: 100%;
    height: auto;
  }
  figure {
    cursor: pointer;
    margin-bottom: 0;
    overflow: hidden;
    position: relative;
    height: 200px;
    border-radius: 3px 3px 0 0;
    margin: 0;
    a {
       img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(1);
        backface-visibility: hidden;
        width: 100%;
        transition: all 0.3s ease-in-out;
       }
       &:hover img {
        transform: translate(-50%, -50%) scale(1.1);
      }
    }
    &:hover {
      .read_more {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
    }
    .read_more {
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -12px;
      transform: translateY(10px);
      text-align: center;
      opacity: 0;
      visibility: hidden;
      width: 100%;
      transition: all 0.6s;
      z-index: 2;
      span {
        background-color: ${({theme}:{theme:ITheme}) => theme.color.cardLabels};
        border-radius: 20px;
        display: inline-block;
        color: ${({theme}:{theme:ITheme}) => theme.color.textMain};
        font-size: 12px;
        font-size: 0.75rem;
        padding: 5px 10px;
      }
    }
  }
  a.wish_bt {
    position: absolute;
    left: 12px;
    bottom: 28px;
    z-index: 1;
    background-color: ${({theme}:{theme:ITheme}) => theme.color.fadedGray};
    padding: 5px 10px;
    display: inline-block;
    color: ${({theme}:{theme:ITheme}) => theme.color.whiteBackground};
    border-radius: 3px;
  }
  .wrapper {
    padding: 20px 25px 30px 25px;
    h3 {
      font-size: 20px;
      font-size: 1.25rem;
      margin: 0;
    }
    small {
      font-weight: 600;
      margin-bottom: 10px;
      display: inline-block;
      font-size: 13px;
      font-size: 0.8125rem;
    }
    .number span , .unit span{
      color: #2A2A2A;
    }
    p {
      margin-bottom: 15px;
    }
  }
  ul {
    padding: 0px 0px 0px 0px;
    padding-bottom: 0px;
    margin-bottom: 15px;
    position: absolute;
    bottom: -5px;
    li {
      display: inline-block;
      margin-right: 10px;
      .score {
        margin-top: -10px;
        span {
          display: inline-block;
          position: relative;
          top: 7px;
          margin-right: 8px;
          font-size: 12px;
          font-size: 0.75rem;
          text-align: right;
          line-height: 1.1;
          font-weight: 500;
        }
        em {
          display: block;
          font-weight: normal;
          font-size: 11px;
          font-size: 0.6875rem;
        }
        strong {
          background-color: #32a067;
          color: #fff;
          line-height: 1;
          border-radius: 5px 5px 5px 0;
          padding: 10px;
          display: inline-block;
        }
        }
    }
  }

  .delivery {
    color: ${({theme}:{theme:ITheme}) => theme.color.successColor};
    border: 1px solid ${({theme}:{theme:ITheme}) => theme.color.successColor};
  }
  .delivery, .loc_closed {
    position: relative;
    font-size: 11px;
    font-size: 0.6875rem;
    font-weight: 600;
    padding: 2px 8px;
    line-height: 1;
    border-radius: 3px;
  }
  .col-8{
    top: -8px;
  }
  .leftbox{
    position: absolute;
    left: -8px;
    bottom: 48px;
  }
  .edit{
      width: 108%;
      .item {
        padding: 0 !important;
        text-align:center !important;
      }
  }

  @media (min-width: 768px){
    margin-right: auto;
    margin-left: auto;
  }
`;

export const CarCard: React.FunctionComponent<{
  id: any;
  title: string;
  img: string;
  description: string;
  year: string;
  score: any;
  price: number;
  deliver_at_renters_place: boolean;
  dateURL?: string;
  search_id?: string;
  simpleMode?: boolean;
  showEditButtons?: boolean;
  discount_percent?: string;
  discounted_price?: number;
  is_out_of_service: boolean;
}> = ({
  children,
  title,
  img,
  description,
  year,
  score,
  price,
  deliver_at_renters_place,
  id,
  dateURL,
  search_id,
  simpleMode = true,
  showEditButtons = false,
  discount_percent,
  discounted_price,
  is_out_of_service = false,
}) => {
    let link = "";
    if (simpleMode) {
      link = `/car/${id}`;
    }
    else {
      link = `/car/${id}${dateURL}?search_id=${search_id}`;
    }

    const setCarTiming = () => {
      const href = `/set-car-timing?id=${id}`;
      Router.push(href, href);
    }

    const pauseCar = () => {
      // const href = `/set-car-timing?id=${id}`;
      // Router.push(href, href, { shallow: true });
      alert("خودروی شما از دیده‌ها پنهان شد.");
    }

    return (
      <Card className="strip grid carcard">
        <Link href={link}>
          <a>
          <figure>
            {discount_percent &&
              <a className="wish_bt" >
              ٪{convertNumbers2Persian(discount_percent)} تخفیف
              </a>
            }
            <img src={img} className="img-fluid" alt="" />
            <div className="read_more">
              <span>{simpleMode ? "مشاهده" : "مشاهده مشخصات"}</span>
            </div>
            {/* <small>Restaurant</small> */}
          </figure>
          
          <div className="wrapper row">
            <div className="col-8">
              <Link href={link}>
                <a>
                  <h3>
                    {title}<br />
                    <small>{year}</small><br />
                    {/* <StarRatingComponent
                          name="rate1"
                          starCount={5}
                          value={3}
                        /> */}
                  </h3>
                </a>
              </Link>
            </div>
            {!simpleMode &&
              <div className="col-4 leftbox">
                <PriceCard number={discounted_price? discounted_price : price}>
                  در روز
              </PriceCard>
              </div>
            }
            {/* <small>{text2}</small> */}
            {/* <p>{description}</p> */}
            {/* <a className="address" href={`/car?id=${id}`}>Get directions</a> */}
            {!simpleMode &&
              <ul>
                {deliver_at_renters_place ?
                  (
                    <li>
                      <span className="delivery">تحویل در محل</span>
                    </li>
                  ) : (<li></li>)
                }
              </ul>
            }
            {showEditButtons &&
              <Grid className="edit">
                <Grid.Row columns={2} centered className="property">
                  <Grid.Column width={8} className="item">
                    <Button basic onClick={setCarTiming}>
                      <Icon name='calendar alternate outline' /> تغیر تاریخ و قیمت
                      </Button>
                  </Grid.Column>
                  <Grid.Column width={8} className="item">
                    <Button basic onClick={pauseCar}>
                      <Icon name='pause circle outline' /> توقف نمایش
                      </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            }
          </div>
          </a>
        </Link>      
      </Card>
    );
  }
