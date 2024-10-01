import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBagShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import ProductDetail from './ProductDetail/ProducDetail';
import { useState } from 'react';
const ProductCard = ({ product }) => {
    const [seeDetail, setSeeDetail] = useState(false);
    const toggleDetailProduct = () => setSeeDetail(prev => !prev);

    return (
        <>
            
            <div className="col">
                <div className="card h-100 shadow-sm d-flex flex-row">
                    <img src="./Images/vegetable.png" className="card-img-left" alt="Product" />
                    <div className="card-body">
                        <h5 className="card-title">{product.productName}</h5>
                        <p className="card-text">Giá bán: {product.price}đ</p>
                        <div className="d-flex justify-content-start">
                            <button className="btn btn-light me-2">
                                <FontAwesomeIcon icon={faBagShopping} />
                            </button>
                            <button className="btn btn-light me-2">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                            <button className="btn btn-light" onClick={toggleDetailProduct}>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
            {seeDetail && <ProductDetail product={product} toggleDetailProduct={toggleDetailProduct} />}
        </>
    );
}

export default ProductCard;