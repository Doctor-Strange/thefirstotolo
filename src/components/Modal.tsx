import * as React from 'react';
import styled from 'styled-components';

const ModalDiv = styled.div`
  #sign-in-dialog {
    background: #fff;
    padding: 30px;
    padding-top: 0;
    text-align: left;
    max-width: 400px;
    margin: 40px auto;
    position: relative;
    box-sizing: border-box;
    border-radius: 4px;

    .mfp-close {
      position: absolute;
      top: 12px;
      right: 20px;
      color: #666;
      background-color: #e4e4e4;
      border-radius: 50%;
      top: 12px;
      right: 20px;
      width: 32px;
      height: 32px;
      line-height: 32px;
      border: 0;
      cursor: pointer !important;
      :hover {
        color: #fff;
        background-color: #66676b;
      }
    }
  }

  .small-dialog-header {
    font-size: 18px;
    width: calc(100% + 60px);
    position: relative;
    left: -30px;
    top: 0;
    border-radius: 4px 4px;
    display: inline-block;
    background-color: #f6f6f6;
    padding: 18px 20px 15px 20px;
    margin-bottom: 30px;

    h3 {
      padding: 0;
      margin: 0;
      font-size: 18px;
      font-size: 1.125rem;
      font-weight: 500;
    }
  }
`;

export const Modal = ({ handleClose, animationClass, title, children }) => {
  return (
    <ModalDiv className={'md-modal ' + animationClass}>
      <div id="sign-in-dialog" className="zoom-anim-dialog">
        <div className="small-dialog-header">
          <h3>{title}</h3>
        </div>
        <button
          title="Close (Esc)"
          type="button"
          className="mfp-close"
          onClick={handleClose}
        >
          X
        </button>
        {children}
      </div>
    </ModalDiv>
  );
};
