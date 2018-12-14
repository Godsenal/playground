import React from "react";
import RcPortal from "./recalendar/RcPortal";
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
    multiSelected: [],
    target: null
  };
  onSelectDay = day => {
    console.log("selected one day", day);
    this.setState({
      selected: day
    });
  };
  onMultedSelected = days => {
    console.log("selected multiple days", days);
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
  handleClick = e => {
    const target = this.state.target ? null : e.currentTarget;
    this.setState({
      target
    });
  };
  render() {
    const {
      target,
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
          onSelectDate={this.onSelectDay}
        />
        <RcPicker
          multiple
          dateData={dateData}
          selected={multiSelected}
          onSelectDate={this.onMultedSelected}
        /> */}
        <RcRangePicker
          dateData={dateData}
          startDate={startDate}
          endDate={endDate}
          onSelectRange={this.onSelectRange}
        />
        <div>
          <button onClick={this.handleClick}>Click Me</button>
          <RcPortal target={target}>
            <RcPicker
              dateData={dateData}
              selected={selected}
              onSelectDate={this.onSelectDay}
            />
          </RcPortal>
        </div>
      </div>
    );
  }
}

export default Calendar;
