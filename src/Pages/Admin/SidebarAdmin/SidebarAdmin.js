import { Link } from 'react-router-dom';
import './SidebarAdmin.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const SidebarAdmin = ({ onMenuClick, activeMenu }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [isProductDropdownOpen, setProductDropdownOpen] = useState(false);

    const toggleProductDropdown = () => {
        setProductDropdownOpen(!isProductDropdownOpen);
    };


    return (
        <div className="sidebar">
            <div className="profile">
                <img src={user.avatar ? user.avatar : 'https://www.w3schools.com/howto/img_avatar.png'} alt="avatar" />
                <h3>{user.username}</h3>
                <p>Chào mừng bạn trở lại</p>
            </div>
            <div className="menu">
                <Link to="/admin/manager-customer" className={`menu-item ${activeMenu === 'Quản lý khách hàng' ? 'activeItem' : ''}`} onClick={() => onMenuClick('Quản lý khách hàng')}>Quản lý khách hàng</Link>
                <Link to="/admin/manager-category" className={`menu-item ${activeMenu === 'Quản lý danh mục' ? 'activeItem' : ''}`} onClick={() => onMenuClick('Quản lý danh mục')}>Quản lý danh mục</Link>
                <Link className="menu-item d-flex  justify-content-between align-items-center" onClick={toggleProductDropdown}>Quản lý sản phẩm <FontAwesomeIcon icon={isProductDropdownOpen ? faAngleDown : faAngleUp} /></Link>
                {isProductDropdownOpen && <div className="sub-menu">
                    <Link to="/admin/manager-product" className={`sub-menu-item ${activeMenu === 'Danh sách sản phẩm' ? 'activeItem' : ''}`} onClick={() => onMenuClick('Danh sách sản phẩm')}>Danh sách sản phẩm</Link>
                    <Link to="/admin/manager-sale-product" className={`sub-menu-item ${activeMenu === 'Danh sách giảm giá' ? 'activeItem' : ''}`} onClick={() => onMenuClick('Danh sách giảm giá')}>Danh sách giảm giá</Link>
                </div>}
                <Link to="/admin/manager-orders" className={`menu-item ${activeMenu === 'Quản lý đơn hàng' ? 'activeItem' : ''}`} onClick={() => onMenuClick('Quản lý đơn hàng')}>Quản lý đơn hàng</Link>
                <Link to="/admin/report" className={`menu-item ${activeMenu === 'Báo cáo doanh thu' ? 'activeItem' : ''}`} onClick={() => onMenuClick('Báo cáo doanh thu')}>Báo cáo doanh thu</Link>

            </div>
        </div>
    )

}

export default SidebarAdmin;