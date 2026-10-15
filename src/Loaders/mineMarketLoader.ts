import axios from "axios";

export async function mineMarketLoader({ params }: any) {
    const { userId } = params;

    // هر سه درخواست (فروشگاه، محصولات، سفارش‌های دریافتی) به‌صورت موازی گرفته می‌شوند
    const [storeResponse, productsResponse, receivedOrdersResponse] = await Promise.all([
        axios.get(`https://manafgrocey-api.onrender.com/api/store/${userId}`),
        axios.get(`https://manafgrocey-api.onrender.com/api/products/${userId}`),
        axios.get(`https://manafgrocey-api.onrender.com/api/received-orders/${userId}`),
    ]);

    return {
        store: storeResponse.data,
        products: productsResponse.data,
        receivedOrders: receivedOrdersResponse.data,
    };
}