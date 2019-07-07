import * as React from 'react';
import Link from 'next/link';
import styled, { StyledFunction } from 'styled-components';

interface YourProps {
  boldLastItem: boolean
}

const ListStyles = styled.ul<YourProps>`
  list-style: none;
  margin: 0px 0px 20px;
  padding: 0px;
  li {
    margin-bottom: 8px;
    padding-bottom: 4px;
    font-weight: 500;
    border-bottom: 1px solid rgba(237, 237, 237, 0.36);
    :last-child {
      font-size: ${(p) => p.boldLastItem ? '18px' : 'inherit'};;
      font-weight: ${(p) => p.boldLastItem ? '600' : '500'};;
    }
  }
  .float-left {
    float: left !important;
    direction: rtl;
  }
`;

export const List: React.FunctionComponent<{boldLastItem?: boolean}> = ({children, boldLastItem}) => (
  <ListStyles boldLastItem={boldLastItem}>
    {children}
  </ListStyles>
);
