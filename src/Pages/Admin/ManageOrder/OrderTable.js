import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import Select from "react-select";

const OrderTable = ({
  orders,
  totalPages,
  setPage,
  UpdateOrderStatus,
  handleViewOrder,
}) => {
  const options = [
    {
      value: "PENDING",
      label: "Đang xử lý",
    },
    {
      value: "CONFIRMED",
      label: "Đã xác nhận",
    },
    {
      value: "SHIPPED",
      label: "Đang giao",
    },
    {
      value: "DELIVERED",
      label: "Đã giao",
    },
    {
      value: "CANCELLED",
      label: "Đã hủy",
    },
  ];

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
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
          {orders && orders.length > 0 ? (
            orders.map((order) => (
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
                      UpdateOrderStatus(order._id, selected.value, order.user._id)
                    }
                  />
                </td>
                <td>{order.totalAmount}</td>
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
          pageCount={totalPages}
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
