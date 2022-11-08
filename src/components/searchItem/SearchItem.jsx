import classes from './SearchItem.module.css';
import { Link } from 'react-router-dom';

const SearchItem = ({ item }) => {
  return (
    <div className={classes.searchItem}>
      <img src={item.photos[0]} alt='photo' className={classes.img} />
      <div className={classes.description}>
        <h1 className={classes.title}>{item.name}</h1>
        <span className={classes.distance}>{item.distance}m from center</span>
        <span className={classes.taxi}>Free airport taxi</span>
        <span className={classes.subtitle}>{item.title}</span>
        <span className={classes.features}>{item.description}</span>
        <span className={classes.cancel}>Free cancellation</span>
        <span className={classes.cancelSubtitle}>
          {' '}
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className={classes.details}>
        {item.rating && (
          <div className={classes.rating}>
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className={classes.texts}>
          <span className={classes.price}>${item.cheapestPrice}</span>
          <span className={classes.taxi}>Includes taxes and fees</span>
          <Link to={`/BookingClone/hotel/${item._id}`}>
            <button className={classes.button}>See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
