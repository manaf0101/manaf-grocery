import { Button } from "react-bootstrap"
import axios from "axios"
import { useParams, useLocation , useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { FaShoppingBasket } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

// context  سراسری برای هماهنگ بودن به روزرسانی این کامپوننت با EditMyProfile.tsx
import { useProfile } from "../../../../contexts/ProfileContext";
// context  سراسری برای هماهنگ بودن به روزرسانی این کامپوننت با EditMyProfile.tsx





function MyProfileLeftMenu() {


    const navigate = useNavigate()
    const { profile } = useProfile()

//بعد از آوردن context سراسری این قسمت نیازی نیست 
    // const [profile, setProfile] = useState({
    //     username: "",
    //     fullName: "",
    //     userPhone: "",
    //     userEmail: ""
    // });

    const { userId } = useParams()
    const location = useLocation()
    // برای خط قرمز رنگ کنار آیتم های خلاصه فعالیت ها و .. استفاده خواهد شد . 
    const isActiveMyProfile = location.pathname === `/TheUserPage/${userId}/main/userMenu/MyProfile`
    const isActiveMyOrders = location.pathname === `/TheUserPage/${userId}/main/userMenu/MyProfile/MyOrders`
    const isActiveMyLists = location.pathname === `/TheUserPage/${userId}/main/userMenu/MyProfile/MyLists`
    // برای خط قرمز رنگ کنار آیتم های خلاصه فعالیت ها و .. استفاده خواهد شد . 

//بعد از آوردن context سراسری این قسمت نیازی نیست 
    // const getProfile = async () => {
    //     try {

    //         const response = await axios.get(
    //             `http://localhost:8000/api/profile/${userId}`
    //         )

    //         setProfile(response.data)

    //     } catch (err) {
    //         console.error("خطا در دریافت پروفایل:", err);
    //     }
    // }

        // // هنگام Mount شدن کامپوننت اجرا می‌شود
    // useEffect(() => {
    //     getProfile();
    //     console.log(profile);
    // }, []);
//بعد از آوردن context سراسری این قسمت نیازی نیست 







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



            <aside className="h-screen ">
                {/* مربوط یه کادر نام کاربری و ... */}
                <section className="flex flex-col items-center justify-center border  h-auto mt-4 p-2 gap-2 rounded-md">
                    {/* نام کاربری */}
                    <p className="font-bold text-stone-400">نام کاربری</p>
                    <div className="p-1 border w-full text-gray-500 flex justify-center">{profile?.username || "ناموجود"}</div>
                    {/* نام کاربری */}

                    {/* نام و نام خانوادگی */}
                    <p className="font-bold text-stone-400">نام و نام خانوادگی</p>
                    <div className="p-1 border w-full text-gray-500 flex justify-center">{profile?.fullName || "ناموجود"} </div>
                    {/* نام و نام خانوادگی */}

                    {/* شماره همراه */}
                    <p className="font-bold text-stone-400">شماره همراه</p>
                    <div className="p-1 border  w-full text-gray-500 flex justify-center"> {profile?.userPhone || "ناموجود"}</div>
                    {/* شماره همراه */}

                    {/* ایمیل */}
                    <p className="font-bold text-stone-400">ایمیل</p>
                    <div className="p-1 border w-full text-gray-500 flex justify-center">{profile?.userEmail || 'ناموجود'}</div>
                    {/* ایمیل */}

                    <Button
                    onClick={() => navigate(`/TheUserPage/${userId}/main/userMenu/MyProfile/edit`)}
                    variant="editButton">ویرایش</Button>
                </section>
                {/* مربوط یه کادر نام کاربری و ... */}

                {/* مربوط به خلاصه فعالیت ها ... */}
                <section className="[direction:rtl] flex flex-col items-start  border h-auto">
                    {/* فعالیت ها */}
                    <div className={`group flex border-b-2 w-full p-2 cursor-pointer ${isActiveMyProfile ? 'border-r-4 border-r-blue-800' : ''}`}>
                        <FaHome className="dark:text-white ml-2 size-5 group-hover:size-6 transition-all duration-200" />
                        <p className="text-gray-500 hover:text-black group-hover:font-bold group-hover:text-black dark:group-hover:text-white dark:hover:text-white transition-all duration-200">خلاصه فعالیت ها</p>
                    </div>
                    {/* فعالیت ها */}

                    {/* سفارش های من */}
                    <div className={`group flex border-b-2 w-full p-2 cursor-pointer ${isActiveMyOrders ? 'border-r-4 border-r-blue-800' : ''}`}>
                        <FaShoppingBasket className="dark:text-white ml-2 size-5 group-hover:size-6 transition-all duration-200" />
                        <p className="text-gray-500 hover:text-black group-hover:font-bold group-hover:text-black dark:group-hover:text-white dark:hover:text-white transition-all duration-200">سفارش ها</p>
                    </div>
                    {/* سفارش های من */}


                    {/* لیست های من  */}
                    <div className={`group flex border-b-2 w-full p-2 cursor-pointer ${isActiveMyLists ? 'border-r-4 border-r-blue-800' : ''}`}>
                        <FaRegHeart className="dark:text-white ml-2 size-5 group-hover:size-6 transition-all duration-200" />
                        <p className="text-gray-500 hover:text-black group-hover:font-bold group-hover:text-black dark:group-hover:text-white dark:hover:text-white transition-all duration-200">لیست های من</p>
                    </div>
                    {/* لیست های من  */}


                </section>
                {/* مربوط به خلاصه فعالیت ها ... */}
            </aside>
        </>
    )
}

export default MyProfileLeftMenu