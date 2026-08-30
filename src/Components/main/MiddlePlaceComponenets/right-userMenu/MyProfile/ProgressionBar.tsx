import { useLoaderData } from "react-router-dom";
// برای اجرای جشن زمانی که کاربر 100 درصد پروفایل خود را کامل کرد 
import { useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
// از کتابخانه ی canvas-confetti
import confetti from "canvas-confetti";
// برای اجرای جشن زمانی که کاربر 100 درصد پروفایل خود را کامل کرد 



type User = {
    userEmail: string;
    username: string;
    password: string;
    userId: string;
    fullName?: string;
    userPhone?: number;
    userBirth?: string;
    userNationalityCode?: number;
    job?: string;
    refundMethod?: {
        shebaNumber?: string;
    };
    userProfileImage?: string;
};

export default function ProgressionBar() {

    const user = useLoaderData() as User

    // برای اجرای جشن زمانی که کاربر 100 درصد پروفایل خود را کامل کرد 
    const [showCelebration, setShowCelebration] = useState(false)
    // برای اینکه هر بار re-render فقط یک‌بار افکت اجرا بشه
    const hasCelebrated = useRef(false)

    const profileFields = [
        user.userEmail,
        user.username,
        user.fullName,
        user.userPhone,
        user.userBirth,
        user.userNationalityCode,
        user.job,
        user?.refundMethod?.shebaNumber,
        user.userProfileImage,
    ];

    // حساب کردن تعداد فیلد های تکمیل شده
    const completedFields = profileFields.filter(
        field => field !== undefined && field !== null && field !== ""
    ).length
    // حساب کردن تعداد فیلد های تکمیل شده

    // درصد فیلد های تکمیل شده
    const profileProgress = Math.round(
        (completedFields / profileFields.length) * 100
    )
    // درصد فیلد های تکمیل شده


    // اجرای جشن فقط زمانی که پروفایل تازه به 100٪ رسیده باشد
    useEffect(() => {
        if (profileProgress !== 100) return

        // چک می‌کنیم آیا قبلاً این جشن برای این کاربر نمایش داده شده یا نه
        const celebrationKey = `profile-completed-${user.userId}`
        const alreadyCelebrated = localStorage.getItem(celebrationKey)

        if (alreadyCelebrated || hasCelebrated.current) return

        hasCelebrated.current = true
        localStorage.setItem(celebrationKey, "true")

        setShowCelebration(true)

        // افکت کانفتی که از بالای صفحه می‌ریزد
        const duration = 2000
        const end = Date.now() + duration

        const frame = () => {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0 },
                colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#a855f7'],
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0 },
                colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#a855f7'],
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame)
            }
        }

        frame()

    }, [profileProgress, user.userId])
    // چک می‌کنیم آیا قبلاً این جشن برای این کاربر نمایش داده شده یا نه
    return (
        <>

            {/* برای مودال تبریک */}
            <style>
                {`
        .celebration-modal {
    position: fixed;
    top: 20px;
    left: 0;
    right: 0;
    margin: 0 auto;
    max-width: 320px;
}
                `}
            </style>
            {/* برای مودال تبریک */}


            <div className="p-4 flex items-center flex-col border-1 rounded-md ">
                <div className="flex justify-between mb-2">


                    <p className="text-sm dark:text-white font-medium">
                        شما
                        <span className="text-blue-500 font-bold  mr-2 ml-2">
                            {profileProgress}%
                        </span>
                        از پروفایل خود را تکمیل کرده اید .
                    </p>



                </div>
                <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden ">

                    <div
                        className="h-full bg-green-600 dark:bg-blue-500 rounded-full flex  transition-all duration-500"
                        style={{
                            width: `${profileProgress}%`
                        }}
                    />
                </div>
            </div>

            {/* مودال جشن تکمیل پروفایل */}
            <Modal
                show={showCelebration}
                onHide={() => setShowCelebration(false)}
                dialogClassName="celebration-modal"
            >
                <Modal.Body className="text-center py-2">
                    <div className="text-3xl mb-1">🎉</div>
                    <h6 className="fw-bold mb-1">تبریک!</h6>
                    <p className="mb-0 small">شما ۱۰۰٪ پروفایل خود را تکمیل کرده‌اید.</p>
                </Modal.Body>
            </Modal>
            {/* مودال جشن تکمیل پروفایل */}
        </>
    )
}
