import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useLoaderData, useFetcher } from "react-router-dom"
import { FaPen, FaChevronDown } from "react-icons/fa"
import ToggleButton from './ToggleButton';
import { useSellingPanel } from '../../../../contexts/SellingPanelContext';
// برای قسمت بررسی تکراری نبودن نام کاربری .   
import Spinner from 'react-bootstrap/Spinner';

interface ContactInfo {
    phone1: string
    phone2: string
    email: string
    address: string
    [key: string]: string
}

interface StoreData {
    storeName?: string
    sellerID?: string
    username?: string
    welcomeMessage?: string
    contactInfo?: ContactInfo
}

function MineMarket() {

    const store = useLoaderData() as StoreData
    const fetcher = useFetcher()

    // جهت فعالسازی پنل فروش
    const {isSellingPanelEnabled , setSellingPanelEnabled} = useSellingPanel()
    // جهت فعالسازی پنل فروش

    // نام غرفه و کد یکتای فروشنده — اگر فروشگاه از قبل ساخته شده، با مقدار سرور پر می‌شوند
    const [storeName, setStoreName] = useState(store?.storeName || "")
    const [sellerID, setSellerID] = useState(store?.sellerID || "")

    // نام کاربری و وضعیت بررسی آن
    const [username, setUsername] = useState(store?.username || "")
    const [usernameStatus, setUsernameStatus] = useState<"idle" | "invalid" | "duplicate" | "available">("idle")
    const [isCheckingUsername, setIsCheckingUsername] = useState(false)

    // اطلاعات تماس
    const [contactInfo, setContactInfo] = useState<ContactInfo>({
        phone1: store?.contactInfo?.phone1 || "",
        phone2: store?.contactInfo?.phone2 || "",
        email: store?.contactInfo?.email || "",
        address: store?.contactInfo?.address || "",
    })

    // پیام خوش‌آمدگویی و شمارش کاراکترها
    const [welcomeMessage, setWelcomeMessage] = useState(store?.welcomeMessage || "")
    const MAX_LENGTH = 150
    const [isBouncing, setIsBouncing] = useState(false)
    const bounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // مودال ویرایش نام غرفه
    const [showStoreNameModal, setShowStoreNameModal] = useState(false)
    const [tempStoreName, setTempStoreName] = useState("")
    const [storeNameError, setStoreNameError] = useState(false)

    // مودال ویرایش نام کاربری
    const [showUsernameModal, setShowUsernameModal] = useState(false)
    const [tempUsername, setTempUsername] = useState("")

    // مودال ویرایش اطلاعات تماس
    const [showContactModal, setShowContactModal] = useState(false)
    const [tempContactInfo, setTempContactInfo] = useState<ContactInfo>({
        phone1: "",
        phone2: "",
        email: "",
        address: "",
    })
    const [contactErrors, setContactErrors] = useState<{ phone1?: boolean }>({})
    // برای نمایش/عدم‌نمایش لیست کوچک اطلاعات تماس (با کلیک روی فلش)
    const [showContactList, setShowContactList] = useState(false)

    // مودال‌های موفقیت / خطا برای دکمه‌ی نهایی «ثبت تغییرات»
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    // شمارش دقیق تمام کاراکترها و ایموجی‌ها
    const countCharacters = (text: string) => {
        return [...text].length
    }

    const wordCount = countCharacters(welcomeMessage)
    const progressPercent = Math.min(Math.round((wordCount / MAX_LENGTH) * 100), 100)

    // وقتی نام غرفه (داخل مودال) برای اولین بار پر می‌شود، کد یکتا از سرور گرفته می‌شود
    useEffect(() => {
        const shouldGenerate = showStoreNameModal && tempStoreName.trim() !== "" && sellerID === ""

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
    }, [showStoreNameModal, tempStoreName, sellerID])

    // نتیجه‌ی نهایی «ثبت تغییرات»
useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
        if (fetcher.data.success) {
            setShowSuccessModal(true)

            // وضعیت پنل فروش را از داده‌ای که واقعاً سرور ذخیره و برگردانده، تنظیم می‌کنیم
            const isComplete = !!(
                fetcher.data.store?.storeName?.trim() &&
                fetcher.data.store?.username?.trim() &&
                fetcher.data.store?.contactInfo?.phone1?.trim()
            )
            setSellingPanelEnabled(isComplete)
        } else {
            setErrorMessage(fetcher.data.message || "خطایی رخ داد، لطفاً دوباره تلاش کنید")
        }
    }
}, [fetcher.state, fetcher.data])

    // باز کردن مودال نام غرفه
    const openStoreNameModal = () => {
        setTempStoreName(storeName)
        setStoreNameError(false)
        setShowStoreNameModal(true)
    }

    const closeStoreNameModal = () => {
        setShowStoreNameModal(false)
        setTempStoreName("")
        setStoreNameError(false)
    }

    const handleStoreNameTempChange = (value: string) => {
        setTempStoreName(value)
        if (value.trim() !== "") setStoreNameError(false)
    }

    const handleSaveStoreName = () => {
        // نام غرفه اجباری است و نباید خالی ذخیره شود
        if (!tempStoreName || tempStoreName.trim() === "") {
            setStoreNameError(true)
            return
        }

        setStoreName(tempStoreName)
        closeStoreNameModal()
    }

    // باز کردن مودال نام کاربری
    const openUsernameModal = () => {
        setTempUsername(username)
        setUsernameStatus("idle")
        setShowUsernameModal(true)
    }

    const closeUsernameModal = () => {
        setShowUsernameModal(false)
        setTempUsername("")
        setUsernameStatus("idle")
    }

    // بررسی نام کاربری: هم فرمت (فقط حروف انگلیسی) هم یکتا بودن آن در سرور
    const handleCheckUsername = async () => {
        const englishOnlyRegex = /^[a-zA-Z]+$/

        if (!englishOnlyRegex.test(tempUsername)) {
            setUsernameStatus("invalid")
            return
        }

        setIsCheckingUsername(true)

        try {
            const response = await axios.get("http://localhost:8000/api/check-seller-username", {
                params: { username: tempUsername }
            })

            setUsernameStatus(response.data.exists ? "duplicate" : "available")

        } catch (error) {
            console.log("خطا در بررسی نام کاربری:", error)
        } finally {
            setIsCheckingUsername(false)
        }
    }

    // با هر تغییر دستی نام کاربری داخل مودال، وضعیت قبلی پاک می‌شود تا کاربر دوباره بررسی کند
    const handleUsernameTempChange = (value: string) => {
        setTempUsername(value)
        setUsernameStatus("idle")
    }

    const handleSaveUsername = () => {
        if (usernameStatus !== "available") return
        setUsername(tempUsername)
        closeUsernameModal()
    }

    // باز کردن مودال اطلاعات تماس
    const openContactModal = () => {
        setTempContactInfo(contactInfo)
        setContactErrors({})
        setShowContactModal(true)
    }

    const closeContactModal = () => {
        setShowContactModal(false)
        setTempContactInfo({ phone1: "", phone2: "", email: "", address: "" })
        setContactErrors({})
    }

    const handleContactFieldChange = (key: keyof ContactInfo, value: string) => {
        setTempContactInfo((prev) => ({ ...prev, [key]: value }))
        if (key === "phone1" && value.trim() !== "") {
            setContactErrors((prev) => ({ ...prev, phone1: false }))
        }
    }

    const handleSaveContactInfo = () => {
        // فقط فیلد شماره تماس فروشنده اجباری است
        if (!tempContactInfo.phone1 || tempContactInfo.phone1.trim() === "") {
            setContactErrors({ phone1: true })
            return
        }

        setContactInfo(tempContactInfo)
        closeContactModal()
    }

    // تغییر متن پیام خوش‌آمدگویی، با محدودیت ۱۵۰ کاراکتر
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

    // ثبت نهایی همه‌ی اطلاعات فروشگاه
    const handleSubmitAll = () => {
        // خط دفاعی نهایی: حتی اگر کاربر از طریق مودال‌ها هم رد نشده باشد،
        // نباید فیلدهای اجباری خالی به سرور ارسال شوند
        if (!storeName || storeName.trim() === "") {
            setErrorMessage("نام غرفه الزامی است، لطفاً آن را تکمیل کنید")
            return
        }
        if (!username || username.trim() === "") {
            setErrorMessage("نام کاربری الزامی است، لطفاً آن را تکمیل کنید")
            return
        }
        if (!contactInfo.phone1 || contactInfo.phone1.trim() === "") {
            setErrorMessage("شماره تماس فروشنده الزامی است، لطفاً آن را تکمیل کنید")
            return
        }



        fetcher.submit(
            { storeName, sellerID, username, welcomeMessage, contactInfo },
            { method: "PUT", encType: "application/json" }
        )
    }


// وضعیت پنل فروش را در بارگذاری اولیه‌ی صفحه، بر اساس داده‌ی واقعیِ سرور تنظیم می‌کند
useEffect(() => {
    const isComplete = !!(
        store?.storeName?.trim() &&
        store?.username?.trim() &&
        store?.contactInfo?.phone1?.trim()
    )
    setSellingPanelEnabled(isComplete)
}, [])


    // محاسبات مربوط به رسم دایره‌ی SVG
    const radius = 40
    const circumference = 2 * Math.PI * radius
    const dashOffset = circumference - (progressPercent / 100) * circumference

    return (
        <>
            {/* استایل دارک‌مود مودال‌ها */}
            <style>
                {`
                    .dark .profile-edit-modal .modal-content {
                        background-color: rgb(30 41 59);
                        color: white;
                        border: 1px solid rgb(51 65 85);
                    }
                    .dark .profile-edit-modal .modal-header {
                        border-bottom: 1px solid rgb(51 65 85);
                    }
                    .dark .profile-edit-modal .modal-footer {
                        border-top: 1px solid rgb(51 65 85);
                    }
                    .dark .profile-edit-modal .form-control {
                        background-color: rgb(51 65 85);
                        color: white;
                        border: 1px solid rgb(71 85 105);
                    }
                    .dark .profile-edit-modal .form-control:focus {
                        background-color: rgb(51 65 85);
                        color: white;
                        box-shadow: 0 0 0 2px rgb(56 189 248 / 0.4);
                    }
                    .dark .profile-edit-modal .form-control:disabled {
                        background-color: rgb(40 52 68);
                        color: rgb(148 163 184);
                    }
                    .dark .profile-edit-modal .btn-close {
                        filter: invert(1);
                    }
                    .dark .profile-edit-modal .rmdp-input {
                        background-color: rgb(51 65 85);
                        color: white;
                        border: 1px solid rgb(71 85 105);
                    }
                `}
            </style>
            {/* استایل دارک‌مود مودال‌ها */}

            <div className="w-full min-h-screen dark:bg-slate-950 dark:text-white p-6 pb-14 sm:pb-6 flex flex-col gap-12">

                <h2 className="text-xl font-bold border-b-2 border-blue-500 w-fit pb-1">
                    ایجاد فروشگاه
                </h2>

                {/* نام غرفه و کد یکتا */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-bold text-stone-400">نام غرفه <span className='text-red-700'>*</span></label>
                        <div className="relative">
                            <input
                                type="text"
                                value={storeName}
                                readOnly
                                onClick={openStoreNameModal}
                                className="w-full p-2 pl-9 border rounded-md dark:bg-slate-800 cursor-pointer"
                                placeholder="مثلاً: فروشگاه ابزارآلات"
                            />
                            <FaPen
                                onClick={openStoreNameModal}
                                className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer text-stone-400 hover:text-black dark:hover:text-white"
                            />
                        </div>
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

                {/* نام کاربری و اطلاعات تماس */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-right'>
                    {/* نام کاربری */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-bold text-stone-400">نام کاربری <span className='text-red-700'>*</span></label>
                        <div className="relative">
                            <input
                                type="text"
                                value={username}
                                readOnly
                                onClick={openUsernameModal}
                                className="w-full p-2 pl-9 border rounded-md dark:bg-slate-800 cursor-pointer"
                                placeholder="فقط حروف انگلیسی"
                            />
                            <FaPen
                                onClick={openUsernameModal}
                                className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer text-stone-400 hover:text-black dark:hover:text-white"
                            />
                        </div>
                    </div>
                    {/* نام کاربری */}

                    {/* اطلاعات تماس */}
                    <div className="flex flex-col gap-1 relative ">
                        <label className="text-sm font-bold text-stone-400">اطلاعات تماس<span className='text-red-700'>*</span></label>
                        <div className="relative">
                            <input
                                type="text"
                                value={contactInfo.phone1 || ""}
                                readOnly
                                onClick={openContactModal}
                                className="w-full p-2 pl-16 border rounded-md dark:bg-slate-800 cursor-pointer"
                                placeholder="شماره تماس فروشنده"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <FaPen
                                    onClick={openContactModal}
                                    className="cursor-pointer text-stone-400 hover:text-black dark:hover:text-white"
                                />
                                <FaChevronDown
                                    onClick={() => setShowContactList((prev) => !prev)}
                                    className={`cursor-pointer text-stone-400 hover:text-black dark:hover:text-white transition-transform duration-200 ${showContactList ? 'rotate-180' : ''}`}
                                />
                            </div>
                        </div>

                        {/*اطلاعات تماس*/}
                        <div
                            className={`absolute top-full left-0 right-0 mt-1 z-20 border rounded-md p-2 flex flex-col gap-1 text-sm  dark:!bg-slate-800 bg-white shadow-lg origin-top transition-all duration-200 ${showContactList
                                ? 'opacity-100 scale-y-100 pointer-events-auto'
                                : 'opacity-0 scale-y-95 pointer-events-none'
                                }`}
                        >
                            <div className="flex justify-between">
                                <span className="text-stone-400">شماره تماس فروشنده:</span>
                                <span>{contactInfo.phone1 || "ثبت نشده"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-stone-400">شماره تماس دوم:</span>
                                <span>{contactInfo.phone2 || "ثبت نشده"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-stone-400">ایمیل:</span>
                                <span>{contactInfo.email || "ثبت نشده"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-stone-400">آدرس فروشگاه:</span>
                                <span>{contactInfo.address || "ثبت نشده"}</span>
                            </div>
                        </div>
                    </div>
                    {/* اطلاعات تماس */}

                </div>
                {/* نام کاربری و اطلاعات تماس */}

                {/* پیام خوش‌آمدگویی + progress bar دایره‌ای — مستقیم، بدون مودال */}
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
                            <circle
                                cx="50" cy="50" r={radius}
                                fill="none" stroke="currentColor"
                                className="text-gray-200 dark:text-slate-700"
                                strokeWidth="8"
                            />
                            <circle
                                cx="50" cy="50" r={radius}
                                fill="none" stroke="#3b82f6"
                                strokeWidth="8"
                                strokeDasharray={circumference}
                                strokeDashoffset={dashOffset}
                                strokeLinecap="round"
                                transform="rotate(-90 50 50)"
                                className="transition-all duration-300"
                            />
                            <text
                                x="50" y="55"
                                className="fill-current text-lg font-bold"
                                textAnchor="middle"
                            >
                                {wordCount}/{MAX_LENGTH}
                            </text>
                        </svg>
                    </div>
                </div>

                {/* دکمه‌ی ثبت نهایی   ,  پنل فروش */}
                <div className='flex w-full h-auto flex-row justify-center items-end gap-4'>

                    {/* پنل فروش */}
                    <div className={`flex flex-row px-6 gap-2 bg-gray-200 dark:bg-gray-500 rounded-md ${isSellingPanelEnabled || 'opacity-50'}`} style={{padding : '7px 24px'}}>
                    <ToggleButton disabled={!isSellingPanelEnabled}/>
                    <span>پنل فروش</span>
                    </div>
                    {/* پنل فروش */}

                    {/* دکمه ی ثبت تغییرات */}
                    <div className="flex justify-center mt-2">
                        <Button variant="primary" onClick={handleSubmitAll} className="px-6" disabled={fetcher.state !== "idle"}>
                            {fetcher.state !== "idle" ? "در حال ثبت..." : "ثبت تغییرات"}
                        </Button>
                    </div>
                    {/* دکمه ی ثبت تغییرات */}
                </div>
                {/* دکمه‌ی ثبت نهایی   ,  پنل فروش */}
            </div>

            {/* فروش */}
            <div className='flex flex-col'>پنل فروش</div>
            {/* فروش */}

            {/* مودال ویرایش نام غرفه */}
            <Modal show={showStoreNameModal} onHide={closeStoreNameModal} centered dialogClassName="profile-edit-modal">
                <Modal.Header closeButton>
                    <Modal.Title>ویرایش نام غرفه</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        value={tempStoreName}
                        onChange={(e) => handleStoreNameTempChange(e.target.value)}
                        className={`p-2 border rounded-md w-full dark:bg-slate-800 dark:text-white focus-visible:outline-none ${storeNameError
                            ? 'border-red-600 focus-visible:border-red-600 ring-1 ring-red-600'
                            : ''
                            }`}
                        placeholder="مثلاً: فروشگاه ابزارآلات"
                        autoFocus
                    />
                    {storeNameError && (
                        <p className="text-red-600 text-sm mt-2">نام غرفه نمی‌تواند خالی باشد</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeStoreNameModal}>انصراف</Button>
                    <Button variant="primary" onClick={handleSaveStoreName}>ذخیره</Button>
                </Modal.Footer>
            </Modal>

            {/* مودال ویرایش نام کاربری */}
            <Modal show={showUsernameModal} onHide={closeUsernameModal} centered dialogClassName="profile-edit-modal">
                <Modal.Header closeButton>
                    <Modal.Title>ویرایش نام کاربری</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="grid grid-cols-3 gap-2">
                        <input
                            type="text"
                            value={tempUsername}
                            onChange={(e) => handleUsernameTempChange(e.target.value)}
                            className="row-start-1 col-start-2 col-span-2 p-2 border rounded-md dark:bg-slate-800 dark:text-white"
                            placeholder="فقط حروف انگلیسی"
                            autoFocus
                        />
                        <Button
                            className='row-start-1 col-start-1'
                            onClick={handleCheckUsername}
                            variant="primary"
                            disabled={isCheckingUsername}
                        >
                            {isCheckingUsername ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                "بررسی"
                            )}
                        </Button>
                    </div>

                    {usernameStatus === "invalid" && (
                        <p className="text-red-600 text-sm mt-2 text-right">فقط مجاز به استفاده از حروف انگلیسی می‌باشید</p>
                    )}
                    {usernameStatus === "duplicate" && (
                        <p className="text-red-600 text-sm mt-2 text-right">این نام کاربری تکراری است</p>
                    )}
                    {usernameStatus === "available" && (
                        <p className="text-green-600 text-sm mt-2 text-right">انتخاب '@{tempUsername}' ایرادی ندارد</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeUsernameModal}>انصراف</Button>
                    <Button variant="primary" onClick={handleSaveUsername}>ذخیره</Button>
                </Modal.Footer>
            </Modal>

            {/* مودال ویرایش اطلاعات تماس */}
            <Modal show={showContactModal} onHide={closeContactModal} centered dialogClassName="profile-edit-modal">
                <Modal.Header closeButton>
                    <Modal.Title>ویرایش اطلاعات تماس</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="flex flex-col gap-3 text-right">

                        {/* شماره تماس فروشنده - اجباری */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-stone-400">
                                شماره تماس فروشنده <span className="text-red-700">*</span>
                            </label>
                            <input
                                type="text"
                                value={tempContactInfo.phone1 || ""}
                                onChange={(e) => handleContactFieldChange("phone1", e.target.value)}
                                className={`p-2 border rounded-md dark:bg-slate-800 dark:text-white focus-visible:outline-none ${contactErrors.phone1
                                    ? 'border-red-600 focus-visible:border-red-600 ring-1 ring-red-600'
                                    : ''
                                    }`}
                                autoFocus
                            />
                            {contactErrors.phone1 && (
                                <p className="text-red-600 text-sm">این فیلد اجباری است</p>
                            )}
                        </div>

                        {/* شماره تماس دوم - اختیاری */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-stone-400">شماره تماس دوم</label>
                            <input
                                type="text"
                                value={tempContactInfo.phone2 || ""}
                                onChange={(e) => handleContactFieldChange("phone2", e.target.value)}
                                className="p-2 border rounded-md dark:bg-slate-800 dark:text-white"
                            />
                        </div>

                        {/* ایمیل - اختیاری */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-stone-400">ایمیل فروشنده</label>
                            <input
                                type="email"
                                value={tempContactInfo.email || ""}
                                onChange={(e) => handleContactFieldChange("email", e.target.value)}
                                className="p-2 border rounded-md dark:bg-slate-800 dark:text-white"
                            />
                        </div>

                        {/* آدرس - اختیاری */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-stone-400">آدرس فروشگاه</label>
                            <input
                                type="text"
                                value={tempContactInfo.address || ""}
                                onChange={(e) => handleContactFieldChange("address", e.target.value)}
                                className="p-2 border rounded-md dark:bg-slate-800 dark:text-white"
                            />
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeContactModal}>انصراف</Button>
                    <Button variant="primary" onClick={handleSaveContactInfo}>ذخیره</Button>
                </Modal.Footer>
            </Modal>

            {/* مودال موفقیت */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered dialogClassName="profile-edit-modal">
                <Modal.Body className="text-center py-4">
                    <div className="text-3xl mb-2">✅</div>
                    <p className="mb-0 fw-bold">تغییرات با موفقیت ثبت شد</p>
                    <p className="mb-0 fw-bold">پنل فروش برای شما قابل استفاده است</p>
                </Modal.Body>
            </Modal>

            {/* مودال خطا */}
            <Modal show={!!errorMessage} onHide={() => setErrorMessage(null)} centered dialogClassName="profile-edit-modal">
                <Modal.Body className="text-center py-4">
                    <div className="text-3xl mb-2 text-red-500">❌</div>
                    <p className="mb-0 fw-bold">{errorMessage}</p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default MineMarket