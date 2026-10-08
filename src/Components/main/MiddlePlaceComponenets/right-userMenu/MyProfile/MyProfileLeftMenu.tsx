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
    }

    .dark .btn-editButton {
      background-color: rgb(128 144 166);
    }

    .btn-editButton:hover {
      background-color: rgb(152 159 169);
    }

    .dark .btn-editButton:hover {
      background-color: rgb(22 78 99);
    }
  `}
            </style>
            {/* استایل برای دکمه ی ویرایش */}

            <aside className="w-full h-auto p-2 lg:h-screen lg:p-0">
                {/* مربوط یه کادر نام کاربری و ... */}
                <section className="flex flex-col items-center justify-center border h-auto mt-2 p-3 gap-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm lg:mt-4 lg:p-2">
                    <p className="font-bold text-stone-400">نام کاربری</p>
                    <div className="p-2 border w-full text-gray-500 flex justify-center rounded-md bg-stone-50 dark:bg-slate-700 dark:text-slate-200">{profile?.username || "ناموجود"}</div>

                    <p className="font-bold text-stone-400">نام و نام خانوادگی</p>
                    <div className="p-2 border w-full text-gray-500 flex justify-center rounded-md bg-stone-50 dark:bg-slate-700 dark:text-slate-200">{profile?.fullName || "ناموجود"}</div>

                    <p className="font-bold text-stone-400">شماره همراه</p>
                    <div className="p-2 border w-full text-gray-500 flex justify-center rounded-md bg-stone-50 dark:bg-slate-700 dark:text-slate-200">{profile?.userPhone || "ناموجود"}</div>

                    <p className="font-bold text-stone-400">ایمیل</p>
                    <div className="p-2 border w-full text-gray-500 flex justify-center rounded-md bg-stone-50 dark:bg-slate-700 dark:text-slate-200">{profile?.userEmail || 'ناموجود'}</div>

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
                <section className="[direction:rtl] mt-3 flex flex-col items-start border rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm lg:mt-0">
                    {/* فعالیت ها */}
                    <div
                        onClick={() => navigate(`/TheUserPage/${userId}/main/userMenu/MyProfile`)}
                        className={`group flex border-b-2 w-full p-3 cursor-pointer transition-colors ${isActiveMyProfile ? 'bg-slate-100 dark:bg-slate-700 border-r-4 border-r-blue-800' : ''}`}>
                        <FaHome className={`dark:text-white ml-2 transition-all duration-200 ${isActiveMyProfile ? 'size-6' : 'size-5'} group-hover:size-6`} />
                        <p className={`transition-all duration-200 ${
                            isActiveMyProfile
                                ? 'font-bold text-black dark:!text-white'
                                : 'text-gray-500 hover:text-black group-hover:font-bold group-hover:text-black dark:hover:!text-white dark:group-hover:!text-white'
                        }`}>
                            خلاصه فعالیت ها
                        </p>
                    </div>
                    {/* فعالیت ها */}

                    {/* سفارش های من */}
                    <div
                        onClick={() => navigate(`/TheUserPage/${userId}/main/userMenu/MyProfile/MyOrders`)}
                        className={`group flex border-b-2 w-full p-3 cursor-pointer transition-colors ${isActiveMyOrders ? 'bg-slate-100 dark:bg-slate-700 border-r-4 border-r-blue-800' : ''}`}>
                        <FaShoppingBasket
                            className={`dark:text-white ml-2 size-5 group-hover:size-6 group-active:size-6 transition-all duration-200 ${isActiveMyOrders ? 'size-6' : ''}`}
                        />
                        <p className={`transition-all duration-200 ${
                            isActiveMyOrders
                                ? 'font-bold text-black dark:!text-white'
                                : 'text-gray-500 hover:text-black group-hover:font-bold group-hover:text-black dark:hover:!text-white dark:group-hover:!text-white'
                        }`}>
                            سفارش ها
                        </p>
                    </div>
                    {/* سفارش های من */}

                    {/* لیست های من  */}
                    <div className={`group flex w-full p-3 cursor-pointer transition-colors ${isActiveMyLists ? 'bg-slate-100 dark:bg-slate-700 border-r-4 border-r-blue-800' : ''}`}>
                        <FaRegHeart className={`dark:text-white ml-2 transition-all duration-200 ${isActiveMyLists ? 'size-6' : 'size-5'} group-hover:size-6`} />
                        <p className={`transition-all duration-200 ${
                            isActiveMyLists
                                ? 'font-bold text-black dark:!text-white'
                                : 'text-gray-500 hover:text-black group-hover:font-bold group-hover:text-black dark:hover:!text-white dark:group-hover:!text-white'
                        }`}>
                            لیست های من
                        </p>
                    </div>
                    {/* لیست های من  */}

                  

                </section>

                  <div className="mt-24 md:collapse"></div>
                {/* مربوط به خلاصه فعالیت ها ... */}
            </aside>

            {/* مودال راهنمای ویرایش پروفایل */}
            <Modal show={showEditInfoModal} onHide={() => setShowEditInfoModal(false)} centered>
                <Modal.Body className="text-center py-4 dark:bg-slate-700 dark:text-gray-200 p-2">
                    <p className="mb-4">. بعد از اعمال تغییرات مد نظرتان روی دکمه ثبت تغییرات کلیک کنید</p>
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