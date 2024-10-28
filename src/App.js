import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Login from './Pages/Common/Login/login';
import HomePage_Members from './Pages/Users/Members/HomePage_Members';
import HomePage_CommonUsers from './Pages/Users/Common_Users/HomePage_CommonUsers';

import Register from './Pages/Common/Register/Register';
import Verify from './Pages/Common/Register/Verify';

import ForgotPassword from './Pages/Common/ForgotPassword/ForgotPassword'
import VerifyOTP from './Pages/Common/ForgotPassword/VerifyOTP';
import ResetPassword from './Pages/Common/ForgotPassword/ResetPassword';

import ProductPage from './Pages/Users/ProductPage/ProductPage';
import ManageCategory from './Pages/Admin/ManageCategory/ManageCategory';
import ManageProduct from './Pages/Admin/ManageProduct/ManageProduct';

import SubHeader from './Components/SubHeader/SubHeader';
import Top10_BanChayNhat from './Components/Top10_BanChayNhat/Top10_BanChayNhat';
import Top10_XemNhieuNhatNhat from './Components/Top10_XemNhieuNhat/Top10_XemNhieuNhat';

import ProductCard_2 from './Components/ProductCard/ProductCard_2';
import CartPage from './Pages/Users/CartPage/CartPage';
import ShoppingCartPage from './Pages/Users/ShoppingCartPage/ShoppingCartPage'

import OrderPage from './Pages/Users/OrderPage/OrderPage';
import PurchasedProducts from './Pages/Users/ReviewPage/PurchasedProducts';

function App() {
  return (
    <>
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
          <Route path="/top10_banchaynhat" element={<Top10_BanChayNhat />} />
          <Route path="/top10_xemnhieunhat" element={<Top10_XemNhieuNhatNhat />} />
          <Route path="/product_cart2" element={<ProductCard_2 />} />
          <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          <Route path="/shopping-cart/:userId" element={<ShoppingCartPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/purchased-products" element={<PurchasedProducts />} />
        </Routes>


      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App;
