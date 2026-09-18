import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

interface SellingPanelContextType {
    isSellingPanelEnabled: boolean
    setSellingPanelEnabled: (value: boolean) => void
}

const SellingPanelContext = createContext<SellingPanelContextType | undefined>(undefined)

// بررسی این‌که آیا فروشگاه فیلدهای الزامی‌اش کامل است یا نه
function isStoreComplete(store: any) {
    return !!(
        store?.storeName?.trim() &&
        store?.username?.trim() &&
        store?.contactInfo?.phone1?.trim()
    )
}

export function SellingPanelProvider({ children }: { children: ReactNode }) {
    const { userId } = useParams()
    const [isSellingPanelEnabled, setSellingPanelEnabled] = useState(false)

    // مستقل از اینکه کاربر در کدام صفحه است، یک‌بار موقع mount شدن Provider
    // وضعیت واقعی فروشگاه از سرور گرفته می‌شود
    useEffect(() => {
        const fetchInitialStoreStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/store/${userId}`)
                setSellingPanelEnabled(isStoreComplete(response.data))
            } catch (error) {
                console.log("خطا در دریافت وضعیت اولیه فروشگاه:", error)
            }
        }

        if (userId) fetchInitialStoreStatus()
    }, [userId])

    return (
        <SellingPanelContext.Provider value={{ isSellingPanelEnabled, setSellingPanelEnabled }}>
            {children}
        </SellingPanelContext.Provider>
    )
}

export function useSellingPanel() {
    const context = useContext(SellingPanelContext)
    if (!context) {
        throw new Error("useSellingPanel باید داخل SellingPanelProvider استفاده شود")
    }
    return context
}