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
                <section className="flex justify-center items-center dark:text-white text-lg" style={{ fontFamily: 'VAZIR' }}>
                    <h3 data-aos="fade-right">
                        فروشندگان برتر
                    </h3>
                </section>
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