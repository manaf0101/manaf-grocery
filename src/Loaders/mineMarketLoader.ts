import axios from "axios";

export async function mineMarketLoader({ params }: any) {
    const { userId } = params;

    // هر دو درخواست به‌صورت موازی ارسال می‌شوند
    const [storeResponse, productsResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/store/${userId}`),
        axios.get(`http://localhost:8000/api/products/${userId}`),
    ]);

    return {
        store: storeResponse.data,
        products: productsResponse.data,
    };
}