import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom';

function UserMenu () {
    // دستیابی به userId کاربر
    const { userId } = useParams<{ userId: string }>();
    // دستیابی به userId کاربر


    // مسیر پایه
    const basePath = `/TheUserPage/${userId}/main/userMenu/`;
    
    return (
        <>
{/* --------------------------برای بزگ تر از lg */}
        {/* aside مربوط به منوی  */}
        <aside className=" h-fit bg-slate-50 dark:bg-slate-950  pr-8" dir="rtl" style={{fontFamily : 'VAZIR'}}>
        {/* دیو اسکرول دار */}
            <div className="dark:bg-slate-950  h-screen overflow-y-scroll scrollbar-thin dark:scrollbar-thumb-slate-700 scrollbar-thumb-slate-400 scrollbar-track-rounded-full scrollbar-thumb-rounded-full dark:scrollbar-track-slate-400 scrollbar-track-slate-200 pt-3 pb-3 ">
            {/* منوی کاربری */}
                {/* نوشته و سرتیتر منوی کاربری */}
                 <div className="grid grid-cols-1 cursor-pointer">
                    <p className="flex justify-start items-center col-start-1 col-span-1 pr-2 dark:text-white">
                        منوی کاربری
                    </p>
                 </div>
                {/* نوشته و سرتیتر منوی کاربری */}
              {/* لیست منو */}
                <ul className="grid grid-rows-8 cursor-pointer text-stone-400 mt-2 mr-2 ">

                    <li className="row-start-1 row-span-1 border-r-2 pr-3 pb-2 pt-2  dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white"> 
                    <Link to={`${basePath}rahnemayeh-site`}>
                        راهنمای سایت 
                    </Link>
                    </li>

                    <li className="row-start-2 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white"> 
                    <Link to={`${basePath}market`}>
                         مارکت 
                    </Link>
                    </li>

                    <li className="row-start-3 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white"> 
                    <Link to={`${basePath}mine-market`}>
                         مارکت من
                    </Link>
                    </li>

                    <li className="row-start-4 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white"> 
                    <Link to={`${basePath}Gavanin`}>
                         قوانین و مقررات
                    </Link>
                    </li>

                    <li className="row-start-5 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white"> 
                    <Link to={`${basePath}Mahdodiatha`}>
                          محدودیت ها 
                    </Link>
                    </li>
                    
                    <li className="row-start-6 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white"> 
                    <Link to={`${basePath}EtebarehTejary`}>
                           اعتبار تجاری 
                    </Link>
                    </li>

                    <li className="row-start-7 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white"> 
                    <Link to={`${basePath}Settings`}>
                         تنظیمات 
                    </Link>
                    </li>

                    <li className="row-start-8 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white"> 
                    <Link to={`${basePath}Hamkary`}>
                         درخواست همکاری 
                    </Link>
                    </li>
                </ul>
              {/* لیست منو */}
            {/* منوی کاربری */}
            </div>
        {/* دیو اسکرول دار */}
        </aside>
        {/* aside مربوط به منوی  */}
{/* --------------------------برای بزگ تر از lg */}
    </>
    )
}

export default UserMenu