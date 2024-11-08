import { useState } from "react";
import PromotionAPI from "../../../../../API/PromotionAPi";
const UpdateProductSale = ({ handleCloseUpdateProductSale, productPromotion }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    };

    const [discount, setDiscount] = useState(productPromotion.discount);
    const [promotionName, setPromotionName] = useState(productPromotion.promotionName);
    const [promotionDescription, setPromotionDescription] = useState(productPromotion.description);
    const [startDate, setStartDate] = useState(formatDate(productPromotion.startDate));
    const [endDate, setEndDate] = useState(formatDate(productPromotion.endDate));

    const handleUpdateProductSale = () => {
        const promotionProduct = {
            discount,
            promotionName,
            description: promotionDescription,
            startDate,
            endDate,
        };

        PromotionAPI.updatePromotionProduct(productPromotion._id, promotionProduct)
            .then((response) => {
                if (response.data && response.data.DT) {
                    console.log("Cập nhật khuyến mãi cho sản phẩm thành công:", response.data.DT);
                    handleCloseUpdateProductSale();
                } else {
                    console.error("Không cập nhật được khuyến mãi cho sản phẩm:", response.data);
                }
            })
            .catch((error) => {
                console.error("Lỗi khi cập nhật khuyến mãi cho sản phẩm:", error);
            }
        );
    };
    
    return (
        <div className="position-fixed top-0 left-0 right-0 bottom-0 w-100 ml-n1 d-flex justify-content-center align-items-center" 
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 10 }} onClick={handleCloseUpdateProductSale}>
            <div className="update-product-sale bg-white d-flex justify-content-center" 
                style={{ maxHeight: "500px", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
                <div className="row p-2 w-100">
                    <div className="col-12">
                        <h1 className="text-center fw-bold fs-3">Cập nhật khuyến mãi cho sản phẩm</h1>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="discount">Giảm giá (%)</label>
                            <input type="number" className="form-control" id="discount" value={discount} 
                                onChange={(e) => setDiscount(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="start-date">Ngày bắt đầu</label>
                            <input type="date" className="form-control" id="start-date" value={startDate} 
                                onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="end-date">Ngày kết thúc</label>
                            <input type="date" className="form-control" id="end-date" value={endDate} 
                                onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary" onClick={handleUpdateProductSale}>Cập nhật khuyến mãi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductSale;
