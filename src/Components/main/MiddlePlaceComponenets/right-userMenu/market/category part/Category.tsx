import CategorySlider from "./CategorySlider"
// جهت کتابخانه ی  Aos
import { useEffect } from "react";
import Aos from "aos";
// جهت کتابخانه ی  Aos

// برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه
import { useActiveSection } from "../../../../../contexts/ActiveSectionContext";
import {useInView} from 'react-intersection-observer'
// برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه

interface CategoryProps {
    id : string
}

function Category ({id} : CategoryProps) {

    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه
    const {setActiveSection} = useActiveSection() ;
    const {ref , inView} = useInView({threshold : 0.5})

        useEffect(() => {
            if (inView) {
                setActiveSection(id)
            }
        } , [id , inView , setActiveSection])
    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه


        useEffect(() => {
          Aos.init({ duration: 1000 });
        }, []);
    
    return (
        <>
        <section className=" mt-4 dark:bg-slate-950">
            {/* نوشته ی خرید بر اساس دسته بندی */}
            <div data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" className="flex justify-center items-center dark:text-white text-lg " style={{fontFamily : 'VAZIR'}}>
               <p ref={ref} id={id}  className="bg-gg-5 dark:bg-slate-800 p-2 rounded-md">خرید براساس دسته بندی</p> 
            </div>
            {/* نوشته ی خرید بر اساس دسته بندی */}

            {/* دسته بندی ها - اسلایدر */}
            <div className="pr-0 pl-0 mt-10">
                <CategorySlider />
            </div>
            {/* دسته بندی ها - اسلایدر */}
        </section>
        </>
    )
}

export default Category