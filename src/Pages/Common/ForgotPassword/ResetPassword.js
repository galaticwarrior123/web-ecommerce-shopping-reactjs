import React, { useState } from 'react';
import './ResetPassword.css';
import AuthAPI from '../../../API/AuthAPI';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../Users/images/logo-fruite.png';
import DefaultLayoutLogReg from '../../../Layouts/DefaultLayoutLogReg';



const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token"); // lấy token từ localStorage

        if (!token) {
            setMessage("Token is missing. Please try the process again.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage("New password and confirm password do not match.");
            return;
        }

        // Tạo dữ liệu cho body mà không có token
        const data = { newPassword, confirmPassword };

        // Gọi tới api của reset password với token trong headers
        try {
            const response = await AuthAPI.resetPassword(data, { headers: { 'x-token': token } });
            const body = response.data;

            setMessage(body.message); // Hiển thị thông báo thành công
            localStorage.removeItem('token');

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            console.log({ newPassword, confirmPassword, token });

            const body = error.response?.data;
            console.log(body);
            setMessage(body.error || 'Error resetting password. Please try again later.'); // Hiển thị thông báo lỗi
        }

        // fetch('http://localhost:3000/api/v1/user/change-password', {
        //     method: 'POST',
        //     headers: { 
        //         'Content-Type': 'application/json',
        //         'x-token': token // Gửi token trong headers
        //     },
        //     body: JSON.stringify(data),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.message) {
        //         setMessage(data.message);
        //         localStorage.removeItem('jwtToken'); // Xóa token sau khi thay đổi mật khẩu thành công
        //     } else {
        //         setMessage(data.error || 'Error changing password. Please try again.');
        //     }
        // })
        // .catch(error => {
        //     console.error('Error reseting password:', error);
        //     setMessage('Error reseting password. Please try again later.');
        // });
    };

    return (
        <DefaultLayoutLogReg>

            <div className="card p-4 shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '10px' }}>
                {/* LOGO */}
                <div className='d-flex justify-content-center mb-4'>
                    <div className='logo-container rounded-circle d-flex justify-content-center align-items-center shadow'>
                        <img src={logo} alt="Logo" className="img-fluid"></img>
                    </div>
                </div>

                <h2 className="text-center mb-4">Đặt lại mật khẩu</h2>
                <h6 class="sub-title">
                    <span>Tài khoản đã được tìm thấy và xác thực thành công.<br></br>
                        Vui lòng tạo mới mật khẩu.<br></br></span>
                </h6>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className="form-label fw-bold fs-5">Mật khẩu mới</label>
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="password-field form-control"
                    />
                    <label htmlFor="email" className="form-label fw-bold fs-5">Nhập lại mật khẩu</label>
                    <input
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="password-field form-control"
                    />
                    <button type="submit" className="btn btn-warning w-100">Reset Password</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </DefaultLayoutLogReg>
    );
}

export default ResetPassword;