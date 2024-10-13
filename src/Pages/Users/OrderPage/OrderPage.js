import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DefaultLayoutUserHomePage from '../../../Layouts/DefaultLayoutUserHomePage';
import './OrderPage.css'; // Custom CSS for minor tweaks

const OrderPage = () => {
    const [selectedAddress, setSelectedAddress] = useState('address1'); // Keep track of selected address

    const handleAddressChange = (event) => {
        setSelectedAddress(event.target.value);
    };

    return (
        <DefaultLayoutUserHomePage>
            <div className="mt-5 order-page">
                <div className="w-100 d-flex">
                    {/* Shipping Address Section */}
                    <div className="col-md-7">
                        <div className="w-100 ">
                            <div className="box-body">
                                <h5 className="box-body-title">Địa chỉ giao hàng</h5>
                                
                                {/* Existing Address 1 */}
                                <div className="form-check mb-3">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="address" 
                                        id="address1" 
                                        value="address1" 
                                        checked={selectedAddress === 'address1'}
                                        onChange={handleAddressChange}
                                    />
                                    <label className="form-check-label" htmlFor="address1">
                                        <strong>Hanh Tran</strong><br />
                                        Email: ttbhanh@gmail.com<br />
                                        Mobile: 01234567<br />
                                        Address: 227 Nguyen Van Cu, Ho Chi Minh City, Vietnam
                                    </label>
                                </div>

                                {/* Existing Address 2 */}
                                <div className="form-check mb-3">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="address" 
                                        id="address2" 
                                        value="address2" 
                                        checked={selectedAddress === 'address2'}
                                        onChange={handleAddressChange}
                                    />
                                    <label className="form-check-label" htmlFor="address2">
                                        <strong>Marry Han</strong><br />
                                        Email: abc@gmail.com<br />
                                        Mobile: 92376489<br />
                                        Address: 123 Street, Vietnam
                                    </label>
                                </div>

                                {/* "Ship to Different Address" Option */}
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

                                {/* New Address Form, shown only if "Ship to different address" is selected */}
                                {selectedAddress === 'shipDifferent' && (
                                    <div className="new-address-form mt-4">
                                        <h5 className="card-title">Địa chỉ giao hàng mới</h5>
                                        <form>
                                            <div className="row mb-3">
                                                <div className="col">
                                                    <label>First Name</label>
                                                    <input type="text" className="form-control" placeholder="First Name" />
                                                </div>
                                                <div className="col">
                                                    <label>Last Name</label>
                                                    <input type="text" className="form-control" placeholder="Last Name" />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label>Email</label>
                                                <input type="email" className="form-control" placeholder="Email" />
                                            </div>
                                            <div className="mb-3">
                                                <label>Mobile No</label>
                                                <input type="text" className="form-control" placeholder="Mobile No" />
                                            </div>
                                            <div className="mb-3">
                                                <label>Address</label>
                                                <input type="text" className="form-control" placeholder="Address" />
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col">
                                                    <label>Country</label>
                                                    <select className="form-control">
                                                        <option>United States</option>
                                                        <option>Vietnam</option>
                                                        {/* Add more options as needed */}
                                                    </select>
                                                </div>
                                                <div className="col">
                                                    <label>City</label>
                                                    <input type="text" className="form-control" placeholder="City" />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col">
                                                    <label>State</label>
                                                    <input type="text" className="form-control" placeholder="State" />
                                                </div>
                                                <div className="col">
                                                    <label>ZIP Code</label>
                                                    <input type="text" className="form-control" placeholder="ZIP Code" />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Cart Total and Payment Methods */}
                    <div className="d-flex flex-column align-items-end col-md-5">
                        {/* Cart Total Section */}
                        <div className="card shadow-sm mb-4">
                            <div className="box-body">
                                <h5 className="card-title">Tổng hàng</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>et ultrices posuere x 1</span>
                                        <span>$9.03</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Tổng cộng</span>
                                        <span>$9.03</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Phí giao hàng</span>
                                        <span>$0.00</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between font-weight-bold">
                                        <span>Tổng tiền</span>
                                        <span>$9.03</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Payment Methods Section */}
                        <div className="card shadow-sm">
                            <div className="box-body">
                                <h5 className="card-title">Phương thức thanh toán</h5>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="radio" name="payment" id="paypal" />
                                    <label className="form-check-label" htmlFor="paypal">
                                        PayPal
                                    </label>
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="radio" name="payment" id="cod" />
                                    <label className="form-check-label" htmlFor="cod">
                                        Thanh toán khi nhận hàng
                                    </label>
                                </div>
                                <button className="btn btn-primary w-100">Đặt hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayoutUserHomePage>
    );
};

export default OrderPage;
