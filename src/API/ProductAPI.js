import axiosClient, { axiosPrivate } from "./AxiosClient";

class ProductAPI {
    static async getProducts(filter) {
        const url = '/product';
        return axiosClient.get(url, { params: filter });
    }

    static async getAllProducts() {
        const url = '/product/all';
        return axiosClient.get(url);
    }

    static async findProductsWithoutPromotion() {
        const url = '/product/productWithoutPromotion';
        return axiosClient.get(url);
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

    static async getProductById(id){
        const url = `/product/${id}`;
        return axiosClient.get(url);
    }

    static async updateProduct(id, product){
        const url = `/product/${id}`;
        return axiosPrivate.put(url, product, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    }

    static async deleteProduct(id){
        const url = `/product/remove/${id}`;
        return axiosPrivate.put(url);
    }


    static async getSimilarProducts(productId){
        const url = `/product/similar/${productId}`;
        return axiosClient.get(url);
    }

    static async increaseViewCount(productId){
        const url = `/product/view-count/${productId}`;
        return axiosClient.put(url);
    }

}
export default ProductAPI;