import axios from "axios";

export async function getUserNameLoader({ params }: any) {

    try {
        const response = await axios.get(
            `https://manafgrocey-api.onrender.com/api/username/${params.userId}`
        );
        return response.data;
    } catch (error) {
        // اگه کاربر پیدا نشد (userId نامعتبر، لینک قدیمی، یا مهمان)،
        // به‌جای کرش کردن کل اپ با صفحه‌ی خطای عمومی روتر،
        // یه مقدار خالی برمی‌گردونیم و خود Index.tsx تصمیم می‌گیره چی نشون بده
        console.log("خطا در گرفتن نام کاربری:", error)
        return { username: null }
    }
}