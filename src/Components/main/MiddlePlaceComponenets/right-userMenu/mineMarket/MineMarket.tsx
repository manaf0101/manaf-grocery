import Button from 'react-bootstrap/Button';
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

function MineMarket() {

    const { userId } = useParams()

    // نام غرفه و کد یکتای فروشنده
    const [storeName, setStoreName] = useState("")
    const [sellerID, setSellerID] = useState("")

    // نام کاربری و وضعیت بررسی آن
    const [username, setUsername] = useState("")
    const [usernameStatus, setUsernameStatus] = useState<"idle" | "invalid" | "duplicate" | "available">("idle")

    // پیام خوش‌آمدگویی و شمارش کلمات
    const [welcomeMessage, setWelcomeMessage] = useState("")
    const MAX_LENGTH = 150
    const [isBouncing, setIsBouncing] = useState(false)
    const bounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

// شمارش دقیق تمام کاراکترها و ایموجی‌ها
const countCharacters = (text: string) => {
    return [...text].length
}

    const wordCount = countCharacters(welcomeMessage)
    const progressPercent = Math.min(Math.round((wordCount / MAX_LENGTH) * 100), 100)

    // وقتی نام غرفه برای اولین بار پر می‌شود، کد یکتا از سرور گرفته می‌شود
    useEffect(() => {
        const shouldGenerate = storeName.trim() !== "" && sellerID === ""

        if (!shouldGenerate) return

        const fetchSellerId = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/generate-seller-id")
                setSellerID(response.data.sellerID)
            } catch (error) {
                console.log("خطا در دریافت کد فروشنده:", error)
            }
        }

        fetchSellerId()
    }, [storeName, sellerID])

    // بررسی نام کاربری: هم فرمت (فقط حروف انگلیسی) هم یکتا بودن آن در سرور
    const handleCheckUsername = async () => {
        const englishOnlyRegex = /^[a-zA-Z]+$/

        if (!englishOnlyRegex.test(username)) {
            setUsernameStatus("invalid")
            return
        }

        try {
            const response = await axios.get("http://localhost:8000/api/check-seller-username", {
                params: { username }
            })

            setUsernameStatus(response.data.exists ? "duplicate" : "available")

        } catch (error) {
            console.log("خطا در بررسی نام کاربری:", error)
        }
    }

    // با هر تغییر دستی در نام کاربری، وضعیت قبلی پاک می‌شود تا کاربر دوباره بررسی کند
    const handleUsernameChange = (value: string) => {
        setUsername(value)
        setUsernameStatus("idle")
    }

    // تغییر متن پیام خوش‌آمدگویی، با محدودیت ۱۵۰ کلمه
    const handleWelcomeMessageChange = (value: string) => {
        const newWordCount = countCharacters(value)

        if (newWordCount <= MAX_LENGTH) {
            setWelcomeMessage(value)
            return
        }

        // اگر از سقف مجاز رد شود، مقدار جدید نادیده گرفته می‌شود
        // و به‌جای آن یک انیمیشن کوتاه (بزرگ و کوچک شدن دایره) اجرا می‌شود
        setIsBouncing(true)

        if (bounceTimeoutRef.current) clearTimeout(bounceTimeoutRef.current)
        bounceTimeoutRef.current = setTimeout(() => setIsBouncing(false), 200)
    }

    // محاسبات مربوط به رسم دایره‌ی SVG
    const radius = 40
    const circumference = 2 * Math.PI * radius
    const dashOffset = circumference - (progressPercent / 100) * circumference

    return (
        <>
            <div className="w-full h-screen dark:text-white p-6 flex flex-col gap-6">

                <h2 className="text-xl font-bold border-b-2 border-blue-500 w-fit pb-1">
                    ایجاد فروشگاه
                </h2>

                {/* نام غرفه و کد یکتا */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-bold text-stone-400">نام غرفه</label>
                        <input
                            type="text"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            className="p-2 border rounded-md dark:bg-slate-800"
                            placeholder="مثلاً: فروشگاه ابزارآلات"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-bold text-stone-400">کد فروشنده (sellerID)</label>
                        <input
                            type="text"
                            value={sellerID}
                            readOnly
                            className="focus-visible:outline-none p-2 border rounded-md bg-gray-100 dark:bg-slate-700 text-gray-500 cursor-not-allowed"
                            placeholder="بعد از وارد کردن نام غرفه تولید می‌شود"
                        />
                    </div>
                </div>

                {/* نام کاربری */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-stone-400">نام کاربری</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => handleUsernameChange(e.target.value)}
                            className="flex-1 p-2 border rounded-md dark:bg-slate-800"
                            placeholder="فقط حروف انگلیسی"
                        />
                        <Button 
                            onClick={handleCheckUsername}
                            variant="primary"
                        >
                            بررسی
                        </Button>
                    </div>

                    {usernameStatus === "invalid" && (
                        <p className="text-red-600 text-sm">فقط مجاز به استفاده از حروف انگلیسی می‌باشید</p>
                    )}
                    {usernameStatus === "duplicate" && (
                        <p className="text-red-600 text-sm">این نام کاربری تکراری است</p>
                    )}
                    {usernameStatus === "available" && (
                        <p className="text-green-600 text-sm">انتخاب '{username}@' ایرادی ندارد</p>
                    )}
                </div>

                {/* پیام خوش‌آمدگویی + progress bar دایره‌ای */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-stone-400">
                        پیام خوش‌آمدگویی شما به مشتری ...
                    </label>
                    <textarea
                        value={welcomeMessage}
                        onChange={(e) => handleWelcomeMessageChange(e.target.value)}
                        rows={4}
                        className="p-2 border rounded-md dark:bg-slate-800 resize-none"
                        placeholder="مثلاً: به فروشگاه ما خوش آمدید! ما محصولاتی با کیفیت بالا ارائه می‌دهیم..."
                    />

                    <div className="flex flex-col items-start mt-2">
                        <svg
                            width="50"
                            height="50"
                            viewBox="0 0 100 100"
                            className={`transition-transform duration-200 ${isBouncing ? 'scale-110' : 'scale-100'}`}
                        >
                            {/* دایره‌ی پس‌زمینه (خاکستری) */}
                            <circle
                                cx="50"
                                cy="50"
                                r={radius}
                                fill="none"
                                stroke="currentColor"
                                className="text-gray-200 dark:text-slate-700"
                                strokeWidth="8"
                            />
                            {/* دایره‌ی پیشرفت (آبی) */}
                            <circle
                                cx="50"
                                cy="50"
                                r={radius}
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="8"
                                strokeDasharray={circumference}
                                strokeDashoffset={dashOffset}
                                strokeLinecap="round"
                                transform="rotate(-90 50 50)"
                                className="transition-all duration-300"
                            />
                            {/* درصد در وسط دایره */}
                            <text
                                x="50"
                                y="55"
                                className="fill-current text-lg font-bold"
                                textAnchor="middle"
                            >
                                {wordCount}/{MAX_LENGTH}
                            </text>
                        </svg>
                    </div>
                </div>

            </div>
        </>
    )
}

export default MineMarket