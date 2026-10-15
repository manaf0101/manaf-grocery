// Loaders/listsLoader.js
import axios from "axios"

export async function listsLoader({ params } : any) {
    const { userId } = params
    const response = await axios.get(`https://manafgrocey-api.onrender.com/api/lists/${userId}`)
    return response.data
}