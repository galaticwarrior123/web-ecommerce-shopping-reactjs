import axiosClient, { axiosPrivate } from "./AxiosClient";

class ProductAPI {
    static async getProducts(filter) {
        const url = '/product';
        return axiosClient.get(url, { params: filter });
    }

    static async createProduct(product) {
        const url = '/product';
        return axiosPrivate.post(url, product);
    }
}
export default ProductAPI;