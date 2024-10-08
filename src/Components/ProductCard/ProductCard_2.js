import React, { useState } from 'react'; // Import useState
import './ProductCard_2.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


// const ProductCard = ({ product }) => {
//     const [seeDetail, setSeeDetail] = useState(false);
//     const toggleDetailProduct = () => setSeeDetail(prev => !prev);

//     return (
//         <>
            
//             <div className="col">
//                 <div className="card h-100 shadow-sm d-flex flex-row">
//                     <img src="./Images/vegetable.png" className="card-img-left" alt="Product" />
//                     <div className="card-body">
//                         <h5 className="card-title">{product.productName}</h5>
//                         <p className="card-text">Giá bán: {product.price}đ</p>
//                         <div className="d-flex justify-content-start">
//                             <button className="btn btn-light me-2">
//                                 <FontAwesomeIcon icon={faBagShopping} />
//                             </button>
//                             <button className="btn btn-light me-2">
//                                 <FontAwesomeIcon icon={faHeart} />
//                             </button>
//                             <button className="btn btn-light" onClick={toggleDetailProduct}>
//                                 <FontAwesomeIcon icon={faSearch} />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
                
//             </div>
//             {seeDetail && <ProductDetail product={product} toggleDetailProduct={toggleDetailProduct} />}
//         </>
//     );
// }


const ProductCard_2 = ({ product, showViewCount, showProductCount }) => {
    const [imageUrl, setImageUrl] = useState(product.imageUrl);
    if (!product) {
        return "Không có sản phẩm để hiển thị"; // Hoặc hiển thị một thông báo lỗi nếu cần
    }
    return (
        <div className='card product-card'>
            <div className='image-container'>
                <img
                    src={product.images_1}
                    className="card-img-top"
                    alt={product.productName}

                />
                <img
                    src={product.images_2}
                    className="card-img-top hover-img"
                    alt={product.productName}
                    style={{ opacity: 0 }}
                />
            </div>
            <div className="card-body">
                <div className="card-title">
                    <h5>{product.category.name}</h5>
                    <span className="badge best-badge">{product.badge}</span>
                </div>

                <div className="card-text">
                    <p>{product.productName}</p>
                </div>
                <p className="price">
                    <div><del>{product.origin_price}</del></div>
                    <div><span className="discounted-price">{product.sale_price}</span></div>
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

                {showProductCount && (
                    <p className="sold-count">
                    <strong>{product.sold_count}</strong> đã bán
                </p>
                )}
            
                {showViewCount && (
                    <p className="view-count">
                        <strong>{product.view_count}</strong> lượt xem
                    </p>
                )}

            </div>
        </div>
    );
}


// const ProductList = () => {
//     return (
//         <div className="product-list d-flex">
//             {products.map((product) => (
//                 <ProductCard_2 key={product.id} product={product} />
//             ))}
//         </div>
//     );
// }

export default ProductCard_2;
