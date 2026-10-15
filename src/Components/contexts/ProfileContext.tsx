//برای اینکه اطلاعات پروفایل همگانی باشد بروزرسانی بین دو کامپوننت 
// EditMyProfile.tsx , MyProfileLeftMenu.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

interface ProfileData {
    username?: string
    fullName?: string
    userNationalityCode?: string
    userPhone?: string
    userEmail: string
    userBirth?: string
    job?: string
    userProfileImage?: string
    refundMethod?: {
        shebaNumber?: string
    }
}

interface ProfileContextType {
    profile: ProfileData | null
    setProfile: (profile: ProfileData) => void
    refetchProfile: () => Promise<void>
    profileProgress: number
    isGuest: boolean
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
    const { userId } = useParams()
    const [profile, setProfile] = useState<ProfileData | null>(null)
    const [profileProgress, setProfileProgress] = useState(0)

    // اگه این userId اصلاً تو دیتابیس پیدا نشه (مثلاً کاربر مهمان)، این مقدار true می‌شه
    const [isGuest, setIsGuest] = useState(false)

    const refetchProfile = async () => {
        try {
            const response = await axios.get(`https://manafgrocey-api.onrender.com/api/profile/${userId}`)
            setProfile(response.data)
            // چون درخواست موفق بود، یعنی این کاربر واقعاً تو دیتابیس ثبت‌نام کرده
            setIsGuest(false)
        } catch (err) {
            console.error("خطا در دریافت پروفایل:", err)
            // سرور برای userId ناموجود ۴۰۴ برمی‌گردونه؛ این یعنی کاربر مهمانه (یا لینک نامعتبر)
            setIsGuest(true)
        }
    }

    // اولین بار که کاربر وارد صفحه می‌شود، پروفایل را می‌گیرد
    useEffect(() => {
        refetchProfile()
    }, [userId])

    // برای محاسبه درصد تکمیل پروفایل و بروزرسانی آن در هر بار تغییر پروفایل
    useEffect(() => {
        if (!profile) return

        const fields = [
            profile.userEmail,
            profile.username,
            profile.fullName,
            profile.userPhone,
            profile.userBirth,
            profile.userNationalityCode,
            profile.job,
            profile?.refundMethod?.shebaNumber,
        ]

        const completedFields = fields.filter(
            field => field !== undefined && field !== null && field !== ""
        ).length

        const nextProgress = Math.round((completedFields / fields.length) * 100)
        setProfileProgress(nextProgress)
    }, [profile])

    return (
        <ProfileContext.Provider value={{ profile, setProfile, refetchProfile, profileProgress, isGuest }}>
            {children}
        </ProfileContext.Provider>
    )
}

// هوک اختصاصی برای دسترسی راحت‌تر به context
export function useProfile() {
    const context = useContext(ProfileContext)
    if (!context) {
        throw new Error("useProfile باید داخل ProfileProvider استفاده شود")
    }
    return context
}