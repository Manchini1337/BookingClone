import classes from './PropertyList.module.css';
import useFetch from '../../hooks/useFetch';

const PropertyList = () => {
  const { data, loading, error } = useFetch('hotels/countByType');

  const images = [
    {
      id: 0,
      src: 'https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=',
    },
    {
      id: 1,
      src: 'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg',
    },
    {
      id: 2,
      src: 'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg',
    },
    {
      id: 3,
      src: 'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg',
    },
    {
      id: 4,
      src: 'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg',
    },
  ];

  return (
    <>
      <h1 className={classes.title}>Browse by property type</h1>
      <div className={classes.list}>
        {loading ? (
          'Loading...'
        ) : (
          <>
            {data &&
              images.map((image) => (
                <div className={classes.item} key={image.id}>
                  <img src={image.src} alt='photo' className={classes.img} />
                  <div className={classes.titles}>
                    <h1>{data[image.id]?.type}</h1>
                    <h2>
                      {data[image.id]?.count} {data[image.id]?.type}
                      {data[image.id]?.count === 1 ? '' : 's'}
                    </h2>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default PropertyList;
