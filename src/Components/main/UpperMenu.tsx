import { RiHome2Line, RiStore2Line } from "react-icons/ri";
import { FiSun } from "react-icons/fi";
import { BsMoonStars } from "react-icons/bs";
import { SlCallIn } from "react-icons/sl";
import { HiUserGroup } from "react-icons/hi";
import { MdOutlineShoppingCart } from "react-icons/md";
import useDarkMood from "../../Hooks/useDarkMood";
import { useEffect, useState } from "react";
import NavUpperUserMenu from "./NavUpperUserMenu";
// دیگر نیازی به import کردن useSellingPanel نیست، چون مقدار از طریق prop دریافت می‌شود


type UpperMenu = {
    openUserMenu: () => any
    isSellingPanelEnabled: boolean
}

function UpperMenu({ openUserMenu, isSellingPanelEnabled }: UpperMenu) {

    // DARK MOOD

    const [themes, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    })

    useEffect(() => {
        document.documentElement.classList.toggle('dark', themes === 'dark');
        localStorage.setItem('theme', themes);
    }, [themes]);

    function changeMood() {
        if (themes === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    const [theme] = useDarkMood();

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme])

    // DARK MOOD

    return (
        <>
            {/* -----------sm<----------- */}
            <div>
                <ul className="hidden sm:grid bg-slate-100 dark:bg-slate-950 gap-2 grid-cols-6 md:grid-cols-8 pb-2" dir="rtl" style={{ fontFamily: 'VAZIR' }}>
                    {/* لوگوی خانه */}
                    <li style={{ cursor: "pointer" }} className=" md:col-start-1 md:col-span-1 border-l-2 border-r-2 border-slate-200 mr-2 flex justify-center items-center hover:bg-gray-300 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:rounded-md">
                        <p className="dark:text-white "><RiHome2Line className="size-5" /></p>
                        <p className="dark:text-white pr-1">خانه</p>
                    </li>

                    {/* لوگوی تنظیم مود */}
                    <li onClick={changeMood} style={{ cursor: "pointer" }} className=" md:col-start-2 md:col-span-1 border-l-2 border-r-2 border-slate-200 flex justify-center items-center hover:bg-gray-300 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:rounded-md">
                        <button>
                            <div className="grid grid-col-2">
                                <div className="col-start-1 col-span-1"><p className="dark:text-white">{themes === 'light' ? <FiSun className="size-6" /> : <BsMoonStars className="size-5" />}</p></div>
                                <div className="col-start-2 col-span-2"><p className="dark:text-white pr-1">مود</p></div>
                            </div>
                        </button>
                    </li>

                    {/* تماس با ما */}
                    <li style={{ cursor: "pointer" }} className=" md:col-start-3 md:col-span-1 border-l-2 border-r-2 border-slate-200 flex justify-center items-center hover:bg-gray-300 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:rounded-md">
                        <p className="dark:text-white"><SlCallIn className="size-6 pl-1" /></p>
                        <p className="dark:text-white text-nowrap">تماس با ما</p>
                    </li>

                    {/* درباره ما */}
                    <li style={{ cursor: "pointer" }} className="md:col-start-4 md:col-span-1 border-l-2 border-r-2 border-slate-200 flex justify-center items-center hover:bg-gray-300 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:rounded-md">
                        <p className="dark:text-white"><HiUserGroup className="size-7 pl-1" /></p>
                        <p className="dark:text-white">درباره  ما</p>
                    </li>

                    {/* سبد خرید */}
                    <li style={{ cursor: "pointer" }} className=" md:col-start-5 md:col-span-1 border-l-2 border-r-2 border-slate-200 flex justify-center items-center hover:bg-gray-300 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:rounded-md">
                        <p className="dark:text-white"><MdOutlineShoppingCart className="size-6 pl-1" /></p>
                        <p className="dark:text-white text-nowrap">سبد خرید</p>
                    </li>

                    {/* پنل فروش */}
                    <li
                        style={{ cursor: isSellingPanelEnabled ? "pointer" : "not-allowed" }}
                        className={`md:col-start-6 md:col-span-1 border-l-2 border-r-2 border-slate-200 flex justify-center items-center transition duration-200 ease-in-out ${isSellingPanelEnabled
                                ? "hover:bg-gray-300 dark:hover:bg-cyan-900"
                                : "opacity-40 pointer-events-none"
                            }`}
                    >
                        <p className="dark:text-white"><RiStore2Line className="size-6 pl-1" /></p>
                        <p className="dark:text-white text-nowrap">پنل فروش</p>
                    </li>
                    {/* پنل فروش */}

                    {/* manaf grocery */}
                    <li className="hidden md:grid md:col-span-2 md:col-start-7 md:pl-0 flex justify-end items-center ">
                        <p className=" dark:text-white p-1 bg-slate-300 dark:bg-slate-500  rounded-r-lg" style={{ fontFamily: 'cursive' }}>manaf grocery</p>
                    </li>
                </ul>
            </div>

            <NavUpperUserMenu openUserMenu={openUserMenu} />
        </>
    )
}

export default UpperMenu