import DefaultLayoutUserHomePage from "../../../Layouts/DefaultLayoutUserHomePage";
import { useEffect, useState } from "react";
import OrderStatusBar from "./OrderStatusBar";
import OrderItem from "./OrderItem";
import OrderAPI from "../../../API/OrderAPI";
import { useNavigate } from "react-router-dom";
import "./OrderPage.css";
const OrderPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user._id);
  const [status, setStatus] = useState("PENDING");
  const [listOrder, setListOrder] = useState([]);
  const [totalOrder, setTotalOrder] = useState([]);

  const navigate = useNavigate();

  const fetchDataOrder = async () => {
    try {
      const response = await OrderAPI.GetOrders(user._id);
      const listOrder = response.data.DT;
      console.log(listOrder);
      setTotalOrder(listOrder);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const filterOrder = () => {
    if (status === "ALL") {
      setListOrder(totalOrder);
    } else setListOrder(totalOrder.filter((order) => order.status === status));
  };

  const handleOnClickOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  useEffect(() => {
    fetchDataOrder();
  }, []);

  useEffect(() => {
    if (totalOrder.length > 0) {
      filterOrder();
    }
  }, [status, totalOrder]);

  return (
    <DefaultLayoutUserHomePage>
      <div className="row mt-5">
        <OrderStatusBar
          status={status}
          setStatus={setStatus}
          totalOrder={totalOrder}
        />
        {listOrder.length === 0 && (
          <div className="text-center mt-4 text-primary">
            Bạn không có đơn hàng nào
          </div>
        )}
        {listOrder.length > 0 &&
          listOrder.map((order, index) => (
            <OrderItem
              key={index}
              order={order}
              handleOnClickOrder={handleOnClickOrder}
            />
          ))}
      </div>
    </DefaultLayoutUserHomePage>
  );
};
export default OrderPage;
