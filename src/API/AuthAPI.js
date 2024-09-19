import axiosClient, { axiosPrivate } from "./AxiosClient";

class AuthAPI {
    static async login(data) {
        const url = '/user/login';
        return axiosClient.post(url, data);
    }

    static async signup(data) {
        const url = '/user/signup';
        return axiosClient.post(url, data);
    }

    static async sendOTP(data) {
        const url = '/user/send-otp';
        return axiosClient.post(url, data);
    }

    static async verified(data) {
        const url = '/user/verified';
        return axiosClient.post(url, data);
    }

}

export default AuthAPI;