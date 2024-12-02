import { useEffect, useState } from "react";
import OrderAPI from "../../../API/OrderAPI";
import OrderTable from "./OrderTable";
import ModalViewOrder from "./ModalViewOrder";
import DefaultLayoutAdmin from "../../../Layouts/DefaultLayoutAdmin";
import NotificationAPI from "../../../API/NotificationAPI";
import { type } from "jquery";
const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showViewOrder, setShowViewOrder] = useState(false);
  const [order, setOrder] = useState({});

  useEffect(() => {
    fetchDataOrders();
  }, [page]);

  const fetchDataOrders = async () => {
    try {
      const res = await OrderAPI.GetOrderByAdmin({ page });
      if (res.status === 200) {
        setOrders(res.data.DT.orders);
        setTotalPages(res.data.DT.totalPages);
      }
    } catch (error) {
      console.log(error);
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
      await OrderAPI.UpdateOrderStatus(id, data).then(
        async (res) => {
          if (res.status === 200) {
            fetchDataOrders();
            await NotificationAPI.createNotification({
              recipient: userId,
              content: `Đơn hàng ${id} đã được cập nhật trạng thái thành ${status === "CANCELLED" ? "Đã hủy" : status === "DELIVERED" ? "Đã giao" : status === "SHIPPED" ? "Đang giao" : status === "CONFIRMED" ? "Đã xác nhận" : "Đang xử lý"}`,
              type: "ORDER",
              link: `/order/${id}`,
              image: image,
            });
          }
        }
      );
      
      // if (res.status === 200) {
      //   fetchDataOrders();
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DefaultLayoutAdmin>
      <OrderTable
        orders={orders}
        setPage={setPage}
        totalPages={totalPages}
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
