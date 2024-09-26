import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faAngleDown,  faCartShopping } from '@fortawesome/free-solid-svg-icons';

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
                    <input type="text" className="form-control search-text" id="password" placeholder="Tìm kiếm" />
                    <button type="button" className="btn btn-outline-first bg-white" >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>

                {/* User and Cart icons */}
                <Nav className="ml-auto d-flex align-items-center common-border" >
                    <Nav.Link href="#" className="d-flex">
                        <img
                            src='./Images/icon-avatar.png'
                            alt="Avatar"
                            className="user-circle"
                        />
                        <div className="user-info d-flex flex-column align-items-left justify-content-center">
                            <span>Chào Ngân</span>
                            <span>Tài khoản <FontAwesomeIcon icon={faAngleDown} /></span>
                        </div>
                        
                        <div className="info-border"></div>
                        
                    </Nav.Link>

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