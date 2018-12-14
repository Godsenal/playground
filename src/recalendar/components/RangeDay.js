import React from "react";
import { isEqual, getDate } from "date-fns";
import { css } from "glamor";

import { Day } from ".";
const baseStyle = css({
  fontSize: 16,
  position: "relative",
  minWidth: "2.5em",
  minHeight: "3em",
  textAlign: "center",
  verticalAlign: "middle",
  cursor: "pointer",
  opacity: 1,
  transition: "opacity 0.2s"
});
const baseDateStyle = isThisMonth =>
  css({
    cursor: "pointer",
    color: isThisMonth ? "inherit" : "#ccc",
    backgroundColor: "transparent",
    outline: "none",
    border: "none"
  });
const startOrEndDate = css({
  color: "white",
  backgroundColor: "#f9748a",
  ":hover": {
    opacity: 0.7
  }
});
const withArrowStyle = css({
  "&:after": {
    content: "''",
    position: "absolute",
    top: "50%", // half way down (vertical center).
    marginTop: -5, // adjust position, arrow has a height of 30px.
    border: "solid 5px transparent",
    zIndex: 1
  }
});
const rightArrow = css(withArrowStyle, {
  "&:after": {
    left: 0,
    borderLeftColor: "#FFF"
  }
});
const leftArrow = css(withArrowStyle, {
  "&:after": {
    right: 0,
    borderRightColor: "#FFF"
  }
});
const inRangeDateStyle = css({
  color: "white",
  backgroundColor: "#ec84ac",
  ":hover": {
    opacity: 0.7
  }
});
const eventStyle = css({
  position: "absolute",
  bottom: 0,
  width: "100%",
  textAlign: "center",
  fontSize: ".8em"
});

const RangeDay = ({
  day,
  startDate,
  endDate,
  inRangeDates,
  onDayClick,
  ...props
}) => {
  const isStartDate = isEqual(startDate, day);
  const isEndDate = isEqual(endDate, day);
  const isInRange = inRangeDates.some(date => isEqual(day, date));
  return (
    <Day day={day} {...props}>
      {({ isThisMonth, events }) => (
        <td
          {...css(
            baseStyle,
            isInRange && inRangeDateStyle,
            isStartDate && css(startOrEndDate, rightArrow),
            isEndDate && css(startOrEndDate, leftArrow)
          )}
          onClick={() => onDayClick(day)}
        >
          <button {...css(baseDateStyle(isThisMonth))}>{getDate(day)}</button>
          {events.map((event, i) => (
            <div {...css(eventStyle)} key={i}>
              {event}
            </div>
          ))}
        </td>
      )}
    </Day>
  );
};

export default RangeDay;
