import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { IconX } from '@tabler/icons';

const SModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 500;
  background-color: #000000;
  opacity: 0.5;
`;

const SModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  outline: 0;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1000;
  user-select: none;
`;

const SModal = styled.div`
  background: hsl(0, 0%, 10%);
  box-shadow: 0 0 3rem rgba(0, 0, 0, 0.25);
  color: white;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
  position: relative;
  z-index: 100;
  min-width: 25rem;
  max-width: 40vw;
`;

const STitle = styled.div`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const SCloseIcon = styled(IconX)`
  cursor: pointer;
  color: white;
  &:hover {
    color: hsl(0, 0%, 75%);
  }
`;

const SContent = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 400;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
  select {
    width: 100%;
    font-size: 1.2rem;
    font-weight: 400;
    padding: 0.75rem 1rem;
    border-radius: 0.25rem;
    border: none;
    outline: none;
    background-color: hsl(0, 0%, 20%);
    color: rgba(255, 255, 255, 0.75);
    font-family: inherit;
    option {
      font-size: 1.2rem;
      font-weight: 400;
      padding: 0.1rem 0.5rem;
      color: white;
    }
  }
  textarea,
  input {
    outline: none;
    border: none;
    border-radius: 0.25rem;
    background-color: hsl(0, 0%, 15%);
    color: white;
    font-family: inherit;
    padding: 0.5rem;
    font-size: 1rem;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    & > *:not(:last-child) {
      margin-right: 1rem;
    }
    button {
      text-transform: uppercase;
      width: 100%;
      outline: none;
      border: none;
      font-size: 1rem;
      font-weight: 500;
      font-family: 'IBM Plex Sans', sans-serif;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      background-color: hsl(0, 0%, 20%);
      color: rgba(255, 255, 255, 1);
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      font-family: inherit;
      &:hover:not(:disabled) {
        background-color: hsl(0, 0%, 25%);
      }
      &.filled {
        background-color: #14b1ae;
        color: rgba(255, 255, 255, 1);
        &:hover:not(:disabled) {
          background-color: #14b1aec0;
        }
      }
      &.light {
        background-color: #14b1ae20;
        color: #14b1ae;
        &:hover:not(:disabled) {
          background-color: #14b1ae40;
        }
      }
      &.outline {
        background-color: transparent;
        border: 1px solid #14b1ae;
        color: #14b1ae;
        &:hover:not(:disabled) {
          background-color: rgba(255, 255, 255, 0.05);
        }
      }
      &.subtle {
        background-color: transparent;
        color: rgba(255, 255, 255, 0.75);
        &:hover:not(:disabled) {
          color: rgba(255, 255, 255, 1);
        }
      }
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
`;

function Modal({ isVisible, setIsVisible, title, content }) {
  return isVisible
    ? createPortal(
        <React.Fragment>
          <SModalOverlay />
          <SModalWrapper aria-modal={true} aria-hidden={true} tabIndex={-1} role="dialog">
            <SModal>
              <STitle>
                <p>{title}</p>
                <SCloseIcon onClick={() => setIsVisible(false)} />
              </STitle>
              <SContent>{content}</SContent>
            </SModal>
          </SModalWrapper>
        </React.Fragment>,
        document.body,
      )
    : null;
}

export default Modal;
