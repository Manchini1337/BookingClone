import classes from './SearchMenu.module.css';
import DateInput from '../dateInput/DateInput';
import { useDispatch } from 'react-redux';
import { searchActions } from '../../store/searchSlice';
const SearchMenu = ({
  setMin,
  setMax,
  dates,
  setDates,
  destination,
  setDestination,
  guests,
  setGuests,
  reFetch,
}) => {
  const dispatch = useDispatch();
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
    reFetch();
  };
  return (
    <div className={classes.search}>
      <h1 className={classes.title}>Search</h1>
      <div className={classes.searchItem}>
        <label>Destination</label>
        <input
          placeholder={destination || 'Your destination'}
          onChange={(e) => setDestination(e.target.value.toLowerCase())}
          type='text'
        />
      </div>
      <div className={classes.searchItem}>
        <label>Check-in Date</label>
        <DateInput
          date={dates}
          setDate={setDates}
          iconClass={classes.icon}
          spanClass={classes.searchText}
          showIcon={false}
        />
      </div>
      <div className={classes.searchItem}>
        <label>Options</label>
        <div className={classes.options}>
          <div className={classes.searchOptionItem}>
            <span className={classes.optionText}>
              Min price <small>per night</small>
            </span>
            <input
              className={classes.optionInput}
              type='number'
              onChange={(e) => setMin(e.target.value)}
            />
          </div>

          <div className={classes.searchOptionItem}>
            <span className={classes.optionText}>
              Max price <small>per night</small>
            </span>
            <input
              className={classes.optionInput}
              type='number'
              onChange={(e) => setMax(e.target.value)}
            />
          </div>

          <div className={classes.searchOptionItem}>
            <span className={classes.optionText}>Adult</span>
            <input
              className={classes.optionInput}
              type='number'
              min={1}
              placeholder={guests.adult}
              onChange={(e) =>
                setGuests((prev) => ({ ...prev, adult: +e.target.value }))
              }
              value={guests.adult}
            />
          </div>

          <div className={classes.searchOptionItem}>
            <span className={classes.optionText}>Children</span>
            <input
              className={classes.optionInput}
              type='number'
              min={0}
              placeholder={guests.children}
              onChange={(e) =>
                setGuests((prev) => ({ ...prev, children: +e.target.value }))
              }
              value={guests.children}
            />
          </div>

          <div className={classes.searchOptionItem}>
            <span className={classes.optionText}>Room</span>
            <input
              className={classes.optionInput}
              type='number'
              min={1}
              placeholder={guests.room}
              onChange={(e) =>
                setGuests((prev) => ({ ...prev, room: +e.target.value }))
              }
              value={guests.room}
            />
          </div>
        </div>
      </div>
      <button onClick={handleSearch} className={classes.searchButton}>
        Search
      </button>
    </div>
  );
};

export default SearchMenu;
