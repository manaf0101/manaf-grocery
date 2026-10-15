import axios from "axios"

export async function ordersLoader({ params } : any) {
    const { userId } = params
    const response = await axios.get(`https://manafgrocey-api.onrender.com/api/orders/${userId}`)
    return response.data
}