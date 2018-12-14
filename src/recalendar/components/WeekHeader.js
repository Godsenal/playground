import React from "react";
import { css } from "glamor";

const headerRowStyle = css({
  color: "rgb(117, 117, 117)",
  borderBottom: "1px solid rgb(117, 117, 117)"
});
const headerStyle = css({
  fontSize: "0.7em",
  height: "1em",
  padding: 10
});
const DAY_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"];

const WeekHeader = () => {
  return (
    <tr {...css(headerRowStyle)}>
      {DAY_OF_WEEK.map(day => (
        <th {...css(headerStyle)} key={day}>
          {day}
        </th>
      ))}
    </tr>
  );
};

export default WeekHeader;
