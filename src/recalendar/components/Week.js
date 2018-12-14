import React from 'react';
const Week = ({ daysInWeek, Day, ...props }) => {
  return (
    <tr>
      {daysInWeek.map(day => (
        <Day {...props} key={day} day={day} />
      ))}
    </tr>
  );
};

export default Week;
