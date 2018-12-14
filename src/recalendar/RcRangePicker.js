import React, { Component } from "react";
import PropTypes from "prop-types";
import baserc from "./baserc";
import { Month, RangeDay } from "./components";
import { isAfter, eachDay, isBefore } from "date-fns";
class RcRangePicker extends Component {
  state = {
    inRangeDates: []
  };
  static propTypes = {
    startDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string
    ]),
    endDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string
    ]),
    onSelectRange: PropTypes.func.isRequired
  };
  onSelectDate = date => {
    const { startDate, endDate } = this.props;
    if (!startDate || isBefore(date, startDate)) {
      this.props.onSelectRange(date, endDate);
      this.setState({
        inRangeDates: endDate ? eachDay(date, endDate) : []
      });
    } else if (!endDate) {
      this.props.onSelectRange(startDate, date);
      this.setState({
        inRangeDates: eachDay(startDate, date)
      });
    } else if (endDate && isAfter(date, startDate)) {
      this.props.onSelectRange(startDate, date);
      this.setState({
        inRangeDates: eachDay(startDate, date)
      });
    } else {
      this.props.onSelectRange("", "");
      this.setState({
        inRangeDates: []
      });
    }
  };
  render() {
    const { inRangeDates } = this.state;
    return (
      <Month
        {...this.props}
        Day={RangeDay}
        inRangeDates={inRangeDates}
        eachDays={this.props.getCalendarMonthDays()}
        onDateClick={this.onSelectDate}
      />
    );
  }
}

export default baserc(RcRangePicker);
