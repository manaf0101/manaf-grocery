// Loaders/canceledOrdersLoader.ts
import axios from "axios";



export async function canceledOrdersLoader({ params }: any) {

    const response = await axios.get(
        `https://manafgrocey-api.onrender.com/api/orders/canceled/${params.userId}`
    );
    return response.data;
}