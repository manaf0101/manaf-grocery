import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom';


function UserMenu () {
    // دستیابی به userId کاربر
    const { userId } = useParams<{ userId: string }>();
    // دستیابی به userId کاربر


    // مسیر پایه
    const basePath = `/TheUserPage/${userId}/main/userMenu/`;


// جهت بولد کردن ساید بار سمت راست با توجه به این که کاربر در کدام صفحه است
    const checkDomainToBoldRightsidebar = (relatedDomain: string) => {
        const domain = window.location.pathname;
        return domain === relatedDomain ? 'text-stone-800 border-stone-800 dark:border-stone-600 dark:text-white dark:border-white' : '';
    };
// جهت بولد کردن ساید بار سمت راست با توجه به این که کاربر در کدام صفحه است


    
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

                    <li className={`row-start-1 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white ${checkDomainToBoldRightsidebar(`/TheUserPage/${userId}/main/userMenu/rahnemayeh-site`)}`}>
                        <Link to={`${basePath}rahnemayeh-site`}>
                            راهنمای سایت
                        </Link>
                    </li>

                    <li className={`row-start-2 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white
                        ${checkDomainToBoldRightsidebar(`/TheUserPage/${userId}/main/userMenu/market`)}`}> 
                    <Link  to={`${basePath}market`}>
                         مارکت 
                    </Link>
                    </li>

                    <li
                        className={`row-start-3 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white ${checkDomainToBoldRightsidebar(`/TheUserPage/${userId}/main/userMenu/mine-market`)}`}
                    >
                        <Link to={`${basePath}mine-market`}>
                            مارکت من
                        </Link>
                    </li>

                    <li
                        className={`row-start-4 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white ${checkDomainToBoldRightsidebar(`/TheUserPage/${userId}/main/userMenu/Gavanin`)}`}
                    >
                        <Link to={`${basePath}Gavanin`}>
                            قوانین و مقررات
                        </Link>
                    </li>

                    <li
                        className={`row-start-5 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white ${checkDomainToBoldRightsidebar(`/TheUserPage/${userId}/main/userMenu/Mahdodiatha`)}`}
                    >
                        <Link to={`${basePath}Mahdodiatha`}>
                            محدودیت ها
                        </Link>
                    </li>

                    <li
                        className={`row-start-6 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white ${checkDomainToBoldRightsidebar(`/TheUserPage/${userId}/main/userMenu/EtebarehTejary`)}`}
                    >
                        <Link to={`${basePath}EtebarehTejary`}>
                            اعتبار تجاری
                        </Link>
                    </li>

                    <li
                        className={`row-start-7 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white ${checkDomainToBoldRightsidebar(`/TheUserPage/${userId}/main/userMenu/Settings`)}`}
                    >
                        <Link to={`${basePath}Settings`}>
                            تنظیمات
                        </Link>
                    </li>

                    <li
                        className={`row-start-8 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white ${checkDomainToBoldRightsidebar(`/TheUserPage/${userId}/main/userMenu/MyProfile`)}`}
                    >
                        <Link to={`${basePath}MyProfile`}>
                           پروفایل من
                        </Link>
                    </li>

                    <li
                        className={`row-start-9 row-span-1 border-r-2 pr-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white ${checkDomainToBoldRightsidebar(`/TheUserPage/${userId}/main/userMenu/Hamkary`)}`}
                    >
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