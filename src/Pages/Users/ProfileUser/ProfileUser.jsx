import DefaultLayoutUserHomePage from "../../../Layouts/DefaultLayoutUserHomePage";
import { useState } from "react";
import "./ProfileUser.css";
import AuthAPI from "../../../API/AuthAPI";
const ProfileUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));

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

    return (
        <DefaultLayoutUserHomePage>
            <h1 className="text-center mt-4 text-profile-header">Thông tin cá nhân</h1>
            <div className="container-profile mt-4">
                <div className="row">
                    {/* Cột dành cho form cập nhật thông tin */}
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

                            <div className="form-group mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
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
                                <label htmlFor="phone" className="form-label">Phone</label>
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
                                <label htmlFor="address" className="form-label">Address</label>
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
                                <label className="form-label">Gender</label>
                                <div>
                                    <input 
                                        type="radio" 
                                        id="male" 
                                        name="gender" 
                                        value="MALE" 
                                        checked={formData.gender === "MALE"} 
                                        onChange={handleChange} 
                                    />
                                    <label htmlFor="MALE" className="ms-2 me-3">Male</label>

                                    <input 
                                        type="radio" 
                                        id="female" 
                                        name="gender" 
                                        value="FEMALE" 
                                        checked={formData.gender === "FEMALE"} 
                                        onChange={handleChange} 
                                    />
                                    <label htmlFor="FEMALE" className="ms-2 me-3">Female</label>

                                    <input 
                                        type="radio" 
                                        id="other" 
                                        name="gender" 
                                        value="Other" 
                                        checked={formData.gender === "Other"} 
                                        onChange={handleChange} 
                                    />
                                    <label htmlFor="other" className="ms-2">Other</label>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    </div>

                    {/* Cột dành cho avatar */}
                    <div className="col-md-6">
                        <div className="avatar-container">
                            <img src={ image ? image : avatar ? avatar : './Images/icon-avatar.png' } alt="Avatar" className="avatar" />
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
        </DefaultLayoutUserHomePage>
    );
};

export default ProfileUser;
