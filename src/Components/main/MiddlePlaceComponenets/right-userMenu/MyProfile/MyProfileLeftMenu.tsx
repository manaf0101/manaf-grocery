import { Button, Modal } from "react-bootstrap"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { FaHome } from "react-icons/fa";
import { FaShoppingBasket } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import { useProfile } from "../../../../contexts/ProfileContext";


function MyProfileLeftMenu() {

    const navigate = useNavigate()
    const { profile } = useProfile()

    const { userId } = useParams()
    const location = useLocation()

    const isActiveMyProfile = location.pathname === `/TheUserPage/${userId}/main/userMenu/MyProfile`
    const isActiveMyOrders =
        location.pathname === `/TheUserPage/${userId}/main/userMenu/MyProfile/MyOrders` ||
        location.pathname === `/TheUserPage/${userId}/main/userMenu/MyProfile/MyOrders/deliveredOrders` ||
        location.pathname === `/TheUserPage/${userId}/main/userMenu/MyProfile/MyOrders/returnedOrders` ||
        location.pathname === `/TheUserPage/${userId}/main/userMenu/MyProfile/MyOrders/canceledOrders`
    const isActiveMyLists = location.pathname === `/TheUserPage/${userId}/main/userMenu/MyProfile/MyLists`

    // برای نمایش مودال راهنمای صفحه‌ی ویرایش پروفایل
    const [showEditInfoModal, setShowEditInfoModal] = useState(false)

    return (
        <>
            {/* استایل برای دکمه ی ویرایش */}
            <style>
                {`
                    .btn-editButton {
                        background-color: rgb(203 213 225);
                        color: rgb(30 41 59);
                        border: 1px solid rgb(148 163 184);
                    }

                    .dark .btn-editButton {
                        background-color: rgb(71 85 105);
                        color: rgb(248 250 252);
                        border-color: rgb(100 116 139);
                    }

                    .btn-editButton:hover {
                        background-color: rgb(186 199 216);
                        color: rgb(15 23 42);
                        border-color: rgb(100 116 139);
                    }

                    .dark .btn-editButton:hover {
                        background-color: rgb(22 78 99);
                        color: rgb(255 255 255);
                        border-color: rgb(14 116 144);
                    }

                    .btn-editButton:focus-visible {
                        outline: 2px solid rgb(59 130 246);
                        outline-offset: 2px;
                    }

                    .profile-help-modal .modal-content {
                        background-color: #ffffff;
                        color: #1e293b;
                        border: 1px solid #e2e8f0;
                        border-radius: 12px;
                    }

                    .dark .profile-help-modal .modal-content {
                        background-color: #334155;
                        color: #f1f5f9;
                        border-color: #475569;
                    }
                `}
            </style>
            {/* استایل برای دکمه ی ویرایش */}

            <aside className="w-full h-auto p-2 text-slate-700 dark:text-slate-100 lg:h-screen lg:p-0">

                {/* مربوط یه کادر نام کاربری و ... */}
               <section className="flex flex-col items-center justify-center border border-slate-200 bg-white text-slate-700 h-auto mt-2 p-3 gap-2 rounded-xl shadow-sm dark:!border-slate-600 dark:!bg-slate-800 dark:!text-slate-100 lg:mt-4 lg:p-2">

                    <p className="font-bold text-stone-400 dark:text-slate-300">
                        نام کاربری
                    </p>
                    <div className="p-2 border border-slate-200 w-full flex justify-center rounded-md bg-stone-50 text-slate-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100">
                        {profile?.username || "ناموجود"}
                    </div>

                    <p className="font-bold text-stone-400 dark:text-slate-300">
                        نام و نام خانوادگی
                    </p>
                    <div className="p-2 border border-slate-200 w-full flex justify-center rounded-md bg-stone-50 text-slate-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100">
                        {profile?.fullName || "ناموجود"}
                    </div>

                    <p className="font-bold text-stone-400 dark:text-slate-300">
                        شماره همراه
                    </p>
                    <div className="p-2 border border-slate-200 w-full flex justify-center rounded-md bg-stone-50 text-slate-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100">
                        {profile?.userPhone || "ناموجود"}
                    </div>

                    <p className="font-bold text-stone-400 dark:text-slate-300">
                        ایمیل
                    </p>
                    <div className="p-2 border border-slate-200 w-full flex justify-center rounded-md bg-stone-50 text-slate-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100">
                        {profile?.userEmail || "ناموجود"}
                    </div>

                    <Button
                        onClick={() => setShowEditInfoModal(true)}
                        variant="editButton"
                        className="w-full mt-1 lg:w-auto"
                    >
                        ویرایش
                    </Button>
                </section>
                {/* مربوط یه کادر نام کاربری و ... */}

                {/* مربوط به خلاصه فعالیت ها ... */}
                <section className="[direction:rtl] mt-3 flex flex-col items-start border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm dark:!border-slate-600 dark:!bg-slate-800 lg:mt-0">

                    {/* فعالیت ها */}
                    <div
                        onClick={() => navigate(`/TheUserPage/${userId}/main/userMenu/MyProfile`)}
                        className={`group flex border-b-2 border-slate-200 w-full p-3 cursor-pointer transition-colors dark:border-slate-700 ${
                            isActiveMyProfile
                                ? 'bg-slate-100 border-r-4 border-r-blue-800 dark:bg-slate-700 dark:border-r-cyan-400'
                                : 'dark:hover:bg-slate-700/80'
                        }`}
                    >
                        <FaHome
                            className={`ml-2 transition-all duration-200 ${
                                isActiveMyProfile
                                    ? 'size-6 text-blue-800 dark:text-cyan-300'
                                    : 'size-5 text-slate-500 group-hover:size-6 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white'
                            }`}
                        />
                        <p className={`transition-all duration-200 ${
                            isActiveMyProfile
                                ? 'font-bold text-slate-900 dark:text-white'
                                : 'text-slate-500 group-hover:font-bold group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white'
                        }`}>
                            خلاصه فعالیت ها
                        </p>
                    </div>
                    {/* فعالیت ها */}

                    {/* سفارش های من */}
                    <div
                        onClick={() => navigate(`/TheUserPage/${userId}/main/userMenu/MyProfile/MyOrders`)}
                        className={`group flex border-b-2 border-slate-200 w-full p-3 cursor-pointer transition-colors dark:border-slate-700 ${
                            isActiveMyOrders
                                ? 'bg-slate-100 border-r-4 border-r-blue-800 dark:bg-slate-700 dark:border-r-cyan-400'
                                : 'dark:hover:bg-slate-700/80'
                        }`}
                    >
                        <FaShoppingBasket
                            className={`ml-2 transition-all duration-200 ${
                                isActiveMyOrders
                                    ? 'size-6 text-blue-800 dark:text-cyan-300'
                                    : 'size-5 text-slate-500 group-hover:size-6 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white'
                            }`}
                        />
                        <p className={`transition-all duration-200 ${
                            isActiveMyOrders
                                ? 'font-bold text-slate-900 dark:text-white'
                                : 'text-slate-500 group-hover:font-bold group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white'
                        }`}>
                            سفارش ها
                        </p>
                    </div>
                    {/* سفارش های من */}

                    {/* لیست های من */}
                    <div
                        className={`group flex w-full p-3 cursor-pointer transition-colors ${
                            isActiveMyLists
                                ? 'bg-slate-100 border-r-4 border-r-blue-800 dark:bg-slate-700 dark:border-r-cyan-400'
                                : 'dark:hover:bg-slate-700/80'
                        }`}
                    >
                        <FaRegHeart
                            className={`ml-2 transition-all duration-200 ${
                                isActiveMyLists
                                    ? 'size-6 text-blue-800 dark:text-cyan-300'
                                    : 'size-5 text-slate-500 group-hover:size-6 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white'
                            }`}
                        />
                        <p className={`transition-all duration-200 ${
                            isActiveMyLists
                                ? 'font-bold text-slate-900 dark:text-white'
                                : 'text-slate-500 group-hover:font-bold group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white'
                        }`}>
                            لیست های من
                        </p>
                    </div>
                    {/* لیست های من */}

                </section>

                <div className="mt-24 md:collapse"></div>
                {/* مربوط به خلاصه فعالیت ها ... */}

            </aside>

            {/* مودال راهنمای ویرایش پروفایل */}
            <Modal
                show={showEditInfoModal}
                onHide={() => setShowEditInfoModal(false)}
                centered
                dialogClassName="profile-help-modal"
            >
                <Modal.Body className="text-center py-4 p-3">
                    <p className="mb-4">
                        بعد از اعمال تغییرات مد نظرتان روی دکمه ثبت تغییرات کلیک کنید.
                    </p>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setShowEditInfoModal(false)
                            navigate(`/TheUserPage/${userId}/main/userMenu/MyProfile/edit`)
                        }}
                    >
                        متوجه شدم
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default MyProfileLeftMenu