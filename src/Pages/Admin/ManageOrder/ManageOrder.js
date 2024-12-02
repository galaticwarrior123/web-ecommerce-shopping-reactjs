import { useEffect, useState } from "react";
import OrderAPI from "../../../API/OrderAPI";
import OrderTable from "./OrderTable";
import ModalViewOrder from "./ModalViewOrder";
import DefaultLayoutAdmin from "../../../Layouts/DefaultLayoutAdmin";
import NotificationAPI from "../../../API/NotificationAPI";
import OrderStatusBar from "../../Users/OrderPage/OrderStatusBar";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [status, setStatus] = useState("ALL");
  const [showViewOrder, setShowViewOrder] = useState(false);
  const [order, setOrder] = useState({});

  useEffect(() => {
    fetchDataOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, status]);

  const fetchDataOrders = async () => {
    try {
      const res = await OrderAPI.GetOrderByAdmin();
      if (res.status === 200) {
        setOrders(res.data.DT.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterOrders = () => {
    if (status === "ALL") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === status));
    }
  };

  const handleViewOrder = (order) => {
    setOrder(order);
    setShowViewOrder(true);
  };

  const UpdateOrderStatus = async (id, status, userId, image) => {
    try {
      const data = {
        status: status,
      };
      await OrderAPI.UpdateOrderStatus(id, data).then(async (res) => {
        if (res.status === 200) {
          fetchDataOrders();
          await NotificationAPI.createNotification({
            recipient: userId,
            content: `Đơn hàng ${id} đã được cập nhật trạng thái thành ${status === "CANCELLED"
              ? "Đã hủy"
              : status === "DELIVERED"
                ? "Đã giao"
                : status === "SHIPPED"
                  ? "Đang giao"
                  : status === "CONFIRMED"
                    ? "Đã xác nhận"
                    : "Chờ xác nhận"
              }`,
            type: "ORDER",
            link: `/order/${id}`,
            image: image,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DefaultLayoutAdmin>
      <OrderStatusBar
        status={status}
        setStatus={setStatus}
        totalOrder={orders}
      />
      <OrderTable
        orders={filteredOrders}
        UpdateOrderStatus={UpdateOrderStatus}
        handleViewOrder={handleViewOrder}
      />
      <ModalViewOrder
        show={showViewOrder}
        setShowView={setShowViewOrder}
        order={order}
      />
    </DefaultLayoutAdmin>
  );
};

export default ManageOrder;
