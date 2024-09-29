import '../Login/Login.css';
import AuthAPI from '../../../API/AuthAPI';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DefaultLayoutLogReg from '../../../Layouts/DefaultLayoutLogReg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Register.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password || !username) {
            toast.error("Email, Tên và Mật khẩu không được để trống");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Mật khẩu không khớp");
            return;
        }

        try {
            await AuthAPI.signup({ email, password, username, gender, phone, address });
            await AuthAPI.sendOTP({ email });
            navigate('/verify', { state: { email } });
        } catch (err) {
            toast.error("Đăng ký thất bại: " + err.response.data.message);
        }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }
    return (
        <DefaultLayoutLogReg>
            <ToastContainer />
            <div className="card p-4 shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '10px' }}>
                {/* LOGO */}
                <div className='d-flex justify-content-center mb-4'>
                    <div className='logo-container rounded-circle d-flex justify-content-center align-items-center shadow'>
                        <img src='./Images/logo-fruite.png' alt="Logo" className="img-fluid"></img>
                    </div>
                </div>
                <h2 className="text-center mb-4">Đăng ký</h2>
                <form onSubmit={handleSubmit}>
                    <div className="register-scroll-container">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-bold fs-5">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label fw-bold fs-5">Tên</label>
                            <input type="text" className="form-control" id="username" placeholder="Nhập Tên của bạn" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label fw-bold fs-5">Giới tính</label>
                            <select
                                className="form-control"
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="MALE">Nam</option>
                                <option value="FEMALE">Nữ</option>
                                <option value="OTHER">Khác</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label fw-bold fs-5">Số điện thoại</label>
                            <input type="text" className="form-control" id="phone" placeholder="Nhập số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address" className="form-label fw-bold fs-5">Địa chỉ</label>
                            <input type="text" className="form-control" id="address" placeholder="Nhập địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-bold fs-5">Mật khẩu</label>
                            <div className="input-group">
                                <input type={showPassword ? "text" : "password"} className="form-control" id="password" placeholder="Nhập mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <button type="button" className="btn btn-outline-first bg-white btn-eye" onClick={handleShowPassword}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-bold fs-5">Nhập lại mật khẩu</label>
                            <div className="input-group">
                                <input type={showConfirmPassword ? "text" : "password"} className="form-control" id="password" placeholder="Nhập lại mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <button type="button" className="btn btn-outline-first bg-white btn-eye" onClick={handleShowConfirmPassword}>
                                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-warning w-100">Xác nhận</button>
                </form>
                <div className="text-center mt-3">
                    Bạn đã có tài khoản? <Link to="/login" className="text-decoration-none">Đăng nhập</Link>
                </div>
            </div>

        </DefaultLayoutLogReg>
    );
}

export default Register;
