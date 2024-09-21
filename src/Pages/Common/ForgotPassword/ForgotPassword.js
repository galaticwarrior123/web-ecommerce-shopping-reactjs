import React, { useState } from 'react';
import './ForgotPassword.css';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../../../API/AuthAPI';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Verifying your email...');

        if (email) {
            try {
                // Call the forgot password API
                const response = await AuthAPI.forgotPassword({ email });
                const body = response.data;

                // Handle success response
                //localStorage.setItem("jwtToken", body.token);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem("email", email); 

                setMessage(body.message); // Display success message


                setTimeout(() => {
                    navigate("/verifyOTP-forgot-password");
                }, 2000);

            } catch (error) {
                const body = error.response?.data;
                setMessage(body.error || 'Error sending verification email.'); // Display error message
            }
        } else {
            setMessage('Please enter your email address.');
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setMessage('Verifying your email...');

    //     // Giả lập gửi email để xác nhận
    //     if (email) {
    //         // setMessage('A verification link has been sent to your email.');
    //         // Ở đây bạn có thể gọi API để gửi email tới người dùng
    //         fetch('http://localhost:3000/api/v1/user/forgot-password', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ email }),
    //         })
    //             .then(response => response.json().then(data => ({ status: response.status, body: data }))) // Đảm bảo lấy cả mã trạng thái
    //             .then(({ status, body }) => {
    //                 if (status === 200) {
                        
    //                     localStorage.setItem("jwtToken", body.token); // Lưu token nhận từ API    
    //                     localStorage.setItem("email", email); // Lưu email vào localStorage
                        
    //                     setTimeout(() => {
    //                         setMessage('');
    //                     }, 1000);
                        
    //                     setMessage(body.message); // Hiển thị thông báo từ API khi thành công
                       
    //                     setTimeout(() => {
    //                         navigate("/verifyOTP-forgot-password");
    //                     }, 2000);

    //                 } else {
    //                     setTimeout(() => {
    //                         setMessage('');
    //                     }, 5000);
        
    //                     setMessage(body.error || 'Error sending verification email.'); // Hiển thị thông báo lỗi
    //                 }
    //             })
    //             .catch(error => {
    //                 setTimeout(() => {
    //                     setMessage('');
    //                 }, 1000);
    
    //                 setMessage('Error sending verification email.');
    //             });
    //     } else {
    //         setTimeout(() => {
    //             setMessage('');
    //         }, 1000);

    //         setMessage('Please enter your email address.');
    //     }
    // };

    return (
        <div className="container" >
            <div className="border-forgot_password">
                <h2 className="text-center mb-4">Forgot Password</h2>
                <h6 class="sub-title">
                    <span>We will send you an OTP to reset password</span>
                </h6>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Verify</button>
                </form>
                {message && <div className="alert alert-info alert-custom">{message}</div>} {/* Thay alert margin bằng class */}
            </div>
        </div>
    );

};

export default ForgotPassword;

