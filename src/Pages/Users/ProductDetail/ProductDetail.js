import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBagShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './ProductDetail.css';
import DefaultLayoutUserHomePage from '../../../Layouts/DefaultLayoutUserHomePage';
import { useLocation } from 'react-router-dom';
import ProductAPI from '../../../API/ProductAPI';

const ProductDetail = () => {
    const location = useLocation();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState({});
    const product_id = location.pathname.split('/').pop();

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    console.log('Product: ', product);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await ProductAPI.getProductById(product_id);
                console.log('API Response:', response);
                if (response.data && response.data.DT) {
                    setProduct(response.data.DT);
                } else {
                    console.error('Không có sản phẩm nào được trả về hoặc cấu trúc dữ liệu không đúng:', response.data);
                }
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            }
        };

        fetchProduct();
    }, [product_id]);

    return (
        <DefaultLayoutUserHomePage>
            <div className="detail-product bg-white mt-5 p-4">
                <div className="row w-100 h-100">
                    <div className="col-md-6">
                        <Swiper spaceBetween={1} slidesPerView={1} navigation pagination={{ clickable: true }} loop style={{ zIndex: 1051 }}>
                            {product.images && product.images.map((image, idx) => (
                                <SwiperSlide key={idx} className="swiper-slide">
                                    <img src={image} alt={`Product Image ${idx + 1}`} className="swiper-slide-img" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="col-md-6">
                        <h2 className="product-title">Tên sản phẩm: {product.productName}</h2>
                        {product.sale_price ? (
                            <>
                                <p className="product-price fw-bold text-danger text-decoration-line-through">
                                    Giá bán: {product.origin_price}
                                </p>
                                <p className="product-price fw-bold">
                                    Giá khuyến mãi: {product.sale_price}
                                </p>
                            </>
                        ) : (
                            <p className="product-price fw-bold">
                                Giá bán: {product.origin_price}
                            </p>
                        )}
                        <div className="d-flex "><p className="product-category fw-bold">Danh mục: </p> <span className="ml-2">{product.category?.name}</span></div>
                        <div className="d-flex "><p className="product-origin fw-bold">Xuất xứ:</p> <span className="ml-2">Việt Nam</span></div>
                        <div className="d-flex "><p className="product-supplier fw-bold">Nhà cung cấp:</p><span className="ml-2">Cửa hàng trái cây sạch</span></div>
                        <div className="d-flex "><p className="product-in-stock fw-bold">Trạng thái: {product.quantity > 0 ? 'Còn '+product.quantity + ' sản phẩm còn trong kho' : 'Hết hàng'}</p></div>
                        <div className="d-flex "><p className="product-description m-0"><span className="fw-bold">Mô tả:</span> <span className="ml-2">
                            {product.description ? product.description : 'Không có mô tả'}
                            </span></p></div>

                        <div className="quantity-selector d-flex align-items-center mt-3">
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
                                <FontAwesomeIcon icon={faHeart} /> Yêu thích
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayoutUserHomePage>
    );
}

export default ProductDetail;
