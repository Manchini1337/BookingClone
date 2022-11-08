import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContainer}>
        <div className={classes.lists}>
          <ul className={classes.list}>
            <li className={classes.item}>Countries</li>
            <li className={classes.item}>Regions</li>
            <li className={classes.item}>Cities</li>
            <li className={classes.item}>Districts</li>
            <li className={classes.item}>Airports</li>
            <li className={classes.item}>Hotels</li>
          </ul>

          <ul className={classes.list}>
            <li className={classes.item}>Homes </li>
            <li className={classes.item}>Apartments </li>
            <li className={classes.item}>Resorts </li>
            <li className={classes.item}>Villas</li>
            <li className={classes.item}>Hostels</li>
            <li className={classes.item}>Guest houses</li>
          </ul>

          <ul className={classes.list}>
            <li className={classes.item}>Unique places to stay</li>
            <li className={classes.item}>Reviews</li>
            <li className={classes.item}>Unpacked: Travel articles</li>
            <li className={classes.item}>Travel communities </li>
            <li className={classes.item}>Seasonal and holiday deals</li>
          </ul>

          <ul className={classes.list}>
            <li className={classes.item}>Car rental</li>
            <li className={classes.item}>Flight Finder</li>
            <li className={classes.item}>Restaurant reservations</li>
            <li className={classes.item}>Travel Agents</li>
          </ul>

          <ul className={classes.list}>
            <li className={classes.item}>Curtomer Service</li>
            <li className={classes.item}>Partner Help</li>
            <li className={classes.item}>Careers</li>
            <li className={classes.item}>Sustainability</li>
            <li className={classes.item}>Press center</li>
            <li className={classes.item}>Safety Resource Center</li>
            <li className={classes.item}>Investor relations</li>
            <li className={classes.item}>Terms & conditions</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
