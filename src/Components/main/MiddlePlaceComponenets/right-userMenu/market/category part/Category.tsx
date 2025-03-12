import CategorySlider from "./CategorySlider"
// جهت کتابخانه ی  Aos
import { useEffect } from "react";
import Aos from "aos";
// جهت کتابخانه ی  Aos

function Category () {

        useEffect(() => {
          Aos.init({ duration: 1000 });
        }, []);
    
    return (
        <>
        <section className="mt-4 dark:bg-slate-950">
            {/* نوشته ی خرید بر اساس دسته بندی */}
            <div data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" className="flex justify-center items-center dark:text-white text-lg " style={{fontFamily : 'VAZIR'}}>
               <p className="bg-gg-5 dark:bg-slate-800 p-2 rounded-md">خرید براساس دسته بندی</p> 
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