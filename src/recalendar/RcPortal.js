import React, { PureComponent } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { css } from "glamor";

const portalStyle = css({
  position: "fixed"
});
const RC_ROOT = "rc-root";

class RcPortal extends PureComponent {
  rc_root = null;
  state = {
    target: null
  };
  static propTypes = {
    target: PropTypes.any
  };
  static defaultProps = {
    target: null
  };
  componentWillUnmount() {
    document.getElementById(RC_ROOT).remove();
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.target && this.props.target) {
      const rc_root = document.createElement("div");
      rc_root.id = RC_ROOT;
      this.rc_root = rc_root;
      document.body.appendChild(rc_root);
      this.setState({
        target: this.props.target
      });
    } else if (prevProps.target && !this.props.target) {
      document.getElementById(RC_ROOT).remove();
      this.setState({
        target: null
      });
    }
  }

  computePosition = ({ top, left, width, height }) => {
    return {
      top: top + height,
      left: left
    };
  };
  render() {
    const { target } = this.state;
    const { children } = this.props;

    if (!this.rc_root || !target) {
      return null;
    }
    const { top, left } = this.computePosition(target.getBoundingClientRect());
    return createPortal(
      <div ref={this.rc_child} {...css(portalStyle, { top, left })}>
        {children}
      </div>,
      this.rc_root
    );
  }
}

export default RcPortal;
