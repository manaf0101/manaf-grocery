// برای SellerMarket 

// Loaders/sellerMarketLoader.ts
import axios from "axios"
import { LoaderFunctionArgs } from "react-router-dom"

export async function sellerMarketLoader({ params }: LoaderFunctionArgs) {
    // sellerID همون کد یکتای فروشنده‌ست که از آدرس گرفته می‌شه
    const { sellerID } = params

    if (!sellerID) {
        throw new Error("sellerID is required")
    }

    try {
        const response = await axios.get(`http://localhost:8000/api/seller-market/${encodeURIComponent(sellerID)}`)
        return response.data
    } catch (error) {
        console.error("Error loading seller market:", error)
        throw error
    }
}