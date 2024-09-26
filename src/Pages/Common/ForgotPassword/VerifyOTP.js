import React, { useState } from "react";
import './VerifyOTP.css';
import { useNavigate, Link } from 'react-router-dom';
import DefaultLayoutLogReg from '../../../Layouts/DefaultLayoutLogReg';
import AuthAPI from '../../../API/AuthAPI';




const OTPInput = () => {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return; // Chỉ cho phép nhập số

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Tự động chuyển qua ô input tiếp theo khi nhập xong
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const otpValue = otp.join(''); // Combine OTP characters into a string
        const token = localStorage.getItem("token"); // Get token from localStorage

        if (!token) {
            setMessage(
                <>
                    Token is missing.<br />
                    Please try the process again.
                </>
            );
            return;
        }

        if (otpValue.length === 6) {
            const data = { otp: otpValue, token }; // Create data to send

            try {
                // Call the verify OTP API
                const response = await AuthAPI.verifyOTPForgotPassword(data);
                const body = response.data;

                // Handle success response
                setMessage(body.message);

                setTimeout(() => {
                    navigate("/reset-password");
                }, 2000);
            } catch (error) {
                const body = error.response?.data;
                setMessage(body.error || 'Invalid OTP. Please try again.');
            }
        } else {
            setMessage('Please enter a valid 6-digit OTP.');
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const otpValue = otp.join(''); // Kết hợp các ký tự OTP thành một chuỗi
    //     const token = localStorage.getItem("jwtToken"); // Lấy token từ localStorage

    //     if (!token) {
    //         setMessage(
    //             <>
    //                 Token is missing.<br />
    //                 Please try the process again.
    //             </>
    //         );//kiểm tra xem có lấy được token chưa
    //         return;
    //     }

    //     if (otpValue.length === 6) {
    //         const data = { otp: otpValue, token }; // Tạo dữ liệu gửi

    //         fetch('http://localhost:3000/api/v1/user/verify-otp_forgotpassword', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(data), // Gửi OTP và token
    //         })
    //             .then(response => response.json().then(data => ({ status: response.status, body: data })))
    //             .then(({ status, body }) => {
    //                 if (status === 200) {
    //                     setMessage('OTP verified successfully!');

    //                     setTimeout(() => {
    //                         navigate("/reset-password");
    //                     }, 2000);

    //                     //localStorage.removeItem('jwtToken'); // Xóa token khỏi localStorage sau khi xác minh thành công
    //                 } else {
    //                     setMessage(body.error || 'Invalid OTP. Please try again.');
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error('Error verifying OTP:', error);
    //                 setMessage('Error verifying OTP. Please try again later.');
    //             });
    //     } else {
    //         setMessage('Please enter a valid 6-digit OTP.');
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

                <h2 className="text-center mb-4">Xác thực người dùng</h2>
                <h6 class="sub-title">
                    <span>Một mã OTP đã được gửi đến email của bạn.<br></br>
                        Vui lòng không chia sẻ cho người khác.<br></br>
                        Hãy nhập mã OTP để xác thực.</span>
                </h6>
                <label htmlFor="otp" className="form-label fw-bold fs-5 enter-otp ">Nhập OTP</label>
                <form onSubmit={handleSubmit}>
                    <div className="otp-inputs">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                className="otp-field form-control"
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onFocus={(e) => e.target.select()} // Tự động chọn nội dung khi focus
                            />
                        ))}
                    </div>
                    <button type="submit" className="btn btn-warning w-100 btn-find-account">Xác thực</button>
                </form>

                {message && <p className="message">{message}</p>}
            </div>
        </DefaultLayoutLogReg>
    );
};

export default OTPInput;
