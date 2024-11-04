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

    static async updateCategory(id, data) {
        const url = `/category/${id}`;
        return axiosPrivate.put(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    static async deleteCategory(id) {
        const url = `/category/${id}`;
        return axiosPrivate.delete(url);
    }
}

export default CategoryAPI;