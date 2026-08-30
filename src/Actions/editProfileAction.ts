
import axios from "axios"

export async function editProfileAction({ request, params }: any) {
    const data = await request.json()
    const { userId } = params

    try {
        // اگر کاربر رمز عبور رو تغییر داده باشه، جدا ارسال می‌شه
        if (data.password) {
            await axios.put(`http://localhost:8000/api/change-password/${userId}`, {
                newPassword: data.password,
            })
        }

        const response = await axios.put(`http://localhost:8000/api/profile/${userId}`, {
            fullName: data.fullName,
            userNationalityCode: data.userNationalityCode,
            userPhone: data.userPhone,
            userEmail: data.userEmail,
            userBirth: data.userBirth,
            job: data.job,
            refundMethod: { shebaNumber: data.shebaNumber },
        })

        return { success: true, profile: response.data }

    } catch (error) {
        console.error("خطا در ثبت تغییرات:", error)
        return { success: false, message: "خطا در ثبت تغییرات، لطفاً دوباره تلاش کنید" }
    }
}