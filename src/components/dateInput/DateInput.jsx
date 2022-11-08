import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';

const DateInput = ({
  date,
  setDate,
  iconClass,
  spanClass,
  dateClass,
  initialValue,
  showIcon,
}) => {
  const [toggleDate, setToggleDate] = useState(initialValue);
  return (
    <>
      {showIcon && (
        <FontAwesomeIcon icon={faCalendarDays} className={iconClass} />
      )}
      <span
        onClick={() => setToggleDate((prev) => !prev)}
        className={spanClass}
      >{`${format(date[0].startDate, 'dd/MM/yyyy')} to ${format(
        date[0].endDate,
        'dd/MM/yyyy'
      )}`}</span>
      {toggleDate && (
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
          minDate={new Date()}
          className={dateClass}
        />
      )}
    </>
  );
};

export default DateInput;
