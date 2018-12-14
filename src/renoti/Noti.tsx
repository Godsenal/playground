import React from 'react';
import styled from 'styled-components';
import { NotiType, Type } from './types';
import { Notifier } from './notifier';
import { NotiPortalProps } from './NotiPortal';
import './animation.css';

interface StyleProps {
  type: Type;
}
const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;
const Container = styled('div')<StyleProps>`
  position: relative;
  min-height: 40px;
  display: flex;
  align-items: center;
  padding: 20px;
  color: white;
  background-color: #1dd362;
  ${({ type }) => `
  background-color: ${
    type === 'success'
      ? '#065dec'
      : type === 'error'
      ? '#fa081f'
      : type === 'warning'
      ? '#f6ad0d'
      : '#1dd362'
  };
  `}
`;
const Close = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;
type NotiProps = NotiType & Notifier & Partial<NotiPortalProps>;
class Noti extends React.Component<NotiProps> {
  state = {
    timeout: false,
  };
  timer: number = 0;
  pauseTime: number = Date.now();
  unmounted = false;
  componentDidMount() {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (this.props.timeout > 0) {
          this.timer = window.setTimeout(
            this.handleTimeout,
            this.props.timeout,
          );
        }
      });
    });
  }
  componentDidUpdate = (prevProps: NotiProps) => {
    if (this.props.close && prevProps.close !== this.props.close) {
      this.handleTimeout();
    }
  };

  componentWillUnmount() {
    this.unmounted = true;
  }
  getBaseProps = () => {
    const { timeout } = this.state;
    const { animation, pauseOnHover, closeOnClick } = this.props;
    let props = {
      className: timeout ? `${animation}_end` : `${animation}_start`,
      onAnimationEnd: this.handleAnimationEnd,
      onClick: closeOnClick ? this.handleTimeout : undefined,
      onMouseEnter: pauseOnHover ? this.handleHover : undefined,
      onMouseLeave: pauseOnHover ? this.handleUnHover : undefined,
    };
    return props;
  };
  handleAnimationEnd = () => {
    if (this.state.timeout) {
      this.close();
    }
  };
  handleHover = () => {
    window.clearTimeout(this.timer);
    this.pauseTime = Date.now() - this.pauseTime;
  };
  handleUnHover = () => {
    this.timer = window.setTimeout(
      this.handleTimeout,
      this.props.timeout - this.pauseTime,
    );
    this.pauseTime = Date.now();
  };
  handleTimeout = () => {
    if (!this.unmounted) {
      this.setState({
        timeout: true,
      });
    }
  };
  close = () => {
    const { closeNoti, id } = this.props;
    closeNoti(id);
  };
  render() {
    const { message, renderNoti, type } = this.props;
    return (
      <Wrapper {...this.getBaseProps()}>
        {renderNoti ? (
          renderNoti(this.handleTimeout)
        ) : (
          <Container type={type}>
            <Close onClick={this.handleTimeout}>x</Close>
            <span>{message}</span>
          </Container>
        )}
      </Wrapper>
    );
  }
}

export default Noti;
