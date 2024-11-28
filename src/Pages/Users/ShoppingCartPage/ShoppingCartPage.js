import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultLayoutUserHomePage from "../../../Layouts/DefaultLayoutUserHomePage";
import './ShoppingCartPage.css'; // Custom CSS for minor tweaks
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'; // Import CSS
import 'bootstrap-touchspin'; // Import JS
import $ from 'jquery';
import { useNavigate, Link } from 'react-router-dom';
import ShoppingCartAPI from "../../../API/ShoppingCartAPI";
import { useCart } from '../../../context/CartContext';
import { toast } from 'react-toastify';

const ShoppingCartPage = () => {
    const navigate = useNavigate();
    const handleMoveToCheckout = (cart) => {


        if (selectedItems.length === 0) {
            // Reset lại trạng thái các sản phẩm trong giỏ hàng
            setShoppingCartItems((prevItems) =>
                prevItems.map((item) => ({
                    ...item,
                    checkedSelect: false, // Tự động tick lại tất cả các sản phẩm
                }))
            );
            fetchShoppingCartQuantity();
            fetchShoppingCart();

            // Nếu không có sản phẩm nào được chọn, hiện thông báo và reset lại giỏ hàng
            toast.error("Bạn cần chọn ít nhất một sản phẩm để tiếp tục thanh toán!");

            return;
        }

        for (let i = 0; i < cart.length; i++) {
            if (cart[i].checkedSelect === false) {
                cart.splice(i, 1);
                i--;
            }
        }


        navigate("/cart", { state: { cart, shoppingCartId } });
    };
    const [shoppingCartItems, setShoppingCartItems] = useState([]);
    const [shoppingCartId, setShoppingCartId] = useState(null);
    const { fetchShoppingCartQuantity } = useCart();
    const [selectedItems, setSelectedItems] = useState([]);

    const calculateTotalPrice = () => {
        return shoppingCartItems
            .filter((item) => item.checkedSelect)
            .reduce((total, item) => total + item.product.sale_price * item.quantity, 0);
    };

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {

        fetchShoppingCart();
    }, []);

    const fetchShoppingCart = async () => {
        try {
            const data = await ShoppingCartAPI.GetShoppingCart();
            if (data.data.success && data.data.shoppingcart) {
                const products = data.data.shoppingcart.products || [];
                const rawProducts = products.map((item) => ({
                    ...item,
                    checkedSelect: true, // Thêm trạng thái checkbox mặc định là true
                }));
                setShoppingCartItems(rawProducts);
                setSelectedItems(rawProducts.map((item) => item.product._id));
                setShoppingCartId(data.data.shoppingcart._id);
            }
        } catch (error) {
            console.error("Error fetching shopping cart:", error);
        }
    };

    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [selectedItems, shoppingCartItems]);

    const handleSelectItem = (itemId, isChecked) => {
        setShoppingCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item.product._id === itemId) {
                    return { ...item, checkedSelect: isChecked };
                }
                return item;
            }
            )
        );


        setSelectedItems((prevSelected) => {
            if (isChecked) {
                return [...prevSelected, itemId]; // Thêm item mới được chọn
            } else {
                return prevSelected.filter((id) => id !== itemId); // Loại bỏ item bị bỏ chọn
            }
        });




        // // Cập nhật danh sách các item đã chọn
        // setSelectedItems((prevSelected) => {
        //     if (isChecked) {
        //         return [...prevSelected, itemId]; // Thêm item mới được chọn
        //     } else {
        //         return prevSelected.filter((id) => id !== itemId); // Loại bỏ item bị bỏ chọn
        //     }
        // });
    };
    const handleDecrease = async (itemId) => {
        setShoppingCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item.product._id === itemId) {
                    const newQuantity = Math.max(item.quantity - 1, 1);
                    ShoppingCartAPI.UpdateProductQuantity(shoppingCartId, itemId, newQuantity);
                    fetchShoppingCartQuantity();
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    const handleIncrease = async (itemId) => {
        setShoppingCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item.product._id === itemId) {
                    const newQuantity = item.quantity + 1;
                    ShoppingCartAPI.UpdateProductQuantity(shoppingCartId, itemId, newQuantity);
                    fetchShoppingCartQuantity();
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    const handleRemoveFromCart = async (itemId) => {
        try {
            const response = await ShoppingCartAPI.DeleteProduct(shoppingCartId, String(itemId));
            toast.success("Sản phẩm đã được xóa khỏi giỏ hàng!");
            setShoppingCartItems((prevItems) =>
                prevItems.filter((item) => item.product._id !== itemId)
            );
            fetchShoppingCartQuantity();
        } catch (error) {
            console.error("Error removing product from cart:", error);
            toast.success("Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng!");
        }
    };

    useEffect(() => {
        $("input[name='quantity']").TouchSpin({
            min: 0,
            max: 10000,
            step: 1,
            boostat: 5,
            maxboostedstep: 10,
            buttondown_class: '',
            buttonup_class: ''
        });
    }, []);

    return (
        <DefaultLayoutUserHomePage>
            <div className="h-100 h-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12">
                            <div className='shoppingcart'>
                                <div className="card card-registration card-custom">
                                    <div className="card-body p-5">
                                        <h1 className="fw-bold mb-4 text-center">Giỏ hàng</h1>
                                        {shoppingCartItems.length === 0 ? (
                                            <p className="text-center">Your shopping cart is empty</p>
                                        ) : (
                                            shoppingCartItems.map((item) => (
                                                <div className="row mb-4 d-flex justify-content-between align-items-center flex-nowrap" key={item.product._id}>
                                                    <div className="col-md-1 text-center">
                                                        <input
                                                            className='form-check-input'
                                                            type="checkbox"
                                                            checked={item.checkedSelect}
                                                            onChange={(e) => handleSelectItem(item.product._id, e.target.checked)}
                                                        />
                                                    </div>
                                                    <div className="col-md-2 text-center">
                                                        <img
                                                            src={item.product.images_1 || "default-image-url"}
                                                            className="img-fluid rounded-3"
                                                            alt={item.product.productName}
                                                        />
                                                    </div>
                                                    <div className="col-md-3 text-start">
                                                        <h6 className="text-muted mb-1">{item.product.category?.name || 'Default Category Name'}</h6>
                                                        <h6 className="mb-0">{item.product.productName}</h6>
                                                    </div>
                                                    <div className="col-md-2 text-center d-flex  px-2">
                                                        <button className="btn btn-link " onClick={() => handleDecrease(item.product._id)}>
                                                            <FontAwesomeIcon icon={faMinus} />
                                                        </button>
                                                        <input
                                                            min="0"
                                                            value={item.quantity}
                                                            type="number"
                                                            className="form-control form-control-sm "
                                                            style={{ width: '60px' }}
                                                            readOnly
                                                        />
                                                        <button className="btn btn-link " onClick={() => handleIncrease(item.product._id)}>
                                                            <FontAwesomeIcon icon={faPlus} />
                                                        </button>
                                                    </div>
                                                    <div className="col-md-2 text-end">
                                                        <h6 className="mb-0">{(item.product.sale_price * item.quantity).toLocaleString()}đ</h6>
                                                    </div>
                                                    <div className="col-md-1 text-end">
                                                        <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item.product._id)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                        <hr className="my-4" />
                                        <Link to="/product" className="text-body">
                                            <FontAwesomeIcon icon={faArrowLeft} /> Tiếp tục mua sắm
                                        </Link>
                                    </div>
                                </div>

                                <div className="summary-card mt-4">
                                    <div className="p-5 bg-light rounded-3">
                                        <h3 className="fw-bold mb-4">Tóm tắt đơn hàng</h3>
                                        <div className="d-flex justify-content-between mb-4">
                                            <h5 className="text-uppercase">Tổng số lượng: {selectedItems.length} sản phẩm</h5>
                                            <h5>{totalPrice.toLocaleString()}đ </h5>
                                        </div>
                                        <button
                                            id="move-to-checkout"
                                            type="button"
                                            className="btn btn-dark btn-block btn-lg"
                                            onClick={() => handleMoveToCheckout(shoppingCartItems)}
                                        >
                                            Tiến hành thanh toán

                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayoutUserHomePage>
    );
};

export default ShoppingCartPage;
