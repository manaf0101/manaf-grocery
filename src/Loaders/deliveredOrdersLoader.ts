// Loaders/deliveredOrdersLoader.ts
import axios from "axios";


export async function deliveredOrdersLoader({ params }: any) {


    const response = await axios.get(
        `https://manafgrocey-api.onrender.com/api/orders/delivered/${params.userId}`
    );
    return response.data;
}