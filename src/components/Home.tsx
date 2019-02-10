import * as React from 'react';
import * as classnames from 'classnames';
import styled from 'styled-components';

const Title = styled.h1`
  color: ${({ theme: { main } }) => main};
`;

export const Home: React.FunctionComponent = props => (
  <div>
    <ul>
      <li>
        <Title>usage classnames in Home.tsx</Title>
      </li>
      <li>hello world</li>
    </ul>
  </div>
);
