import axiosClient, { axiosPrivate } from "./AxiosClient";

class ReviewAPI {
  static async GetReviews(params = {}) {
    const url = "/review";
    return axiosClient.get(url, { params });
  }

  static async CreateReview(data) {
    const url = "/review";
    return axiosPrivate.post(url, data);
  }

  static async GetReviewByProduct(productId) {
    const url = `/review/product/${productId}`;
    return axiosClient.get(url);
  }

  // static async UpdateReview(id, data) {
  //     const url = `/review/${id}`;
  //     return axiosPrivate.put(url, data);
  // }

  // static async DeleteReview(id) {
  //     const url = `/review/${id}`;
  //     return axiosPrivate.delete(url);
  // }
}

export default ReviewAPI;
