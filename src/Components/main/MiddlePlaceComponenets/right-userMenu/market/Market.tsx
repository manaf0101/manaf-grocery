import Heading from "../../Heading"
import MakingMarket from "./Making-market"
import JoinUs from "./JoinUs-market"
import PauseOnHover from "./Carousel"
import Slider2 from "./slider2"
import Category from "./category part/Category"
import TopSellers from "./Top-Sellers part/TopSellers"
import ProductList from "./suggestions/ProductList"
import Footer from "../../Footer/Footer"
import { FaCopyright } from "react-icons/fa";

function Market() {

    return (
        <>
            <section className="flex flex-col w-full h-full ">
                {/* heading */}
                <Heading />
                {/* heading */}

                {/* ساخت مارکت خود */}
                <MakingMarket />
                {/* ساخت مارکت خود */}

                {/*مارکت خود را بسازید*/}
                <JoinUs id="marketSection1"/>
                {/*مارکت خود را بسازید*/}

                {/* carousel */}
                <div className="hidden lg:block">
                <PauseOnHover />
                </div>

                <div className="lg:hidden">
                <Slider2 />
                </div>
                {/* carousel */}

                <hr className="dark:text-white mt-5"/>

                {/* خرید براساس دسته بندی */}
                <Category id="marketSection2"/>
                {/* خرید براساس دسته بندی */}

                {/* فروشندگان برتر */}
                <TopSellers id="marketSection3"/>
                {/* فروشندگان برتر */}

                <hr className="dark:text-white mt-5 mr-32 ml-32"/>

                {/* پیشنهادات */}
                <ProductList />
                {/* پیشنهادات */}

                <hr className="dark:text-white mt-5 mr-32 ml-32"/>

                {/* footer */}
                <Footer />
                {/* footer */}
                


                <div className="w-full h-auto bg-footer-1 dark:bg-slate-950 dark:text-white flex flex-row justify-center gap-2" dir="rtl">
                    <p>تمای حقوق برای بازار آنلاین</p>
                    <a className="text-blue-600">manaf grocery</a>
                    <p>می باشد</p>
                    <FaCopyright />
                </div>
            </section>
        </>
    )
}

export default Market