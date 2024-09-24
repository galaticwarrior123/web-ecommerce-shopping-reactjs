import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Common/Login/login';
import HomePage from './Pages/Users/HomePage';

import Register from './Pages/Common/Register/Register';
import Verify from './Pages/Common/Register/Verify';

import ForgotPassword from './Pages/Common/ForgotPassword/ForgotPassword'
import VerifyOTP from './Pages/Common/ForgotPassword/VerifyOTP';
import ResetPassword from './Pages/Common/ForgotPassword/ResetPassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductPage from './Pages/Users/ProductPage/ProductPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />


        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verifyOTP-forgot-password" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
