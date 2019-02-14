import * as React from 'react';
import { Margin } from '../../theme/globalStyle';

export const Section: React.FunctionComponent<{
  justifyCenter?: boolean;
  bgColor?: string;
  margin?: Margin;
}> = ({ children, justifyCenter, bgColor, margin }) => (
  <div style={{ backgroundColor: bgColor }}>
    <div className={'container ' + (margin || 'margin_60')}>
      <div className={'row ' + (justifyCenter && 'justify-content-center')}>
        {children}
      </div>
    </div>
  </div>
);
