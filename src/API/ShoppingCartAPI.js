import axiosClient, { axiosPrivate } from "./AxiosClient";

class ShoppingCartAPI {
  static async GetShoppingCart() {
    const url = '/shopping-cart';
    console.log(`Making GET request to: ${url}`);
    return axiosPrivate.get(url);
  }

  static async AddProductToCart(productId, quantity) {
    const url = '/shopping-cart/add';
    console.log(`Making POST request to: ${url} with productId: ${productId} and quantity: ${quantity}`);

    return axiosPrivate.post(url, { productId, quantity });
  }

  static async UpdateProductQuantity(shoppingCartId, productId, quantity) {
    const url = `/shopping-cart/${shoppingCartId}/update`;
    console.log(`Making PUT request to: ${url} with productId: ${productId} and quantity: ${quantity}`);
    return axiosPrivate.put(url, { productId, quantity });
  }

  static async DeleteProduct(shoppingCartId, productId) {
    const url = `/shopping-cart/${shoppingCartId}/remove/${productId}`;
    console.log(`Making DELETE request to: ${url} to remove productId: ${productId}`);
    return axiosPrivate.delete(url);
  }

}

export default ShoppingCartAPI;
