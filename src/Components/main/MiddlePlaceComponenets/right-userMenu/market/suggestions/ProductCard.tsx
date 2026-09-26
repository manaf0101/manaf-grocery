import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


// برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه
import { useActiveSection } from "../../../../../contexts/ActiveSectionContext";
import { useInView } from 'react-intersection-observer'
// برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه


type product = {
    image: string,
    name: string
}


type ProductCardProps = {
    products: product[],
    id: string
}


// برای دسترسی راحت‌تر به هر محصول
const getProduct = (products: product[], index: number) => {
    return products[index] ?? products[0];
}
// برای دسترسی راحت‌تر به هر محصول


const ProductCard = ({ products, id }: ProductCardProps) => {

    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه
    const { setActiveSection } = useActiveSection();
    const { ref, inView } = useInView({ threshold: 0.5 })

    useEffect(() => {
        if (inView) {
            setActiveSection(id)
        }
    }, [id, inView, setActiveSection])
    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه


    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true); // تاخیر ۲ ثانیه‌ای
        }, 5000);

        return () => clearTimeout(timer); // تمیزکاری
    }, []);


    // اگر محصولی وجود نداشته باشد چیزی نمایش داده نمی‌شود
    if (products.length === 0) {
        return null;
    }


    return (
        <>

            {/* نوشته ی پیشنهادات */}
            <div
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
                className="flex justify-center items-center dark:text-white text-lg mt-4"
                style={{ fontFamily: 'VAZIR' }}
            >
                <p className="bg-gg-5 dark:bg-slate-800 p-2 rounded-md">
                    پیشنهادات
                </p>
            </div>
            {/* نوشته ی پیشنهادات */}


            <section
                id={id}
                ref={ref}
                className="gap-1 sm:gap-2 p-2 sm:p-0 sm:pr-5 sm:pl-5 mt-3 sm:mt-4 h-auto w-auto flex flex-col"
            >

                {/* ۱-کلی */}
                <section
                    data-aos="fade-up"
                    data-aos-anchor-placement="center-bottom"
                    className="grid grid-cols-2 gap-1 sm:gap-2 w-full h-auto"
                    dir="rtl"
                >

                    {/* راست */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-anchor-placement="center-bottom"
                        className="col-start-1 col-span-1 h-auto"
                    >

                        <div className="flex flex-col gap-1 sm:gap-2 w-full h-auto">

                            {/* دیو بالایی */}
                            {!isLoaded && (
                                <Skeleton
                                    className="h-36"
                                    borderRadius={8}
                                    baseColor="#cdd2db"
                                    highlightColor="#f5f5ff"
                                />
                            )}

                            <img
                                className={`bg-green-400 h-36 rounded-lg transition-opacity duration-500 ${
                                    isLoaded ? "visible" : "collapse"
                                }`}
                                src={getProduct(products, 0)?.image}
                                alt={getProduct(products, 0)?.name}
                            />
                            {/* دیو بالایی */}


                            {/* دیو پایینی */}
                            {!isLoaded && (
                                <Skeleton
                                    className="h-72"
                                    borderRadius={8}
                                    baseColor="#cdd2db"
                                    highlightColor="#f5f5ff"
                                />
                            )}

                            <img
                                className={`bg-green-200 h-72 rounded-lg transition-opacity duration-500 ${
                                    isLoaded ? "visible" : "collapse"
                                }`}
                                src={getProduct(products, 1)?.image}
                                alt={getProduct(products, 1)?.name}
                            />
                            {/* دیو پایینی */}

                        </div>

                    </div>
                    {/* راست */}


                    {/* چپ */}
                    <div
                        data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                        data-aos-duration="1000"
                        className="col-start-2 col-span-1 h-auto"
                    >

                        <div className="flex flex-col gap-1 sm:gap-2 w-full h-auto">

                            {/* دیو بالایی */}
                            {!isLoaded && (
                                <Skeleton
                                    className="h-72"
                                    borderRadius={8}
                                    baseColor="#cdd2db"
                                    highlightColor="#f5f5ff"
                                />
                            )}

                            <img
                                className={`bg-green-200 h-72 rounded-lg transition-opacity duration-500 ${
                                    isLoaded ? "visible" : "collapse"
                                }`}
                                src={getProduct(products, 2)?.image}
                                alt={getProduct(products, 2)?.name}
                            />
                            {/* دیو بالایی */}


                            {/* دیو پایینی */}
                            {!isLoaded && (
                                <Skeleton
                                    className="h-36"
                                    borderRadius={8}
                                    baseColor="#cdd2db"
                                    highlightColor="#f5f5ff"
                                />
                            )}

                            <img
                                className={`bg-green-400 h-36 rounded-lg transition-opacity duration-500 ${
                                    isLoaded ? "visible" : "collapse"
                                }`}
                                src={getProduct(products, 3)?.image}
                                alt={getProduct(products, 3)?.name}
                            />
                            {/* دیو پایینی */}

                        </div>

                    </div>
                    {/* چپ */}

                </section>
                {/* ۱-کلی */}


                {/* 2-کلی */}
                <section
                    data-aos="flip-left"
                    data-aos-anchor-placement="center-bottom"
                    className="grid grid-cols-2 gap-1 sm:gap-2 w-full h-auto"
                    dir="rtl"
                >

                    {/* راست */}
                    <div
                        data-aos="flip-left"
                        data-aos-duration="1000"
                        data-aos-anchor-placement="center-bottom"
                        className="col-start-1 col-span-1 h-auto"
                    >

                        <div className="flex flex-col gap-1 sm:gap-2 w-full h-auto">

                            {/* دیو بالایی */}
                            {!isLoaded && (
                                <Skeleton
                                    className="h-36"
                                    borderRadius={8}
                                    baseColor="#cdd2db"
                                    highlightColor="#f5f5ff"
                                />
                            )}

                            <img
                                className={`bg-green-400 h-36 rounded-lg transition-opacity duration-500 ${
                                    isLoaded ? "visible" : "collapse"
                                }`}
                                src={getProduct(products, 4)?.image}
                                alt={getProduct(products, 4)?.name}
                            />
                            {/* دیو بالایی */}


                            {/* دیو پایینی */}
                            {!isLoaded && (
                                <Skeleton
                                    className="h-72"
                                    borderRadius={8}
                                    baseColor="#cdd2db"
                                    highlightColor="#f5f5ff"
                                />
                            )}

                            <img
                                className={`bg-green-200 h-72 rounded-lg transition-opacity duration-500 ${
                                    isLoaded ? "visible" : "collapse"
                                }`}
                                src={getProduct(products, 5)?.image}
                                alt={getProduct(products, 5)?.name}
                            />
                            {/* دیو پایینی */}

                        </div>

                    </div>
                    {/* راست */}


                    {/* چپ */}
                    <div
                        data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                        data-aos-duration="1000"
                        className="col-start-2 col-span-1 h-auto"
                    >

                        <div className="flex flex-col gap-1 sm:gap-2 w-full h-auto">

                            {/* دیو بالایی */}
                            {!isLoaded && (
                                <Skeleton
                                    className="h-72"
                                    borderRadius={8}
                                    baseColor="#cdd2db"
                                    highlightColor="#f5f5ff"
                                />
                            )}

                            <img
                                className={`bg-green-200 h-72 rounded-lg transition-opacity duration-500 ${
                                    isLoaded ? "visible" : "collapse"
                                }`}
                                src={getProduct(products, 6)?.image}
                                alt={getProduct(products, 6)?.name}
                            />
                            {/* دیو بالایی */}


                            {/* دیو پایینی */}
                            {!isLoaded && (
                                <Skeleton
                                    className="h-36"
                                    borderRadius={8}
                                    baseColor="#cdd2db"
                                    highlightColor="#f5f5ff"
                                />
                            )}

                            <img
                                className={`bg-green-400 h-36 rounded-lg transition-opacity duration-500 ${
                                    isLoaded ? "visible" : "collapse"
                                }`}
                                src={getProduct(products, 7)?.image}
                                alt={getProduct(products, 7)?.name}
                            />
                            {/* دیو پایینی */}

                        </div>

                    </div>
                    {/* چپ */}

                </section>
                {/* 2-کلی */}

            </section>

        </>

    );
};

export default ProductCard;