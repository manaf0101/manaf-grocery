import axios from "axios";


export async function cartAction({ request, params }: any) { 
    const { userId } = params
    const data = await request.json()
    // console.log(data);


    try {
        if (data.intent === "delete") {
            await axios.delete(`http://localhost:8000/api/cart/${userId}/${data.productId}`)
            return { success: true, intent: "delete" }
        }


        // محصول از سبد خرید به سفارش واقعی تبدیل می‌شه (پرداخت)
        if (data.intent === "pay") {
            await axios.put(`http://localhost:8000/api/cart/pay/${userId}/${data.productId}`)
            return { success: true, intent: "pay", productId: data.productId }
        }

        // پیش‌فرض یعنی افزودن محصول جدید به سبد خرید
        const response = await axios.post(`http://localhost:8000/api/cart/${userId}`, data)
        
        return { success: true, intent: "add", order: response.data.order }

    } catch (error) {
        console.error("خطا در عملیات سبد خرید:", error)
        return { success: false, message: "خطایی رخ داد، لطفاً دوباره تلاش کنید" }
    }
}