import React from 'react';
import { isEqual, getDate } from 'date-fns';
import { css } from 'glamor';
import { Day } from '.';

const baseStyle = (isThisMonth) => css({
  color: isThisMonth ? 'black' : '#ccc',
  width: 50,
  height: 50,
  textAlign: 'center',
  verticalAlign: 'middle',
});
const baseDateStyle = css({
  cursor: 'pointer',
  width: 30,
  height: 30,
  borderRadius: '50%',
  backgroundColor: 'inherit',
  outline: 'none',
  border: 'none',
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  }
});
const selectedDateStyle = css({
  color: 'white',
  backgroundColor: 'black',
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  }
});
const PickDay = ({ day, multiple, selected, onDayClick, ...props }) => {
  const isSelected = multiple
    ? selected.some(item => isEqual(day, item))
    : isEqual(day, selected);
  return (
    <Day day={day} {...props}>
      {({ isThisMonth, events }) => (
        <td
          {...css(baseStyle(isThisMonth))}
          onClick={() => onDayClick(day, isSelected)}
        >
          <button {...css(baseDateStyle, isSelected && selectedDateStyle)}>{getDate(day)}</button>
          {events.map((event, i) => (
            <div key={i}>{event}</div>
          ))}
        </td>
      )}
    </Day>
  );
};

export default PickDay;
