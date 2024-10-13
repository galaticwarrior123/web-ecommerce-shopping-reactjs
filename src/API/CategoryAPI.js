import axiosClient, { axiosPrivate } from "./AxiosClient";

class CategoryAPI {
    static async getCategories() {
        const url = '/category';
        return axiosClient.get(url);
    }

    static async createCategory(data) {
        const url = '/category';
        return axiosPrivate.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

export default CategoryAPI;