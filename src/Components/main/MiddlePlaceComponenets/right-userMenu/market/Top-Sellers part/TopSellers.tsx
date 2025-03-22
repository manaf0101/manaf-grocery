// جهت کتابخانه ی  Aos
import { useEffect } from "react";
import Aos from "aos";
// جهت کتابخانه ی  Aos

import TopSellersSlider from "./TopSellersSlider";

function TopSellers() {
    // جهت کتابخانه ی  Aos
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);
    // جهت کتابخانه ی  Aos

    return (
        <>
            <section className="mt-5 h-auto w-full dark:bg-slate-950">
                {/* نوشته ی فروشندگان برتر */}
                <div data-aos="fade-up"
                    data-aos-anchor-placement="center-bottom" className="flex justify-center items-center dark:text-white text-lg " style={{ fontFamily: 'VAZIR' }}>
                    <p className="bg-gg-5 dark:bg-slate-800 p-2 rounded-md">فروشندگان برتر</p>
                </div>
                {/* نوشته ی فروشندگان برتر */}

                {/* اسلاید فروشندگان برتر */}
                <div className="pr-0 pl-0  mt-10">
                    <TopSellersSlider />
                </div>
                {/* اسلاید فروشندگان برتر */}
            </section>


        </>
    )
}

export default TopSellers