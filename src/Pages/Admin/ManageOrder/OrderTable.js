import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import { useState } from "react";

const OrderTable = ({
  orders,
  UpdateOrderStatus,
  handleViewOrder,
}) => {
  const options = [
    { value: "PENDING", label: "Chờ xác nhận" },
    { value: "CONFIRMED", label: "Đã xác nhận" },
    { value: "SHIPPED", label: "Đang giao" },
    { value: "DELIVERED", label: "Đã giao" },
    { value: "CANCELLED", label: "Đã hủy" },
  ];

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Số đơn hàng mỗi trang

  // Tính toán các đơn hàng hiển thị
  const offset = currentPage * itemsPerPage;
  const currentOrders = orders.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Ngày tạo đơn</th>
            <th>Tên người nhận</th>
            <th>Trạng thái đơn hàng</th>
            <th>Tổng tiền đơn hàng</th>
            <th>Phương thức thanh toán</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders && currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>{order.name}</td>
                <td>
                  <Select
                    options={options}
                    defaultValue={options.find(
                      (option) => option.value === order.status
                    )}
                    onChange={(selected) =>
                      UpdateOrderStatus(
                        order._id,
                        selected.value,
                        order.user._id,
                        order.shoppingCart.products[0].product.images[0]
                      )
                    }
                  />
                </td>
                <td>{order.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                <td>{order.paymentMethod}</td>
                <td className="d-flex gap-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewOrder(order)}
                  >
                    Xem chi tiết đơn hàng
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default OrderTable;
