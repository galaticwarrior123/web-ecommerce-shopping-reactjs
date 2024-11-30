import DefaultLayoutAdmin from '../../../Layouts/DefaultLayoutAdmin';
import './ManageCustomer.css';
import AuthAPI from '../../../API/AuthAPI';
import { useEffect, useState } from 'react';
import ShoppingHistory from './ShoppingHistory/ShoppingHistory';

const ManageCustomer = () => {
    const [customers, setCustomers] = useState([]);
    const [showViewHistory, setShowViewHistory] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState("");

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await AuthAPI.getAllCustomers();
                setCustomers(response.data);
            } catch (error) {
                console.error('Failed to fetch customers: ', error);
            }
        }

        fetchCustomers();
    }, []);

    const handleClickShowShoppingHistory = (customerId) => {
        setSelectedCustomerId(customerId);
        setShowViewHistory(true);
    };

    return (
        <>
            {showViewHistory && (
                <ShoppingHistory customerId={selectedCustomerId} setShowViewHistory={setShowViewHistory} />
            )}
            <DefaultLayoutAdmin>

                <div className="manage-customer-page-container">
                    <div className="customer-grid row">
                        {customers.map((customer, index) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center mt-3" key={index}>
                                <div className="customer-card">
                                    <div className="customer-avatar">
                                        <img src={customer.avatar || "https://via.placeholder.com/150"} alt="avatar" />
                                    </div>
                                    <div className="customer-info">
                                        <h5>{customer.username || "No Name"}</h5>
                                        <p>{customer.email}</p>
                                    </div>
                                    <div className="customer-action">
                                        <button className="btn btn-primary btn-view-history" onClick={()=>handleClickShowShoppingHistory(customer._id)}>Xem lịch sử mua hàng</button>
                                        <button className="btn btn-danger btn-delete"> Xóa</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DefaultLayoutAdmin>
        </>

    )
}

export default ManageCustomer;
