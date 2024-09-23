import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DefaultLayoutLogReg from '../../../Layouts/DefaultLayoutLogReg';

import AuthAPI from '../../../API/AuthAPI';

import '../Login/Login.css';

const Verify = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otp) {
            toast.error('Vui lòng nhập mã OTP.');
            return;
        }

        try {
            await AuthAPI.verified({ email, otp });
            toast.success('Xác thực thành công!');
            navigate('/login');
        } catch (err) {
            toast.error('Xác thực thất bại!');
        }
    };

    return (
        <DefaultLayoutLogReg>
            <ToastContainer />
            <div className="card p-4 shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '10px' }}>
                <h2 className="text-center mb-4">Xác thực tài khoản</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="otp" className="form-label fw-bold fs-5">Nhập OTP được gửi vào {email}</label>
                        <input type="text" className="form-control" id="otp" placeholder="Nhập OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-warning w-100">Xác thực</button>
                </form>
            </div>
        </DefaultLayoutLogReg>
    );
};

export default Verify;
