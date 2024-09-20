import React, { useState } from "react";
import './VerifyOTP.css';

const OTPInput = () => {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [message, setMessage] = useState('');

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return; // Chỉ cho phép nhập số

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Tự động chuyển qua ô input tiếp theo khi nhập xong
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const otpValue = otp.join(''); // Kết hợp các ký tự OTP thành một chuỗi
        const token = localStorage.getItem("jwtToken"); // Lấy token từ localStorage

        if (!token) {
            setMessage("Token is missing. Please try the process again.");//kiểm tra xem có lấy được token chưa
            return;
        }

        if (otpValue.length === 6) {
            const data = { otp: otpValue, token }; // Tạo dữ liệu gửi

            fetch('http://localhost:3000/api/v1/user/verify-otp_forgotpassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data), // Gửi OTP và token
            })
                .then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(({ status, body }) => {
                    if (status === 200) {
                        setMessage('OTP verified successfully!');
                        localStorage.removeItem('jwtToken'); // Xóa token khỏi localStorage sau khi xác minh thành công
                    } else {
                        setMessage(body.error || 'Invalid OTP. Please try again.');
                    }
                })
                .catch((error) => {
                    console.error('Error verifying OTP:', error);
                    setMessage('Error verifying OTP. Please try again later.');
                });
        } else {
            setMessage('Please enter a valid 6-digit OTP.');
        }
    };

    return (
        <div className="container">
            <div className="otp-card">
                <h2 className="text-center">Enter OTP</h2>
                <p className="text-center">OTP was sent to your email. Please verify!</p>

                <form onSubmit={handleSubmit}>
                    <div className="otp-inputs">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                className="otp-field"
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onFocus={(e) => e.target.select()} // Tự động chọn nội dung khi focus
                            />
                        ))}
                    </div>
                    <button type="submit" className="btn-submit">Verify OTP</button>
                </form>

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default OTPInput;
