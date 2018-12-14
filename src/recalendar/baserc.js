import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  setMonth,
  setYear,
  startOfWeek,
  endOfWeek,
  getDaysInMonth,
  eachDay
} from "date-fns";
import { css } from "glamor";
import { YearHeader, MonthHeader } from "./components";
const baseStyle = css({
  width: 350,
  height: 400,
  color: "black",
  position: "relative",
  overflowY: "auto",
  "& table": {
    marginTop: "0.5rem",
    width: "100%",
    height: "90%",
    textAlign: "center"
  }
});

const baseHeader = css({
  display: "flex",
  alignItems: "center",
  height: "5%"
});
const baserc = Wrapped => {
  return class extends Component {
    state = {
      currentDate: this.props.initialDate,
      year: this.props.initialDate.getFullYear(),
      month: this.props.initialDate.getMonth(),
      lastDayOfMonth: getDaysInMonth(this.props.initialDate)
    };
    static propTypes = {
      initialDate: PropTypes.instanceOf(Date)
    };
    static defaultProps = {
      initialDate: new Date()
    };
    updateDate = date => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const lastDayOfMonth = getDaysInMonth(date);
      this.setState({
        currentDate: date,
        year,
        month,
        lastDayOfMonth
      });
    };
    getCalendarMonthDays = () => {
      const { year, month } = this.state;
      const startDate = startOfWeek(new Date(year, month, 0));
      const endDate = endOfWeek(
        new Date(year, month, getDaysInMonth(year, month))
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
      const { year, month } = this.state;
      return (
        <div {...css(baseStyle)}>
          <div {...baseHeader}>
            <YearHeader changeYear={this.changeYear} year={year} />
            <MonthHeader changeMonth={this.changeMonth} month={month} />
          </div>
          <Wrapped
            {...this.props}
            {...this.state}
            changeMonth={this.changeMonth}
            changeYear={this.changeYear}
            updateDate={this.updateDate}
            getCalendarMonthDays={this.getCalendarMonthDays}
          />
        </div>
      );
    }
  };
};

export default baserc;
