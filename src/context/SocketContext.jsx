import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    // Kết nối tới server
    const newSocket = io("http://localhost:4000"); // Địa chỉ của server socket
    setSocket(newSocket);
    // Đăng ký userId vào room
    if (userId) {
      newSocket.emit("register-user", userId);
    }

    // Nhận thông báo từ server
    newSocket.on("new-notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

  }, [userId]);


  return (
    <SocketContext.Provider
      value={{
        socket,
        notifications
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
