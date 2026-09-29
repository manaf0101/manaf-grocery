import { createContext, useContext, useState, useEffect, type Dispatch, type SetStateAction, type ReactNode } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

interface CartContextType {
    cartCount: number
    setCartCount: Dispatch<SetStateAction<number>>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const { userId } = useParams()
    const [cartCount, setCartCount] = useState(0)

    // موقع اولین بار، تعداد واقعی سبد خرید از سرور گرفته می‌شود
    useEffect(() => {
        const fetchInitialCartCount = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/cart/count/${userId}`)
                setCartCount(response.data.count)
            } catch (error) {
                console.log("خطا در دریافت تعداد سبد خرید:", error)
            }
        }

        if (userId) fetchInitialCartCount()
    }, [userId])

    return (
        <CartContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart باید داخل CartProvider استفاده شود")
    }
    return context
}