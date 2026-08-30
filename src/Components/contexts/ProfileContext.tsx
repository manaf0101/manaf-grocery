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
    refundMethod?: {
        shebaNumber?: string
    }
}

interface ProfileContextType {
    profile: ProfileData | null
    setProfile: (profile: ProfileData) => void
    refetchProfile: () => Promise<void>
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
    const { userId } = useParams()
    const [profile, setProfile] = useState<ProfileData | null>(null)

    const refetchProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/profile/${userId}`)
            setProfile(response.data)
        } catch (err) {
            console.error("خطا در دریافت پروفایل:", err)
        }
    }

    // اولین بار که کاربر وارد صفحه می‌شود، پروفایل را می‌گیرد
    useEffect(() => {
        refetchProfile()
    }, [userId])

    return (
        <ProfileContext.Provider value={{ profile, setProfile, refetchProfile }}>
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