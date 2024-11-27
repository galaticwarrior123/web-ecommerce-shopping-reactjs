import DefaultLayoutUserHomePage from "../../../Layouts/DefaultLayoutUserHomePage";
import { useState } from "react";
import "./ProfileUser.css";
import AuthAPI from "../../../API/AuthAPI";

const ProfileUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [formData, setFormData] = useState({
        username: user.username || '',
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        gender: user.gender || '',
    });
    const avatar = user.avatar || '';
    const [image, setImage] = useState(null);
    const [currentTab, setCurrentTab] = useState("profile"); // Tab hiện tại

    // Xử lý khi có thay đổi trong các ô input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Xử lý khi chọn ảnh
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    // Trigger file input click
    const handleAddPhotoClick = () => {
        document.getElementById("imageInput").click();
    };

    // Xử lý khi submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('username', formData.username);
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('address', formData.address);
        data.append('gender', formData.gender);
        if (image) {
            data.append('avatar', document.getElementById("imageInput").files[0]);
        }

        AuthAPI.updateProfile(user._id, data)
            .then(response => {
                alert('Cập nhật thông tin thành công.');
                localStorage.setItem('user', JSON.stringify(response.data));
                window.location.reload();
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                alert('Có lỗi xảy ra, vui lòng thử lại sau.');
            });
    };

    // Xử lý submit đổi mật khẩu
    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Mật khẩu xác nhận không khớp.');
            return;
        }

        AuthAPI.changePassword({ newPassword: newPassword, confirmPassword: confirmPassword , token: token})
            .then(response => {
                alert('Đổi mật khẩu thành công.');
                setNewPassword('');
                setConfirmPassword('');
            })
            .catch(error => {
                console.error('Error changing password:', error);
                alert('Có lỗi xảy ra, vui lòng thử lại sau.');
            });
    };

    return (
        <DefaultLayoutUserHomePage>
            <h1 className="text-center mt-4 text-profile-header">Thông tin cá nhân</h1>
            <div className="container-profile mt-4">
                {/* Tabs */}
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${currentTab === "profile" ? "active" : ""}`}
                            onClick={() => setCurrentTab("profile")}
                        >
                            Cập nhật thông tin
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${currentTab === "password" ? "active" : ""}`}
                            onClick={() => setCurrentTab("password")}
                        >
                            Đổi mật khẩu
                        </button>
                    </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content mt-4">
                    {currentTab === "profile" && (
                        <div className="tab-pane active">
                            <div className="row">
                                <div className="col-md-6">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group mb-3">
                                            <label htmlFor="username" className="form-label">Username</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                placeholder="Enter your username"
                                            />
                                        </div>
                                        {/* Các trường thông tin khác */}
                                        <div className="form-group mb-3">
                                            <label htmlFor="name" className="form-label">Họ và tên</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Enter your name"
                                            />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                            />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="phone" className="form-label">Số điện thoại</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Enter your phone number"
                                            />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="address" className="form-label">Địa chỉ</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="address"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                placeholder="Enter your address"
                                            />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label className="form-label">Giới tính</label>
                                            <div>
                                                <input
                                                    type="radio"
                                                    id="male"
                                                    name="gender"
                                                    value="MALE"
                                                    checked={formData.gender === "MALE"}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="MALE" className="ms-2 me-3">Nam</label>

                                                <input
                                                    type="radio"
                                                    id="female"
                                                    name="gender"
                                                    value="FEMALE"
                                                    checked={formData.gender === "FEMALE"}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="FEMALE" className="ms-2 me-3">Nữ</label>

                                                {/* <input 
                                        type="radio" 
                                        id="other" 
                                        name="gender" 
                                        value="Other" 
                                        checked={formData.gender === "Other"} 
                                        onChange={handleChange} 
                                    />
                                    <label htmlFor="other" className="ms-2">Khác</label> */}
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Cập nhật</button>
                                    </form>
                                </div>
                                <div className="col-md-6">
                                    <div className="avatar-container">
                                        <img src={image ? image : avatar ? avatar : './Images/icon-avatar.png'} alt="Avatar" className="avatar" />
                                        <input
                                            type="file"
                                            id="imageInput"
                                            style={{ display: 'none' }}
                                            onChange={handleImageChange}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-secondary add-photo-button"
                                            onClick={handleAddPhotoClick}
                                        >
                                            Add Photo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentTab === "password" && (
                        <div className="tab-pane active">
                            <form onSubmit={handlePasswordChange}>
                                {/* <div className="form-group mb-3">
                                    <label htmlFor="currentPassword" className="form-label">Mật khẩu hiện tại</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="currentPassword"
                                        placeholder="Enter current password"
                                    />
                                </div> */}
                                <div className="form-group mb-3">
                                    <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Đổi mật khẩu</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </DefaultLayoutUserHomePage>
    );
};

export default ProfileUser;
