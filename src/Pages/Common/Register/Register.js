import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import '../Login/Login.css';
import AuthAPI from '../../../API/AuthAPI';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }

        try {
            await AuthAPI.signup({ email, password });
            await AuthAPI.sendOTP({ email });
            navigate('/verify', { state: { email } });
        } catch (err) {
            setError('Đăng ký thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className="login-background">
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Row className="w-100 justify-content-center">
                    <Col md={6} lg={4}>
                        <Card className="p-4 shadow-lg">
                            <Card.Body>
                                <h3 className="text-center mb-4">Đăng ký tài khoản</h3>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Nhập email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Mật khẩu</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Nhập mật khẩu"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                        <Form.Label>Xác nhận mật khẩu</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Xác nhận mật khẩu"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="w-100 mb-3">
                                        Đăng ký
                                    </Button>

                                    <div className="d-flex justify-content-between">
                                        <a href="/login" className="text-muted">Đã có tài khoản? Đăng nhập</a>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Register;
