import axiosClient, { axiosPrivate } from "./AxiosClient";

class AuthAPI {
    static async login(data) {
        const url = '/login';
        return axiosClient.post(url, data);
    }

    
}

export default AuthAPI;