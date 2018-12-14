import React from "react";
import { css } from "glamor";
import { Arrow, Overlay } from ".";

const baseMonthBox = css({
  width: "100%",
  display: "flex",
  alignItems: "center"
});
const baseMonthText = css({
  textAlign: "center",
  cursor: "pointer",
  flex: 1
});
const baseButton = css({
  position: "relative",
  minWidth: 30,
  minHeight: 30,
  borderRadius: "50%",
  background: "none",
  border: "none",
  outline: "none",
  cursor: "pointer"
});
const monthItem = css({
  display: "inline-block",
  width: "33.3%",
  height: "25%",
  boxSizing: "border-box"
});

const monthSelect = select =>
  css({
    width: "100%",
    height: "100%",
    display: "flex",
    cursor: "pointer",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: select ? "rgba(0,0,0,0.3)" : "inherit",
    transition: "background-color 0.3s",
    ":hover": {
      backgroundColor: "rgba(0,0,0,0.5)"
    }
  });
class MonthHeader extends React.PureComponent {
  state = {
    isChanging: false
  };
  setChangeMode = () => {
    this.setState({
      isChanging: true
    });
  };
  closeChangeMode = () => {
    this.setState({
      isChanging: false
    });
  };
  changeMonth = month => {
    this.props.changeMonth(month);
    this.closeChangeMode();
  };
  render() {
    const { isChanging } = this.state;
    const { changeMonth, month, styles } = this.props;
    const { monthBox, monthText } = styles;
    return (
      <div {...css(baseMonthBox, monthBox)}>
        <div {...css(baseMonthText, monthText)} onClick={this.setChangeMode}>
          {month + 1}월
        </div>
        <button {...css(baseButton)} onClick={() => changeMonth(month - 1)}>
          <Arrow position="up" />
        </button>
        <button {...css(baseButton)} onClick={() => changeMonth(month + 1)}>
          <Arrow position="down" />
        </button>
        {isChanging && (
          <Overlay handleClose={this.closeChangeMode}>
            {[...Array(12)].map((_, i) => (
              <div
                {...css(monthItem)}
                key={i}
                onClick={() => this.changeMonth(i)}
              >
                <div {...css(monthSelect(i === month))}>{i + 1}</div>
              </div>
            ))}
          </Overlay>
        )}
      </div>
    );
  }
}

export default MonthHeader;
