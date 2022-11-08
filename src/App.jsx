import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import HotelPage from './pages/hotel/HotelPage';
import HotelListPage from './pages/hotelList/HotelListPage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import api from './utils/api/axios.interceptor';
import { userActions } from './store/userSlice';
import ProfilePage from './pages/profile/ProfilePage';

function App() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user._id) {
      api
        .get(`users/data/${user._id}`)
        .then((response) => dispatch(userActions.setUserData(response.data)))
        .catch((err) => dispatch(userActions.resetUserData()));
    }
  }, [dispatch, user._id]);

  const ProtectedRoute = ({ children }) => {
    if (!user._id) {
      return <Navigate to='/BookingClone//login' />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/BookingClone/' element={<HomePage />} />
        <Route path='/BookingClone/hotels' element={<HotelListPage />} />
        <Route path='/BookingClone/hotel/:id' element={<HotelPage />} />
        <Route path='/BookingClone/login' element={<LoginPage />} />
        <Route path='/BookingClone/register' element={<RegisterPage />} />
        <Route
          path='/BookingClone/profile'
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
