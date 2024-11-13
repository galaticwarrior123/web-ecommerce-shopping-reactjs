import axiosClient, { axiosPrivate } from "./AxiosClient";

class AuthAPI {
    static async login(data) {
        const url = '/user/login';
        console.log(`Making GET request to: ${url}`);
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


    static async getAllCustomers() {
        const url = '/user/all';
        return axiosPrivate.get(url);
    }

    static async updateProfile(id, data) {
        const url = '/user/update/' + id;
        return axiosPrivate.put(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

}

export default AuthAPI;