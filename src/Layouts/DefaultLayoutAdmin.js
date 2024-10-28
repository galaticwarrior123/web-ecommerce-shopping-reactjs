import { useLocation } from 'react-router-dom';
import AdminHeader from '../Pages/Admin/AdminHeader/AdminHeader';
import SidebarAdmin from '../Pages/Admin/SidebarAdmin/SidebarAdmin';
import './DefaultLayoutAdmin.css';
import { useEffect, useState } from 'react';


const DefaultLayoutAdmin = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState('Quản lý khách hàng');
    const location = useLocation();
    const menuNames = {
        '/admin/manager-customer': 'Quản lý khách hàng',
        '/admin/manager-category': 'Quản lý danh mục',
        '/admin/manager-product': 'Danh sách sản phẩm',
        '/admin/manager-coupon': 'Danh sách giảm giá',
        '/admin/manager-orders': 'Quản lý đơn hàng',
        '/admin/dashboard': 'Báo cáo doanh thu',
        // Add more paths and their corresponding names as needed
    };

    useEffect(() => {
        const currentPath = location.pathname;
        setActiveMenu(menuNames[currentPath] || 'Quản lý khách hàng');
    }, [location.pathname]);

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <SidebarAdmin 
                onMenuClick={setActiveMenu}
            />

            <div className="flex-grow-1" style={{ zIndex: 0 }}>
                {/* Header */}
                <AdminHeader tabName={activeMenu} />

                {/* Main Content */}
                <div className="p-4 mt-4">
                    <div className='main-content'>
                        {children}
                    </div>

                </div>
            </div>
        </div>
    );
}


export default DefaultLayoutAdmin;