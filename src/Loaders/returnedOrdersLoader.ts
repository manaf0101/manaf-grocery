// Loaders/returnedOrdersLoader.ts
import axios from "axios";


export async function returnedOrdersLoader({ params }: any) {
    
    const response = await axios.get(
        `https://manafgrocey-api.onrender.com/api/orders/returned/${params.userId}`
    );
    return response.data;
} 