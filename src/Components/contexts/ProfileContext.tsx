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
    profileProgress : number
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: ReactNode }) {
    const { userId } = useParams()
    const [profile, setProfile] = useState<ProfileData | null>(null)
    const [profileProgress, setProfileProgress] = useState(0)


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
        <ProfileContext.Provider value={{ profile, setProfile, refetchProfile  , profileProgress }}>
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