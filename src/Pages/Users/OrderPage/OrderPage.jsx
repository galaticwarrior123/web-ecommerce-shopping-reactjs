import DefaultLayoutUserHomePage from "../../../Layouts/DefaultLayoutUserHomePage";
import { useEffect, useState } from "react";
import OrderStatusBar from "./OrderStatusBar";
import OrderItem from "./OrderItem";
import OrderAPI from "../../../API/OrderAPI";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./OrderPage.css";

const OrderPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [status, setStatus] = useState("PENDING");
  const [listOrder, setListOrder] = useState([]);
  const [totalOrder, setTotalOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Thêm state cho trang hiện tại
  const [ordersPerPage] = useState(10); // Số đơn hàng hiển thị trên mỗi trang

  const navigate = useNavigate();

  const fetchDataOrder = async () => {
    try {
      const response = await OrderAPI.GetOrders(user._id);
      const listOrder = response.data.DT;
      setTotalOrder(listOrder);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filterOrder = () => {
    if (status === "ALL") {
      setListOrder(totalOrder);
    } else {
      setListOrder(totalOrder.filter((order) => order.status === status));
    }
  };

  const handleOnClickOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  // Tính toán số trang và phân trang
  const indexOfLastOrder = (currentPage + 1) * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = listOrder.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected); // Cập nhật trang khi người dùng chọn một trang khác
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
      <div className="row mt-5 border border-2 rounded-3 px-3 mx-5 ">
        <OrderStatusBar
          status={status}
          setStatus={setStatus}
          totalOrder={totalOrder}
        />
        {currentOrders.length === 0 && (
          <div className="text-center mt-4 text-primary">
            Bạn không có đơn hàng nào
          </div>
        )}
        {currentOrders.length > 0 &&
          currentOrders.map((order, index) => (
            <OrderItem
              key={index}
              order={order}
              handleOnClickOrder={handleOnClickOrder}
            />
          ))}
        {/* Phân trang */}
        <div className="d-flex justify-content-center mt-4">
          <ReactPaginate
            previousLabel={"< Previous"}
            nextLabel={"Next >"}
            pageCount={Math.ceil(listOrder.length / ordersPerPage)} // Tổng số trang
            onPageChange={handlePageClick} // Hàm xử lý khi người dùng chọn trang
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
          />
        </div>
      </div>
    </DefaultLayoutUserHomePage>
  );
};

export default OrderPage;
