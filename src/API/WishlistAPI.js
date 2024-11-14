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

    static async DeleteProduct(wishlistId, productId) {
        const url = `/wishlist/${wishlistId}/remove/${productId}`;
        console.log(`Making DELETE request to: ${url} to remove productId: ${productId}`);
        return axiosPrivate.delete(url);
    }
}

export default WishlistAPI