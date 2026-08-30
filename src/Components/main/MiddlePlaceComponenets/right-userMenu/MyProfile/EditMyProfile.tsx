import { useLoaderData, useParams, useFetcher } from "react-router-dom"
import { FaPen } from "react-icons/fa"
import { useState, useEffect } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import axios from "axios"
import { useProfile } from "../../../../contexts/ProfileContext"
// تقویم شمسی برای انتخاب تاریخ تولد
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
// تقویم شمسی برای انتخاب تاریخ تولد


interface ProfileData {
    fullName?: string
    userNationalityCode?: string
    userPhone?: string
    userEmail: string
    password?: string
    userBirth?: string
    job?: string
    refundMethod?: {
        shebaNumber?: string
    }
}

interface FieldValues {
    fullName: string
    userNationalityCode: string
    userPhone: string
    userEmail: string
    password: string
    userBirth: string
    job: string
    shebaNumber: string,
    // این می‌گه: «علاوه بر فیلدهای مشخص‌شده‌ی بالا، این آبجکت می‌تونه هر کلید دیگه‌ای هم با نام دلخواه (string) داشته باشه، به‌شرطی که مقدارش هم از نوع string باشه».
    [key: string]: string,
}

interface PasswordStep {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

interface PasswordErrors {
    currentPassword?: string
    newPassword?: string
    confirmPassword?: string
}

// تبدیل تاریخ میلادی ذخیره‌شده (ISO) به نمایش شمسی برای UI
const formatPersianDate = (isoDate?: string) => {
    if (!isoDate) return ""
    const dateObj = new DateObject({ date: new Date(isoDate), calendar: persian, locale: persian_fa })
    return dateObj.format("YYYY/MM/DD")
}

function EditMyProfile() {
    const profile = useLoaderData() as ProfileData
    const { userId } = useParams()
    const fetcher = useFetcher()

    const [values, setValues] = useState<FieldValues>({
        fullName: profile?.fullName || "",
        userNationalityCode: profile?.userNationalityCode || "",
        userPhone: profile?.userPhone || "",
        userEmail: profile?.userEmail || "",
        password: profile?.password || "",
        userBirth: profile?.userBirth || "",
        job: profile?.job || "",
        shebaNumber: profile?.refundMethod?.shebaNumber || "",
    })

    // برای زمانی که کاربر روی دکمه ثبت تغییرات کلیک کرد و تغییرات موفقیت آمیز بودند
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const { setProfile } = useProfile()

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data?.success) {
            setShowSuccessModal(true)
            setProfile(fetcher.data.profile)
        }
    }, [fetcher.state, fetcher.data])
    // برای زمانی که کاربر روی دکمه ثبت تغییرات کلیک کرد و تغییرات موفقیت آمیز بودند


    // برای زمانی که کاربر روی دکمه ثبت تغییرات کلیک کرد و تغییرات موفقیت آمیز نبودند
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher.data.success) {
                setShowSuccessModal(true)
            } else {
                setErrorMessage(fetcher.data.message || "خطایی رخ داد، لطفاً دوباره تلاش کنید")
            }
        }
    }, [fetcher.state, fetcher.data])
    // برای زمانی که کاربر روی دکمه ثبت تغییرات کلیک کرد و تغییرات موفقیت آمیز نبودند


    const [editingField, setEditingField] = useState<keyof FieldValues | null>(null)
    const [tempValue, setTempValue] = useState<string>("")

    // state های مخصوص مودال رمز عبور
    const [passwordStep, setPasswordStep] = useState<PasswordStep>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({})
    const [currentPasswordVerified, setCurrentPasswordVerified] = useState(false)
    const [checkingCurrentPassword, setCheckingCurrentPassword] = useState(false)

    const fieldMeta: { key: keyof FieldValues; label: string; type: string }[] = [
        { key: "fullName", label: "نام و نام خانوادگی", type: "text" },
        { key: "userNationalityCode", label: "کد ملی", type: "text" },
        { key: "userPhone", label: "شماره موبایل", type: "text" },
        { key: "userEmail", label: "ایمیل", type: "email" },
        { key: "password", label: "رمز عبور", type: "password" },
        { key: "userBirth", label: "تاریخ تولد", type: "date" },
        { key: "job", label: "شغل", type: "text" },
        { key: "shebaNumber", label: "شماره شبا", type: "text" },
    ]

    const activeMeta = fieldMeta.find((f) => f.key === editingField)

    const openModal = (key: keyof FieldValues) => {
        setEditingField(key)
        if (key === "password") {
            setPasswordStep({ currentPassword: "", newPassword: "", confirmPassword: "" })
            setPasswordErrors({})
            setCurrentPasswordVerified(false)
        } else {
            setTempValue(values[key])
        }
    }

    const closeModal = () => {
        setEditingField(null)
        setTempValue("")
        setPasswordStep({ currentPassword: "", newPassword: "", confirmPassword: "" })
        setPasswordErrors({})
        setCurrentPasswordVerified(false)
    }

    // چک کردن رمز فعلی با سرور - این endpoint بعداً باید سمت Express ساخته بشه
    const verifyCurrentPassword = async () => {
        if (!passwordStep.currentPassword) return

        setCheckingCurrentPassword(true)
        try {
            const response = await axios.post(`http://localhost:8000/api/check-password`, {
                userId,
                password: passwordStep.currentPassword,
            })

            if (response.data.valid) {
                setCurrentPasswordVerified(true)
                setPasswordErrors((prev) => ({ ...prev, currentPassword: undefined }))
            } else {
                setCurrentPasswordVerified(false)
                setPasswordErrors((prev) => ({ ...prev, currentPassword: "رمز عبور فعلی اشتباه است" }))
            }
        } catch (error) {
            setCurrentPasswordVerified(false)
            setPasswordErrors((prev) => ({ ...prev, currentPassword: "خطا در بررسی رمز عبور" }))
        } finally {
            setCheckingCurrentPassword(false)
        }
    }

    const handleNewPasswordChange = (val: string) => {
        setPasswordStep((prev) => ({ ...prev, newPassword: val }))
        setPasswordErrors((prev) => ({
            ...prev,
            newPassword: val.length > 0 && val.length < 8 ? "رمز عبور حداقل باید ۸ کاراکتر داشته باشد" : undefined,
        }))
    }

    const handleConfirmPasswordChange = (val: string) => {
        setPasswordStep((prev) => ({ ...prev, confirmPassword: val }))
        setPasswordErrors((prev) => ({
            ...prev,
            confirmPassword: val !== passwordStep.newPassword ? "رمزهای عبور مطابقت ندارند" : undefined,
        }))
    }

    // این تابع برای ذخیره تغییرات در state اصلی استفاده می‌شود. اگر فیلد در حال ویرایش رمز عبور باشد، ابتدا خطاهای مربوط به رمز عبور را بررسی می‌کند و در صورت وجود خطا، از ادامه جلوگیری می‌کند. اگر همه چیز درست بود، مقدار جدید را در state اصلی ذخیره می‌کند و مودال را می‌بندد. برای سایر فیلدها، مقدار موقت را در state اصلی ذخیره می‌کند و مودال را می‌بندد.
    const handleModalSave = () => {
        if (editingField === "password") {

            const errors: PasswordErrors = {}

            // بررسی خطاهای رمز عبور قبل از ذخیره
            if (!currentPasswordVerified) errors.currentPassword = "ابتدا رمز عبور فعلی را تایید کنید"
            if (passwordStep.newPassword.length < 8) errors.newPassword = "رمز عبور حداقل باید ۸ کاراکتر داشته باشد"
            if (passwordStep.confirmPassword !== passwordStep.newPassword) errors.confirmPassword = "رمزهای عبور مطابقت ندارند"

            // اگر خطایی وجود داشت، آن را در state ذخیره کن و از ادامه جلوگیری کن
            if (Object.keys(errors).length > 0) {
                setPasswordErrors(errors)
                return
            }

            // اگر همه چیز درست بود، مقدار جدید رمز عبور را در state اصلی ذخیره کن
            setValues((prev) => ({ ...prev, password: passwordStep.newPassword }))
            closeModal()
            return
        }

        // برای سایر فیلدها، مقدار موقت را در state اصلی ذخیره کن
        if (!editingField) return
        setValues((prev) => ({ ...prev, [editingField]: tempValue }))
        closeModal()
    }

    // این تابع در نهایت باید اطلاعات را به سرور ارسال کند. در حال حاضر فقط در کنسول چاپ می‌کند.
    const handleSubmitAll = () => {
        fetcher.submit(values, {
            method: "PUT",
            encType: "application/json",
        })
    }

    return (
        <div className="w-full">
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

            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-4 gap-4">
                {fieldMeta.map((field) => (
                    <div
                        key={field.key}
                        className="border rounded-md p-3 flex items-center justify-between gap-2"
                    >
                        <div className="flex flex-col gap-1 overflow-hidden">
                            <span className="text-sm font-bold text-stone-400">{field.label}</span>
                            <span className="text-gray-600 dark:text-white truncate">
                                {field.key === "password"
                                    ? "********"
                                    : field.key === "userBirth"
                                        ? (formatPersianDate(values.userBirth) || "ثبت نشده")
                                        : (values[field.key] || "ثبت نشده")}
                            </span>
                        </div>

                        <FaPen
                            className="cursor-pointer text-stone-400 hover:text-black dark:hover:text-white shrink-0"
                            onClick={() => openModal(field.key)}
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6">
                <Button variant="primary" onClick={handleSubmitAll} className="px-6" disabled={fetcher.state !== "idle"}>
                    {fetcher.state !== "idle" ? "در حال ثبت..." : "ثبت تغییرات"}
                </Button>
            </div>

            <Modal
                show={editingField !== null}
                onHide={closeModal}
                centered
                dialogClassName="profile-edit-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>ویرایش {activeMeta?.label}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {editingField === "password" ? (
                        <div className="flex flex-col gap-3">
                            {/* رمز عبور فعلی */}
                            <Form.Group>
                                <Form.Label>رمز عبور فعلی</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={passwordStep.currentPassword}
                                    onChange={(e) =>
                                        setPasswordStep((prev) => ({ ...prev, currentPassword: e.target.value }))
                                    }
                                    onBlur={verifyCurrentPassword}
                                    isInvalid={!!passwordErrors.currentPassword}
                                    autoFocus
                                />
                                {checkingCurrentPassword && (
                                    <div className="text-sm text-gray-400 mt-1">در حال بررسی...</div>
                                )}
                                {passwordErrors.currentPassword && (
                                    <div className="text-red-500 text-sm mt-1">{passwordErrors.currentPassword}</div>
                                )}
                            </Form.Group>

                            {/* رمز عبور جدید */}
                            <Form.Group>
                                <Form.Label>رمز عبور جدید</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={passwordStep.newPassword}
                                    onChange={(e) => handleNewPasswordChange(e.target.value)}
                                    disabled={!currentPasswordVerified}
                                    isInvalid={!!passwordErrors.newPassword}
                                />
                                <div className="text-xs text-gray-400 mt-1">رمز عبور حداقل باید ۸ کاراکتر داشته باشد</div>
                                {passwordErrors.newPassword && (
                                    <div className="text-red-500 text-sm mt-1">{passwordErrors.newPassword}</div>
                                )}
                            </Form.Group>

                            {/* تکرار رمز عبور جدید */}
                            <Form.Group>
                                <Form.Label>تکرار رمز عبور جدید</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={passwordStep.confirmPassword}
                                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                                    disabled={!currentPasswordVerified}
                                    isInvalid={!!passwordErrors.confirmPassword}
                                />
                                {passwordErrors.confirmPassword && (
                                    <div className="text-red-500 text-sm mt-1">{passwordErrors.confirmPassword}</div>
                                )}
                            </Form.Group>
                        </div>
                    ) : editingField === "userBirth" ? (
                        <Form.Group>
                            <Form.Label>تاریخ تولد</Form.Label>
                            <DatePicker
                                calendar={persian}
                                locale={persian_fa}
                                value={tempValue ? new Date(tempValue) : ""}
                                onChange={(date) => {
                                    if (date && !Array.isArray(date)) {
                                        setTempValue(date.toDate().toISOString())
                                    } else {
                                        setTempValue("")
                                    }
                                }}
                                inputClass="rmdp-input form-control"
                                calendarPosition="bottom-right"
                            />
                        </Form.Group>
                    ) : (
                        <Form.Group>
                            <Form.Label>{activeMeta?.label}</Form.Label>
                            <Form.Control
                                type={activeMeta?.type || "text"}
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                    )}
                </Modal.Body>


                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        انصراف
                    </Button>
                    <Button variant="primary" onClick={handleModalSave}>
                        ذخیره
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*برای زمانی که کاربر روی دکمه ثبت تغییرات کلیک کرد و تغییرات موفقیت آمیز بودند*/}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered dialogClassName="profile-edit-modal">
                <Modal.Body className="text-center py-4">
                    <div className="text-3xl mb-2">✅</div>
                    <p className="mb-0 fw-bold">تغییرات با موفقیت ثبت شد</p>
                </Modal.Body>
            </Modal>
            {/*برای زمانی که کاربر روی دکمه ثبت تغییرات کلیک کرد و تغییرات موفقیت آمیز بودند*/}


            {/*برای زمانی که کاربر روی دکمه ثبت تغییرات کلیک کرد و تغییرات موفقیت آمیز نبودند*/}
            <Modal show={!!errorMessage} onHide={() => setErrorMessage(null)} centered dialogClassName="profile-edit-modal">
                <Modal.Body className="text-center py-4">
                    <div className="text-3xl mb-2 text-red-500">❌</div>
                    <p className="mb-0 fw-bold">{errorMessage}</p>
                </Modal.Body>
            </Modal>
            {/*برای زمانی که کاربر روی دکمه ثبت تغییرات کلیک کرد و تغییرات موفقیت آمیز نبودند*/}
        </div>
    )
}

export default EditMyProfile