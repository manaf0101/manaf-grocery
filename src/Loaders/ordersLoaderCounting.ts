// Loaders/ordersLoaderCounting.ts
import axios from "axios";

export async function ordersLoaderCounting({ params }: any) {
    const response = await axios.get(
        `https://manafgrocey-api.onrender.com/api/orders/summary/${params.userId}`
    );

    return response.data;
} 