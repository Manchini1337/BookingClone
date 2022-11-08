import classes from './ProfilePage.module.css';
import MainHeader from '../../components/mainHeader/MainHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../../utils/api/axios.interceptor';
import { useSelector } from 'react-redux';
import useFetch from '../../../../BookingAdmin/src/hooks/useFetch';
import Orderstable from '../../components/ordersTable/OrdersTable';

const ProfilePage = () => {
  const userId = useSelector((state) => state.user._id);
  const [file, setFile] = useState('');
  const [formData, setFormData] = useState({});

  const { data, loading, error, reFetch } = useFetch(`users/${userId}`);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'upload');
      try {
        const uploadResponse = await axios.post(
          'https://api.cloudinary.com/v1_1/dlu0vo6kc/image/upload',
          data
        );
        const { url } = uploadResponse.data;

        const updatedUser = {
          ...formData,
          img: url,
        };
        try {
          await api.put(`users/${userId}`, updatedUser);
          reFetch(`users/${userId}`);
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await api.put(`users/${userId}`, formData);
      reFetch(`users/${userId}`);
    } catch (err) {
      console.log(err);
    }

    window.location.reload(false);
  };
  return (
    <>
      <MainHeader />
      <div className={classes.container}>
        <h1 className={classes.title}>User information</h1>
        <div className={classes.card}>
          <div className={classes.cardItem}>
            <img
              src={data.img || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
              alt=''
              className={classes.cardItemImg}
            />
            <div className={classes.details}>
              <h1 className={classes.detailsTitle}>{data.username}</h1>
              <div className={classes.detailItem}>
                <span className={classes.detailItemKey}>Email:</span>
                <span className={classes.detailItemValue}>{data.email}</span>
              </div>
              <div className={classes.detailItem}>
                <span className={classes.detailItemKey}>Phone:</span>
                <span className={classes.detailItemValue}>{data.phone}</span>
              </div>
              <div className={classes.detailItem}>
                <span className={classes.detailItemKey}>Country:</span>
                <span className={classes.detailItemValue}>{data.country}</span>
              </div>
              <div className={classes.detailItem}>
                <span className={classes.detailItemKey}>City:</span>
                <span className={classes.detailItemValue}>{data.city}</span>
              </div>
            </div>
          </div>

          <div className={classes.formWrapper}>
            <div className={classes.left}>
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                }
                alt=''
              />
            </div>
            <div className={classes.right}>
              <form onSubmit={handleSubmit} className={classes.form}>
                <div className={`${classes.formFile} ${classes.formGroup}`}>
                  <label className={classes.formLabel} htmlFor='file'>
                    Image: <i className={`bx bx-upload ${classes.icon}`}></i>
                  </label>
                  <input
                    className={classes.formInput}
                    type='file'
                    id='file'
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                </div>
                <div className={classes.grid}>
                  <div className={classes.fromGroup}>
                    <label className={classes.formLabel}>Password</label>
                    <input
                      className={classes.formInput}
                      onChange={handleChange}
                      type='password'
                      id='password'
                    />
                  </div>
                  <div className={classes.fromGroup}>
                    <label className={classes.formLabel}>Email</label>
                    <input
                      className={classes.formInput}
                      onChange={handleChange}
                      type='email'
                      placeholder='john_doe@gmail.com'
                      id='email'
                    />
                  </div>
                  <div className={classes.fromGroup}>
                    <label className={classes.formLabel}>Phone</label>
                    <input
                      className={classes.formInput}
                      onChange={handleChange}
                      type='text'
                      placeholder='+48'
                      id='phone'
                    />
                  </div>
                  <div className={classes.fromGroup}>
                    <label className={classes.formLabel}>Country</label>
                    <input
                      className={classes.formInput}
                      onChange={handleChange}
                      type='text'
                      placeholder='USA'
                      id='country'
                    />
                  </div>
                  <div className={classes.fromGroup}>
                    <label className={classes.formLabel}>City</label>
                    <input
                      className={classes.formInput}
                      onChange={handleChange}
                      type='text'
                      placeholder='New York'
                      id='city'
                    />
                  </div>
                </div>
                <button type='submit' className={classes.formButton}>
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
        <h1 className={classes.title}>Last Transactions...</h1>
        <div className={classes.table}>
          <Orderstable userId={userId} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
