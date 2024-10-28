import { useEffect, useState } from "react";
import { NotificationAPI } from "../../API/NotificationAPI";



const NotificationPopup = () => {
    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        const fetNotifications = async () => {
            NotificationAPI.getNotifications().then((res) => {
                setNotifications(res.data);
            });
        }
        fetNotifications();
    }, []);


    return (
        <div className="notification-popup">
            <h3>Notifications</h3>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification.id}>{notification.message}</li>
                ))}
            </ul>
        </div>
    )

}

export default NotificationPopup;