import { useState } from 'react';
import classes from './HotelPage.module.css';
import SlideGallery from '../../components/slideGallery/SlideGallery';
import HotelInfo from '../../components/hotelInfo/HotelInfo';
import MainHeader from '../../components/mainHeader/MainHeader';
import Newsletter from '../../components/newsletter/Newsletter';
import Footer from '../../components/footer/Footer';
import useFetch from '../../hooks/useFetch';

const HotelPage = () => {
  const id = location.pathname.split('/')[2];
  const { data, loading } = useFetch(`hotels/find/${id}`);

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  return (
    <>
      <MainHeader />
      <div className={cclasses.container}>
        {open && (
          <SlideGallery
            setOpen={setOpen}
            slideNumber={slideNumber}
            setSlideNumber={setSlideNumber}
            photos={data.photos}
          />
        )}
        <HotelInfo
          handleOpen={handleOpen}
          data={data}
          loading={loading}
          id={id}
        />
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default HotelPage;
