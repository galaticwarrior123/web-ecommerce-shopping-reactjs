import './Login.css';
import AuthAPI from '../../../API/AuthAPI';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayoutLogReg from '../../../Layouts/DefaultLayoutLogReg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickLogin = async () => {
    if (!email || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const response = await AuthAPI.login({ email, password });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        toast.error("Đăng nhập thành công");
        navigate('/');
      }
      else {
        toast.error("Đăng nhập thất bại");
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại");
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <DefaultLayoutLogReg>
      <ToastContainer />

      <div className="card p-4 shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '10px' }}>
        <h2 className="text-center mb-4">Đăng nhập</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold fs-5">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold fs-5">Mật khẩu</label>
            <div className="input-group">
              <input type={showPassword ? "text" : "password"} className="form-control" id="password" placeholder="Nhập mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="btn btn-outline-first bg-white" onClick={handleShowPassword}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">
                Ghi nhớ tài khoản
              </label>
            </div>
            <a href="/forgot-password" className="text-decoration-none">Quên mật khẩu</a>
          </div>
          <button type="button" onClick={handleClickLogin} className="btn btn-warning w-100">Đăng nhập</button>
        </form>
        <div className="text-center mt-3">
          Bạn chưa có tài khoản? <a href="/register" className="text-decoration-none">Đăng ký</a>
        </div>
      </div>

    </DefaultLayoutLogReg>
  )
}

export default Login;



{/* <Row className="justify-content-center ">
        <Col md={6} lg={4}>
          <Card className="p-2 shadow-lg">
            <Card.Body>
              <h3 className="text-center mb-4">Đăng nhập</h3>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username hoặc email</Form.Label>
                  <Form.Control type="email" placeholder="Nhập email hoặc username" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control type="password" placeholder="Nhập mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="button" onClick={handleClickLogin} className="w-100 mb-3">
                  Đăng nhập
                </Button>

                <div className="d-flex justify-content-between">
                  <a href="/forgot-password" className="text-muted">Quên mật khẩu?</a>
                  <a href="/register" className="text-primary">Đăng ký</a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}