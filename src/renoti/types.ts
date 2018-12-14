import { ReactNode } from 'react';
export interface NotiType {
  id: number;
  message: string;
  timeout: number;
  animation: string;
  position: Position;
  renderNoti?: (closeNoti: () => void) => ReactNode;
  pauseOnHover?: boolean;
  closeOnClick?: boolean;
  close?: boolean;
  type: Type;
}
export type Noties = Record<Position, NotiType[]>;
export type GetNoties = () => NotiType[];
export type Listener = (getNoties: GetNoties) => void;

export type Type = 'success' | 'error' | 'warning' | 'default';
export type Position =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';
