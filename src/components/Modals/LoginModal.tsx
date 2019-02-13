import * as React from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { ModalWrapper } from './ModalWrapper';

export class LoginModal extends React.Component<{ onRef: any }> {
  [x: string]: any;
  handleOpenModal = () => {
    this.modalwrapper.handleOpenModal(); // do stuff
  };

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  render() {
    return (
      <ModalWrapper title="Sign In" onRef={ref => (this.modalwrapper = ref)}>
        Test
      </ModalWrapper>
    );
  }
}
