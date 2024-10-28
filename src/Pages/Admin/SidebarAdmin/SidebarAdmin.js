import { Link } from 'react-router-dom';
import './SidebarAdmin.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const SidebarAdmin = ( {onMenuClick, activeMenu }) => {
    const [isProductDropdownOpen, setProductDropdownOpen] = useState(false);

    const toggleProductDropdown = () => {
        setProductDropdownOpen(!isProductDropdownOpen);
    };

   
    return (
        <div className="sidebar">
            <div className="profile">
                <img src="/images/icon-avatar.png" alt="Avatar" />
                <h3>Admin</h3>
                <p>Chào mừng bạn trở lại</p>
            </div>
            <div className="menu">
                <Link to="/admin/manager-customer" className="menu-item" onClick={()=>onMenuClick('Quản lý khách hàng')}>Quản lý khách hàng</Link>
                <Link to="/admin/manager-category" className="menu-item" onClick={()=>onMenuClick('Quản lý danh mục')}>Quản lý danh mục</Link>
                <Link className="menu-item d-flex  justify-content-between align-items-center" onClick={toggleProductDropdown}>Quản lý sản phẩm <FontAwesomeIcon icon={isProductDropdownOpen ? faAngleDown : faAngleUp}  /></Link>
                {isProductDropdownOpen && <div className="sub-menu">
                    <Link to="/admin/manager-product" className="sub-menu-item" onClick={()=>onMenuClick('Danh sách sản phẩm')}>Danh sách sản phẩm</Link>
                    <Link to="/admin/manager-sale-product" className="sub-menu-item" onClick={()=>onMenuClick('Danh sách giảm giá')}>Danh sách giảm giá</Link>
                </div>}
                <Link to="/admin/manager-orders" className="menu-item" onClick={()=>onMenuClick('Quản lý đơn hàng')}>Quản lý đơn hàng</Link>
                <Link to="/admin/dashboard" className="menu-item" onClick={()=>onMenuClick('Báo cáo doanh thu')}>Báo cáo doanh thu</Link>

            </div>
        </div>
    )

}

export default SidebarAdmin;