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

interface CartContextType {
  cartCount: number
  setCartCount: Dispatch<SetStateAction<number>>
  refreshCartCount: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const { userId } = useParams()
  const [cartCount, setCartCount] = useState(0)

  const refreshCartCount = useCallback(async () => {
    if (!userId) return

    try {
      const response = await axios.get(`http://localhost:8000/api/cart/count/${userId}`)
      setCartCount(response.data.count)
    } catch (error) {
      console.log("خطا در دریافت تعداد سبد خرید:", error)
    }
  }, [userId])

  useEffect(() => {
    void refreshCartCount()
  }, [refreshCartCount])

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, refreshCartCount }}>
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