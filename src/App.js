import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Common/Login/Login';
import HomePage from './Pages/Users/HomePage';
import ForgotPassword from './Pages/Common/ForgotPassword/ForgotPassword'

function App() {
  return (
    <BrowserRouter>
      {/* <Routes>
        <Route path="/login" element={<Login />} />
      </Routes> */}
    </BrowserRouter>
  )
}

export default App;
