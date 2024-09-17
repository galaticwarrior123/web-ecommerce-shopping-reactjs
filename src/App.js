
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Common/Login/login';
import ForgotPassword from './Pages/Common/ForgotPassword/ForgotPassword'

function App() {
  return (
    <BrowserRouter>
      {/* <Route path="/" component={Home} /> */}
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
