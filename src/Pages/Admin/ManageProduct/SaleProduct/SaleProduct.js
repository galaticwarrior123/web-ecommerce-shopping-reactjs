import './SaleProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import PromotionAPI from '../../../../API/PromotionAPi';
import { useEffect, useState } from 'react';
import DefaultLayoutAdmin from '../../../../Layouts/DefaultLayoutAdmin';
import ListProduct from './ListProduct/ListProduct';
import AddProductSale from './AddProductSale/AddProductSale';
import UpdateProductSale from './UpdateProductSale/UpdateProductSale';

const SaleProduct = () => {
    const [saleProducts, setSaleProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [productPromotion, setProductPromotion] = useState({});
    const [showAddProductSaleModal, setShowAddProductSaleModal] = useState(false);
    const [showAddProductPromotionModal, setShowAddProductPromotionModal] = useState(false);
    const [showUpdateProductPromotionModal, setShowUpdateProductPromotionModal] = useState(false);
    const fetchSaleProducts = async () => {
        try {
            const response = await PromotionAPI.getPromotionProducts();
            if (response.data && response.data.DT) {
                setSaleProducts(response.data.DT);
            }
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm khuyến mãi:', error);
        }
    };

    const handleAddProduct = () => {
        setShowAddProductSaleModal(true);
    };

    const handleUpdateProductPromotion = (productPromotion) => {
        setProductPromotion(productPromotion);
        setShowUpdateProductPromotionModal(true);
    };

    const handleDeleteProductPromotion = (Id) => {
        const isDelete = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm khuyến mãi này không?');
        if (isDelete) {
            PromotionAPI.deletePromotionProduct(Id)
                .then((response) => {
                    setSaleProducts(saleProducts.filter((productPromotion) => productPromotion._id !== Id));
                })
                .catch((error) => {
                    console.error('Lỗi khi xóa sản phẩm khuyến mãi:', error);
                });
        }
    };

    useEffect(() => {
        fetchSaleProducts();
    }, []);

    const handleCloseAddProductSale = () => {
        setShowAddProductSaleModal(false);
    };

    const handleAddPromotionProduct = (product) => {
        setShowAddProductPromotionModal(true);
        setProduct(product);

    };

    const handleCloseAddProductPromotion = () => {
        setShowAddProductPromotionModal(false);
        setShowAddProductSaleModal(false);
        fetchSaleProducts();
    }

    const handleCloseUpdateProductPromotion = () => {
        setShowUpdateProductPromotionModal(false);
        fetchSaleProducts();
    }


    return (
        <>
            {showAddProductSaleModal && (
                <ListProduct handleCloseAddProductSale={handleCloseAddProductSale} onClickAddPromotion={handleAddPromotionProduct} />
            )}

            {showAddProductPromotionModal && (
                <AddProductSale product={product} handleCloseAddProductPromotion={handleCloseAddProductPromotion} />
            )}

            {showUpdateProductPromotionModal && (
                <UpdateProductSale productPromotion={productPromotion} handleCloseUpdateProductSale={handleCloseUpdateProductPromotion} />
            )}


            <DefaultLayoutAdmin>
                <div className="sale-product-container">
                    <div className="sale-product-header">
                        <button className="btn btn-success add-product-button" onClick={handleAddProduct}>
                            <FontAwesomeIcon icon={faPlus} /> Thêm Sản Phẩm Khuyến Mãi
                        </button>
                    </div>
                    <div className="sale-product-grid">
                        {saleProducts.map((productPromotion, index) => (
                            <div key={index} className="sale-product-card">
                                <img alt={productPromotion.product.productName} className="sale-product-image" />
                                <h2 className="sale-product-name">{productPromotion.product.productName}</h2>
                                <p className="sale-product-origin-price">Giá gốc: {productPromotion.product.origin_price} đ</p>
                                <p className="sale-product-sale-price">Giá khuyến mãi: {productPromotion.product.sale_price} đ</p>
                                <p className="sale-product-promotion">Khuyến mãi: {productPromotion.discount}%</p>
                                <p className="sale-product-description">Mô tả khuyến mãi: {productPromotion.description}</p>
                                <p className="sale-product-start-date">Ngày bắt đầu: {new Date(productPromotion.startDate).toLocaleDateString('vi-VN', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}</p>
                                <p className="sale-product-end-date">
                                    Ngày kết thúc: {new Date(productPromotion.endDate).toLocaleDateString('vi-VN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                </p>
                                <div className="sale-product-actions">
                                    <button className="btn btn-warning" onClick={() => handleUpdateProductPromotion(productPromotion)}>
                                        <FontAwesomeIcon icon={faEdit} /> Cập Nhật
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteProductPromotion(productPromotion._id)}>
                                        <FontAwesomeIcon icon={faTrash} /> Xóa
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DefaultLayoutAdmin>
        </>

    );
};

export default SaleProduct;
