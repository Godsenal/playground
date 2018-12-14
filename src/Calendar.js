import React from "react";
import RcPicker from "./recalendar/RcPicker";
import RcRangePicker from "./recalendar/RcRangePicker";
import "./App.css";
class Calendar extends React.Component {
  state = {
    startDate: "",
    endDate: "",
    dateData: {
      "2018-06-06": {
        events: ["Birthday!"]
      },
      "2018-12-13": {
        events: ["Hello~"]
      }
    },
    selected: "",
    multiSelected: []
  };
  onSelectDay = day => {
    this.setState({
      selected: day
    });
  };
  onMultedSelected = days => {
    this.setState({
      multiSelected: days
    });
  };
  onSelectRange = (startDate, endDate) => {
    this.setState({
      startDate,
      endDate
    });
  };
  render() {
    const {
      startDate,
      endDate,
      dateData,
      selected,
      multiSelected
    } = this.state;
    return (
      <div>
        {/* <RcPicker
          dateData={dateData}
          selected={selected}
          onSelectDay={this.onSelectDay}
        />
        <RcPicker
          multiple
          dateData={dateData}
          selected={multiSelected}
          onSelectDay={this.onMultedSelected}
        /> */}
        <RcRangePicker
          dateData={dateData}
          startDate={startDate}
          endDate={endDate}
          onSelectRange={this.onSelectRange}
        />
      </div>
    );
  }
}

export default Calendar;
