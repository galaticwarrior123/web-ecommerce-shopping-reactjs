import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Common/Login/Login';
<<<<<<< HEAD
import HomePage from './Pages/Users/HomePage';
import ForgotPassword from './Pages/Common/ForgotPassword/ForgotPassword'
=======
import ForgotPassword from './Pages/Common/ForgotPassword/ForgotPassword'
import HomePage from './Pages/Users/HomePage';
>>>>>>> main

import Register from './Pages/Common/Register/Register';
import Verify from './Pages/Common/Register/Verify';
function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      {/* <Routes>
        <Route path="/login" element={<Login />} />
      </Routes> */}
=======
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
>>>>>>> main
    </BrowserRouter>
  )
}

export default App;
