// Loaders/returnedOrdersLoader.ts
import axios from "axios";


export async function returnedOrdersLoader({ params }: any) {
    
    const response = await axios.get(
        `http://localhost:8000/api/orders/returned/${params.userId}`
    );
    return response.data;
} 