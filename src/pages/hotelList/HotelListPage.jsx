import classes from './HotelListPage.module.css';
import SearchMenu from '../../components/searchMenu/SearchMenu';
import SearchResults from '../../components/searchResults/SearchResults';
import useFetch from '../../hooks/useFetch';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import MainHeader from '../../components/mainHeader/MainHeader';
import Footer from '../../components/footer/Footer';
import Newsletter from '../../components/newsletter/Newsletter';

const HotelListPage = () => {
  const searchState = useSelector((state) => state.search);
  const transformedDates = [
    {
      startDate: new Date(searchState.dates[0].startDate),
      endDate: new Date(searchState.dates[0].endDate),
      key: 'selection',
    },
  ];

  const [destination, setDestination] = useState(searchState.destination);
  const [dates, setDates] = useState(transformedDates);
  const [guests, setGuests] = useState(searchState.guests);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(999);

  let searchDestination =
    destination.charAt(0).toUpperCase() + destination.slice(1);

  const { data, loading, error, reFetch } = useFetch(
    `hotels?city=${searchDestination}&min=${min}&max=${max}`
  );

  return (
    <>
      <MainHeader />
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <SearchMenu
            min={min}
            setMin={setMin}
            max={max}
            setMax={setMax}
            dates={dates}
            setDates={setDates}
            destination={destination}
            setDestination={setDestination}
            guests={guests}
            setGuests={setGuests}
            reFetch={reFetch}
          />
          <SearchResults data={data} loading={loading} error={error} />
        </div>
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default HotelListPage;
