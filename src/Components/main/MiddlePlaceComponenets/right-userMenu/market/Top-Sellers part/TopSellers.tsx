// جهت کتابخانه ی  Aos
import { useEffect } from "react";
import Aos from "aos";
// جهت کتابخانه ی  Aos

import TopSellersSlider from "./TopSellersSlider";

    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه
    import { useActiveSection } from "../../../../../contexts/ActiveSectionContext";
    import {useInView} from 'react-intersection-observer'
    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه

    interface TopSellersProps {
        id : string
    }

function TopSellers({id} : TopSellersProps) {
    // جهت کتابخانه ی  Aos
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);
    // جهت کتابخانه ی  Aos

    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه
    const {setActiveSection} = useActiveSection()
    const {ref , inView} = useInView({threshold : 0.5})

    useEffect(() => {
        if (inView) {
            setActiveSection(id)
        }   
    } , [id , inView , setActiveSection])
    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه



    return (
        <>
            <section  className="mt-5 h-auto w-full dark:bg-slate-950">
                {/* نوشته ی فروشندگان برتر */}
                <div data-aos="fade-up"
                    data-aos-anchor-placement="center-bottom" className="flex justify-center items-center dark:text-white text-lg " style={{ fontFamily: 'VAZIR' }}>
                    <p ref={ref} id={id} className="bg-gg-5 dark:bg-slate-800 p-2 rounded-md">فروشندگان برتر</p>
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