import React, { useState } from 'react'; // Import useState
import './ProductCard_2.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// Mảng chứa danh sách sản phẩm
// const products = [
//     {
//         id: 1,
//         category: "Ổi",
//         name: "Ổi ruột đỏ Ruby giòn ngọt",
//         originalPrice: "200,000đ",
//         discountedPrice: "100,000đ",
//         imageUrl: "./Images/oi.png",
//         soldCount: 163,
//         badge: "Best",
//     },
//     {
//         id: 2,
//         category: "Box",
//         name: "Giỏ trái cây nhiệt đới TropiLove",
//         originalPrice: "300,000đ",
//         discountedPrice: "200,000đ",
//         imageUrl: "./Images/box_tropical.png",
//         soldCount: 173,
//         badge: "Best",
//     },
//     {
//         id: 3,
//         category: "Lựu",
//         name: "Lựu hong ngon hong tính tiền",
//         originalPrice: "200,000đ",
//         discountedPrice: "150,000đ",
//         imageUrl: "./Images/luu.png",
//         soldCount: 150,
//         badge: "Best",
//     }
//     // Thêm các sản phẩm khác vào đây
// ];



const ProductCard_2 = ({ product, showViewCount, showProductCount }) => {
    const [imageUrl, setImageUrl] = useState(product.imageUrl);
    if (!product) {
        return "Không có sản phẩm để hiển thị"; // Hoặc hiển thị một thông báo lỗi nếu cần
    }
    return (
        <div className='card product-card'>
            <div className='image-container'>
                <img
                    src={product.imageUrl}
                    className="card-img-top"
                    alt={product.name}

                />
                <img
                    src={product.imageUrl_2}
                    className="card-img-top hover-img"
                    alt={product.name}
                    style={{ opacity: 0 }}
                />
            </div>
            <div className="card-body">
                <div className="card-title">
                    <h5>{product.category}</h5>
                    <span className="badge best-badge">{product.badge}</span>
                </div>

                <div className="card-text">
                    <p>{product.name}</p>
                </div>
                <p className="price">
                    <div><del>{product.originalPrice}</del></div>
                    <div><span className="discounted-price">{product.discountedPrice}</span></div>
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
                    <strong>{product.soldCount}</strong> đã bán
                </p>
                )}
            
                {showViewCount && (
                    <p className="view-count">
                        <strong>{product.viewCount}</strong> lượt xem
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
