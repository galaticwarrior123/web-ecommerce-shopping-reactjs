import React, { useState } from 'react';
import AuthAPI from '../../../API/AuthAPI';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Hàm xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);  // Lấy giá trị từ form khi submit
        const username = form.get('username');
        const email = form.get('email');
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');

        // Kiểm tra mật khẩu có khớp không
        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }

        try {
            // Gọi API đăng ký
            await AuthAPI.register({
                username,
                email,
                password
            });

            await AuthAPI.sendOTP({
                email
            });
            navigate('/verify');
        } catch (err) {
            setError('Lỗi: ' + err.response.data.message);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">Đăng ký tài khoản</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Tên đăng nhập</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                name="confirmPassword"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Đăng ký</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
