import classes from './SearchBar.module.css';
import { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DateInput from '../dateInput/DateInput';
import { useDispatch } from 'react-redux';
import { searchActions } from '../../store/searchSlice';
import {
  faBed,
  faPlane,
  faCar,
  faTaxi,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [destination, setDestination] = useState('');
  const [toggleGuests, setToggleGuests] = useState(false);
  const [guests, setGuests] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const navigate = useNavigate();

  const handleGuests = (name, operation) => {
    setGuests((prev) => ({
      ...prev,
      [name]: operation === 'inc' ? guests[name] + 1 : guests[name] - 1,
    }));
  };

  const handleSearch = () => {
    const stringDates = [
      {
        startDate: dates[0].startDate.toISOString(),
        endDate: dates[0].endDate.toISOString(),
        key: 'selection',
      },
    ];
    dispatch(
      searchActions.setSearchData({ destination, dates: stringDates, guests })
    );
    navigate('/BookingClone/hotels');
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.headerList}>
          <div className={`${classes.headerListItem} ${classes.active}`}>
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>

          <div className={classes.headerListItem}>
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>

          <div className={classes.headerListItem}>
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>

          <div className={classes.headerListItem}>
            <FontAwesomeIcon icon={faPerson} />
            <span>Attractions</span>
          </div>

          <div className={classes.headerListItem}>
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        <h1 className={classes.title}>A lifetime of discounts? It's Genius.</h1>
        <p className={classes.description}>
          Get rewarded for your travels - unlock instant savings of 10% or more
          with a free Booking account
        </p>
        <div className={classes.searchBar}>
          <div className={classes.searchBarItem}>
            <FontAwesomeIcon icon={faBed} className={classes.icon} />
            <input
              type='text'
              placeholder='Where are you going?'
              className={classes.searchInput}
              onChange={(e) => setDestination(e.target.value)}
              value={destination}
            />
          </div>
          <div className={classes.searchBarItem}>
            <DateInput
              date={dates}
              setDate={setDates}
              iconClass={classes.icon}
              spanClass={classes.searchText}
              dateClass={classes.date}
              initialValue={false}
              showIcon={true}
            />
          </div>
          <div className={classes.searchBarItem}>
            <FontAwesomeIcon icon={faPerson} className={classes.icon} />
            <span
              onClick={() => setToggleGuests((prev) => !prev)}
              className={classes.searchText}
            >
              {`${guests.adult} adult · ${guests.children} children · ${guests.room} room`}
            </span>
            {toggleGuests && (
              <div className={classes.guests}>
                <div className={classes.guestsItem}>
                  <span className={classes.guestText}>Adult</span>
                  <div className={classes.guestsAction}>
                    <button
                      onClick={() => handleGuests('adult', 'dec')}
                      className={classes.guestButton}
                      disabled={guests.adult <= 1}
                    >
                      -
                    </button>
                    <span className={classes.guestNumber}>{guests.adult}</span>
                    <button
                      onClick={() => handleGuests('adult', 'inc')}
                      className={classes.guestButton}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className={classes.guestsItem}>
                  <span className={classes.guestText}>Children</span>
                  <div className={classes.guestsAction}>
                    <button
                      onClick={() => handleGuests('children', 'dec')}
                      className={classes.guestButton}
                      disabled={guests.children <= 0}
                    >
                      -
                    </button>
                    <span className={classes.guestNumber}>
                      {guests.children}
                    </span>
                    <button
                      onClick={() => handleGuests('children', 'inc')}
                      className={classes.guestButton}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className={classes.guestsItem}>
                  <span className={classes.guestText}>Room</span>
                  <div className={classes.guestsAction}>
                    <button
                      onClick={() => handleGuests('room', 'dec')}
                      className={classes.guestButton}
                      disabled={guests.room <= 1}
                    >
                      -
                    </button>
                    <span className={classes.guestNumber}>{guests.room}</span>
                    <button
                      onClick={() => handleGuests('room', 'inc')}
                      className={classes.guestButton}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={classes.searchBarItem}>
            <button className={classes.button} onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
