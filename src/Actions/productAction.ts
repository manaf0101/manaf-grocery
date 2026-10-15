import axios from "axios";

export async function productAction({ request, params }: any) {
    const { userId } = params;
    const formData = await request.formData();
    const intent = formData.get("intent");

    try {
        if (intent === "delete") {
            const productId = formData.get("productId");
            await axios.delete(`https://manafgrocey-api.onrender.com/api/products/${userId}/${productId}`);
            return { success: true, intent: "delete" };
        }
 
        if (intent === "edit") {
            const productId = formData.get("productId");
            const response = await axios.put(
                `https://manafgrocey-api.onrender.com/api/products/${userId}/${productId}`,
                formData
            );
            return { success: true, intent: "edit", product: response.data.product };
        }

        // افزودن محصول جدید (حالت پیش‌فرض)
        const response = await axios.post(`https://manafgrocey-api.onrender.com/api/products/${userId}`, formData);
        return { success: true, intent: "add", product: response.data.product };

    } catch (error) {
        console.error("خطا در ثبت محصول:", error);
        return { success: false, message: "خطایی رخ داد، لطفاً دوباره تلاش کنید" };
    }
}