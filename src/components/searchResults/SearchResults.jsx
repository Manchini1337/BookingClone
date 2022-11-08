import SearchItem from '../searchItem/SearchItem';
import classes from './SearchResults.module.css';

const SearchResults = ({ data, loading, error }) => {
  return (
    <div className={classes.result}>
      {loading ? (
        'loading...'
      ) : data.length === 0 ? (
        'No hotels match your criteria.'
      ) : (
        <>
          {data.map((item) => (
            <SearchItem key={item._id} item={item} />
          ))}
        </>
      )}
    </div>
  );
};

export default SearchResults;
