import React, { createRef } from "react";
import { css } from "glamor";
import { Overlay } from ".";

const yearBox = css({
  textAlign: "center",
  fontSize: 20,
  fontWeight: 600
});
const yearText = css({
  cursor: "pointer",
  padding: 5
});
const yearSelectBox = css({
  display: "inline-block",
  width: "33.3%",
  height: "25%",
  cursor: "pointer",
  boxSizing: "border-box",
  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.3)"
  }
});
const yearSelect = css({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});

class YearHeader extends React.PureComponent {
  overlay = createRef();
  currentYear = createRef();
  state = {
    isChanging: false,
    years: []
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isChanging &&
      prevState.isChanging !== this.state.isChanging
    ) {
      if (this.overlay.current && this.currentYear.current) {
        this.overlay.current.scrollTop = this.currentYear.current.offsetTop;
      }
    }
  }
  fillNumber = (min, max) => {
    const arr = [];
    for (let i = min; i <= max; i++) {
      arr.push(i);
    }
    return arr;
  };
  setChangeMode = () => {
    const { year } = this.props;
    let { years } = this.state;
    if (years.length <= 0) {
      years = this.fillNumber(year - 100, year + 100);
    }
    this.setState({
      isChanging: true,
      years
    });
  };
  closeChangeMode = () => {
    this.setState({
      isChanging: false
    });
  };
  changeYear = year => () => {
    this.props.changeYear(year);
    this.closeChangeMode();
  };
  render() {
    const { isChanging, years } = this.state;
    const { year } = this.props;
    return (
      <div>
        <div {...css(yearBox)}>
          <span {...css(yearText)} onClick={this.setChangeMode}>
            {year}
          </span>
        </div>
        {isChanging && (
          <Overlay handleClose={this.closeChangeMode}>
            <div
              style={{ height: "100%", overflowY: "auto" }}
              ref={this.overlay}
            >
              {years.map(item => {
                const isSelected = item === year;
                return (
                  <div
                    {...css(yearSelectBox, {
                      backgroundColor: isSelected ? "rgba(0,0,0,0.2)" : null
                    })}
                    key={item}
                    ref={isSelected ? this.currentYear : null}
                    onClick={this.changeYear(item)}
                  >
                    <div {...css(yearSelect)}>
                      <span>{item}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Overlay>
        )}
      </div>
    );
  }
}

export default YearHeader;
