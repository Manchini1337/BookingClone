import classes from './HotelInfo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { differenceInDays } from '../../utils/utilityFunctions';
import Reserve from '../reserve/Reserve';
import { useState } from 'react';

const HotelInfo = ({ handleOpen, data, loading, id }) => {
  const [openModal, setOpenModal] = useState(false);

  const user = useSelector((state) => state.user);

  const dates = useSelector((state) => state.search.dates);
  const guests = useSelector((state) => state.search.guests);
  const days = differenceInDays(dates[0].endDate, dates[0].startDate);

  const navigate = useNavigate();

  const handleClick = () => {
    if (user._id) {
      setOpenModal(true);
    } else {
      navigate('/BookingClone/login');
    }
  };

  if (loading) return <h1>Loading...</h1>;
  return (
    <div className={classes.hotelWrapper}>
      <h1 className={classes.hotelTitle}>{data.name}</h1>
      <div className={classes.hotelAddress}>
        <FontAwesomeIcon icon={faLocationDot} />
        <span>{data.address}</span>
      </div>
      <span className={classes.hotelDistance}>
        Excellent location - {data.distance}m from center
      </span>
      <span className={classes.hotelPriceHighlight}>
        Book a stay over ${data.cheapestPrice} at this property and get a free
        airport taxi
      </span>
      <div className={classes.hotelImages}>
        {data.photos?.map((photo, i) => (
          <div key={i} className={classes.hotelImgWrapper}>
            <img
              onClick={() => handleOpen(i)}
              src={photo}
              alt='photo'
              className={classes.hotelImg}
            />
          </div>
        ))}
      </div>
      <div className={classes.hotelDetails}>
        <div className={classes.hotelDetailsTexts}>
          <h1 className={classes.hotelTitle}>{data.title}</h1>
          <p className={classes.hotelDesc}>{data.description}</p>
        </div>
        <div className={classes.hotelDetailsPrice}>
          {days > 0 ? (
            <h1>Book for a {days}-night stay!</h1>
          ) : (
            <h1>You need to pick a date.</h1>
          )}
          <span>
            Located in the real heart of Krakow, this property has an excellent
            location score of 9.8!
          </span>
          <h2>
            <b>${days * data.cheapestPrice * guests.room}</b> ({days} nights)
          </h2>
          <button disabled={days < 1} onClick={handleClick}>
            {days < 1 ? 'You need to pick a date.' : 'Reserve or Book Now!'}
          </button>
        </div>
      </div>
      {openModal && (
        <Reserve
          setOpen={setOpenModal}
          hotelId={id}
          amount={days * data.cheapestPrice * guests.room}
        />
      )}
    </div>
  );
};

export default HotelInfo;
