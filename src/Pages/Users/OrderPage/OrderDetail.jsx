import DefaultLayoutUserHomePage from "../../../Layouts/DefaultLayoutUserHomePage";
import { useParams } from "react-router-dom";
import OrderAPI from "../../../API/OrderAPI";
import { useEffect, useState } from "react";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OrderDetail = () => {
  const params = useParams();
  const orderId = params.orderId;
  const [order, setOrder] = useState();
  const statusLabels = {
    PENDING: "Chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    CANCELLED: "Đã hủy",
    SHIPPED: "Đang vận chuyển",
    DELIVERED: "Đã giao",
  };

  const statusColors = {
    PENDING: "text-warning",
    CONFIRMED: "text-success",
    CANCELLED: "text-danger",
    SHIPPED: "text-info",
    DELIVERED: "text-primary",
  };
  const fetchDataOrder = async () => {
    try {
      const response = await OrderAPI.GetOrderById(orderId);
      const order = response.data.DT;
      setOrder(order);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchDataOrder();
  }, []);

  return (
    <DefaultLayoutUserHomePage>
      <h3 className="text-center fs-1 mt-4">Chi tiết đơn hàng</h3>
      <div class="mt-2 border border-2 rounded-3 px-3 mx-5">
        <div
          className="d-flex justify-content-between align-items-center bg"
          style={{ height: "75px", margin: "0 auto" }}
        >
          <span
            className="d-flex align-items-center gap-2 ms-2 fw-bold" style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => {
              window.history.back();
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Trở lại
          </span>

          <div>
            <span className="text-center p-2">Mã đơn hàng: {order?._id}</span>
            <span
              className={`p-2 fw-bold ${statusColors[order?.status] || "text-secondary"} text-uppercase`}
              style={{ fontSize: "18px" }}
            >
              {statusLabels[order?.status] || "Chưa xác định"}
            </span>
          </div>
        </div>

        {order && order.shoppingCart.products && (
          <div className="d-flex justify-content-center flex-column">

            {order.shoppingCart.products.map((product) => {
              return (
                <div
                  key={product._id}
                  className="shadow border w-100 border-primary mb-2 border-2 p-2 d-flex align-items-center justify-content-between"
                  style={{ height: "75px", margin: "0 auto", cursor: "pointer" }}
                  onClick={() => { window.location.href = `/product/${product.product._id}` }}
                >
                  {/* Tên sản phẩm và hình ảnh - Căn trái */}
                  <div className="d-flex align-items-center" style={{ flex: 1 }}>
                    <img
                      src={product.product.images[0] || "https://via.placeholder.com/150"}
                      alt={product.product.productName}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "4px",
                        marginRight: "10px",
                      }}
                    />
                    <p
                      className="fw-bold mb-0"
                      style={{ fontSize: "18px", color: "#333", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {product.product.productName}
                    </p>
                  </div>

                  {/* Thông tin đơn giá, số lượng, thành tiền - Căn phải */}
                  <div
                    className="d-flex flex-row gap-4 align-items-center justify-content-end"
                    style={{ flex: 2, textAlign: "right" }}
                  >
                    <p className="mb-0 " style={{ fontSize: "18px" }}>
                      Đơn giá: {product.priceAtOrder.toLocaleString("vi-VN")} đ
                    </p>
                    <p className="mb-0 " style={{ fontSize: "18px" }}>
                      Số lượng: {product.quantity}
                    </p>
                    <p className="mb-0 fw-bold text-primary" style={{ fontSize: "18px" }}>
                      Thành tiền: {(product.priceAtOrder * product.quantity).toLocaleString("vi-VN")} đ
                    </p>
                  </div>
                </div>
              );
            })}


            <div
              className="d-flex flex-column shadow border w-100 border-primary mb-2 border-2 p-4 gap-3"
              style={{ height: "auto", margin: "0 auto" }}
            >
              <div className="  d-flex align-items-center justify-content-around">
                <div className="d-flex flex-column justify-content-between gap-4">
                  <p className="fw-bold mb-0 ms-3 d-flex gap-3" style={{ fontSize: "18px" }}>
                    Người nhận: {order.name ? order.name : ""}
                  </p>
                  <p className="fw-bold mb-0 ms-3 d-flex gap-3" style={{ fontSize: "18px" }}>
                    Địa chỉ nhận hàng: {order.address ? order.address : ""}
                  </p>
                  <p className="fw-bold mb-0 ms-3 d-flex gap-3" style={{ fontSize: "18px" }}>
                    Số điện thoại: {order.phone ? order.phone : ""}
                  </p>
                </div>

                <div className="d-flex flex-column justify-content-between gap-4">

                  <p className="fw-bold mb-0 ms-3" style={{ fontSize: "18px" }}>
                    Thời gian đặt hàng: {new Date(order?.createdAt).toLocaleString()}
                  </p>
                  <p className="fw-bold mb-0 ms-3" style={{ fontSize: "18px" }}>
                    Phương thức thanh toán: {order.paymentMethod === "COD" ? "Tiền mặt" : "Chuyển khoản"}
                  </p>
                  <p className="fw-bold mb-0 ms-3 text-success" style={{ fontSize: "18px" }}>
                    Tổng tiền: {order.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DefaultLayoutUserHomePage>
  );
};
export default OrderDetail;
