import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faMagnifyingGlass, faAngleDown, faCartShopping, faMoneyBill, faFileInvoiceDollar, faHeart, faRightFromBracket, faBell, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useEffect, useState, useRef, useContext } from 'react';
import ShoppingCartAPI from '../../API/ShoppingCartAPI';
import ProductAPI from '../../API/ProductAPI';
import { useCart } from '../../context/CartContext';
import NotificationAPI from '../../API/NotificationAPI';
import { SocketContext } from '../../context/SocketContext';

const Header = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState(null);
    const [userId, setUserId] = useState(null);
    //const [shoppingCartQuantity, setShoppingCartQuantity] = useState(0);
    const [user, setUser] = useState(null);
    const [listProduct, setListProduct] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);
    const resultRef = useRef(null);
    const [listNotifications, setListNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    const { shoppingCartQuantity } = useCart();
    const { notifications } = useContext(SocketContext);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        fetchProduct();
        if (currentUser) {
            fetchNotifications();
        }
    }, []);

    useEffect(() => {
        if (notifications.length) {
            setListNotifications((prev) => {
                const merged = [...notifications, ...prev];
                // Loại bỏ thông báo trùng (theo _id)
                return merged.filter(
                    (notification, index, self) =>
                        index === self.findIndex((n) => n._id === notification._id)
                );
            });
        }
    }, [notifications]);

    const fetchProduct = async () => {
        try {
            const response = await ProductAPI.getAllProducts();
            if (response.data?.DT?.products) {
                setListProduct(response.data.DT.products);
                setFilteredProducts(response.data.DT.products); // Khởi tạo danh sách sản phẩm hiển thị
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchNotifications = async () => {
        try {
            const response = await NotificationAPI.getNotifications();
            if (response.data?.DT) {
                setListNotifications(response.data.DT);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    // Tính số lượng thông báo chưa đọc
    const unreadCount = listNotifications.filter((n) => !n.isRead).length;

    const handleToggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const handleMarkAsRead = async (notificationId, link) => {
        try {
            await NotificationAPI.markAsRead(notificationId); // Gửi API đánh dấu đã đọc
            // Cập nhật trạng thái đã đọc trong danh sách thông báo
            setListNotifications((prev) =>
                prev.map((n) =>
                    n._id === notificationId ? { ...n, isRead: true } : n
                )
            );

            navigate(`${link}`); // Chuyển hướng đến trang thông báo

        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserName(user.username);
            setUserId(user._id);
            //fetchShoppingCartQuantity(user._id);
            setUser(user);
        }
    }, []);

    const handleSearch = (event) => {
        const keyword = event.target.value;
        setSearch(keyword);

        const filtered = listProduct.filter(product =>
            product.productName.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleClickOutside = (event) => {
        // Nếu click không phải trong ô tìm kiếm hoặc khung kết quả thì ẩn khung kết quả
        if (searchRef.current && !searchRef.current.contains(event.target) &&
            resultRef.current && !resultRef.current.contains(event.target)) {
            setShowResults(false);
        }
    };

    useEffect(() => {
        // Lắng nghe sự kiện khi click bên ngoài
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleFocus = () => setShowResults(true);

    const handleLogin = () => navigate('/login');
    const handleRegister = () => navigate('/register');
    const handleLogout = () => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
        if (isConfirmed) {
            navigate('/');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('recentlyViewed');
            window.location.reload();
        }
    };

    const handleShoppingCartClick = () => {
        if (userId) navigate(`/shopping-cart`);
        else navigate('/login');
    };

    const handleWishlistClick = () => {
        if (userId) navigate(`/wishlist`);
        else navigate('/login');
    };

    // const fetchShoppingCartQuantity = async (userId) => {
    //     try {
    //         const response = await ShoppingCartAPI.GetShoppingCart();
    //         if (response.data.success) {
    //             const totalQuantity = response.data.shoppingcart.products.reduce((acc, item) => acc + item.quantity, 0);
    //             setShoppingCartQuantity(totalQuantity);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching shopping cart:', error);
    //     }
    // };

    const token = localStorage.getItem('token');

    return (
        <div className="header">
            <Navbar>
                {/* Logo */}
                <Navbar.Brand href="#" className="d-flex align-items-center justify-content-center flex-column" onClick={() => navigate('/')}>
                    <img src='/Images/logo-fruite.png' alt="Logo" />
                    <span>CLEAN AND FRESH FRUIT</span>
                </Navbar.Brand>

                {/* Search */}
                <div className="input-group position-relative" ref={searchRef}>
                    <input
                        type="text"
                        className="form-control search-text"
                        placeholder="Tìm kiếm..."
                        value={search}
                        onChange={handleSearch}
                        onFocus={handleFocus}
                    />
                    <button type="button" className="btn btn-outline-first bg-white button-click-search">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    {showResults && (
                        <div
                            className="p-3 mt-5 bg-light rounded shadow-sm position-absolute w-100 search-result"
                            style={{ height: 200, overflowY: 'auto' }}
                            ref={resultRef} // Thêm ref để kiểm tra vị trí click
                        >
                            {filteredProducts.map((product) => (
                                <div
                                    key={product._id}
                                    className="d-flex align-items-center border-bottom border-2 p-2"
                                    onClick={() => navigate(`/product/${product._id}`)}
                                >
                                    <img
                                        src={product.images[0] || "https://via.placeholder.com/150"}
                                        alt="product"
                                        style={{ width: "60px", height: "60px" }}
                                        className="ms-1"
                                    />
                                    <div className="ms-3">
                                        <p className="fw-bold mb-0">{product.productName}</p>
                                        <div className="d-flex flex-column">
                                            {product.sale_price !== 0 ? (
                                                <>
                                                    <div className="d-flex  flex-column">
                                                        <p className="text-danger fw-bold mb-0 me-2">
                                                            Giá bán: {product.sale_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                        </p>
                                                        <p className="text-muted text-decoration-line-through mb-0">
                                                            Giá gốc: {product.origin_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                        </p>
                                                    </div>

                                                </>
                                            ) : (
                                                <p className="text-dark fw-bold mb-0">
                                                    Giá bán: {product.origin_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* User and Cart icons */}
                <Nav className="ml-auto d-flex align-items-center " >
                    {token ? (
                        <>
                            <Nav className="d-flex">
                                <div className="user-circle d-flex flex-column align-items-left justify-content-center">
                                    <img
                                        src={user?.avatar ? user.avatar : './Images/icon-avatar.png'}
                                        alt="Avatar"
                                    // className="user-circle"
                                    />
                                </div>
                                <div className="user-info d-flex flex-column align-items-left justify-content-center">
                                    <span>Chào mừng {userName}, hãy cùng tận hưởng hương vị tươi mới mỗi ngày!</span>
                                    <span>Tài khoản <FontAwesomeIcon icon={faAngleDown} /></span>
                                </div>
                            </Nav>

                            <div className="info-border d-flex flex-column align-items-left justify-content-center position-fixed translate-middle-x custom-margin-left h-auto z-2">

                                <div className="manage-info-customer">
                                    <div className="my-account">
                                        <span style={{ color: '#3a31c9' }}>Tài khoản <FontAwesomeIcon icon={faAngleDown} /></span>
                                    </div>
                                    <div className="manage-orders" onClick={() => navigate(`/order`)}>
                                        <span><FontAwesomeIcon icon={faFileInvoiceDollar} /> Quản lý đơn hàng</span>
                                    </div>
                                    <div className="manage-orders" onClick={() => navigate(`/profile`)}>
                                        <span><FontAwesomeIcon icon={faFileInvoice} /> Quản lý tài khoản</span>
                                    </div>
                                    <div className="favourite-products" onClick={handleWishlistClick}>
                                        <span><FontAwesomeIcon icon={faHeart} /> Sản phẩm yêu thích</span>
                                    </div>
                                    <div className="favourite-products" onClick={() => navigate(`/purchased-products`)}>
                                        <span><FontAwesomeIcon icon={faMoneyBill} /> Đánh giá sản phẩm</span>
                                    </div>
                                    <div className="logout" onClick={handleLogout}>
                                        <span><FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} /> Đăng xuất</span>
                                    </div>
                                </div>
                            </div>

                        </>


                    ) : (

                        <>
                            <Nav className="d-flex">
                                {/* <div className="user-circle d-flex flex-column align-items-left justify-content-center">
                                    <img
                                        src='./Images/icon-avatar.png'
                                        alt="Avatar"
                                    // className="user-circle"
                                    />
                                </div> */}
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
                    {/* User and Cart icons */}
                    <Nav className="ml-auto d-flex align-items-center ">
                        {currentUser && currentUser.isAdmin && (
                            <Nav.Link href="/admin" className="admin-link">
                                <FontAwesomeIcon icon={faUserTie} className="icon-admin-page" />
                            </Nav.Link>
                        )}
                        {/* Notifications */}
                        <div className="notification-wrapper ">
                            <FontAwesomeIcon
                                icon={faBell}
                                className="icon-admin-page"
                                onClick={handleToggleNotifications}
                            />
                            {unreadCount > 0 && (
                                <span className="notification-badge">{unreadCount}</span>
                            )}

                            {listNotifications.length > 0 && showNotifications && (
                                <div className="notifications-dropdown ">
                                    <h6>Thông báo</h6>
                                    <ul className="list-unstyled">
                                        {listNotifications.map((notification) => (
                                            <li
                                                key={notification._id}
                                                className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
                                                onClick={() => handleMarkAsRead(notification._id, notification.link)}
                                            >
                                                <div className="d-flex align-items-center ">
                                                    {/* Hình ảnh bên trái thông báo */}
                                                    <img
                                                        src={notification.image || 'https://via.placeholder.com/150'} // Thay đường dẫn hình ảnh mặc định
                                                        alt="Notification"
                                                        className="notification-image me-3"
                                                        style={{ width: '50px', height: '70px', borderRadius: '10px' }}
                                                    />
                                                    <div>
                                                        <p className="mb-0">{notification.content}</p>
                                                        <small className="text-muted">
                                                            {new Intl.DateTimeFormat('vi-VN', {
                                                                year: 'numeric',
                                                                month: '2-digit',
                                                                day: '2-digit',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                second: '2-digit',
                                                            }).format(new Date(notification.createdAt))}
                                                        </small>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Cart */}
                        <Nav.Link href="#" className="cart-info" onClick={handleShoppingCartClick} id='cartShopping'>
                            <div className="cart-circle">
                                <FontAwesomeIcon icon={faCartShopping} />
                            </div>

                            <div className="cart-quantity">
                                <span>{shoppingCartQuantity}</span>
                            </div>

                        </Nav.Link>
                    </Nav>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Header