import { React, useState } from "react";
import './HomePage_CommonUsers.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faAngleDown,  faCartShopping, faFileInvoiceDollar, faUser, faHeart } from '@fortawesome/free-solid-svg-icons';

import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';


const HomePage = () => {
    // const[showInfo, setShowInfo] = useState(false);

    // const toggleInfo = () =>{
    //     setShowInfo(!showInfo);
    // }

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
                    <button type="button" className="btn btn-outline-first bg-white" >
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
                                <span>Chào bạn! Hãy trở thành thành viên của FRUITE để nhận nhiều ưu đãi nhé</span>
                                <span>Tài khoản <FontAwesomeIcon icon={faAngleDown} /></span>
                        </div>                        
                    </Nav>

                    <div className="info-border-1 d-flex flex-column align-items-left justify-content-center position-fixed translate-middle-x mt-10 custom-margin-left ms-5">

                            <div className="manage-info-customer">
                                <button type="button" className="btn btn-primary w-100 mb-3 btn-login">
                                    Đăng nhập
                                </button>
                            </div>

                            <div className="text-center">
                                <span>Bạn chưa có tài khoản? </span>
                                <button type="button" className="btn btn-link p-0 btn-register">
                                    Đăng ký ngay
                                </button>
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

    );
};

export default HomePage;