import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  setMonth,
  setYear,
  startOfWeek,
  endOfWeek,
  getDaysInMonth,
  eachDay,
} from 'date-fns';
import { css } from 'glamor';
import { Month, MonthHeader, YearHeader } from './components';

const baseStyle = css({
  color: '#5c6264',
  minWidth: 300,
  minHeight: 500,
  border: '1px solid #142330',
});
class BaseCalendar extends Component {
  state = {
    currentDate: this.props.initialDate,
    year: this.props.initialDate.getFullYear(),
    month: this.props.initialDate.getMonth(),
    lastDayOfMonth: getDaysInMonth(this.props.initialDate),
  };
  static PropTypes = {
    initialDate: PropTypes.instanceOf(Date),
  };
  static defaultProps = {
    initialDate: new Date(),
  };
  updateDate = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDayOfMonth = getDaysInMonth(date);
    this.setState({
      currentDate: date,
      year,
      month,
      lastDayOfMonth,
    });
  };
  getCalendarMonthDays = () => {
    const { year, month } = this.state;
    const startDate = startOfWeek(new Date(year, month, 0));
    const endDate = endOfWeek(
      new Date(year, month, getDaysInMonth(year, month)),
    );
    return eachDay(startDate, endDate);
  };
  getFirstDateOfMonth = date => {
    const currentDate = new Date(date.getFullYear(), 0);
    console.log(currentDate);
    return currentDate;
  };
  changeMonth = month => {
    const { currentDate } = this.state;
    const newDate = setMonth(currentDate, month);
    this.updateDate(newDate);
  };
  changeYear = year => {
    const { currentDate } = this.state;
    const newYear = setYear(currentDate, year);
    this.updateDate(newYear);
  };
  render() {
    const { month, year } = this.state;
    return (
      <div {...css(baseStyle)}>
        <YearHeader changeYear={this.changeYear} year={year} />
        <MonthHeader changeMonth={this.changeMonth} month={month} />
        <Month eachDays={this.getCalendarMonthDays()} {...this.state} />
      </div>
    );
  }
}

export default BaseCalendar;
