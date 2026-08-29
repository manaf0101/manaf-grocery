import axios from "axios"

export async function ordersLoader({ params } : any) {
    const { userId } = params
    const response = await axios.get(`http://localhost:8000/api/orders/${userId}`)
    return response.data
}