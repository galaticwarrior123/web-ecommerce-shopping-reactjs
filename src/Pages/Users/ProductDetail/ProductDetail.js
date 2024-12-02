import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBagShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './ProductDetail.css';
import DefaultLayoutUserHomePage from '../../../Layouts/DefaultLayoutUserHomePage';
import { useLocation } from 'react-router-dom';
import ProductAPI from '../../../API/ProductAPI';
import ShoppingCartAPI from '../../../API/ShoppingCartAPI';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../../../context/CartContext';
import ReviewAPI from '../../../API/ReviewAPI';
import Review from '../ReviewPage/Review';
const ProductDetail = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [isUser, setIsUser] = useState(false);
    const location = useLocation();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const product_id = location.pathname.split('/').pop();
    const { fetchShoppingCartQuantity } = useCart();
    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    useEffect(() => {
        if (user) {
            setIsUser(true);
        }
    }, [user]);

    const handleAddToCart = async () => {
        try {
            if(product.quantity < quantity){
                toast.error("Số lượng sản phẩm trong kho không đủ.");
                return;
            }
            const response = await ShoppingCartAPI.AddProductToCart(product._id, quantity);
            toast.success("Sản phẩm đã được thêm vào giỏ hàng.");
            fetchShoppingCartQuantity();
        } catch (error) {
            console.error("Error adding product to cart:", error);
            toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng.");
        }
    }

    useEffect(() => {
        const fetchSimilarProducts = async () => {
            try {
                const response = await ProductAPI.getSimilarProducts(product_id);
                setSimilarProducts(response.data.data || []);
            } catch (error) {
                console.error("Error fetching similar products:", error);
            }
        };
        const fetchProduct = async () => {
            try {
                const response = await ProductAPI.getProductById(product_id);
                if (response.data && response.data.DT) {
                    setProduct(response.data.DT);
                } else {
                    console.error('Không có sản phẩm nào được trả về hoặc cấu trúc dữ liệu không đúng:', response.data);
                }
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            }
        };
        const increaseViewCount = async () => {
            try {
                const response = await ProductAPI.increaseViewCount(product_id);
            } catch (error) {
                console.error("Error increasing view count:", error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await ReviewAPI.GetReviewByProduct(product_id);
                setReviews(response.data.DT);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchReviews();
        increaseViewCount();
        fetchProduct();
        fetchSimilarProducts();
    }, [product_id]);



    return (
        <DefaultLayoutUserHomePage>

            <div className="detail-product bg-white mt-5 p-4">
                <div className="row w-100 h-100">
                    <div className="col-md-6" style={{ zIndex: 0 }} >
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
                                    Giá bán: {product.origin_price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                                </p>
                                <p className="product-price fw-bold">
                                    Giá khuyến mãi: {product.sale_price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                                </p>
                            </>
                        ) : (
                            <p className="product-price fw-bold">
                                Giá bán: {product.origin_price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                            </p>
                        )}
                        <div className="d-flex "><p className="product-category fw-bold">Danh mục: </p> <span className="ml-2 mb-1 d-flex align-items-center">{product.category?.name}</span></div>
                        <div className="d-flex "><p className="product-origin fw-bold">Xuất xứ:</p> <span className="ml-2 mb-1 d-flex align-items-center">{product.origin}</span></div>
                        <div className="d-flex "><p className="product-supplier fw-bold">Nhà cung cấp:</p><span className="ml-2 mb-1 d-flex align-items-center">{product.supplier}</span></div>
                        <div className="d-flex "><p className="product-in-stock fw-bold">Trạng thái: {product.quantity > 0 ? 'Còn ' + product.quantity + ' sản phẩm còn trong kho' : 'Hết hàng'}</p></div>
                        <div className="d-flex "><p className="product-description m-0"><span className="fw-bold">Mô tả:</span> <span className="ml-2">
                            {product.description ? product.description : 'Không có mô tả'}
                        </span></p></div>

                        <div className="quantity-selector d-flex align-items-center mt-3">
                            <label htmlFor="quantity" className="me-2 fw-bold">Số lượng:</label>
                            <div className="input-group">
                                <button className="btn btn-outline-secondary" type="button" onClick={decreaseQuantity} id="decrease">-</button>
                                <input type="text" className="form-control text-center h-100" value={quantity} id="quantity" readOnly />
                                <button className="btn btn-outline-secondary" type="button" onClick={increaseQuantity} id="increase">+</button>
                            </div>
                        </div>

                        {user ? (
                            <div className="button-group mt-4">
                                <button className="btn btn-primary me-2" onClick={handleAddToCart} id="btn-addProductToCart">
                                    <FontAwesomeIcon icon={faBagShopping} /> Thêm vào giỏ hàng
                                </button>
                                <button className="btn btn-outline-danger me-2">
                                    <FontAwesomeIcon icon={faHeart} /> Yêu thích
                                </button>
                            </div>) : (
                            <span className="text-danger mt-3">Đăng nhập để thêm sản phẩm vào giỏ hàng</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <h3>Đánh giá sản phẩm</h3>
            {reviews.length === 0 && <h4>Chưa có đánh giá nào</h4>}
            {reviews.length > 0 && <h4>Số lượng đánh giá: ({reviews.length})</h4>}
            {reviews.length > 0 && <Review reviews={reviews} />}


            {/* Similar Products Section */}
            <div className="similar-products mt-5">
                <h3>Sản phẩm tương tự</h3>
                <div className="row">
                    {similarProducts.length > 0 ? similarProducts.map((similarProduct) => (
                        <div key={similarProduct._id} className="col-md-3 mb-4" onClick={() => window.location.href = `/product/${similarProduct._id}`}>
                            <div className="card">
                                <img src={similarProduct.images[0] || "https://via.placeholder.com/150"} alt={similarProduct.productName} className="img-similar-product" />
                                <div className="card-body">
                                    <h5 className="card-title">{similarProduct.productName}</h5>
                                    <p className="card-text-similar-product" style={{ fontSize: '1.2rem' }}>
                                        {similarProduct.sale_price ? (
                                            <>
                                                <span className="text-decoration-line-through">Giá bán: {similarProduct.origin_price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</span>
                                                <span className="text-danger">Giá khuyến mãi: {similarProduct.sale_price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</span>
                                            </>
                                        ) : (
                                            <span>Giá bán: {similarProduct.origin_price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )) : <p>Không có sản phẩm tương tự</p>
                    }
                </div>
            </div>


        </DefaultLayoutUserHomePage>
    );
}

export default ProductDetail;
