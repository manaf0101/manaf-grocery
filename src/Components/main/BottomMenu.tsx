import { CgProfile } from "react-icons/cg";
import { RiHome2Line } from "react-icons/ri";
import { SlCallIn } from "react-icons/sl";
import { HiUserGroup } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";


function BottomMenu () {
    return (
        <>
        {/*----------- < sm ---------- */}
{/* منوی پایینی برای کوچکتر از sm */}
<div className="sm:hidden" style={{fontFamily: 'VAZIR'}}>
    <div className="fixed z-40 bottom-0 right-0 left-0 bg-slate-100 dark:bg-slate-950">
        <div className="grid grid-cols-5">
            {/* مارکت من */}
            <div className="col-start-1  dark:text-white flex justify-center item-center pt-2  dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:bg-gray-300">
                <div className="grid-rows-2">
                    <div className="row-start-1 flex justify-center items-center">
                    <p className="dark:text-white "><CgProfile className="size-5"/></p>
                    </div>
                    <div className="row-start-2 flex justify-center items-center">
                    <p className="dark:text-white">مارکت من</p>
                    </div>
                </div>
            </div>
            {/* مارکت من */}

            {/* تماس با ما */}
            <div className="col-start-2 dark:text-white flex justify-center item-center pt-2 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:bg-gray-300">
            <div className="grid-rows-2">
                    <div className="row-start-1 flex justify-center items-center">
                    <p className="dark:text-white "><SlCallIn className="size-5"/></p>
                    </div>
                    <div className="row-start-2 flex justify-center items-center">
                    <p className="dark:text-white">تماس با ما</p>
                    </div>
             </div>
            </div>
            {/* تماس با ما */}

            {/* درباره ی ما */}
            <div className="col-start-3 dark:text-white flex justify-center item-center pt-2 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:bg-gray-300">
            <div className="grid-rows-2">
                    <div className="row-start-1 flex justify-center items-center">
                    <p className="dark:text-white "><HiUserGroup className="size-6"/></p>
                    </div>
                    <div className="row-start-2 flex justify-center items-center">
                    <p className="dark:text-white">درباره ما</p>
                    </div>
             </div>
            </div>
            {/* درباره ی ما */}

            {/* تنظیمات */}
            <div className="col-start-4 dark:text-white flex justify-center item-center pt-2 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:bg-gray-300">
            <div className="grid-rows-2">
                    <div className="row-start-1 flex justify-center items-center">
                    <p className="dark:text-white "><IoSettingsOutline className="size-5"/></p>
                    </div>
                    <div className="row-start-2 flex justify-center items-center">
                    <p className="dark:text-white">تنظیمات</p>
                    </div>
             </div>
            </div>
            {/* تنظیمات */}

            {/* خانه */}
            <div className="col-start-5 dark:text-white flex justify-center item-center pt-2 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:bg-gray-300">
            <div className="grid-rows-2">
                    <div className="row-start-1 flex justify-center items-center">
                    <p className="dark:text-white "><RiHome2Line className="size-5"/></p>
                    </div>
                    <div className="row-start-2 flex justify-center items-center">
                    <p className="dark:text-white">خانه</p>
                    </div>
             </div>
            </div>
            {/* خانه */}
        </div>
    </div>
</div>
{/* منوی پایینی برای کوچکتر از sm */}
{/*----------- < sm ---------- */}
        </>
    )
}

export default BottomMenu