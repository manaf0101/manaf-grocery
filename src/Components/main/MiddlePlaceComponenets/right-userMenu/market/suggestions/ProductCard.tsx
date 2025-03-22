import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type ProductCard = {
    products: {
        name: string;
        image: string;
    }[]
}
const ProductCard = ({ products }: ProductCard) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true); // تاخیر ۲ ثانیه‌ای
        }, 5000);

        return () => clearTimeout(timer); // تمیزکاری
    }, []);

    return (
        <>
            {/* برای اسکرین های موبایل */}
            {/* نوشته ی پیشنهادات */}
            <div data-aos="fade-up"
                data-aos-anchor-placement="center-bottom" className="flex justify-center items-center dark:text-white text-lg mt-4 sm:hidden" style={{ fontFamily: 'VAZIR' }}>
                <p className="bg-gg-5 dark:bg-slate-800 p-2 rounded-md">پیشنهادات</p>
            </div>
            {/* نوشته ی پیشنهادات */}

            <section className="gap-1 p-2 mt-3 h-auto w-auto flex flex-col sm:hidden" >
                {/* ۱-کلی */}
                <section data-aos="fade-up"
                    data-aos-anchor-placement="center-bottom" className=" grid grid-cols-2 gap-1 w-full h-auto " dir="rtl">
                    {/* راست */}
                    <div data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-anchor-placement="center-bottom" className="col-start-1 col-span-1 h-auto">
                        <div className="flex flex-col gap-1 w-full h-auto">
                            {/* دیو بالایی */}
                            {!isLoaded && <Skeleton
                                className="h-36"
                                borderRadius={8}
                                baseColor="#cdd2db"
                                highlightColor="#f5f5ff"
                            />}

                            <img className={`bg-green-400 h-36 rounded-lg transition-opacity duration-500 ${isLoaded ? "visible" : "collapse"}`} src={products[0].image} alt={products[0].name} />
                            {/* دیو بالایی */}

                            {/* دیو پایینی */}
                            {!isLoaded && <Skeleton
                                className="h-72"
                                borderRadius={8}
                                baseColor="#cdd2db"
                                highlightColor="#f5f5ff"
                            />}

                            <img className={`bg-green-200 h-72 rounded-lg transition-opacity duration-500 ${isLoaded ? "visible" : "collapse"}`} src={products[1].image} alt={products[1].name} />

                            {/* دیو پایینی */}
                        </div>
                    </div>
                    {/* راست */}

                    {/* چپ */}
                    <div data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                        data-aos-duration="1000"
                        className="col-start-2 col-span-1 h-auto">
                        <div className="flex flex-col gap-1 w-full h-auto">
                            {/* دیو بالایی */}
                            {!isLoaded && <Skeleton
                                className="h-72"
                                borderRadius={8}
                                baseColor="#cdd2db"
                                highlightColor="#f5f5ff"
                            />}

                            <img className={`bg-green-200 h-72 rounded-lg transition-opacity duration-500 ${isLoaded ? "visible" : "collapse"}`} src={products[2].image} alt={products[2].name} />

                            {/* دیو بالایی */}

                            {/* دیو پایینی */}
                            {!isLoaded && <Skeleton
                                className="h-36"
                                borderRadius={8}
                                baseColor="#cdd2db"
                                highlightColor="#f5f5ff"
                            />}

                            <img className={`bg-green-400 h-36 rounded-lg transition-opacity duration-500 ${isLoaded ? "visible" : "collapse"}`} src={products[3].image} alt={products[3].name} />
                            {/* دیو پایینی */}
                        </div>
                    </div>
                    {/* چپ */}
                </section>
                {/* ۱-کلی */}

                {/* 2-کلی */}
                <section data-aos="fade-up"
                    data-aos-anchor-placement="center-bottom" className=" grid grid-cols-2 gap-1 w-full h-auto " dir="rtl">
                    {/* راست */}
                    <div data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-anchor-placement="center-bottom" className="col-start-1 col-span-1 h-auto">
                        <div className="flex flex-col gap-1 w-full h-auto">
                            {/* دیو بالایی */}
                            {!isLoaded && <Skeleton
                                className="h-36"
                                borderRadius={8}
                                baseColor="#cdd2db"
                                highlightColor="#f5f5ff"
                            />}

                            <img className={`bg-green-400 h-36 rounded-lg transition-opacity duration-500 ${isLoaded ? "visible" : "collapse"}`} src={products[4].image} alt={products[4].name} />
                            {/* دیو بالایی */}

                            {/* دیو پایینی */}
                            {!isLoaded && <Skeleton
                                className="h-72"
                                borderRadius={8}
                                baseColor="#cdd2db"
                                highlightColor="#f5f5ff"
                            />}

                            <img className={`bg-green-200 h-72 rounded-lg transition-opacity duration-500 ${isLoaded ? "visible" : "collapse"}`} src={products[5].image} alt={products[5].name} />

                            {/* دیو پایینی */}
                        </div>
                    </div>
                    {/* راست */}

                    {/* چپ */}
                    <div data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                        data-aos-duration="1000"
                        className="col-start-2 col-span-1 h-auto">
                        <div className="flex flex-col gap-1 w-full h-auto">
                            {/* دیو بالایی */}
                            {!isLoaded && <Skeleton
                                className="h-72"
                                borderRadius={8}
                                baseColor="#cdd2db"
                                highlightColor="#f5f5ff"
                            />}

                            <img className={`bg-green-200 h-72 rounded-lg transition-opacity duration-500 ${isLoaded ? "visible" : "collapse"}`} src={products[6].image} alt={products[6].name} />

                            {/* دیو بالایی */}

                            {/* دیو پایینی */}
                            {!isLoaded && <Skeleton
                                className="h-36"
                                borderRadius={8}
                                baseColor="#cdd2db"
                                highlightColor="#f5f5ff"
                            />}

                            <img className={`bg-green-400 h-36 rounded-lg transition-opacity duration-500 ${isLoaded ? "visible" : "collapse"}`} src={products[7].image} alt={products[7].name} />
                            {/* دیو پایینی */}
                        </div>
                    </div>
                    {/* چپ */}
                </section>
                {/* 2-کلی */}

            </section>
            {/* برای اسکرین های موبایل */}



            {/* برای اسکرین های بزرگ */}

            {/* نوشته ی پیشنهادات */}
            <div data-aos="fade-up"
                data-aos-anchor-placement="center-bottom" className="flex justify-center items-center dark:text-white text-lg hidden sm:grid mt-4" style={{ fontFamily: 'VAZIR' }}>
                <p className="bg-gg-5 dark:bg-slate-800 p-2 rounded-md">پیشنهادات</p>
            </div>
            {/* نوشته ی پیشنهادات */}

            <section className="gap-2 pr-5 pl-5 mt-4 h-auto w-auto flex flex-col hidden sm:grid" >
                {/* ۱-کلی */}
                <section data-aos="fade-up"
                    data-aos-anchor-placement="center-bottom" className=" grid grid-cols-2 gap-2 w-full h-auto " dir="rtl">
                    {/* راست */}
                    <div data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-anchor-placement="center-bottom" className="col-start-1 col-span-1 h-auto">
                        <div className="flex flex-col gap-2 w-full h-auto">
                            {/* دیو بالایی */}
                            {!isLoaded && <Skeleton
                                className="h-36"
                                borderRadius={8}
                                baseColor="#cdd2db"
                                highlightColor="#f5f5ff"
                            />}

                            <img className={`bg-green-400 h-36 rounded-lg transition-opacity duration-500 ${isLoaded ? "visible" : "collapse"}`} src={products[0].image} title="dfg" alt={products[0].name} />
                            {/* دیو بالایی */}

                            {/* دیو پایینی */}
                            {!isLoaded && <Skeleton
                                className="h-72"
                                borderRadius={8}
                                baseColor="#cdd2db"
                                highlightColor="#f5f5ff"
                            />}

                            <img className={`bg-green-200 h-72 rounded-lg transition-opacity duration-500 ${isLoaded ? "visible" : "collapse"}`} src={products[1].image} alt={products[1].name} />

                            {/* دیو پایینی */}
                        </div>
                    </div>
                    {/* راست */}

                    {/* چپ */}
                    <div data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                        data-aos-duration="1000"
                        className="col-start-2 col-span-1 h-auto">
                        <div className="flex flex-col gap-2 w-full h-auto">
                            {/* دیو بالایی */}
                            {!isLoaded && <Skeleton
                                className="h-72"
                                borderRadius={8}
                                baseColor="#cdd2db"
                                highlightColor="#f5f5ff"
                            />}

                            <img className={`bg-green-200 h-72 rounded-lg transition-opacity duration-500 ${isLoaded ? "visible" : "collapse"}`} src={products[2].image} alt={products[2].name} />

                            {/* دیو بالایی */}

                            {/* دیو پایینی */}
                            {!isLoaded && <Skeleton
                                className="h-36"
                                borderRadius={8}
                                baseColor="#cdd2db"
                                highlightColor="#f5f5ff"
                            />}

                            <img className={`bg-green-400 h-36 rounded-lg transition-opacity duration-500 ${isLoaded ? "visible" : "collapse"}`} src={products[3].image} alt={products[3].name} />
                            {/* دیو پایینی */}
                        </div>
                    </div>
                    {/* چپ */}
                </section>
                {/* ۱-کلی */}

                {/* 2-کلی */}
                <section data-aos="flip-left"className=" grid grid-cols-2 gap-2 w-full h-auto " dir="rtl">
                    {/* راست */}
                    <div data-aos="flip-left" className="col-start-1 col-span-1 h-auto">
                        <div className="flex flex-col gap-2 w-full h-auto">
                            {/* دیو بالایی */}
                            {!isLoaded && <Skeleton
                                className="h-36"
                                borderRadius={8}
                                baseColor="#cdd2db"
                                highlightColor="#f5f5ff"
                            />}

                            <img className={`bg-green-400 h-36 rounded-lg transition-opacity duration-500 ${isLoaded ? "visible" : "collapse"}`} src={products[4].image} alt={products[4].name} />
                            {/* دیو بالایی */}

                            {/* دیو پایینی */}
                            {!isLoaded && <Skeleton
                                className="h-72"
                                borderRadius={8}
                                baseColor="#cdd2db"
                                highlightColor="#f5f5ff"
                            />}

                            <img className={`bg-green-200 h-72 rounded-lg transition-opacity duration-500 ${isLoaded ? "visible" : "collapse"}`} src={products[5].image} alt={products[5].name} />

                            {/* دیو پایینی */}
                        </div>
                    </div>
                    {/* راست */}

                    {/* چپ */}
                    <div data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                        data-aos-duration="1000"
                        className="col-start-2 col-span-1 h-auto">
                        <div className="flex flex-col gap-2 w-full h-auto">
                            {/* دیو بالایی */}
                            {!isLoaded && <Skeleton
                                className="h-72"
                                borderRadius={8}
                                baseColor="#cdd2db"
                                highlightColor="#f5f5ff"
                            />}

                            <img className={`bg-green-200 h-72 rounded-lg transition-opacity duration-500 ${isLoaded ? "visible" : "collapse"}`} src={products[6].image} alt={products[6].name} />

                            {/* دیو بالایی */}

                            {/* دیو پایینی */}
                            {!isLoaded && <Skeleton
                                className="h-36"
                                borderRadius={8}
                                baseColor="#cdd2db"
                                highlightColor="#f5f5ff"
                            />}

                            <img className={`bg-green-400 h-36 rounded-lg transition-opacity duration-500 ${isLoaded ? "visible" : "collapse"}`} src={products[7].image} alt={products[7].name} />
                            {/* دیو پایینی */}
                        </div>
                    </div>
                    {/* چپ */}
                </section>
                {/* 2-کلی */}

            </section>
            {/* برای اسکرین های بزرگ */}








            {/* ................................................................... */}

            {/* <div className="flex flex-col items-center">
                <div className="w-32 h-32 relative">
                    {!isLoaded && <Skeleton
                        width={128}
                        height={128}
                        borderRadius={8}
                        baseColor="#cdd2db"
                        highlightColor="#f5f5ff"
                    />}
                    <img
                        src={image}
                        alt={name}
                        className={`w-full h-full object-cover rounded-lg transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"
                            }`}
                    />
                </div>
            </div> */}
        </>

    );
};

export default ProductCard