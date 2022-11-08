import classes from './RegisterForm.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../utils/api/axios.interceptor';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phone: '',
    email: '',
    country: '',
    city: '',
    img: '',
  });
  const [status, setStatus] = useState('');
  const [file, setFile] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'upload');

    try {
      const uploadResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/dlu0vo6kc/image/upload',
        data
      );

      const { url } = uploadResponse.data;

      const newUser = {
        ...formData,
        img: url,
      };

      await api.post('auth/register', newUser);
      navigate('/BookingClone/login');
    } catch (err) {
      console.log(err);
      if (err.response.data.error.message) {
        setStatus(err.response.data.error.message);
      }
    }
  };

  if (user._id) return <Navigate to='/BookingClone/' replace />;
  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <h2 className={classes.title}>Register</h2>
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
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
                setStatus('');
              }}
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
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setStatus('');
              }}
            />
            <i className='bx bx-lock-alt' />
          </div>
        </div>
        <div className={classes.form__group}>
          <label htmlFor='phonenumber'>Phone:</label>
          <div className={classes.input__group}>
            <input
              type='text'
              required
              pattern='[0-9]{9}'
              id='phonenumber'
              name='phonenumber'
              placeholder='+48'
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                setStatus('');
              }}
            />
            <i className='bx bx-phone' />
          </div>
        </div>
        <div className={classes.form__group}>
          <label htmlFor='email'>Email:</label>
          <div className={classes.input__group}>
            <input
              type='email'
              required
              id='email'
              name='email'
              placeholder='email@gmail.com'
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setStatus('');
              }}
            />
            <i className='bx bx-envelope' />
          </div>
        </div>
        <div className={classes.form__group}>
          <label htmlFor='country'>Country:</label>
          <div className={classes.input__group}>
            <input
              type='text'
              required
              pattern='.{3,}'
              id='country'
              name='country'
              placeholder='USA'
              value={formData.country}
              onChange={(e) => {
                setFormData({ ...formData, country: e.target.value });
                setStatus('');
              }}
            />
            <i className='bx bx-flag' />
          </div>
        </div>
        <div className={classes.form__group}>
          <label htmlFor='City'>City:</label>
          <div className={classes.input__group}>
            <input
              type='text'
              required
              pattern='.{3,}'
              id='City'
              name='City'
              placeholder='New York'
              value={formData.city}
              onChange={(e) => {
                setFormData({ ...formData, city: e.target.value });
                setStatus('');
              }}
            />
            <i className='bx bx-buildings' />
          </div>
        </div>
        <label style={{ gridColumn: '1 / -1' }}>Upload photo:</label>
        <div className={classes.fileGrid}>
          <label htmlFor='file'>
            <i className='bx bx-upload'></i>
          </label>
          <img
            className={classes.avatar}
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
            }
            alt=''
          />
          <input
            onChange={(e) => {
              setFile(e.target.files[0]);
              setStatus('');
            }}
            type='file'
            id='file'
            style={{ display: 'none' }}
          />
        </div>
        <button type='submit' className={classes.button}>
          Register
        </button>
        <h4 className={classes.status}>{status}</h4>
      </form>
    </div>
  );
};

export default RegisterForm;
