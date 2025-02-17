import './click.css'

import { RxCross2 } from "react-icons/rx";
import { Link , useParams } from 'react-router-dom';

type ClickMenuIcon = {
    visable : any , 
    closeIt : () => void ,
    showCart : any
}

function ClickMenuIcon({visable , showCart , closeIt} : ClickMenuIcon) {

        // دستیابی به userId کاربر
        const { userId } = useParams<{ userId: string }>();
        // دستیابی به userId کاربر
    
    
        // مسیر پایه
        const basePath = `/TheUserPage/${userId}/main/userMenu/`;

    

    return (
        <>
        {/* برای کوچکتر از lg */}
{/* ---------زمانی ظاهر می شود که روی آیکون منو کلیک شود--------- */}
    {/* aside کلی */}
        <div className = {`lg:hidden fixed top-0 right-0  w-full  bg-slate-950 h-full bg-opacity-50 z-40 transition-all duration-200 ease-linear cart-overaly ${visable}`}  dir="rtl">
            <aside className={`fixed  right-0 top-0 h-full bg-white dark:bg-slate-950 z-50 w-2/3 sm:w-1/2 transition-all duration-200 ease-linear ${showCart}`}>
        {/* دیو اسکرول دار */}
            <div className="dark:bg-slate-950 h-full overflow-y-scroll scrollbar-thin dark:scrollbar-thumb-slate-700 scrollbar-thumb-slate-400 scrollbar-track-rounded-full scrollbar-thumb-rounded-full dark:scrollbar-track-slate-400 scrollbar-track-slate-200 pt-3 pb-3 ">
            {/* منوی کاربری */}
                {/* نوشته و سرتیتر منوی کاربری */}
                 <div className="grid grid-cols-2 cursor-pointer">
                    <p className="flex justify-start items-center col-start-1 col-span-1 pr-2 dark:text-white">
                        منوی کاربری
                    </p>
                    {/* علامت ضربدر */}
                    <button onClick={closeIt} className="flex justify-end items-center col-start-2 col-span-2 dark:text-white">
                    <RxCross2 className="size-6 font-bold"/>
                    </button>
                    {/* علامت ضربدر */}
                 </div>
                {/* نوشته و سرتیتر منوی کاربری */}
              {/* لیست منو */}
                        <ul className="grid grid-rows-8 cursor-pointer text-stone-400 mt-2 mr-2 ">
                            <li className="row-start-1 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white">
                                <Link onClick={closeIt} to={`${basePath}rahnemayeh-site`}>
                                    راهنمای سایت
                                </Link>
                            </li>
                            <li className="row-start-2 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white">
                                <Link onClick={closeIt} to={`${basePath}market`}>
                                    مارکت
                                </Link>
                            </li>
                            <li className="row-start-3 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white">
                                <Link onClick={closeIt} to={`${basePath}mine-market`}>
                                    مارکت من
                                </Link>
                            </li>
                            <li className="row-start-4 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white">
                                <Link onClick={closeIt} to={`${basePath}Gavanin`}>
                                    قوانین و مقررات
                                </Link>
                            </li>
                            <li className="row-start-5 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white">
                                <Link onClick={closeIt} to={`${basePath}Mahdodiatha`}>
                                    محدودیت ها
                                </Link>
                            </li>
                            <li className="row-start-6 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white">
                                <Link onClick={closeIt} to={`${basePath}EtebarehTejary`}>
                                    اعتبار تجاری
                                </Link>
                            </li>
                            <li className="row-start-7 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white">
                                <Link onClick={closeIt} to={`${basePath}Settings`}>
                                    تنظیمات
                                </Link>
                            </li>
                            <li className="row-start-8 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white">
                                <Link onClick={closeIt} to={`${basePath}Hamkary`}>
                                    درخواست همکاری
                                </Link>
                            </li>
                        </ul>
              {/* لیست منو */}
            {/* منوی کاربری */}
            </div>
        {/* دیو اسکرول دار */}
            </aside>


        </div>
    {/* aside کلی */}
{/* ---------زمانی ظاهر می شود که روی آیکون منو کلیک شود--------- */}
{/* برای کوچکتر از lg */}
        </>
    )
}

export default ClickMenuIcon