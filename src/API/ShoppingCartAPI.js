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
}

export default ShoppingCartAPI;
