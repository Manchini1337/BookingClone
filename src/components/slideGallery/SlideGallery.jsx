import classes from './SlideGallery.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

const SlideGallery = ({ setOpen, slideNumber, setSlideNumber, photos }) => {
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };
  return (
    <div className={classes.hotelSlider}>
      <FontAwesomeIcon
        icon={faCircleXmark}
        className={classes.close}
        onClick={() => setOpen(false)}
      />
      <FontAwesomeIcon
        icon={faCircleArrowLeft}
        className={classes.arrow}
        onClick={() => handleMove('l')}
      />
      <div className={classes.sliderWrapper}>
        <img
          src={photos[slideNumber]}
          alt='photo'
          className={classes.sliderImg}
        />
      </div>
      <FontAwesomeIcon
        icon={faCircleArrowRight}
        className={classes.arrow}
        onClick={() => handleMove('r')}
      />
    </div>
  );
};

export default SlideGallery;
