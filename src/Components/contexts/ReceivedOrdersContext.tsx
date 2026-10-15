// برای سفارشات دریافتی 

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    type Dispatch,
    type SetStateAction,
    type ReactNode
} from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

interface ReceivedOrdersContextType {
    receivedOrdersCount: number
    setReceivedOrdersCount: Dispatch<SetStateAction<number>>
    refreshReceivedOrdersCount: () => Promise<void>
}

const ReceivedOrdersContext = createContext<ReceivedOrdersContextType | undefined>(undefined)

export function ReceivedOrdersProvider({ children }: { children: ReactNode }) {
    const { userId } = useParams()
    const [receivedOrdersCount, setReceivedOrdersCount] = useState(0)

    const refreshReceivedOrdersCount = useCallback(async () => {
        if (!userId) return

        try {
            const response = await axios.get(`https://manafgrocey-api.onrender.com/api/received-orders/count/${userId}`)
            setReceivedOrdersCount(response.data.count)
        } catch (error) {
            console.log("خطا در دریافت تعداد سفارش‌های دریافتی:", error)
        }
    }, [userId])

    useEffect(() => {
        void refreshReceivedOrdersCount()
    }, [refreshReceivedOrdersCount])

    return (
        <ReceivedOrdersContext.Provider value={{ receivedOrdersCount, setReceivedOrdersCount, refreshReceivedOrdersCount }}>
            {children}
        </ReceivedOrdersContext.Provider>
    )
}

export function useReceivedOrders() {
    const context = useContext(ReceivedOrdersContext)
    if (!context) {
        throw new Error("useReceivedOrders باید داخل ReceivedOrdersProvider استفاده شود")
    }
    return context
}