import React, { useEffect, useState } from "react";
import DefaultLayoutAdmin from "../../../Layouts/DefaultLayoutAdmin";
import OrderAPI from "../../../API/OrderAPI";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Report = () => {
    const [orders, setOrders] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [statusData, setStatusData] = useState({});

    const fetchAllOrders = async () => {
        let page = 1;
        let allOrders = [];

        try {
            while (true) {
                const response = await OrderAPI.GetOrderByAdmin({ page });
                console.log("Dữ liệu: ", response.data.DT);
                const { orders, totalPages } = response.data.DT;
                allOrders = [...allOrders, ...orders];
                if (page >= totalPages)
                    break;
                page++;
            }

            setOrders(allOrders);

            // Lọc các đơn hàng đã giao (delivered) trước khi tính doanh thu
            const deliveredOrders = allOrders.filter(order => order.status === "DELIVERED");

            // Tính tổng doanh thu chỉ cho các đơn hàng đã giao
            const revenue = deliveredOrders.reduce((acc, order) => acc + order.totalAmount, 0);
            setTotalRevenue(revenue);

            const statusCount = allOrders.reduce((acc, order) => {
                acc[order.status] = (acc[order.status] || 0) + 1;
                return acc;
            }, {});

            setStatusData(statusCount);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const chartData = {
        labels: Object.keys(statusData),
        datasets: [
            {
                data: Object.values(statusData),
                backgroundColor: ["#4CAF50", "#FF9800", "#F44336", "#2196F3"],
                hoverBackgroundColor: ["#66BB6A", "#FFB74D", "#EF5350", "#42A5F5"],
            },
        ],
    };

    return (
        <DefaultLayoutAdmin>
            <div className="container mt-5">
                <h2 className="text-center mb-5">📊 Báo cáo doanh thu</h2>

                {/* Tổng doanh thu */}
                <div className="card bg-gradient-success text-white mb-4 shadow">
                    <div className="card-body text-center">
                        <h5 className="card-title">💰 Tổng doanh thu</h5>
                        <p className="card-text display-6 fw-bold">
                            {totalRevenue.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                        </p>
                    </div>
                </div>

                {/* Biểu đồ trạng thái đơn hàng */}
                <div className="card shadow">
                    <div className="card-body">
                        <h5 className="card-title text-center fw-bold">📈 Phân tích trạng thái đơn hàng</h5>
                        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
                            <Pie data={chartData} key={JSON.stringify(chartData)} />
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayoutAdmin>
    );
};


export default Report;
