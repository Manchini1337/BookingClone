import React from 'react';
import classes from './HomePage.module.css';
import SearchBar from '../../components/searchBar/SearchBar';
import PropertyList from '../../components/propertyList/PropertyList';
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties';
import FeaturedCities from '../../components/featuredCities/FeaturedCities';
import MainHeader from '../../components/mainHeader/MainHeader';
import Newsletter from '../../components/newsletter/Newsletter';
import Footer from '../../components/footer/Footer';

const HomePage = () => {
  return (
    <div>
      <MainHeader />
      <SearchBar />
      <div className={classes.container}>
        <FeaturedCities />
        <PropertyList />
        <FeaturedProperties />
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
