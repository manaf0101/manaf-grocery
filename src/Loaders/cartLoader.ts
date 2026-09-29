// برای سبد خرید UserCard.tsx

import axios from "axios";

export async function cartLoader({ params }: any) {
    const response = await axios.get(`http://localhost:8000/api/cart/${params.userId}`)
    return response.data
}