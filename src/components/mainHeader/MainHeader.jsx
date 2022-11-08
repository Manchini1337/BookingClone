import classes from './MainHeader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faPlane,
  faCar,
  faTaxi,
  faPerson,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/userSlice';
import api from '../../utils/api/axios.interceptor';

const MainHeader = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  return (
    <header className={classes.header}>
      <div className={classes.logoContainer}>
        <span onClick={() => navigate('/')} className={classes.logo}>
          Booking
        </span>
        {user._id ? (
          <div className={classes.logout}>
            <img
              src={user.img || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
              alt='avatar'
              className={classes.avatar}
              onClick={() => navigate('/profile')}
            />
            <span onClick={() => navigate('/profile')}>{user.username}</span>
            <FontAwesomeIcon
              onClick={() => {
                localStorage.removeItem('user');
                dispatch(userActions.resetUserData());
                api.post('auth/logout');
                navigate('/');
              }}
              icon={faRightFromBracket}
              className={classes.logoutIcon}
            />
          </div>
        ) : (
          <div className={classes.navItems}>
            <button
              onClick={() => navigate('/register')}
              className={classes.button}
            >
              Register
            </button>
            <button
              onClick={() => navigate('/login')}
              className={classes.button}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
