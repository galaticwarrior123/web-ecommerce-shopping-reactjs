import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Common/Login/login';
import HomePage from './Pages/Users/HomePage';

import Register from './Pages/Common/Register/Register';
import Verify from './Pages/Common/Register/Verify';

import ForgotPassword from './Pages/Common/ForgotPassword/ForgotPassword'
import VerifyOTP from './Pages/Common/ForgotPassword/VerifyOTP';
import ResetPassword from './Pages/Common/ForgotPassword/ResetPassword';

import SearchPage from './Pages/Users/SearchPage/SearchPage';


import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/" element={<HomePage />} />


        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verifyOTP-forgot-password" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
