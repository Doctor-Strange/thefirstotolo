import * as React from 'react';
import { Margin } from '../../theme/globalStyle';

export const Section: React.FunctionComponent<{
  justifyCenter?: boolean;
  justifyContent?: string;
  bgColor?: string;
  margin?: Margin;
  className?: any;
}> = ({ children, justifyCenter, justifyContent, bgColor, margin, className }) => (
  <div style={{ backgroundColor: bgColor }} className={className}>
    <div className={'container ' + (margin || '')}>
      <div
        className={'row ' + (justifyCenter && 'justify-content-center')}
        style={{ justifyContent }}
      >
        {children}
      </div>
    </div>
  </div >
);
