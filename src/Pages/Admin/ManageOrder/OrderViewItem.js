const OrderViewItem = ({ item }) => {
    return (
        <div
            className="shadow border w-100 border-primary mb-2 border-2 p-2 d-flex align-items-center justify-content-between"
            style={{ height: "75px", margin: "0 auto" }}
        >
            <div className="d-flex align-items-center">
                <img
                    src={item.product.images[0]}
                    alt="product"
                    style={{ width: "50px", height: "50px" }}
                    className="ms-4"
                />
                <p className="fw-bold mb-0 ms-3">{item.product.productName}</p>{" "}
            </div>

            <p className="mb-0">Phân loại: {item.product.category.name}</p>

            <div className="d-flex flex-row gap-5 align-items-center pe-5">
                <p className="mb-0">Đơn giá: {item.priceAtOrder.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                <p className="mb-0">SL: {item.quantity}</p>
                <p className="mb-0">
                    Thành tiền: {(item.priceAtOrder * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </p>
            </div>
        </div>
    );
};

export default OrderViewItem;
