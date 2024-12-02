import './ShoppingHistory.css';
import AuthAPI from '../../../../API/AuthAPI';
import { useEffect, useState } from 'react';


const ShoppingHistory = ({ customerId, setShowViewHistory }) => {
    const [shoppingHistory, setShoppingHistory] = useState([]);

    const fetchShoppingHistory = async () => {
        try {
            const response = await AuthAPI.getShoppingHistory(customerId);
            console.log(response.data);
            setShoppingHistory(response.data);
        } catch (error) {
            console.error('Failed to fetch shopping history: ', error);
        }
    }

    useEffect(() => {
        fetchShoppingHistory();
    }, []);




    return (
        <div className="position-fixed w-100 h-100 manage-customer-container">
            <div className="manage-customer-card">
                <div className="manage-customer-card-header">
                    <h4 className="text-center mb-0">Lịch sử mua hàng</h4>
                </div>
                <div className="manage-customer-card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã đơn hàng</th>
                                    <th>Ngày đặt hàng</th>
                                    <th>Ngày giao hàng</th>
                                    <th>Trạng thái</th>
                                    <th>Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shoppingHistory.map((order, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{order._id}</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>{new Date(order.updatedAt).toLocaleDateString()}</td>
                                        <td>
                                            <span
                                                className={`badge ${order.status === "DELIVERED"
                                                        ? "badge-success"
                                                        : order.status === "CONFIRMED"
                                                            ? "badge-warning"
                                                            : "badge-danger"
                                                    }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>{order.totalAmount.toLocaleString()}đ</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="manage-customer-card-footer text-end">
                    <button
                        className="btn btn-secondary"
                        onClick={() => setShowViewHistory(false)}
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShoppingHistory