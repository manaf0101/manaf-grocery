
// برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه
import { useActiveSection } from "../contexts/ActiveSectionContext";
import { useLocation } from "react-router-dom";
// برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه




function UserMenuLeft() {

    // بررسی اینکه آیا کاربر در کدام صفحه است ؟ 
    const location = useLocation();
    const isMarketPage = location.pathname.includes("userMenu/market");
    // بررسی اینکه آیا کاربر در کدام صفحه است ؟ 


    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه
    const { activeSection } = useActiveSection();
    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه

    return (
        <>
            <div className="sticky top-10 h-auto dark:bg-slate-950">
                <div className="h-[calc(100vh-5rem)]">
                    <aside
                        className="h-fit pl-8 dark:bg-slate-950"
                        style={{ fontFamily: "VAZIR" }}
                    >
                        <div className="h-screen overflow-y-scroll scrollbar-thin dark:scrollbar-thumb-slate-700 scrollbar-thumb-slate-400 scrollbar-track-rounded-full scrollbar-thumb-rounded-full dark:scrollbar-track-slate-400 scrollbar-track-slate-200 pt-3 pb-3">
                            <div className="grid grid-cols-1 cursor-pointer">
                                <p className="flex justify-start items-center col-start-1 col-span-1 pr-2 dark:text-white">
                                    در این صفحه
                                </p>
                            </div>

                            {isMarketPage && (
                                <ul className="grid grid-rows-8 cursor-pointer text-stone-400 mt-2 mr-2 ">
                                    {[
                                        "ایجاد فروشگاه",
                                        "خرید بر اساس دسته بندی",
                                        "فروشندگان برتر",
                                        "پیشنهادات",
                                        "تخفیف و راه های ارتباطی",
                                        "پشتیبانی",
                                    ].map((item, index) => (
                                        <li
                                            key={index}
                                            className={`row-start-${index + 1
                                                } row-span-1 border-l-2 pl-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white ${activeSection ===
                                                    `marketSection${index + 1}`
                                                    ? "text-blue-500 font-bold border-blue-500"
                                                    : ""
                                                }`}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}

                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}

export default UserMenuLeft;