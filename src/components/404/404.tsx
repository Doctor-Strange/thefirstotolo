/* tslint:disable */
import * as React from 'react';
import { Message } from 'semantic-ui-react';

const Error404: React.FunctionComponent = ({}) => (
  <Message
    icon="plug"
    header="صفحه یافت نشد!"
    content="صفحه درخواستی یافت نشد. "
  />
);

export default Error404;
