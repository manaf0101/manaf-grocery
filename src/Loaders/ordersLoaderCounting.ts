// Loaders/ordersLoaderCounting.ts
import axios from "axios";

export async function ordersLoaderCounting({ params }: any) {
    const response = await axios.get(
        `http://localhost:8000/api/orders/summary/${params.userId}`
    );

    return response.data;
}