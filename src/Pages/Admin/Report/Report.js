import React, { useEffect, useState } from "react";
import DefaultLayoutAdmin from "../../../Layouts/DefaultLayoutAdmin";
import OrderAPI from "../../../API/OrderAPI";

import {
    Chart as ChartJS,
    ArcElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

// Đăng ký các thành phần của Chart.js
ChartJS.register(
    ArcElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale
);

const Report = () => {
    const [orders, setOrders] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [statusData, setStatusData] = useState({});
    const [revenueData, setRevenueData] = useState([]);
    const [chartLabels, setChartLabels] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedQuarter, setSelectedQuarter] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const fetchAllOrders = async () => {
        try {
            const response = await OrderAPI.GetOrderByAdmin();
            const allOrders = response.data.DT.orders;
            console.log(allOrders);
            setOrders(allOrders);

            // Lọc các đơn hàng đã giao
            const deliveredOrders = allOrders.filter(order => order.status === "DELIVERED");

            // Tính tổng doanh thu
            const revenue = deliveredOrders.reduce((acc, order) => acc + order.totalAmount, 0);
            setTotalRevenue(revenue);

            // Tính trạng thái đơn hàng
            const statusCount = allOrders.reduce((acc, order) => {
                acc[order.status] = (acc[order.status] || 0) + 1;
                return acc;
            }, {});

            setStatusData(statusCount);

            // Lọc doanh thu theo thời gian (quý, tháng, năm)
            const revenueByTime = deliveredOrders.reduce((acc, order) => {
                const date = new Date(order.createdAt); // Chuyển đổi createdAt thành đối tượng Date
                const year = date.getFullYear();
                const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, cộng thêm 1 để đúng tháng
                const quarter = Math.floor((month - 1) / 3) + 1; // Tính quý

                // Kiểm tra lọc theo năm, tháng hoặc quý
                const timeKey = `${quarter}-Q${year}`;
                if (
                    (selectedYear && selectedYear === year) ||
                    (selectedMonth && selectedMonth === month) ||
                    (selectedQuarter && selectedQuarter === quarter) ||
                    (!selectedYear && !selectedMonth && !selectedQuarter) // Nếu không có lựa chọn nào thì hiển thị tất cả
                ) {
                    acc[timeKey] = (acc[timeKey] || 0) + order.totalAmount;
                }

                return acc;
            }, {});

            setRevenueData(Object.values(revenueByTime));
            setChartLabels(Object.keys(revenueByTime));

        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };
    useEffect(() => {
        fetchAllOrders();
    }, [selectedMonth, selectedQuarter, selectedYear]);

    // Biểu đồ trạng thái đơn hàng
    const statusChartData = {
        labels: Object.keys(statusData),
        datasets: [
            {
                data: Object.values(statusData),
                backgroundColor: ["#4CAF50", "#FF9800", "#F44336", "#2196F3"],
                hoverBackgroundColor: ["#66BB6A", "#FFB74D", "#EF5350", "#42A5F5"],
            },
        ],
    };

    // Biểu đồ doanh thu
    const revenueChartData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Doanh thu',
                data: revenueData,
                fill: false,
                borderColor: '#4CAF50',
                tension: 0.1,
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

                {/* Lựa chọn lọc (tháng, quý, năm) */}
                <div className="mb-4">
                    <select
                        className="form-select"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}>
                        <option value="">Tất cả tháng</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                            <option key={month} value={month}>{`Tháng ${month}`}</option>
                        ))}
                    </select>

                    <select
                        className="form-select mt-2"
                        value={selectedQuarter}
                        onChange={(e) => setSelectedQuarter(e.target.value)}>
                        <option value="">Tất cả quý</option>
                        {Array.from({ length: 4 }, (_, i) => i + 1).map(quarter => (
                            <option key={quarter} value={quarter}>{`Quý ${quarter}`}</option>
                        ))}
                    </select>

                    <select
                        className="form-select mt-2"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}>
                        <option value="">Tất cả năm</option>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                {/* Biểu đồ doanh thu */}
                <div className="chart-container">
                    <div className="chart-card">
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <h5 className="card-title text-center fw-bold">📈 Biểu đồ doanh thu</h5>
                                <Line data={revenueChartData} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Biểu đồ trạng thái đơn hàng */}
                <div className="chart-container">
                    <div className="chart-card">
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <h5 className="card-title text-center fw-bold">📈 Phân tích trạng thái đơn hàng</h5>
                                <Pie data={statusChartData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayoutAdmin>
    );
};

export default Report;
