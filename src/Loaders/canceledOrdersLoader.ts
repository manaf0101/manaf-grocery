// Loaders/canceledOrdersLoader.ts
import axios from "axios";



export async function canceledOrdersLoader({ params }: any) {

    const response = await axios.get(
        `http://localhost:8000/api/orders/canceled/${params.userId}`
    );
    return response.data;
}