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
      return <Navigate to='/login' />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/hotels' element={<HotelListPage />} />
        <Route path='/hotel/:id' element={<HotelPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route
          path='/profile'
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
