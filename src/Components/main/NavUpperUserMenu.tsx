
import { TbMenu2 } from "react-icons/tb";

type NavUpperUserMenu = {
    openUserMenu : () => any
}

function NavUpperUserMenu ({openUserMenu} : NavUpperUserMenu) {


    return (
        <>
{/*nav برای کوچکتر از lg*/}
<div className="lg:hidden w-full bg-slate-100 dark:bg-slate-950 " dir="rtl">
<nav onClick={openUserMenu}  className=" w-full bg-slate-50 dark:bg-slate-950  dark:text-white border-t border-b p-2 border-stone-200 dark:border-slate-600 cursor-pointer">
    <div >  
        <p className="flex justify-start items-center text-nowrap">  
        <TbMenu2 className="ml-2 size-6" /> 
            منوی کاربری  
        </p>  
    </div>
</nav>
</div>
{/*nav برای کوچکتر از lg*/}           
        </>
    )
}

export default NavUpperUserMenu