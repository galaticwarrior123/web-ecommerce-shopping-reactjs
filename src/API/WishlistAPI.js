import axiosClient, { axiosPrivate } from "./AxiosClient";
class WishlistAPI {
    static async GetWishlist() {
        const url = '/wishlist';
        console.log(`Making GET request to: ${url}`);
        return axiosPrivate.get(url);
    }

    static async AddProductToWishlist(productId) {
        const url = '/wishlist/add';
        console.log(`Making POST request to: ${url} with productId: ${productId}`);

        return axiosPrivate.post(url, { productId });
    }
}

export default WishlistAPI