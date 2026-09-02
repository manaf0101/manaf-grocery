// برای کامپوننت سفارش های جاری استفاده خواهد شد . (MyCurrentOrders.tsx)

import axios from "axios";


export async function currentOrdersLoader({ params }: any) {


    const response = await axios.get(
        `http://localhost:8000/api/orders/current/${params.userId}`
    );

    return response.data;
}