import { format, getMonth } from 'date-fns';
const Day = ({ day, dateData, month, ...props }) => {
  const isThisMonth = getMonth(day) === month;
  const dayData = dateData[format(day, 'YYYY-MM-DD')];
  const events = dayData ? dayData.events : [];
  // const isSelected = multiple
  //   ? selected.some(item => isEqual(day, item))
  //   : isEqual(day, selected);
  return props.children({ isThisMonth, events, day, ...props });
};

export default Day;
