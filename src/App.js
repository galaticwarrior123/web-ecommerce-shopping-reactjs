import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import ForgotPassword from './Pages/Common/ForgotPassword/ForgotPassword'

function App() {
  return (
    <BrowserRouter>
      {/* <Route path="/" component={Home} /> */}
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
    </BrowserRouter>
  )
}

export default App;
