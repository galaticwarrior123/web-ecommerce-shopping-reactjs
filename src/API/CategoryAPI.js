import axiosClient, { axiosPrivate } from "./AxiosClient";

class CategoryAPI {
    static async getCategories() {
        const url = '/category';
        return axiosClient.get(url);
    }
}

export default CategoryAPI;