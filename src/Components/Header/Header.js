import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faAngleDown, faCartShopping, faUser, faFileInvoiceDollar, faHeart,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
const Header = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState(null);

    useEffect (() =>{
        const storedUser  = localStorage.getItem('user');
        if(storedUser){
            const user = JSON.parse(storedUser);
            setUserName(user.username);
        }
    }, []);

    const handleLogin = () => {
        navigate('/login');
    }

    const handleRegister = () => {
        navigate('/register');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    }
    
    const token = localStorage.getItem('token');

    return (
        <div className="header">
            <Navbar>
                {/* Logo */}
                <Navbar.Brand href="#" className="d-flex align-items-center justify-content-center flex-column">
                    <img
                        src='./Images/logo-fruite.png'
                        alt="Logo"
                    />
                    <span>CLEAN AND FRESH FRUIT</span>
                </Navbar.Brand>

                {/* Search */}
                <div className="input-group">
                    <input type="text" className="form-control search-text" id="password" placeholder="Tìm kiếm..." />
                    <button type="button" className="btn btn-outline-first bg-white button-click-search" >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>

                {/* User and Cart icons */}
                <Nav className="ml-auto d-flex align-items-center position-relative " >
                    {token ? (
                        <>
                            <Nav className="d-flex">
                                <div className="user-circle d-flex flex-column align-items-left justify-content-center">
                                    <img
                                        src='./Images/icon-avatar.png'
                                        alt="Avatar"
                                    // className="user-circle"
                                    />
                                </div>
                                <div className="user-info d-flex flex-column align-items-left justify-content-center">
                                    <span>Chào mừng {userName}, hãy cùng tận hưởng hương vị tươi mới mỗi ngày!</span>
                                    <span>Tài khoản <FontAwesomeIcon icon={faAngleDown} /></span>
                                </div>
                            </Nav>

                            <div className="info-border d-flex flex-column align-items-left justify-content-center position-fixed translate-middle-x mt-10 custom-margin-left ms-5 h-auto z-2">

                                <div className="manage-info-customer">
                                    <div className="my-account">
                                        <span style={{ color: '#3a31c9' }}>Tài khoản <FontAwesomeIcon icon={faAngleDown} /></span>
                                    </div>
                                    <div className="manage-orders">
                                        <span><FontAwesomeIcon icon={faFileInvoiceDollar} /> Quản lý đơn hàng</span>
                                    </div>
                                    <div className="favourite-products">
                                        <span><FontAwesomeIcon icon={faHeart} /> Sản phẩm yêu thích</span>
                                    </div>
                                    <div className="logout" onClick={handleLogout}>
                                        <span><FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout}/> Đăng xuất</span>
                                    </div>
                                </div>
                            </div>

                        </>


                    ) : (

                        <>
                            <Nav className="d-flex">
                                <div className="user-circle d-flex flex-column align-items-left justify-content-center">
                                    <img
                                        src='./Images/icon-avatar.png'
                                        alt="Avatar"
                                    // className="user-circle"
                                    />
                                </div>
                                <div className="user-info d-flex flex-column align-items-left justify-content-center">
                                    <span>Chào bạn! <br></br>Hãy trở thành thành viên của FRUITE để nhận nhiều ưu đãi nhé</span>
                                    <span style={{ color: '#3a31c9' }}>Tài khoản <FontAwesomeIcon icon={faAngleDown} /></span>

                                </div>
                            </Nav>

                            <div className="info-border-1 d-flex flex-column align-items-left justify-content-center position-fixed translate-middle-x mt-10 custom-margin-left ms-5 z-2">

                                <div className="manage-info-customer">
                                    <button type="button" className="btn btn-primary w-100 mb-3 btn-login" onClick={handleLogin}>
                                        Đăng nhập
                                    </button>
                                </div>

                                <div className="text-center">
                                    <span>Bạn chưa có tài khoản? </span>
                                    <button type="button" className="btn btn-link p-0 btn-register" onClick={handleRegister}>
                                        Đăng ký ngay
                                    </button>
                                </div>

                            </div>
                        </>
                    )}
                    <Nav.Link href="#" className="cart-info">
                        <div className="cart-circle">
                            <FontAwesomeIcon icon={faCartShopping} />
                        </div>
                        <div className="cart-quantity">
                            <span>0</span>
                        </div>

                    </Nav.Link>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Header;