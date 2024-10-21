import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultLayoutUserHomePage from "../../../Layouts/DefaultLayoutUserHomePage";
import './ShoppingCartPage.css'; // Custom CSS for minor tweaks
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'; // Import CSS
import 'bootstrap-touchspin'; // Import JS
import $ from 'jquery';
import { useNavigate, Link } from 'react-router-dom';
import ShoppingCartAPI from "../../../API/ShoppingCartAPI";

const ShoppingCartPage = () => {
    const navigate = useNavigate();
    const handleMoveToCheckout = () => {
        navigate('/cart');
    };
    const [shoppingCartItems, setShoppingCartItems] = useState([]);

    useEffect(() => {
        const fetchShoppingCart = async () => {
            try {
                const data = await ShoppingCartAPI.GetShoppingCart();
                if (data.data.success && data.data.shoppingcart) {
                    const products = data.data.shoppingcart.products || [];
                    setShoppingCartItems(products);
                }
            } catch (error) {
                console.error("Error fetching shopping cart:", error);
            }
        };

        fetchShoppingCart();
    }, []);

    //Decrease quantity
    const handleDecrease = (itemId) => {
        setShoppingCartItems((prevItems) =>
            prevItems.map((item) =>
                item.product._id === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
            )
        );
    }

    //Increase quantity
    const handleIncrease = (itemId) => {
        setShoppingCartItems((prevItems) =>
            prevItems.map((item) =>
                item.product._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }

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
                                        <h1 className="fw-bold mb-4 text-center">Shopping Cart</h1>
                                        {shoppingCartItems.length === 0 ? (
                                            <p className="text-center">Your shopping cart is empty</p>
                                        ) : (
                                            shoppingCartItems.map((item) => (
                                                <div className="row mb-4 d-flex justify-content-between align-items-center" key={item.product._id}>
                                                    <div className="col-md-2">
                                                        <img
                                                            src={item.product.images_1 || "default-image-url"} // Fallback image URL
                                                            className="img-fluid rounded-3"
                                                            alt={item.product.productName}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h6 className="text-muted">{item.product.category?.name || 'Default Category Name'}</h6>
                                                        <h6 className="mb-0">{item.product.productName}</h6>
                                                    </div>
                                                    <div className="col-md-3 d-flex align-items-center">
                                                        <button className="btn btn-link px-2" onClick={() => handleDecrease(item.product._id)}>
                                                            <FontAwesomeIcon icon={faMinus} />
                                                        </button>
                                                        <input
                                                            min="0"
                                                            value={item.quantity}
                                                            type="number"
                                                            className="form-control form-control-sm mx-2"
                                                            style={{ width: '60px' }}
                                                            readOnly
                                                        />
                                                        <button className="btn btn-link px-2" onClick={() => handleIncrease(item.product._id)}>
                                                            <FontAwesomeIcon icon={faPlus} />
                                                        </button>
                                                    </div>
                                                    <div className="col-md-3 text-end">
                                                        <h6 className="mb-0">€ {item.product.sale_price * item.quantity}</h6>
                                                    </div>
                                                    <div className="col-md-1 text-end">
                                                        <button className="btn btn-danger">
                                                            <i className="fas fa-times"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                        <hr className="my-4" />
                                        <Link to="/product" className="text-body">
                                            <FontAwesomeIcon icon={faArrowLeft} /> Back to shop
                                        </Link>
                                    </div>
                                </div>

                                <div className="summary-card mt-4">
                                    <div className="p-5 bg-light rounded-3">
                                        <h3 className="fw-bold mb-4">Summary</h3>
                                        <div className="d-flex justify-content-between mb-4">
                                            <h5 className="text-uppercase">Items {shoppingCartItems.length}</h5>
                                            <h5>€ {shoppingCartItems.reduce((total, item) => total + item.product.sale_price * item.quantity, 0)}</h5>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-dark btn-block btn-lg"
                                            onClick={handleMoveToCheckout}
                                        >
                                            Move to Checkout
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
