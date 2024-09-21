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

     static async forgotPassword(data) {
        const url = '/user/forgot-password'; 
        return axiosClient.post(url, data);
    }

    static async verifyOTPForgotPassword(data) {
        const url = '/user/verify-otp_forgotpassword'; 
        return axiosClient.post(url, data);
    }

    static async resetPassword(data, config) {
        const url = '/user/change-password'; 
        return axiosPrivate.post(url, data, config); // Gửi config vào đây
    }

}

export default AuthAPI;