import React from 'react';
import './ProductCard_2.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const ProductCard_2 = () => {
    return (
        <div className='card product-card'>
            <img
                src="./Images/oi.png"
                className="card-img-top"
                alt="Product"
            />
            <div className="card-body">
                <div className="card-title">
                    <h5>Ổi</h5>
                    <span className="badge best-badge">Best</span>
                </div>

                <div className="card-text">
                    <p>Ổi ruột đỏ Ruby giòn ngọt</p>
                </div>
                <p className="price">
                    <div><del>200,000đ</del></div>
                    <div><span className="discounted-price">100,000đ</span></div>
                </p>
                
                <div className="d-flex justify-content-end ms-auto icon-buttons">
                    <button className="btn btn-outline-secondary">
                        <FontAwesomeIcon icon={faCartShopping} />
                    </button>
                    <button className="btn btn-outline-danger">
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <button className="btn btn-outline-secondary">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>

                <p className="sold-count">
                    <strong>163</strong> đã bán
                </p>
            </div>
        </div>
    )
}

export default ProductCard_2;