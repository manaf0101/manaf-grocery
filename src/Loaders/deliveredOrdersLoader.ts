// Loaders/deliveredOrdersLoader.ts
import axios from "axios";


export async function deliveredOrdersLoader({ params }: any) {


    const response = await axios.get(
        `http://localhost:8000/api/orders/delivered/${params.userId}`
    );
    return response.data;
}