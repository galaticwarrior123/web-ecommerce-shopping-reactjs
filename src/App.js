import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Common/Login/Login';
import ForgotPassword from './Pages/Common/ForgotPassword/ForgotPassword'
import HomePage from './Pages/Users/HomePage';

import Register from './Pages/Common/Register/Register';
import Verify from './Pages/Common/Register/Verify';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
