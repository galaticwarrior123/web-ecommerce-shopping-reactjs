import './SubHeader.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const SubHeader = () => {

    return (
        <div className='d-flex align-items-center position-relative'>
            <div className='col-md-9 d-flex justify-content-center align-items-center content_right'>
                <nav>
                    <ul className='nav nav-subheader'>
                        <li className='nav-item'>
                            <Link to='/' className='nav-link' href='#home'>HOME</Link>
                        </li>


                        
                        <li className='nav-item dropdown'>
                            <Link to='/product' className='nav-link'>PRODUCTS <FontAwesomeIcon icon={faAngleDown} className="icon-spacing" /></Link>
                            <div className="dropdown-menu">
                                <ul>
                                    <li><a href='#grape'>Nho</a></li>
                                    <li><a href='#apple'>Táo</a></li>
                                    <li><a href='#orange'>Cam</a></li>
                                    <li><a href='#juice'>Nước ép</a></li>
                                </ul>
                            </div>
                        </li>

                        <li className='nav-item'>
                            <a className='nav-link' href='#about-us'>ABOUT US</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='#contact-us'>CONTACT US</a>
                        </li>
                        <li className='nav-item dropdown'>
                            <a className='nav-link' href='#blog'>BLOG <FontAwesomeIcon icon={faAngleDown} className="icon-spacing" /></a>
                            <div className="dropdown-menu">
                                <ul>
                                    <li><a href='#blog1'>Những Loại Trái Cây Giúp Tăng Cường Miễn Dịch</a></li>
                                    <li><a href='#blog2'>Cách Kết Hợp Trái Cây Trong Các Món Salad Độc Đáo</a></li>
                                    <li><a href='#blog3'>Những Loại Trái Cây Giúp Tăng Cường Miễn Dịch</a></li>
                                    <li><a href='#blog4'>Những Loại Trái Cây Hỗ Trợ Giảm Cân Hiệu Quả</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default SubHeader;