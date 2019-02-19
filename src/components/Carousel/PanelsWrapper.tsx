import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const PanelsWrapperStyle = styled.div``;

export class PanelsWrapper extends React.Component<{ showIndex: number }> {
  constructor(props) {
    super(props);

    this.state = {
      lastIndex: React.Children.count(this.props.children) - 1
    };
  }

  render() {
    const { showIndex, children } = this.props;
    const { lastIndex } = this.state;
    let localExit = false;
    const slide = React.Children.map(children, (slide, i) => {
      if (localExit) return;
      else if (i === showIndex) return slide;
      else if (showIndex <= lastIndex && showIndex >= 0) {
        return;
      } else localExit = true;
      return <span>Error: something is not right with me.</span>;
    });
    return <>{slide}</>;
  }
}
