import './AddProductSale.css';

import { useState, useEffect } from 'react';
import PromotionAPI from '../../../../../API/PromotionAPi';

const AddProductSale = ({ product, handleCloseAddProductPromotion }) => {
    const [discount, setDicount] = useState(0);
    const [promotionName, setPromotionName] = useState('');
    const [promotionDescription, setPromotionDescription] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleAddPromotion = async (productId) => {
        const promotionProduct = {
            discount,
            promotionName,
            description: promotionDescription,
            startDate,
            endDate
        };

        try {
            const response = await PromotionAPI.createPromotionProduct(productId, promotionProduct);
            if (response.data && response.data.DT) {
                console.log('Thêm khuyến mãi cho sản phẩm thành công:', response.data.DT);
                handleCloseAddProductPromotion();
            } else {
                console.error('Không thêm được khuyến mãi cho sản phẩm:', response.data);
            }
        } catch (error) {
            console.error('Lỗi khi thêm khuyến mãi cho sản phẩm:', error);
        }
    };

    return (
        <div className="position-fixed top-0 left-0 right-0 bottom-0 w-100 ml-n1 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex:10 }}
                        onClick={handleCloseAddProductPromotion}>
            <div className="add-product-sale bg-white d-flex justify-content-center" style={{ maxHeight: "500px", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
                <div className="row p-2 w-100" >
                    <div className="col-12">
                        <h1 className="text-center fw-bold fs-3">Thêm khuyến mãi cho sản phẩm</h1>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="promotion-name">Tên khuyến mãi</label>
                            <input type="text" className="form-control" id="promotion-name" value={promotionName} onChange={(e) => setPromotionName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="promotion-description">Mô tả</label>
                            <textarea className="form-control" id="promotion-description" value={promotionDescription} onChange={(e) => setPromotionDescription(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="discount">Giảm giá (%)</label>
                            <input type="number" className="form-control" id="discount" value={discount} onChange={(e) => setDicount(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="start-date">Ngày bắt đầu</label>
                            <input type="date" className="form-control" id="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="end-date">Ngày kết thúc</label>
                            <input type="date" className="form-control" id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary" onClick={() => handleAddPromotion(product._id)}>Thêm khuyến mãi</button>
                        </div>
                    </div>
                </div>
            
            </div>
            
        </div>
    )

}

export default AddProductSale;