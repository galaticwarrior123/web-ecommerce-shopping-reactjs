import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultLayoutUserHomePage from '../../../Layouts/DefaultLayoutUserHomePage';
import './CartPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderAPI from '../../../API/OrderAPI';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../../../context/CartContext';


const CartPage = () => {
    let grandTotal = 0;
    const [selectedAddress, setSelectedAddress] = useState('address1');
    const location = useLocation();
    const cart = location.state?.cart || [];
    const cartID = location.state?.shoppingCartId || '';
    const [cartItems, setCartItems] = useState(cart);
    const [totalAmount, setTotalAmount] = useState(0);
    const { fetchShoppingCartQuantity } = useCart();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [listOrderUser, setListOrderUser] = useState([]);
    const navigate = useNavigate();

    const fetchOrderUser = async () => {
        try {
            const response = await OrderAPI.GetOrders();
            if (response.data && response.data.DT) {
                const listOrder = response.data.DT;
                const listOrderUser = [];
                listOrder.forEach((order) => {
                    if (!listOrderUser.find((item) => item.phone === order.phone)) {
                        listOrderUser.push(order);
                    }
                });
                setListOrderUser(listOrderUser);
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đơn hàng:', error);
        }
    };

    useEffect(() => {
        setSelectedAddress(listOrderUser[0]?.phone);
        setName(listOrderUser[0]?.name);
        setPhone(listOrderUser[0]?.phone);
        setAddress(listOrderUser[0]?.address);

            
    }, [listOrderUser]);

    useEffect(() => {
        const calculateTotal = () => {
            const total = cartItems.reduce((sum, item) => {
                const price = item.product.sale_price !== 0 ? item.product.sale_price : item.product.origin_price;
                return sum + (price * item.quantity);
            }, 0);
            setTotalAmount(total);
        };
        calculateTotal();
        fetchOrderUser();
    }, [cartItems]);

    const handleAddressChange = (event) => {
        setSelectedAddress(event.target.value);
        const selectedOrder = listOrderUser.find(order => order.phone === event.target.value);
        
        if (selectedOrder) {
            setName(selectedOrder.name);
            setPhone(selectedOrder.phone);
            setAddress(selectedOrder.address);
        } else {
            setName('');
            setPhone('');
            setAddress('');
        }
    };

    const handleOrder = () => {
        if (selectedAddress === 'shipDifferent' && (!name || !phone || !address)) {
            toast.error('Vui lòng nhập đầy đủ thông tin giao hàng');
            return;
        }
        const data = {
            shoppingCart: cartID,
            totalAmount,
            address: selectedAddress === 'shipDifferent' ? address : address,
            phone: selectedAddress === 'shipDifferent' ? phone : phone,
            name: selectedAddress === 'shipDifferent' ? name : name,
            paymentMethod,
            selectedProducts: cartItems.map((item) => ({
                product: item.product._id,
                quantity: item.quantity,
            })),
        };

        OrderAPI.CreateOrder(data).then((response) => {
            if (response.data && response.data.DT) {
                toast.success('Đặt hàng thành công');
                fetchShoppingCartQuantity();
                navigate('/order');
            } else {
                toast.error('Đặt hàng thất bại');
            }
        }).catch((error) => {
            toast.error('Đặt hàng thất bại');
        });
    };

    return (
        <DefaultLayoutUserHomePage>
            <ToastContainer />
            <div className="mt-5 cart-page">
                <div className="w-100 ">
                    <div >
                        <div className="w-100">
                            <div className="box-body">
                                <h5 className="box-body-title">Sản phẩm trong giỏ hàng</h5>
                                {cartItems.map((item) => {
                                    const imageProduct = item.product.images[0];
                                    const originalPrice = item.product.origin_price;
                                    const discountPrice = item.product.sale_price;
                                    const price = discountPrice !== 0 ? discountPrice : originalPrice;
                                    const itemTotal = price * item.quantity;
                                    grandTotal += itemTotal;

                                    return (
                                        <div key={item._id} className="cart-item d-flex align-items-center mb-3">
                                            <img src={imageProduct} alt={item.product.productName} className="cart-item-img" />
                                            <div className="cart-item-details flex-grow-1 ms-3">
                                                <h6 className="cart-item-name">{item.product.productName}</h6>
                                                <div className="cart-item-meta">
                                                    <span className="cart-item-price">
                                                        Giá gốc: {originalPrice.toLocaleString('vi-VN')}₫
                                                    </span>
                                                    {discountPrice !==0 && (
                                                        <span className="cart-item-discount-price">
                                                            Giá giảm: {discountPrice.toLocaleString('vi-VN')}₫
                                                        </span>
                                                    )}
                                                    <span className="cart-item-quantity">Số lượng: {item.quantity}</span>
                                                    <span className="cart-item-total">
                                                        Tổng: {itemTotal.toLocaleString('vi-VN')}₫
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-100 d-flex">
                    <div className="col-md-7">
                        <div className="w-100">
                            <div className="box-body">
                                <h5 className="box-body-title">Địa chỉ giao hàng</h5>

                                {listOrderUser.map((order, index) => (
                                    <div className="form-check mb-3" key={index}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="address"
                                            id={`address${index}`}
                                            value={order.phone}
                                            checked={selectedAddress === order.phone}
                                            onChange={handleAddressChange}
                                        />
                                        <label className="form-check-label" htmlFor={`address${index}`}>
                                            <strong>{order.name}</strong><br />
                                            Mobile: {order.phone}<br />
                                            Address: {order.address}
                                        </label>
                                    </div>
                                ))}

                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="address"
                                        id="ship-different"
                                        value="shipDifferent"
                                        checked={selectedAddress === 'shipDifferent'}
                                        onChange={handleAddressChange}
                                    />
                                    <label className="form-check-label" htmlFor="ship-different">
                                        Địa chỉ giao hàng khác
                                    </label>
                                </div>

                                {selectedAddress === 'shipDifferent' && (
                                    <div className="new-address-form mt-4">
                                        <h5 className="card-title">Địa chỉ giao hàng mới</h5>
                                        <form>
                                            <div className="row mb-3">
                                                <div className="col">
                                                    <label>Họ và tên</label>
                                                    <input type="text" className="form-control" placeholder="Nhâp họ và tên" value={name} onChange={(e) => setName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label>Số điện thoại</label>
                                                <input type="text" className="form-control" placeholder="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label>Địa chỉ</label>
                                                <input type="text" className="form-control" placeholder="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} />
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-column align-items-end col-md-5">
                        <div className="card shadow-sm mb-4">
                            <div className="box-body">
                                <h5 className="card-title">Tổng hàng</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Tổng cộng</span>
                                        <span>{totalAmount.toLocaleString('vi-VN')}₫</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Phí giao hàng</span>
                                        <span>0₫</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between font-weight-bold">
                                        <span>Tổng tiền</span>
                                        <span>{totalAmount.toLocaleString('vi-VN')}₫</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="card shadow-sm">
                            <div className="box-body">
                                <h5 className="card-title">Phương thức thanh toán</h5>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="radio" name="payment" id="paypal" />
                                    <label className="form-check-label" htmlFor="paypal" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                        PayPal
                                    </label>
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="radio" name="payment" id="cod" checked={paymentMethod === 'COD'} />
                                    <label className="form-check-label" htmlFor="cod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} >
                                        Thanh toán khi nhận hàng
                                    </label>
                                </div>
                                <button className="btn btn-primary w-100" onClick={handleOrder} id='btn-order'>Đặt hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayoutUserHomePage>
    );
};

export default CartPage;
