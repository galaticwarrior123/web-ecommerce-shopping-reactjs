import axiosClient, { axiosPrivate } from "./AxiosClient";

class ProductAPI {
    static async getProducts(filter) {
        const url = '/product';
        return axiosClient.get(url, { params: filter });
    }
}
export default ProductAPI;