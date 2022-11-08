import classes from './FeaturedProperties.module.css';
import useFetch from '../../hooks/useFetch';

const FeaturedProperties = () => {
  const { data, loading } = useFetch('hotels?featured=true&limit=4');

  return (
    <>
      <h1 className={classes.title}>Homes guests love</h1>
      <div className={classes.list}>
        {loading ? (
          'Loading...'
        ) : (
          <>
            {data.map((item) => (
              <div className={classes.item} key={item._id}>
                <img src={item.photos[0]} alt='photo' className={classes.img} />
                <span className={classes.name}>{item.name}</span>
                <span className={classes.city}>{item.city}</span>
                <span className={classes.price}>
                  Starting from ${item.cheapestPrice}
                </span>
                {item.rating && (
                  <div className={classes.rating}>
                    <button>{item.rating}</button>
                    <span>Excellent</span>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default FeaturedProperties;
