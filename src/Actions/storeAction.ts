import axios from "axios";

export async function storeAction({ request, params }: any) {
    const data = await request.json();
    const { userId } = params;
 
    try {
        const response = await axios.put(`http://localhost:8000/api/store/${userId}`, data);
        return { success: true, store: response.data.store };
    } catch (error) {
        console.error("خطا در ثبت اطلاعات فروشگاه:", error);
        return { success: false, message: "خطایی رخ داد، لطفاً دوباره تلاش کنید" };
    }
}