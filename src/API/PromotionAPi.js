import { axiosPrivate } from "./AxiosClient";



class PromotionAPI {
    static async createPromotionProduct (id, promotionProduct) {
        const url = "/promotion/" + id;
        return axiosPrivate.post(url, promotionProduct);
    }

    static async getPromotionProducts () {
        const url = "/promotion";
        return axiosPrivate.get(url);
    }

    static async updatePromotionProduct (id, promotionProduct) {
        const url = "/promotion/" + id;
        return axiosPrivate.put(url, promotionProduct);
    }

    static async deletePromotionProduct (id) {
        const url = "/promotion/" + id;
        return axiosPrivate.delete(url);
    }
}


export default PromotionAPI;