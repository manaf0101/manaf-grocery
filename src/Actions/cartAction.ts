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

        // پیش‌فرض یعنی افزودن محصول جدید به سبد خرید
        const response = await axios.post(`http://localhost:8000/api/cart/${userId}`, data)
        
        return { success: true, intent: "add", order: response.data.order }

    } catch (error) {
        console.error("خطا در عملیات سبد خرید:", error)
        return { success: false, message: "خطایی رخ داد، لطفاً دوباره تلاش کنید" }
    }
}