import * as React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import StarRatingComponent from 'react-star-rating-component';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../../lib/numbers';

const Card = styled.div`
  min-width: 300px;
  width: 400px;
  max-width: 100%;
  margin: 10px 10px;
  /* background-color: #fff; */
  display: block;
  position: relative;
  margin-bottom: 30px;
  border-radius: 3px;
  box-shadow: 1px -1px 11px 3px #00000005; 
  margin: 10px auto;
  direction: rtl;
  figure {
    padding: 16px;
    margin: 0 !important;
  }
  img {
    height: 80px;
    width: 80px;
    border-radius: 999em;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.13);
  }
  @media (max-width: 768px){
    /* width: 97vw;
    max-width: 400px; */
  }
  .roundedBadge {
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.13);
    padding: 5px 15px;
  }
  .profilePhotoWithRating-badge {
    position: relative;
    top: -20px;
    z-index: 1;
  }
  .hostDetailCard {
    top: 15px;
    position: relative;
    right: 5px;
    .name {
      display: inline-block;
      font-size: 18px;
      font-weight: 700;
      margin-right: 4px;
      transform: translateY(-2px);
    }
    .hostDetailCard-responseTime {
      color: #949494;
      margin-top: 2px;
    }
  }
  .box {
    display: inline-block;
  }
`;

export const UserCard: React.FunctionComponent<{
  id: any;
  name: string;
  responceTime: string;
  image: string;
}> = ({ name, responceTime, image, id }) => (
  <Card className="strip grid usercard">
    <figure>
     
      <div className="box">
        <a href={`/car?id=${id}`}>
        <img src={image} className="img-fluid" alt="" />
        </a>
        {/* <div className="profilePhotoWithRating-badge roundedBadge">
          <div className="profilePhotoWithRating-ratingLabel driverRatingLabel row gutter--0 u-justifyContentCenter u-alignItemsCenter">
            4.6
            <span className="driverRatingLabel-star driverRatingLabel-star--purple"></span>
          </div>
        </div> */}
      </div>
      <div className="media-body hostDetailCard box">
        <span className="name">{name}</span>
          {/* <div>5,150 trips<span className="hostDetailCard-dotSeparator"></span>
            <span>Joined May 2016</span>
          </div> */}
        <div className="hostDetailCard-responseTime">{responceTime}</div>
      </div>
    </figure>
  </Card>
);
