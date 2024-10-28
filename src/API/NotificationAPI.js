import axiosClient from "./AxiosClient";



export class NotificationAPI {
    static async getNotifications() {
        return axiosClient.get("/notifications");
    }
}