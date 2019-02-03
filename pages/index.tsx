import * as React from 'react';
import styled from 'styled-components';
import { Home } from '../src/components/Home';
import { Layout } from '../src/components/Layout';

export default props => (
  <Layout>
    <Title>First Next.js Page</Title>
    <Home />
  </Layout>
);

const Title = styled.h1`
  color: red;
`;
