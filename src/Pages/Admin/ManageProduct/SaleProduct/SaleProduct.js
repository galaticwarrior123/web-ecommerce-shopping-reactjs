import './SaleProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import ProductAPI from '../../../../API/ProductAPI';
import { useEffect, useState } from 'react';
import DefaultLayoutAdmin from '../../../../Layouts/DefaultLayoutAdmin';

const SaleProduct = () => {
    const [saleProducts, setSaleProducts] = useState([]);

    const fetchSaleProducts = async () => {
        try {
            const response = await ProductAPI.getAllProducts();
            if (response.data && response.data.DT && response.data.DT.products) {
                const discountedProducts = response.data.DT.products.filter(
                    product => product.sale_price && product.sale_price < product.origin_price
                );
                setSaleProducts(discountedProducts);
            } else {
                console.error('Không có sản phẩm nào được trả về hoặc cấu trúc dữ liệu không đúng:', response.data);
            }
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm khuyến mãi:', error);
        }
    };

    const handleAddProduct = () => {
        console.log("Add product clicked");
    };

    const handleUpdateProduct = (productId) => {
        console.log("Update product ID:", productId);
    };

    const handleDeleteProduct = (productId) => {
        console.log("Delete product ID:", productId);
    };

    useEffect(() => {
        fetchSaleProducts();
    }, []);

    return (
        <DefaultLayoutAdmin>
            <div className="sale-product-container">
                <div className="sale-product-header">
                    <button className="btn btn-success add-product-button" onClick={handleAddProduct}>
                        <FontAwesomeIcon icon={faPlus} /> Thêm Sản Phẩm Khuyến Mãi
                    </button>
                </div>
                <div className="sale-product-grid">
                    {saleProducts.map((product, index) => (
                        <div key={index} className="sale-product-card">
                            <img src={product.images[0]} alt={product.productName} className="sale-product-image" />
                            <h2 className="sale-product-name">{product.productName}</h2>
                            {product.sale_price < product.origin_price ? (
                                <>
                                    <p className="sale-product-origin-price">Giá gốc: {product.origin_price} đ</p>
                                    <p className="sale-product-sale-price">Giá khuyến mãi: {product.sale_price} đ</p>
                                </>
                            ) : (
                                <p className="sale-product-origin-price">Giá: {product.origin_price} đ</p>
                            )}
                            <div className="sale-product-actions">
                                <button className="btn btn-warning" onClick={() => handleUpdateProduct(product.id)}>
                                    <FontAwesomeIcon icon={faEdit} /> Cập Nhật
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>
                                    <FontAwesomeIcon icon={faTrash} /> Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DefaultLayoutAdmin>
    );
};

export default SaleProduct;
