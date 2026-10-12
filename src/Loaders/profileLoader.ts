// این loader میباشد . برای کامپوننت MyProfile.tsx

import axios from "axios"

export async function profileLoader({ params }: any) {
    const { userId } = params

    try {
        const response = await axios.get(`http://localhost:8000/api/profile/${userId}`)
        return response.data
    } catch (error) {
        // برای کاربر مهمان (یا هر userId ناموجود)، سرور ۴۰۴ برمی‌گردونه
        // به‌جای کرش کردن کل اپ، یه آبجکت خالی با همون فیلدهایی که User واقعی داره برمی‌گردونیم
        // تا کامپوننت‌های زیرمجموعه (EditMyProfile، SummaryOfActivities و...) با مقدار undefined کرش نکنن
        console.log("خطا در گرفتن پروفایل:", error)
        return {
            userId,
            username: null,
            userEmail: null,
            fullName: null,
            userNationalityCode: null,
            userPhone: null,
            userBirth: null,
            job: null,
            refundMethod: null,
            userProfileImage: null,
        }
    }
}