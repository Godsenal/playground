import React, { Component } from 'react';
import PropTypes from 'prop-types';
import baserc from './baserc';
import { Month, RangeDay } from './components';
import { isAfter, eachDay, isBefore } from 'date-fns';
class RcRangePicker extends Component {
  state = {
    inRangeDates: [],
  };
  static propTypes = {
    startDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
    endDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
    onSelectRange: PropTypes.func.isRequired,
  };
  onSelectDay = day => {
    const { startDate, endDate } = this.props;
    if (!startDate || isBefore(day, startDate)) {
      this.props.onSelectRange(day, endDate);
      this.setState({
        inRangeDates: endDate ? eachDay(day, endDate) : [],
      });
    }
    else if (!endDate) {
      this.props.onSelectRange(startDate, day);
      this.setState({
        inRangeDates: eachDay(startDate, day),
      });
    }
    else if (endDate && isAfter(day, startDate)) {
      this.props.onSelectRange(startDate, day);
      this.setState({
        inRangeDates: eachDay(startDate, day),
      });
    }
    else {
      this.props.onSelectRange('', '');
      this.setState({
        inRangeDates: [],
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
        onDayClick={this.onSelectDay}
      />
    );
  }
}

export default baserc(RcRangePicker);
