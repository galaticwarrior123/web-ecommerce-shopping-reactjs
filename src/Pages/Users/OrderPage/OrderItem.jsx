import OrderProductItem from "./OrderProductItem";

const OrderItem = ({ order, handleOnClickOrder }) => {
  const statusLabels = {
    PENDING: "Chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    CANCELLED: "Đã hủy",
    SHIPPED: "Đang vận chuyển",
    DELIVERED: "Đã giao",
  };
  return (
    <div
      className="bg-white w-100 border border-2 border-primary d-flex flex-column justify-content-center mb-2"
      style={{ height: "auto", margin: "0 auto", cursor: "pointer" }}
      onClick={() => handleOnClickOrder(order._id)}
    >
      <div
        className="d-flex flex-row justify-content-between align-items-center border-bottom border-2"
        style={{ height: "60px" }}
      >
        <p className="fw-bold mb-0 ms-3">Mã đơn hàng: {order._id}</p>
        <p className="fw-bold mb-0 me-3 text-primary"> {statusLabels[order.status] || order.status}
        </p>
      </div>
      <div>
        {order.shoppingCart.products.map((product) => (
          <OrderProductItem
            key={product._id}
            product={product.product}
            quantity={product.quantity}
            priceAtOrder={product.priceAtOrder}
          />
        ))}
      </div>
      <div
        className="border-top border-2 d-flex justify-content-end align-items-center"
        style={{ height: "60px" }}
      >
        <span className="fw-bold me-3">
          Tổng tiền: {(order.totalAmount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </span>
      </div>
    </div>
  );
};
export default OrderItem;
