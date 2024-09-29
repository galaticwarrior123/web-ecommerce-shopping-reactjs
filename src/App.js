import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Common/Login/login';
import HomePage_Members from './Pages/Users/Members/HomePage_Members';
import HomePage_CommonUsers from './Pages/Users/Common_Users/HomePage_CommonUsers';

import Register from './Pages/Common/Register/Register';
import Verify from './Pages/Common/Register/Verify';

import ForgotPassword from './Pages/Common/ForgotPassword/ForgotPassword'
import VerifyOTP from './Pages/Common/ForgotPassword/VerifyOTP';
import ResetPassword from './Pages/Common/ForgotPassword/ResetPassword';

import 'bootstrap/dist/css/bootstrap.min.css';
import ProductPage from './Pages/Users/ProductPage/ProductPage';
import ManageCategory from './Pages/Admin/ManageCategory/ManageCategory';
import ManageProduct from './Pages/Admin/ManageProduct/ManageProduct';

import SubHeader from './Components/SubHeader/SubHeader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/homepage_members" element={<HomePage_Members />} />

        <Route path="/homepage_commonusers" element={<HomePage_CommonUsers />} />


        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verifyOTP-forgot-password" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>

      <Routes>
        <Route path="/" element={<HomePage_CommonUsers />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>


      <Routes>
        <Route path="/admin/category" element={<ManageCategory />} />
        <Route path="/admin/product" element={<ManageProduct />} />
      </Routes>

      <Routes>
        <Route path="/sub" element={<SubHeader />} />
      </Routes>

      
    </BrowserRouter>
  )
}

export default App;
