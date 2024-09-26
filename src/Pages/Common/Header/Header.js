import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faAngleDown, faCartShopping, faUser, faFileInvoiceDollar, faHeart } from '@fortawesome/free-solid-svg-icons';

import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
const Header = () => {
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
                    <Nav className="d-flex">
                        <div className="user-circle d-flex flex-column align-items-left justify-content-center">
                            <img
                                src='./Images/icon-avatar.png'
                                alt="Avatar"
                            // className="user-circle"
                            />
                        </div>
                        <div className="user-info d-flex flex-column align-items-left justify-content-center">
                            <span>Chào mừng Ngân, hãy cùng tận hưởng hương vị tươi mới mỗi ngày!</span>
                            <span>Tài khoản <FontAwesomeIcon icon={faAngleDown} /></span>
                        </div>
                    </Nav>

                    <div className="info-border d-flex flex-column align-items-left justify-content-center position-fixed translate-middle-x mt-10 custom-margin-left ms-5">

                        <div className="manage-info-customer">
                            <div className="my-account">
                                <span><FontAwesomeIcon icon={faUser} /> Tài khoản của tôi</span>
                            </div>
                            <div className="manage-orders">
                                <span><FontAwesomeIcon icon={faFileInvoiceDollar} /> Quản lý đơn hàng</span>
                            </div>
                            <div className="favourite-products">
                                <span><FontAwesomeIcon icon={faHeart} /> Sản phẩm yêu thích</span>
                            </div>
                        </div>
                    </div>

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