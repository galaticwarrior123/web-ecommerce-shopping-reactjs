import DefaultLayoutAdmin from '../../../Layouts/DefaultLayoutAdmin';
import './ManageCustomer.css';
import AuthAPI from '../../../API/AuthAPI';
import { useEffect, useState } from 'react';

const ManageCustomer = () => {
    const [customers, setCustomers] = useState([]);

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

    return (
        <DefaultLayoutAdmin>
            <div className="manage-customer-page-container">
                <div className="customer-grid row">
                    {customers.map((customer, index) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center mt-3" key={index}>
                            <div className="customer-card">
                                <div className="customer-avatar">
                                    <img src="/images/icon-avatar.png" alt="Avatar" />
                                </div>
                                <div className="customer-info">
                                    <h5>{customer.name || "No Name"}</h5>
                                    <p>{customer.email}</p>
                                </div>
                                <div className="customer-action">
                                    <button className="btn btn-primary btn-view-history">View History</button>
                                    <button className="btn btn-danger btn-delete">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DefaultLayoutAdmin>
    )
}

export default ManageCustomer;
