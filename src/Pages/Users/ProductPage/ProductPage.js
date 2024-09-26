import LeftPage from "../../../Components/LeftPage/LeftPage";
import DefaultLayoutUserHomePage from "../../../Layouts/DefaultLayoutUserHomePage";
import "./ProductPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBagShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState } from "react";

const ProductPage = () => {
    const [quantity, setQuantity] = useState(1);
    const [seeDetail, setSeeDetail] = useState(false);

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const toggleDetailProduct = () => setSeeDetail(prev => !prev);

    const products = Array(7).fill({
        title: "Táo xanh tự nhiên organic được trồng tại đà lạt",
        price: "220.000 VNĐ",
        image: "./Images/vegetable.png"
    });

    return (
        <DefaultLayoutUserHomePage>
            <div className="row mt-5">
                <LeftPage />
                <div className="col-md-9 z-index-0">
                    <div className="row row-cols-1 row-cols-md-2 g-3">
                        {products.map((product, index) => (
                            <div className="col" key={index}>
                                <div className="card h-100 shadow-sm d-flex flex-row">
                                    <img src={product.image} className="card-img-left" alt="Product" />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text">Giá bán: {product.price}</p>
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
                        ))}
                    </div>
                </div>

                {seeDetail && (
                    <div className="position-fixed top-0 left-0 right-0 bottom-0 ml-n1 z-index-1000 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} onClick={toggleDetailProduct}>
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
                                    <h2 className="product-title">{products[0].title}</h2>
                                    <p className="product-price fw-bold">Giá bán: {products[0].price}</p>
                                    <div className="d-flex"><p className="product-category fw-bold">Danh mục: </p> <span className="ml-2">Trái cây</span></div>
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
                )}
            </div>
        </DefaultLayoutUserHomePage>
    );
}

export default ProductPage;
