// برای کامپوننت سفارش های جاری استفاده خواهد شد . (MyCurrentOrders.tsx)

import axios from "axios";

 
export async function currentOrdersLoader({ params }: any) {


    const response = await axios.get(
        `https://manafgrocey-api.onrender.com/api/orders/current/${params.userId}`
    );

    return response.data;
}