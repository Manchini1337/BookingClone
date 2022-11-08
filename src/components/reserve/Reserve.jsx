import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Reserve.module.css';
import useFetch from '../../hooks/useFetch';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { datesInRange } from '../../utils/utilityFunctions';
import api from '../../utils/api/axios.interceptor';
import { useNavigate } from 'react-router-dom';

const Reserve = ({ setOpen, hotelId, amount }) => {
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`hotels/room/${hotelId}`);

  const dates = useSelector((state) => state.search.dates);
  const user = useSelector((state) => state.user);

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const allDates = datesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const response = api.put(`rooms/availability/${roomId}`, {
            dates: allDates,
          });
        })
      );
      await api.post(`orders/${user._id}`, {
        product: hotelId,
        customer: user._id,
        bookedDates: allDates,
        amount: amount.toString(),
      });
      setOpen(false);
      navigate('/BookingClone/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.reserve}>
      <div className={classes.container}>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className={classes.icon}
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div key={item._id} className={classes.item}>
            <div className={classes.itemInfo}>
              <div className={classes.title}>{item.title}</div>
              <div className={classes.desc}>{item.desc}</div>
              <div className={classes.max}>
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className={classes.price}>{item.price}</div>
            </div>
            <div className={classes.selected}>
              {item.roomNumbers.map((roomNumber) => (
                <div key={roomNumber._id} className={classes.room}>
                  <label>{roomNumber.number}</label>
                  <input
                    type='checkbox'
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className={classes.button}>
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
