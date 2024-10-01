import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBagShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ProductDetail = (product, toggleDetailProduct) => {
    const [quantity, setQuantity] = useState(1);
    console.log(product);

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };
    return (
        <div className="position-fixed top-0 left-0 right-0 bottom-0 ml-n1 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000 }} onClick={toggleDetailProduct}>
            <div className="detail-product bg-white" onClick={(e) => e.stopPropagation()}>
                <div className="row w-100 h-100">
                    <div className="col-md-6">
                        <Swiper spaceBetween={10} slidesPerView={1} navigation pagination={{ clickable: true }} loop>
                            {["image1.png", "image2.png", "image3.png"].map((image, idx) => (
                                <SwiperSlide key={idx}>
                                    <img src={`./Images/${image}`} alt={`Product Image ${idx + 1}`} className="swiper-slide-img" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="col-md-6">
                        <h2 className="product-title">{product.productName}</h2>
                        <p className="product-price fw-bold">Giá bán: {product.price}</p>
                        <div className="d-flex"><p className="product-category fw-bold">Danh mục: </p> <span className="ml-2">{product.category.name}</span></div>
                        <div className="d-flex"><p className="product-origin fw-bold">Xuất xứ:</p> <span className="ml-2">Việt Nam</span></div>
                        <div className="d-flex"><p className="product-supplier fw-bold">Nhà cung cấp:</p><span className="ml-2">Cửa hàng trái cây sạch</span></div>
                        <div className="d-flex"><p className="product-in-stock fw-bold">Còn hàng: 100 sản phẩm</p></div>
                        <div className="d-flex"><p className="product-description m-0"><span className="fw-bold">Mô tả:</span> <span className="ml-2">Táo xanh tự nhiên organic được trồng tại Đà Lạt, không chất bảo quản, không chất tạo màu, không chất tạo vị, an toàn cho sức khỏe.</span></p></div>

                        <div className="quantity-selector d-flex align-items-center">
                            <label htmlFor="quantity" className="me-2 fw-bold">Số lượng:</label>
                            <div className="input-group">
                                <button className="btn btn-outline-secondary" type="button" onClick={decreaseQuantity}>-</button>
                                <input type="text" className="form-control text-center h-100" value={quantity} id="quantity" readOnly />
                                <button className="btn btn-outline-secondary" type="button" onClick={increaseQuantity}>+</button>
                            </div>
                        </div>

                        <div className="button-group mt-4">
                            <button className="btn btn-primary me-2">
                                <FontAwesomeIcon icon={faBagShopping} /> Thêm vào giỏ hàng
                            </button>
                            <button className="btn btn-outline-danger me-2">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ProductDetail;