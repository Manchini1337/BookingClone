import classes from './Newsletter.module.css';

const Newsletter = () => {
  return (
    <div className={classes.email}>
      <h1 className={classes.title}>Save time, save money!</h1>
      <span className={classes.description}>
        Sign up and we'll send the best deals to you
      </span>
      <div>
        <input type='text' placeholder='Your Email' className={classes.input} />
        <button className={classes.button}>Subscribe</button>
      </div>
    </div>
  );
};

export default Newsletter;
