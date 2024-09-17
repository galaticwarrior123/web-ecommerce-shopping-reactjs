import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthAPI from '../../../API/AuthAPI';

import '../Login/Login.css';

const Verify = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otp) {
            setError('Vui lòng nhập mã OTP.');
            return;
        }

        try {
            await AuthAPI.verified({ email, otp });
            setSuccess('Xác thực thành công!');
            setTimeout(() => {
                navigate('/login');  // Chuyển hướng tới trang đăng nhập sau khi xác thực thành công
            }, 2000);  // Thời gian hiển thị thông báo thành công
        } catch (err) {
            setError('Xác thực thất bại. Vui lòng kiểm tra mã OTP.');
        }
    };

    return (
        <div className="login-background">
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Row className="w-100 justify-content-center">
                    <Col md={6} lg={4}>
                        <Card className="p-4 shadow-lg">
                            <Card.Body>
                                <h3 className="text-center mb-4">Xác thực OTP </h3>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && <div className="alert alert-success">{success}</div>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicOtp">
                                        <Form.Label>Nhập OTP được gửi về email của ban</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập mã OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="w-100 mb-3">
                                        Xác thực
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Verify;
