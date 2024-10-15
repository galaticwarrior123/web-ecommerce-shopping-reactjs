import { useState } from "react";

const OrderStatusBar = ({ status, setStatus, totalOrder }) => {
  const statusList = [
    { label: "Tất cả", value: "ALL" },
    { label: "Chờ xác nhận", value: "PENDING" },
    { label: "Đã xác nhận", value: "CONFIRMED" },
    { label: "Đang giao", value: "SHIPPING" },
    { label: "Đã giao", value: "DELIVERED" },
    { label: "Đã hủy", value: "CANCELLED" },
  ];

  return (
    <div className="d-flex justify-content-center flex-column">
      <h3 className="text-center fs-1">Đơn hàng của bạn</h3>
      <div
        className="bg-white w-100 align-items-center justify-content-between d-flex flex-row"
        style={{ height: "75px", margin: "0 auto" }}
      >
        {statusList.map((item, index) => (
          <div
            key={index}
            className={`d-flex justify-content-center align-items-center border-bottom border-2 p-2 flex-row ${status === item.value ? "text-primary border-primary" : ""
              }`}
            style={{ width: "20%" }}
            onClick={() => setStatus(item.value)}
          >
            {item.label}{" "}
            <p className="mb-0">
              (
              {item.value === "ALL"
                ? totalOrder.length
                : totalOrder.filter((order) => order.status === item.value).length}
              )
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusBar;
