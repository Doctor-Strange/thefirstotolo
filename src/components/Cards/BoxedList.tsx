import * as React from 'react';
import styled from 'styled-components';

const BoxedListDiv = styled.div`
  text-align: center;
  padding: 30px;
  max-width: 345px;
  border: 1px solid #ededed;
  display: block;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  margin-bottom: 25px;
  span {
    font-size: 60px;
    font-size: 3.75rem;
    margin-bottom: 15px;
    width: 60px;
    height: 60px;
  }
  h4 {
    font-size: 18px;
    font-size: 1.125rem;
    color: #333;
  }
  p {
    color: #777;
    margin-bottom: 0;
    margin-top: 0;
  }
  :hover {
    i {
      color: #32a067;
    }
  }
`;

export const BoxedList: React.FunctionComponent<{
  title: string;
}> = ({ children, title }) => (
  <BoxedListDiv>
    <span className="pe-7s-help2">O</span>
    <h4>{title}</h4>
    <p>{children}</p>
  </BoxedListDiv>
);
