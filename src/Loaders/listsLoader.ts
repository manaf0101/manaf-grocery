// Loaders/listsLoader.js
import axios from "axios"

export async function listsLoader({ params } : any) {
    const { userId } = params
    const response = await axios.get(`http://localhost:8000/api/lists/${userId}`)
    return response.data
}