import React from "react";
import { css } from "glamor";
import { Week, WeekHeader } from ".";

const baseTable = css({
  width: "100%",
  height: "100%",
  borderCollapse: "collapse",
  borderSpacing: "0px",
  border: "1px solid #ccc"
});
const Month = ({ eachDays, ...props }) => {
  const weeks = Math.ceil(eachDays.length / 7);
  const { table } = props.styles;
  let eachWeeks = [];
  for (let i = 0; i < weeks; i++) {
    const startWeek = i * 7;
    const lastWeek = (i + 1) * 7;
    eachWeeks.push(eachDays.slice(startWeek, lastWeek));
  }
  return (
    <table {...css(baseTable, table)}>
      <tbody>
        <WeekHeader {...props} />
        {eachWeeks.map((weeks, i) => {
          return <Week {...props} key={i} daysInWeek={weeks} week={i + 1} />;
        })}
      </tbody>
    </table>
  );
};

export default Month;
