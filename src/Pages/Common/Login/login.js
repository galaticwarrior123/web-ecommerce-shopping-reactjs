import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import './Login.css';
import AuthAPI from '../../../API/AuthAPI';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        navigate('/');
      }
      else {
        toast.error("Đăng nhập thất bại");
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại");
    }
  }

  return (
    <div className="login-background">
      <ToastContainer />
      <Container className="d-flex justify-content-center align-items-center min-vh-100 ">
        <Row className="w-100 justify-content-center">
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
        </Row>
      </Container>
    </div>
  )
}

export default Login;