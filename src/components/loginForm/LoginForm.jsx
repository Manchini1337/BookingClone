import classes from './LoginForm.module.css';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import api from '../../utils/api/axios.interceptor';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/userSlice';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [status, setStatus] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('auth/login', formData);
      dispatch(userActions.setUserData(response.data.details));
      localStorage.setItem('user', JSON.stringify(response.data.details));
      navigate('/');
    } catch (err) {
      setStatus(err.response.data.message);
      setFormData({
        username: '',
        password: '',
      });
    }
  };

  if (user._id) return <Navigate to='/' replace />;

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <h2 className={classes.title}>Login</h2>
        <div className={classes.form__group}>
          <label htmlFor='username'>Username:</label>
          <div className={classes.input__group}>
            <input
              type='text'
              required
              pattern='.{3,}'
              id='username'
              name='username'
              placeholder='Username'
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
                setStatus('');
              }}
              value={formData.username}
            />
            <i className='bx bx-user' />
          </div>
        </div>
        <div className={classes.form__group}>
          <label htmlFor='password'>Password:</label>
          <div className={classes.input__group}>
            <input
              type='password'
              required
              pattern='.{3,}'
              id='password'
              name='password'
              placeholder='Password'
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setStatus('');
              }}
              value={formData.password}
            />
            <i className='bx bx-lock-alt' />
          </div>
        </div>

        <button className={classes.button} type='submit'>
          Login
        </button>
        <h4 className={classes.status}>{status}</h4>
      </form>
    </div>
  );
};

export default LoginForm;
