import Image from 'react-bootstrap/Image';
import { FaGear } from "react-icons/fa6";
import imageSrc from '../../../public/pictures/1696162108939.jpg';
import imageIcon from '../../../public/pictures/icon-7797704_1280.png'
import { useParams } from 'react-router-dom';
import useDarkMood from '../../Hooks/useDarkMood';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';




function UserProfile() {

    // DARK MOOD

    //.کاستوم هوک دارک مود که خودمان توسعه داده ایم و برای هماهنگ بودن با تیلویند توسعه داده شده 
    const [theme] = useDarkMood()
    //.کاستوم هوک دارک مود که خودمان توسعه داده ایم و برای هماهنگ بودن با تیلویند توسعه داده شده 


    // برای زمانی که صفحه را رفرش می کنیم  و مجدد بالا می آید ، بداند که حالت دارک مود است یا غیره 
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme])
    // برای زمانی که صفحه را رفرش می کنیم  و مجدد بالا می آید ، بداند که حالت دارک مود است یا غیره 

    // DARK MOOD


    // دریافت آی دی اختصاصی کاربر از دامین سایت که به صورت داینامیک وارد شده بود
    const { userId } = useParams();
    // دریافت آی دی اختصاصی کاربر از دامین سایت که به صورت داینامیک وارد شده بود

    const [username, setUsername] = useState('guest');

    const [profileImage, setProfileImage] = useState<string | null>(null); // مسیر عکس از سرور
    const fileInputRef = useRef<HTMLInputElement>(null); // برای باز کردن input فایل با کلیک روی چرخ دنده

    //استخراج نام کاربر صاحب اکانت .....................

    // نام کاربری را از سرور میگیرد
    useEffect(() => {

        const getUserName = async () => {

            try {

                const response = await axios.get(
                    `http://localhost:8000/api/username/${userId}`
                );

                setUsername(response.data.username);

            } catch (error) {

                console.log("Error getting username:", error);

                setUsername('guest');

            }

        };

        if (userId) {
            getUserName();
        }

    }, [userId]);
    // نام کاربری را از سرور میگیرد


    // عکس پروفایل را از سرور می‌گیرد
    useEffect(() => {
        const getProfileImage = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/profile/${userId}`);
                setProfileImage(response.data.userProfileImage || null);
            } catch (error) {
                console.log("Error getting profile image:", error);
                setProfileImage(null);
            }
        };

        if (userId) {
            getProfileImage();
        }
    }, [userId]);
    // عکس پروفایل را از سرور می‌گیرد




    // عکسی که باید نمایش داده شود: یا از سرور، یا آیکون پیش‌فرض
    const userImage = () => {
        if (profileImage) {
            return `http://localhost:8000${profileImage}`;
        }
        return imageIcon;
    };


    // با کلیک روی مداد، input فایل مخفی باز می‌شود
    const handleGearClick = () => {
        fileInputRef.current?.click();
    };


    // وقتی کاربر یک فایل انتخاب کرد، بلافاصله آپلود می‌شود
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !userId) return;

        const formData = new FormData();
        formData.append('profileImage', file); // این اسم باید با upload.single('profileImage') سمت سرور یکی باشد

        try {
            const response = await axios.post(
                `http://localhost:8000/api/upload-profile-image/${userId}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            setProfileImage(response.data.userProfileImage);
        } catch (error) {
            console.log("Error uploading profile image:", error);
        }
    };


    return (
        <>

            {/* input فایل مخفی، مشترک بین هر دو نسخه موبایل و دسکتاپ */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
            {/* input فایل مخفی، مشترک بین هر دو نسخه موبایل و دسکتاپ */}


            {/*----------- < sm ---------- */}
            {/* دو ستون مربوط به پروفایل و نام تجاری سایت و منوی کاربری در کوچکتر از ---sm--- */}
            <div className='sm:hidden bg-slate-100 dark:bg-slate-950 grid grid-cols-2'>
                {/* ستون مربوط به نام تجاری */}
                <div className='col-start-1 bg-slate-200 dark:bg-slate-500  flex justify-center items-center pl-2 text-white'>
                    <p className=" text-slate-600 dark:text-white " style={{ fontFamily: 'cursive' }}>manaf grocery</p>
                </div>
                {/* ستون مربوط به نام تجاری */}

                {/* ستون مرکزی شامل پروفایل */}
                <div className='col-start-2 col-span-1 flex justify-center items-center pr-3 pt-3  dark:text-white'>
                    {/* سطر مرکزی */}
                    <div className='grid grid-rows-2'>
                        {/* سطر مربوط به عکس */}
                        {/* سطر مربوط به عکس */}
                        <div className='row-start-1 row-span-1 flex justify-center items-center'>
                            <div className="relative inline-block">
                                <Image src={userImage()} title='image' alt='profile image' style={{ width: '50px', height: '50px' }} roundedCircle />
                                <FaGear 
                                onClick={handleGearClick}
                                className="absolute bottom-0 left-0 bg-white dark:bg-slate-700 text-slate-600  rounded-full p-1 size-5 hover:size-6 transition-all duration-100 cursor-pointer shadow" />
                            </div>
                        </div>
                        {/* سطر مربوط به عکس */}
                        {/* سطر مربوط به عکس */}

                        {/* سطر مربوط به یوزرنیم کاربر */}
                        <div className="row-start-2 row-span-1 flex justify-center items-center">{username}</div>
                        {/* سطر مربوط به یوزرنیم کاربر */}
                    </div>
                    {/* سطر مرکزی */}
                </div>
                {/* ستون مرکزی شامل پروفایل */}
            </div>
            {/* دو ستون مربوط به پروفایل و نام تجاری سایت و منوی کاربری در کوچکتر از ---sm--- */}
            {/*----------- < sm ---------- */}

            {/* -----------sm<----------- */}
            {/*سه ستون مربوط به عکس و نام کاربری برای نمایش گر های بزرگتر از -----sm------*/}
            <div className="hidden sm:grid bg-slate-100 dark:sm:bg-slate-950  sm:grid-cols-3">

                {/*ستون مرکزی*/}
                <div className="col-start-2 col-span-1 flex justify-center items-center dark:text-slate-100">
                    {/* سطر های مرکزی */}
                    <div className="grid grid-rows-2 ">
                        {/* سطر مربوط به عکس */}
                        {/* سطر مربوط به عکس */}
                        <div className="row-start-1 row-span-1 flex justify-center items-center">
                            <div className="relative inline-block">
                                <Image src={userImage()} title='image' alt='profile image' style={{ width: '50px', height: '50px' }} roundedCircle />
                                <FaGear
                                onClick={handleGearClick}
                                className="absolute bottom-0 left-0 bg-white dark:bg-slate-700 text-slate-600  rounded-full p-1 size-5 hover:size-6 transition-all duration-100 cursor-pointer shadow" />
                            </div>
                        </div>
                        {/* سطر مربوط به عکس */}
                        {/* سطر مربوط به عکس */}

                        {/* سطر مربوط به یوزرنیم کابر */}
                        <div className="row-start-2 row-span-1 flex justify-center items-center">{username}</div>
                        {/* سطر مربوط به یوزرنیم کابر */}
                    </div>
                    {/* سطر های مرکزی */}
                </div>
                {/*ستون مرکزی*/}
            </div>
            {/*سه ستون مربوط به عکس و نام کاربری برای نمایش گر های بزرگتر از -----sm------*/}

            {/*تک خط سفید زیر نام و عکس پروفایل برای نمایش گر های بزرگتر از ------sm-----*/}
            <div className='hidden sm:grid sm:grid-cols-3 bg-slate-100 dark:sm:bg-slate-950'>
                <div className='col-start-2 col-span-1'>
                    <hr className='dark:text-white size-full mb-2' />
                </div>
            </div>
            {/*تک خط سفید زیر نام و عکس پروفایل برای نمایش گر های بزرگتر از ------sm-----*/}

            {/* -----------sm<----------- */}

        </>
    )
}

export default UserProfile