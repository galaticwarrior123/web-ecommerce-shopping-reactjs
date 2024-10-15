import axiosClient, { axiosPrivate } from "./AxiosClient";

class ProductAPI {
    static async getProducts(filter) {
        const url = '/product';
        return axiosClient.get(url, { params: filter });
    }

    static async createProduct(product) {
        const url = '/product';
        return axiosPrivate.post(url, product,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
    }

    static async getTop10BestSellingProducts(){
        const url = '/product/top-10-best-selling';
        return axiosClient.get(url);
    }

    static async getTop10BestViewProducts(){
        const url = '/product/top-10-best-viewing';
        return axiosClient.get(url);
    }

}
export default ProductAPI;