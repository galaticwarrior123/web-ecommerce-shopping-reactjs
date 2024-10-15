import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultLayoutUserHomePage from '../../../Layouts/DefaultLayoutUserHomePage';
import './ShoppingCartPage.css'; // Custom CSS for minor tweaks
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'; // Import CSS
import 'bootstrap-touchspin'; // Import JS
import $ from 'jquery';
import { useNavigate, Link } from 'react-router-dom';
const ShoppingCartPage = () => {
    const navigate = useNavigate();
    const handleMoveToCheckout = () => {
        navigate('/cart');
    };
    const [quantity, setQuantity] = useState(1);

    //Decrease quantity
    const handleDecrease = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
    }

    //Increase quantity
    const handleIncrease = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
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

            <section className="h-100 h-custom">
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-12">
                            <div className='shoppingcart'>
                                <div className="card card-registration card-registration-2" style={{ width: '100%', maxWidth: 'none', borderRadius: '15px' }}>
                                    <div className="card-body p-0 ">
                                        <div class="row g-0">
                                            <div class="col-lg-8">
                                                <div class="p-5">
                                                    <div class="d-flex justify-content-between align-items-center mb-5">
                                                        <h1 class="fw-bold mb-0">Shopping Cart</h1>
                                                        <h6 class="mb-0 text-muted">3 items</h6>
                                                    </div>
                                                    <hr class="my-4"></hr>
                                                    <div class="row mb-4 d-flex justify-content-between align-items-center">
                                                        <div class="col-md-2 col-lg-2 col-xl-2">
                                                            <img
                                                                src="./Images/oi.png"
                                                                class="img-fluid rounded-3" alt="Oi" />
                                                        </div>
                                                        <div class="col-md-3 col-lg-3 col-xl-3">
                                                            <h6 class="text-muted">Ổi</h6>
                                                            <h6 class="mb-0">Ổi ruột đỏ</h6>
                                                        </div>
                                                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                            <button
                                                                data-mdb-button-init
                                                                data-mdb-ripple-init
                                                                className="btn btn-link px-2"
                                                                onClick={handleDecrease}
                                                            >
                                                                <FontAwesomeIcon icon={faMinus} />
                                                            </button>

                                                            <input
                                                                id="form1"
                                                                min="0"
                                                                name="quantity"
                                                                value={quantity} 
                                                                type="number"
                                                                className="form-control form-control-sm"
                                                                style={{ width: '60px' }}
                                                                onChange={(e) => setQuantity(Number(e.target.value))} 
                                                            />

                                                            <button
                                                                data-mdb-button-init
                                                                data-mdb-ripple-init
                                                                className="btn btn-link px-2"
                                                                onClick={handleIncrease} // Sử dụng onClick để tăng số lượng
                                                            >
                                                                <FontAwesomeIcon icon={faPlus} />
                                                            </button>
                                                        </div>

                                                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                            <h6 class="mb-0">€ 44.00</h6>
                                                        </div>
                                                        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                                            <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
                                                        </div>
                                                    </div>

                                                    <hr class="my-4"></hr>

                                                    <div class="row mb-4 d-flex justify-content-between align-items-center">
                                                        <div class="col-md-2 col-lg-2 col-xl-2">
                                                            <img
                                                                src="./Images/cachua.png"
                                                                class="img-fluid rounded-3" alt="Cà chua" />
                                                        </div>
                                                        <div class="col-md-3 col-lg-3 col-xl-3">
                                                            <h6 class="text-muted">Cà chua</h6>
                                                            <h6 class="mb-0">Cà chua thân gỗ</h6>
                                                        </div>
                                                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                            <button
                                                                data-mdb-button-init
                                                                data-mdb-ripple-init
                                                                className="btn btn-link px-2"
                                                                onClick={handleDecrease}
                                                            >
                                                                <FontAwesomeIcon icon={faMinus} />
                                                            </button>

                                                            <input
                                                                id="form1"
                                                                min="0"
                                                                name="quantity"
                                                                value={quantity} 
                                                                type="number"
                                                                className="form-control form-control-sm"
                                                                style={{ width: '60px' }}
                                                                onChange={(e) => setQuantity(Number(e.target.value))} 
                                                            />

                                                            <button
                                                                data-mdb-button-init
                                                                data-mdb-ripple-init
                                                                className="btn btn-link px-2"
                                                                onClick={handleIncrease} // Sử dụng onClick để tăng số lượng
                                                            >
                                                                <FontAwesomeIcon icon={faPlus} />
                                                            </button>
                                                        </div>

                                                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                            <h6 class="mb-0">€ 44.00</h6>
                                                        </div>
                                                        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                                            <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
                                                        </div>
                                                    </div>

                                                    <hr class="my-4"></hr>

                                                    <div class="row mb-4 d-flex justify-content-between align-items-center">
                                                        <div class="col-md-2 col-lg-2 col-xl-2">
                                                            <img
                                                                src="./Images/bo.png"
                                                                class="img-fluid rounded-3" alt="Cotton T-shirt" />
                                                        </div>
                                                        <div class="col-md-3 col-lg-3 col-xl-3">
                                                            <h6 class="text-muted">Bơ</h6>
                                                            <h6 class="mb-0">Bơ sáp Đắk Lắk</h6>
                                                        </div>
                                                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                            <button
                                                                data-mdb-button-init
                                                                data-mdb-ripple-init
                                                                className="btn btn-link px-2"
                                                                onClick={handleDecrease}
                                                            >
                                                                <FontAwesomeIcon icon={faMinus} />
                                                            </button>

                                                            <input
                                                                id="form1"
                                                                min="0"
                                                                name="quantity"
                                                                value={quantity} 
                                                                type="number"
                                                                className="form-control form-control-sm"
                                                                style={{ width: '60px' }}
                                                                onChange={(e) => setQuantity(Number(e.target.value))} 
                                                            />

                                                            <button
                                                                data-mdb-button-init
                                                                data-mdb-ripple-init
                                                                className="btn btn-link px-2"
                                                                onClick={handleIncrease} // Sử dụng onClick để tăng số lượng
                                                            >
                                                                <FontAwesomeIcon icon={faPlus} />
                                                            </button>
                                                        </div>

                                                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                            <h6 class="mb-0">€ 44.00</h6>
                                                        </div>
                                                        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                                            <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
                                                        </div>
                                                    </div>

                                                    <hr class="my-4"></hr>

                                                    <div class="pt-5">
                                                        <h6 class="mb-0">
                                                            <Link to="/product" className="text-body"><FontAwesomeIcon icon={faArrowLeft} />Back to shop</Link>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-4 bg-body-tertiary">
                                                <div class="p-5">
                                                    <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                                                    <hr class="my-4"></hr>

                                                    <div class="d-flex justify-content-between mb-4">
                                                        <h5 class="text-uppercase">items 3</h5>
                                                        <h5>€ 132.00</h5>
                                                    </div>

                                                    <h5 class="text-uppercase mb-3">Shipping</h5>

                                                    <div class="mb-4 pb-2">
                                                        <select data-mdb-select-init style={{ height: '40px', width: '70%' }}>
                                                            <option value="1">Standard-Delivery- €5.00</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                            <option value="4">Four</option>
                                                        </select>
                                                    </div>

                                                    <h5 class="text-uppercase mb-3">Give code</h5>

                                                    <div class="mb-5">
                                                        <div data-mdb-input-init class="form-outline">
                                                            <input type="text" id="form3Examplea2" class="form-control form-control-lg" />
                                                            <label class="form-label" for="form3Examplea2">Enter your code</label>
                                                        </div>
                                                    </div>

                                                    <hr class="my-4"></hr>

                                                    <div class="d-flex justify-content-between mb-5">
                                                        <h5 class="text-uppercase">Total price</h5>
                                                        <h5>€ 137.00</h5>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        data-mdb-button-init
                                                        data-mdb-ripple-init
                                                        className="btn btn-dark btn-block btn-lg"
                                                        data-mdb-ripple-color="dark"
                                                        onClick={handleMoveToCheckout} // Sử dụng onClick để điều hướng
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
                    </div>
                </div>
            </section>
        </DefaultLayoutUserHomePage>
    );
};

export default ShoppingCartPage;
