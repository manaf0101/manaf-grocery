// Loaders/searchLoader.ts
import axios from "axios"
import { LoaderFunctionArgs } from "react-router-dom"

export async function searchLoader({ request }: LoaderFunctionArgs) {
    // متن جستجو از query string همون درخواستی که fetcher.load می‌فرسته خونده می‌شه
    const url = new URL(request.url)
    const q = url.searchParams.get("q") || ""

    if (!q.trim()) {
        return { stores: [], products: [] }
    }

    const response = await axios.get(`https://manafgrocey-api.onrender.com/api/search`, {
        params: { q }
    })

    return response.data
}