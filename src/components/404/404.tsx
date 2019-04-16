/* tslint:disable */
import * as React from 'react';
import { Message } from 'semantic-ui-react';

const Error404: React.FunctionComponent<{ token: any; children: any }> = ({
  token,
  children
}) => {
  if (token)
    return (
      <Message
        icon="plug"
        header="صفحه یافت نشد!"
        content="صفحه درخواستی یافت نشد. "
      />
    );
  else return children;
};

export default Error404;
