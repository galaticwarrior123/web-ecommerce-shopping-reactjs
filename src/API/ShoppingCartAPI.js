import { axiosClient, axiosPrivate } from "./AxiosClient";

class ShoppingCartAPI {
  static async GetShoppingCart() {
    const url = '/shopping-cart';
    console.log(`Making GET request to: ${url}`);
    return axiosPrivate.get(url);
  }

  static async CreateOrder(data) {
    const url = '/shopping-cart/add';
    console.log(`Making GET request to: ${url}`);
    return axiosPrivate.post(url, data);
  }

}

export default ShoppingCartAPI;
