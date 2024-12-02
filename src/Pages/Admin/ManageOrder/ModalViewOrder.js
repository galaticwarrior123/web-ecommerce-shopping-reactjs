import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import OrderViewItem from "./OrderViewItem";

const ModalViewOrder = ({ show, setShowView, order }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [discountCode, setDiscountCode] = useState({});

  const handleClose = () => {
    setShowView(false);
  };

  useEffect(() => {
    if (order) {
      setName(order.name);
      setPhone(order.phone);
      setAddress(order.address);
      setProducts(order.shoppingCart?.products);
      setTotalAmount(order.totalAmount);
      setPaymentMethod(order.paymentMethod);
      setDiscountCode(order.discountCode);
    }
  }, [order]);
  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Tên người nhận</label>
              <input
                type="text"
                className="form-control"
                value={name}
                disabled
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Địa chỉ</label>
              <textarea className="form-control" value={address} disabled />
            </div>

            <div className="col-md-4">
              <label className="form-label">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                disabled
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Sản phẩm: </label>
              {products &&
                products.length > 0 &&
                products.map((product) => {
                  return <OrderViewItem item={product} />;
                })}
            </div>
            <div className="col-md-4">
              <label className="form-label">Mã giảm giá: </label>
              <input
                type="text"
                className="form-control"
                value={discountCode?.discountCode}
                disabled
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Tổng tiền: </label>
              <input
                type="text" // Sử dụng type="text" thay vì "number"
                className="form-control"
                value={Number(totalAmount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                disabled
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Phương thức thanh toán: </label>
              <input
                type="text"
                className="form-control"
                value={paymentMethod}
                disabled
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalViewOrder;
