import "./AdminHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../context/SocketContext";
import NotificationAPI from "../../../API/NotificationAPI";

const AdminHeader = ({ tabName }) => {
  const { notifications } = useContext(SocketContext); // Real-time notifications từ SocketContext
  const [showNotifications, setShowNotifications] = useState(false);
  const [listNotifications, setListNotifications] = useState([]); // Danh sách thông báo tổng hợp

  // Lấy danh sách thông báo từ server khi component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await NotificationAPI.getNotifications();
        setListNotifications(response.data.DT);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Cập nhật khi nhận thông báo mới từ socket
  useEffect(() => {
    if (notifications.length) {
      setListNotifications((prev) => {
        const merged = [...notifications, ...prev];
        // Loại bỏ thông báo trùng (theo _id)
        return merged.filter(
          (notification, index, self) =>
            index === self.findIndex((n) => n._id === notification._id)
        );
      });
    }
  }, [notifications]);

  // Xử lý đánh dấu đã đọc
  const handleMarkAsRead = async (notificationId) => {
    try {
      await NotificationAPI.markAsRead(notificationId); // Gửi API cập nhật trạng thái
      setListNotifications((prev) =>
        prev.map((n) =>
          n._id === notificationId ? { ...n, isRead: true } : n
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // Tính số lượng thông báo chưa đọc
  const unreadCount = listNotifications.filter((n) => !n.isRead).length;

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="admin-header">
      <div className="header-left d-flex align-items-center">
        <h4 className="mb-0">{tabName}</h4>
      </div>

      <div className="header-right d-flex justify-content-end align-items-center">
        <div className="notification-wrapper">
          <FontAwesomeIcon
            icon={faBell}
            className="icon-admin-page"
            onClick={() => setShowNotifications(!showNotifications)}
          />
          {/* Hiển thị số lượng thông báo chưa đọc */}
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
          {showNotifications && (
            <div className="notifications-dropdown">
              <h6>Thông báo</h6>
              <ul>
                {listNotifications.map((notification, index) => (
                  <li
                    key={notification._id || index}
                    className={notification.isRead ? "read" : "unread"}
                    onClick={() => handleMarkAsRead(notification._id)}
                  >
                    {notification.content}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className="icon-admin-page"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default AdminHeader;
