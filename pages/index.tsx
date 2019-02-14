import * as React from 'react';
import styled from 'styled-components';
import { Home } from '../src/components/Home';
import { Layout } from '../src/components/Layout';

export default props => (
  <Layout haveSubHeader={true} pageTitle={'Hello World'}>
    <div className="container margin_60">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <h1>hello</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            accumsan rhoncus risus id cursus. Maecenas id feugiat urna. Aenean
            sollicitudin justo ac lorem convallis, quis elementum purus
            placerat. Vestibulum aliquet dapibus felis, eu consequat sem rutrum
            eu. Phasellus at velit dictum, commodo urna non, accumsan nibh.
            Phasellus eu metus eros. Vestibulum semper sem nec mauris placerat,
            nec molestie sem elementum. Suspendisse ultrices nisl vitae varius
            congue. Sed purus ex, imperdiet ut purus eget, feugiat interdum
            ante. Nam tincidunt rutrum semper. Fusce at cursus odio, nec
            pulvinar velit. Ut cursus non odio in ultrices. Sed rhoncus
            ultricies odio, ut porttitor orci bibendum fringilla. Donec sodales
            eu sapien sit amet finibus.
          </p>
        </div>
      </div>
    </div>
  </Layout>
);

const Title = styled.h1`
  color: red;
`;
