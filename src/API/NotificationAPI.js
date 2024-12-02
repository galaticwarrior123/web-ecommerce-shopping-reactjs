import { axiosPrivate } from "./AxiosClient";


class NotificationAPI {
  static async getNotifications() {
    return axiosPrivate.get("/notification/notifications");
  }

    static async markAsRead(notificationId) {
        return axiosPrivate.put(`/notification/notifications/${notificationId}`);
    }

    static async createNotification(data) {
        return axiosPrivate.post("/notification/notifications", data);
    }   
}

export default NotificationAPI;