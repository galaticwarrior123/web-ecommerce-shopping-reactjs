import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Pages/Common/Login/login';
import Register from './Pages/Common/Register/Register';
import Verify from './Pages/Common/Register/Verify';
import ForgotPassword from './Pages/Common/ForgotPassword/ForgotPassword'
import VerifyOTP from './Pages/Common/ForgotPassword/VerifyOTP';
import ResetPassword from './Pages/Common/ForgotPassword/ResetPassword';
import HomePage_Members from './Pages/Users/Members/HomePage_Members';
import HomePage_CommonUsers from './Pages/Users/Common_Users/HomePage_CommonUsers';
import ProductPage from './Pages/Users/ProductPage/ProductPage';
import SubHeader from './Components/SubHeader/SubHeader';
import Top10_BanChayNhat from './Components/Top10_BanChayNhat/Top10_BanChayNhat';
import Top10_XemNhieuNhatNhat from './Components/Top10_XemNhieuNhat/Top10_XemNhieuNhat';
import ProductCard_2 from './Components/ProductCard/ProductCard_2';
import CartPage from './Pages/Users/CartPage/CartPage';
import ShoppingCartPage from './Pages/Users/ShoppingCartPage/ShoppingCartPage'
import OrderPage from './Pages/Users/OrderPage/OrderPage';
import PurchasedProducts from './Pages/Users/ReviewPage/PurchasedProducts';
import ProductDetail from './Pages/Users/ProductDetail/ProductDetail';
import Wishlist from './Pages/Users/Wishlist/Wishlist';

import SaleProduct from './Pages/Admin/ManageProduct/SaleProduct/SaleProduct';
import ManageCategory from './Pages/Admin/ManageCategory/ManageCategory';
import ManageProduct from './Pages/Admin/ManageProduct/ManageProduct';
import ManageOrder from './Pages/Admin/ManageOrder/ManageOrder';
import RequireAuth from './Utils/RequireAuth';

const ROLES = {
  'ADMIN': 'ADMIN',
  'USER': 'USER'
}



function App() {
  return (
    <>
      <BrowserRouter>

        {/* ******************** USER ******************** */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verifyOTP-forgot-password" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* <Route path="/homepage_members" element={<HomePage_Members />} />
          <Route path="/homepage_commonusers" element={<HomePage_CommonUsers />} /> */}
        </Routes>

        <Routes>
          <Route path="/" element={<HomePage_CommonUsers />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>

        <Routes>
          <Route path="/sub" element={<SubHeader />} />
          <Route path="/top10_banchaynhat" element={<Top10_BanChayNhat />} />
          <Route path="/top10_xemnhieunhat" element={<Top10_XemNhieuNhatNhat />} />
          <Route path="/product_cart2" element={<ProductCard_2 />} />
          <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/purchased-products" element={<PurchasedProducts />} />
        </Routes>

        <Routes>
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
        
        {/* ******************** ADMIN ******************** */}
        <Routes>
          <Route path="/admin" element={<RequireAuth allowedRoles={[ROLES.ADMIN,ROLES.USER]} />}>
            <Route index element={<ManageCategory />} /> {/* Default route for /admin */}
            <Route path="manager-category" element={<ManageCategory />} />
            <Route path="manager-product" element={<ManageProduct />} />
            <Route path="manager-sale-product" element={<SaleProduct />} />
            <Route path="manager-orders" element={<ManageOrder />} />
          </Route>
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
