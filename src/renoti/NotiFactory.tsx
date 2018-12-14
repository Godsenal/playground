import React from 'react';
import styled from 'styled-components';
import { NotiType, Noties, Position } from './types';
import Noti from './Noti';
import { Notifier } from './notifier';

const Factory = styled('div')<{ disablePortal?: boolean; position: Position }>`
  position: ${({ disablePortal }) => (disablePortal ? 'absolute' : 'fixed')};
  ${({ position }) => {
    switch (position) {
      case 'top-center': {
        return `
          top: 10px;
          left: 50%;
          margin-left: -150px;
        `;
      }
      case 'top-right': {
        return `
          top: 10px;
          right: 10px;
        `;
      }
      case 'bottom-center': {
        return `
          bottom: 10px;
          left: 50%;
          margin-left: -150px;
        `;
      }
      case 'bottom-left': {
        return `
          bottom: 10px;
          left: 10px;
        `;
      }
      case 'bottom-right': {
        return `
          bottom: 10px;
          right: 10px;
        `;
      }
      default: {
        return `
          top: 10px;
          left: 10px;
        `;
      }
    }
  }}
  box-sizing: border-box;
  width: 300px;
`;

export interface NotiFactoryProps {
  disablePortal?: boolean;
  noties: NotiType[];
}
const NotiFactory: React.SFC<NotiFactoryProps & Notifier> = ({
  disablePortal,
  noties,
  ...props
}) => {
  const notiByPos: Noties = {
    'bottom-center': [],
    'bottom-left': [],
    'bottom-right': [],
    'top-center': [],
    'top-left': [],
    'top-right': [],
  };
  noties.forEach(noti => notiByPos[noti.position].push(noti));
  return (
    <>
      {Object.keys(notiByPos).map(position => {
        const assertion = position as Position;
        if (notiByPos[assertion].length <= 0) {
          return null;
        }
        return (
          <Factory
            key={position}
            disablePortal={disablePortal}
            position={assertion}
          >
            {notiByPos[assertion].map(noti => (
              <Noti key={noti.id} {...noti} {...props} />
            ))}
          </Factory>
        );
      })}
    </>
  );
};

export default NotiFactory;
