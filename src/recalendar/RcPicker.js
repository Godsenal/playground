import React, { Component } from "react";
import PropTypes from "prop-types";
import baserc from "./baserc";
import { Month, PickDay } from "./components";
import { isEqual } from "date-fns";
class RcPicker extends Component {
  static propTypes = {
    onSelectDate: PropTypes.func.isRequired
  };
  onSelectDate = (date, isSelected) => {
    const { onSelectDate } = this.props;
    const newSelected = isSelected ? "" : date;
    onSelectDate(newSelected);
  };
  onMultiSelectDate = (date, isSelected) => {
    const { selected, onSelectDate } = this.props;
    const newSelected = isSelected
      ? selected.filter(select => !isEqual(select, date))
      : [...selected, date];
    onSelectDate(newSelected);
  };
  render() {
    const { multiple } = this.props;
    const onDateClick = multiple ? this.onMultiSelectDate : this.onSelectDate;
    return (
      <Month
        {...this.props}
        Day={PickDay}
        eachDays={this.props.getCalendarMonthDays()}
        onDateClick={onDateClick}
      />
    );
  }
}

export default baserc(RcPicker);
