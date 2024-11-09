import axiosClient, { axiosPrivate } from "./AxiosClient";
class ShoppingCartAPI {
    static async GetWishlist() {
        const url = '/wishlist';
        console.log(`Making GET request to: ${url}`);
        return axiosPrivate.get(url);
    }
}

export default ShoppingCartAPI