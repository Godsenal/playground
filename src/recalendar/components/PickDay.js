import React from "react";
import { isEqual } from "date-fns";
import { css } from "glamor";
import { Day } from ".";

const baseSelectedBox = css({
  color: "white",
  backgroundColor: "#f9748a",
  ":hover": {
    opacity: 0.7
  }
});

const PickDay = ({
  day,
  multiple,
  selected,
  onDateClick,
  styles,
  ...props
}) => {
  const isSelected = multiple
    ? selected.some(item => isEqual(day, item))
    : isEqual(day, selected);
  const { selectedBox } = styles;
  const dateStyle = css(isSelected && css(baseSelectedBox, selectedBox));
  const dateClick = () => onDateClick(day);
  return (
    <Day
      {...props}
      day={day}
      dateStyle={dateStyle}
      onDateClick={dateClick}
      styles={styles}
    />
  );
};

export default PickDay;
