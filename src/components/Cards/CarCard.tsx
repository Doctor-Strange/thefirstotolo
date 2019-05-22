import * as React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import StarRatingComponent from 'react-star-rating-component';
import { PriceCard } from './index'
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../../lib/numbers';

const Card = styled.div`
  max-height: 300px;
  min-width: 300px;
  width: 340px;
  max-width: 100%;
  margin: 10px 10px;
  background-color: #fff;
  display: block;
  position: relative;
  margin-bottom: 30px;
  border-radius: 3px;
  box-shadow: 1px -1px 11px 3px #0000000f;
  margin: 10px auto;
  @media (max-width: 768px){
    width: 97vw;
    max-width: 400px;
  }
  .img-fluid {
    max-width: 100%;
    height: auto;
  }
  figure {
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
        background-color: #fcfcfc;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 20px;
        display: inline-block;
        color: #222;
        font-size: 12px;
        font-size: 0.75rem;
        padding: 5px 10px;
      }
    }
  }
  a.wish_bt {
    position: absolute;
    left: 15px;
    bottom: 15px;
    z-index: 1;
    background-color: black;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 9px 10px;
    display: inline-block;
    color: #fff;
    line-height: 1;
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
    p {
      margin-bottom: 15px;
    }
    a.address {
      display: inline-block;
      font-weight: 500;
      color: #999;
      line-height: 1;
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

  .loc_open {
    color: #32a067;
    border: 1px solid #32a067;
  }
  .loc_open, .loc_closed {
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
`;

export const CarCard: React.FunctionComponent<{
  id: any;
  title: string;
  img: string;
  description: string;
  year: string;
  score: any;
  price: any;
  deliver_at_renters_place: boolean;
  dateURL?: string;
  search_id?: string;
}> = ({ children, title, img, description, year, score, price, deliver_at_renters_place, id, dateURL, search_id }) => (
  <Card className="strip grid carcard">
    <a href={`/car?id=${id}${dateURL}&search_id=${search_id}`}>
      <figure>
        {/* <a href="#0" className="wish_bt" >
          
        </a> */}
        <img src={img} className="img-fluid" alt="" />
        <div className="read_more">
          <span>مشاهده و رزرو</span>
        </div>
        {/* <small>Restaurant</small> */}
      </figure>
      <div className="wrapper row">
        <div className="col-8">
          <h3>
            <a href={`/car?id=${id}`}>
              {title}<br />
              <small>{year}</small><br />
              {/* <StarRatingComponent
                name="rate1"
                starCount={5}
                value={3}
              /> */}
            </a>
          </h3>
        </div>
        <div className="col-4 leftbox">
          <PriceCard number={price}>
            در روز
          </PriceCard>
        </div>
        {/* <small>{text2}</small> */}
        {/* <p>{description}</p> */}
        {/* <a className="address" href={`/car?id=${id}`}>
          Get directions
        </a> */}
        <ul>
          {deliver_at_renters_place ?
            (
              <li>
                <span className="loc_open">تحویل در محل</span>
              </li>
            ) : (<li></li>)
          }
          {/*<li>
            <span className="loc_closed">Now Closed</span>
          </li> */}
          {/* <li>
            <div className="score">
              <span>
                Superb<em>350 Reviews</em>
              </span>
              <strong>{score}</strong>
            </div>
          </li> */}
        </ul>
      </div>
    </a>
  </Card>
);
