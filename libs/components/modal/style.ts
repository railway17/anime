import React from 'react'
import styled from 'styled-components'
import { MODAL_ANIMATION_DURATION } from '../../const';

export const Overlay: React.FC<any> = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: ${(props: any) => (props.tstate === "entered" ? 1 : 0)};
  transition: opacity ${MODAL_ANIMATION_DURATION}ms ease-in-out;
`;

export const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0);
  margin: 30px auto;
  transform: scale(0.8);
  width: 50vw;
  color: white;
  padding: 20px;
  height: 200px;
  border-radius: 20px;
`;
