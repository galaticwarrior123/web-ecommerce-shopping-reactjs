import React, { useState } from 'react';
import './ForgotPassword.css';
import { useNavigate, Link } from 'react-router-dom';
import AuthAPI from '../../../API/AuthAPI';
import DefaultLayoutLogReg from '../../../Layouts/DefaultLayoutLogReg';



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
        <DefaultLayoutLogReg>

            <div className="card p-4 shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '10px' }}>
                {/* LOGO */}
                <div className='d-flex justify-content-center mb-4'>
                    <div className='logo-container rounded-circle d-flex justify-content-center align-items-center shadow'>
                        <img src='./Images/logo-fruite.png' alt="Logo" className="img-fluid"></img>
                    </div>
                </div>

                <h2 className="text-center mb-4">Quên mật khẩu</h2>
                <h6 class="sub-title">
                    <span>Vui lòng nhập địa chỉ email của bạn để tìm kiếm tài khoản</span>
                </h6>
                <form onSubmit={handleSubmit} className='w-100'>
                    <div className="form-group mb-3">
                        <label htmlFor="email" className="form-label fw-bold fs-5">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email của bạn"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-warning w-100 btn-find-account">Tìm kiếm</button>


                    <div className="text-center mt-3 text-login">
                        Bạn đã nhớ mật khẩu?  <br/> Nhấp vào đây để <Link to="/login" className="text-decoration-none">Đăng nhập</Link>
                    </div>

                </form>
                {message && <div className="alert alert-info alert-custom">{message}</div>} {/* Thay alert margin bằng class */}
            </div>
        </DefaultLayoutLogReg>
    );

};

export default ForgotPassword;

