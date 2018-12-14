import React, { Component } from 'react';
import PropTypes from 'prop-types';
import baserc from './baserc';
import { Month, PickDay } from './components';
import { isEqual } from 'date-fns';
class RcPicker extends Component {
  static propTypes = {
    onSelectDay: PropTypes.func.isRequired,
  };
  onSelectDay = (day, isSelected) => {
    const { onSelectDay } = this.props;
    const newSelected = isSelected ? '' : day;
    onSelectDay(newSelected);
  };
  onMultiSelectDay = (day, isSelected) => {
    const { selected, onSelectDay } = this.props;
    const newSelected = isSelected
      ? selected.filter(select => !isEqual(select, day))
      : [...selected, day];
    onSelectDay(newSelected);
  };
  render() {
    const { multiple } = this.props;
    const onDayClick = multiple ? this.onMultiSelectDay : this.onSelectDay;
    return (
      <Month
        {...this.props}
        Day={PickDay}
        eachDays={this.props.getCalendarMonthDays()}
        onDayClick={onDayClick}
      />
    );
  }
}

export default baserc(RcPicker);
