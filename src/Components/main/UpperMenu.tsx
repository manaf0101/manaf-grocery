import { RiHome2Line } from "react-icons/ri";
import { FiSun } from "react-icons/fi";
import { BsMoonStars } from "react-icons/bs";
import { SlCallIn } from "react-icons/sl";
import { HiUserGroup } from "react-icons/hi";
import useDarkMood from "../../Hooks/useDarkMood";
import { useEffect , useState} from "react";
import NavUpperUserMenu from "./NavUpperUserMenu";

type UpperMenu = {
    openUserMenu : () => any
}

function UpperMenu ({openUserMenu} : UpperMenu) {



// DARK MOOD

    const [themes , setTheme]  = useState (() => {

        // بررسی مقدار تم ذخیره‌شده در localStorage 
        const savedTheme = localStorage.getItem('theme');  
        if (savedTheme) return savedTheme ;
        // بررسی مقدار تم ذخیره‌شده در localStorage 


        //  اگر مقداری ذخیره نشده باشد پس مقدار پیشفرض سیستم را بررسی می کنیم
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        //  اگر مقداری ذخیره نشده باشد پس مقدار پیشفرض سیستم را بررسی می کنیم

      })

      useEffect(() => {  
        // تغییر کلاس 'dark' بر روی <html> 
        document.documentElement.classList.toggle('dark', themes === 'dark');
        // تغییر کلاس 'dark' بر روی <html> 
        localStorage.setItem('theme', themes);  
    }, [themes]); 


    // تابع مربوط به تغییر مود با کلیک روی دکمه ی مود
    function changeMood () {
        if (themes === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }
    // تابع مربوط به تغییر مود با کلیک روی دکمه ی مود


    
//.کاستوم هوک دارک مود که خودمان توسعه داده ایم و برای هماهنگ بودن با تیلویند توسعه داده شده 
const [theme]  =  useDarkMood() ; 
//.کاستوم هوک دارک مود که خودمان توسعه داده ایم و برای هماهنگ بودن با تیلویند توسعه داده شده 


    // برای زمانی که صفحه را رفرش می کنیم  و مجدد بالا می آید ، بداند که حالت دارک مود است یا غیره 
   useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } , [theme])
    // برای زمانی که صفحه را رفرش می کنیم  و مجدد بالا می آید ، بداند که حالت دارک مود است یا غیره 

// DARK MOOD

    return (
<>
{/*sticky*/}
{/* ..................یکی از این دو زمانی می آید که صفحه از lg
......................کوچکتر باشد
.......................و دیگری باید از sm به بعد وجود داشته باشد
.......................اما نکته اینجاست که هر دو باید حالت position : sticky را داشته باشند . */}

{/* -----------sm<----------- */}
{/*1*/}
{/* منوی بالایی برای بزرگتر از sm*/}
<div>
    <ul className="hidden sm:grid bg-slate-100 dark:bg-slate-950 gap-3 grid-cols-5 md:grid-cols-7 pb-2" dir="rtl" style={{fontFamily : 'VAZIR'}}>
        {/* لوگوی خانه */}
        <li className=" md:col-start-1 md:col-span-1 border-l-2 border-r-2 border-slate-200 mr-2 flex justify-center items-center hover:bg-gray-300 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:rounded-md">
          <p className="dark:text-white "><RiHome2Line className="size-5"/></p>
          <p className="dark:text-white pr-1">خانه</p>            
        </li>
        {/* لوگوی خانه */}

        {/* لوگوی تنظیم مود */}
        <li onClick={changeMood} style={{cursor : "pointer"}} className=" md:col-start-2 md:col-span-1 border-l-2 border-r-2 border-slate-200 flex justify-center items-center hover:bg-gray-300 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:rounded-md">
        <button >
            <div className="grid grid-col-2">
              <div className="col-start-1 col-span-1"><p className="dark:text-white">{themes === 'light' ? <FiSun className="size-6"/> : <BsMoonStars className="size-5"/>}</p></div>
              <div className="col-start-2 col-span-2"><p className="dark:text-white pr-1">مود</p></div>
            </div> 
        </button>           
        </li>
        {/* لوگوی تنظیم مود */}

        {/* تماس با ما */}
        <li className=" md:col-start-3 md:col-span-1 border-l-2 border-r-2 border-slate-200 flex justify-center items-center hover:bg-gray-300 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:rounded-md">
        <p className="dark:text-white"><SlCallIn className="size-6 pl-1"/></p>
        <p className="dark:text-white text-nowrap">تماس با ما</p>
        </li>
        {/* تماس ما */}

        {/* درباره با ما */}
        <li className="md:col-start-4 md:col-span-1 border-l-2 border-r-2 border-slate-200 flex justify-center items-center hover:bg-gray-300 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:rounded-md">
        <p className="dark:text-white"><HiUserGroup className="size-7 pl-1"/></p>
        <p className="dark:text-white">درباره  ما</p>
        </li>
        {/* درباره با ما */}

        {/* manaf grocery */}
        <li className=" md:col-span-2 md:col-start-6 md:pl-0 flex justify-end items-center ">
        <p  className= " dark:text-white p-1 bg-slate-300 dark:bg-slate-500  rounded-r-lg" style={{fontFamily : 'cursive'}}>manaf grocery</p>
        </li>
        {/* manaf grocery */}
    </ul>
</div>
{/* منوی بالایی برای بزرگتر از sm*/}
{/*1*/}

{/* 2 */}
{/* منوی کاربری برای کوچتر از lg */}
<NavUpperUserMenu openUserMenu={openUserMenu}/>
{/* منوی کاربری برای کوچتر از lg */}
{/* 2 */}
{/* -----------sm<----------- */}

{/*sticky*/}

</>
    )
}

export default UpperMenu