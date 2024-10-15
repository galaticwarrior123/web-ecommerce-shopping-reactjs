


export class PaymentAPI {
    static async getPayments(filter) {
        const url = '/payment';
        return axiosClient.get(url, { params: filter });
    }

    static async createPayment(payment) {
        const url = '/payment';
        return axiosPrivate.post(url, payment);
    }
}