import React, { useState } from 'react'; // Import useState
import './ProductCard_2.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ShoppingCartAPI from '../../API/ShoppingCartAPI'
import ProductAPI from '../../API/ProductAPI';
import ProductDetail from './ProductDetail/ProducDetail';

const ProductCard_2 = ({ product, showViewCount, showProductCount, updateShoppingCartQuantity }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const [seeDetail, setSeeDetail] = useState(false);
    const toggleDetailProduct = () => setSeeDetail(prev => !prev);
    
    if (!product) {
        return "Không có sản phẩm để hiển thị";
    }

    const handleAddToCart = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        try {
            // Xử lý thêm sản phẩm vào giỏ hàng (có thể bỏ qua phần này nếu không cần)
            const response = await ShoppingCartAPI.AddProductToCart(product._id, 1);

            // Sau khi thêm sản phẩm vào giỏ hàng, hiển thị hình ảnh
            const imageToAnimate = product.images_1; // Lấy ảnh từ product
            animateImage(imageToAnimate); // Gọi hàm animateImage để hiển thị ảnh

            console.log("Thêm sản phẩm vào giỏ hàng thành công:", response.data);

        } catch (error) {
            setErrorMessage("Lỗi khi thêm vào giỏ hàng");
            console.error("Thêm sản phẩm thất bại:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const animateImage = (image) => {
        // Tạo một div chứa hình ảnh
        console.log('Bắt đầu hoạt hình với hình ảnh:', image);
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-animation-container'; // Thêm class cho div
        document.body.appendChild(imgContainer); // Thêm vào body để hiện thị

        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.className = 'animated-image'; // Thêm class cho hình ảnh
        imgContainer.appendChild(imgElement); // Thêm hình ảnh vào div

        // Tìm vị trí của nút giỏ hàng
        const cartButton = document.querySelector('.btn-cart'); // Selector của nút giỏ hàng
        const cartRectProduct = cartButton.getBoundingClientRect();

        // Đặt vị trí ban đầu cho hình ảnh (ở giữa màn hình)
        imgContainer.style.position = 'fixed';
        imgContainer.style.left = '50%'; 
        imgContainer.style.top = '50%';
        imgContainer.style.transform = 'translate(-50%, -50%)'; // Căn giữa hình ảnh
        imgContainer.style.zIndex = '1000'; // Đảm bảo nó hiển thị trên các phần tử khác
        imgContainer.style.opacity = '1'; // Đặt độ trong suốt ban đầu

        // Tìm vị trí của biểu tượng giỏ hàng trên header
        const cartIcon = document.querySelector('.cart-info'); // Selector của biểu tượng giỏ hàng
        const cartRect = cartIcon.getBoundingClientRect(); // Lấy kích thước và vị trí của biểu tượng giỏ hàng

        // Lấy vị trí hiện tại của hình ảnh (vị trí trung tâm màn hình)
        const imgRect = imgContainer.getBoundingClientRect();

        // Tính toán khoảng cách cần di chuyển (delta) từ hình ảnh đến biểu tượng giỏ hàng
        const deltaX = cartRect.left - imgRect.left + (cartRect.width / 2) - (imgRect.width / 2) - 30; // Di chuyển theo trục X
        const deltaY = cartRect.top - imgRect.top + (cartRect.height / 2) - (imgRect.height / 2) - 30; // Di chuyển theo trục Y

        // Bắt đầu hiệu ứng di chuyển
        setTimeout(() => {
            imgContainer.style.transition = 'transform 1s ease, opacity 1s ease'; // Hiệu ứng di chuyển và mờ dần
            imgContainer.style.transform = `translate(${deltaX}px, ${deltaY}px)`; // Di chuyển đến vị trí biểu tượng giỏ hàng
        }, 100); // Delay nhỏ để hình ảnh được thêm vào trước khi bắt đầu animation

        // Xóa hình ảnh sau khi hoàn tất hiệu ứng di chuyển và mờ dần
        setTimeout(() => {
            imgContainer.style.opacity = '0'; // Làm mờ dần
        }, 1000); // Sau 1 giây thì bắt đầu làm mờ

        setTimeout(() => {
            document.body.removeChild(imgContainer); // Xóa div chứa hình ảnh sau khi biến mất
        }, 1500); // Tổng cộng 1.5 giây (1 giây di chuyển + 0.5 giây làm mờ)
    };

    return (
        <>
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
                    <button
                        className="btn btn-outline-secondary btn-cart"
                        onClick={handleAddToCart}
                        disabled={isLoading} // Disable button khi đang gọi API
                    >
                        {isLoading ? "Đang thêm..." : <FontAwesomeIcon icon={faCartShopping} />}
                    </button>
                    <button className="btn btn-outline-danger">
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <button className="btn btn-outline-secondary" onClick={toggleDetailProduct}>
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
            {seeDetail && <ProductDetail product={product} toggleDetailProduct={toggleDetailProduct} />}
        </>
    );
};

export default ProductCard_2;
