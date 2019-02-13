import * as React from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { Modal } from './Modal';

export class LoginModal extends React.Component<{ onRef: any }> {
  state = {
    animation: null,
    showModal: false
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
    setTimeout(() => {
      this.setState({ animation: 'md-show' });
    }, 3);
  };

  handleCloseModal = () => {
    this.setState({ animation: null });
    setTimeout(() => {
      this.setState({ showModal: false });
    }, 300);
  };

  componentWillMount() {
    ReactModal.setAppElement('body');
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  render() {
    return (
      <ReactModal
        isOpen={this.state.showModal}
        contentLabel="Sign In"
        className="md-contain"
        overlayClassName={'md-overlay ' + this.state.animation}
        shouldCloseOnOverlayClick={true}
        onRequestClose={this.handleCloseModal}
      >
        <Modal
          title="Sign In"
          animationClass={this.state.animation}
          handleClose={this.handleCloseModal}
        >
          Test
        </Modal>
      </ReactModal>
    );
  }
}
