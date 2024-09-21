import React, { useState } from 'react';
import './ResetPassword.css';
import AuthAPI from '../../../API/AuthAPI';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () =>{
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
        <div className="container">
            <div className="password-card">
                <h2 className="text-center">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="password-field"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="password-field"
                    />
                    <button type="submit" className="btn-submit">Reset Password</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}

export default ResetPassword;