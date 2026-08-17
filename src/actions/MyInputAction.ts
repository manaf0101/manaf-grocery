//برای گرفتن اطلاعات از فرم و ارسال درخواست به سرور برای بررسی وجود ایمیل استفاده می‌شود. این تابع یک درخواست HTTP GET به سرور ارسال می‌کند و نتیجه را برمی‌گرداند.



import axios from "axios";

export async function checkEmailAction({request}: {request: Request}) {

    const formData = await request.formData();

    const userEmail = formData.get("userEmail");

    if (typeof userEmail !== "string" || !userEmail) {
        return {
            exists: false,
            error: "Email is required"
        };
    }

    try {
        const response = await axios.get("http://localhost:8000/api/check-email", {
            params: { userEmail }
        });

        return response.data;
    } catch (error) {
        throw new Error("Failed to check email");
    }
}