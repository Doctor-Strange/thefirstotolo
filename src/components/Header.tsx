import * as React from 'react';
import { Nav } from './Nav';
import * as Logo from '../../static/logo.svg';

export const Header: React.FunctionComponent = props => (
  <div>
    <h2>header</h2>
    <img src={Logo} />
    <Nav />
  </div>
);
