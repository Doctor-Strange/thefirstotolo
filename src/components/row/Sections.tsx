import * as React from 'react';
import { Margin } from '../../theme/globalStyle';

export const Section: React.FunctionComponent<{
  justifyCenter?: boolean;
  justifyContent?: string;
  bgColor?: string;
  margin?: Margin;
  className?: any;
  style?: any;
  id?: any;
}> = ({ children, justifyCenter, justifyContent, bgColor, margin, className, style, id }) => (
  <div style={{ backgroundColor: bgColor }} className={className}>
    <div className={'container ' + (margin || '')} style={style || {}}>
      <div
        className={'row ' + (justifyCenter && 'justify-content-center')}
        style={{ justifyContent }}
        id={id}
      >
        {children}
      </div>
    </div>
  </div >
);
