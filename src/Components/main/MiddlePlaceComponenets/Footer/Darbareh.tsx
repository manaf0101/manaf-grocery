import { ReactNode , useEffect } from "react"
import { SiMautic } from "react-icons/si";

    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه
    import { useActiveSection } from "../../../contexts/ActiveSectionContext";
    import {useInView} from 'react-intersection-observer'
        // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه

// هدر برای منو های footer
interface MenueFooterHeadProps {
    children: ReactNode;
}

const MenueFooterHead : React.FC<MenueFooterHeadProps> = ({children}) => {
    return (
        <>
        <h1 className="dark:text-white text-xl mb-3 ">{children}</h1>    
        </>
    )
}
// هدر برای منو های footer

// لیست منو های footer
interface MenueFooterListProps {
    children: ReactNode;
}

const MenueFooterList : React.FC<MenueFooterListProps> = ({children}) => {
    return (
        <>
            <li className="text-footer-3 hover:text-stone-800 dark:hover:text-white">{children}</li>
        </>
    )
}
// لیست منو های footer


interface DarbarehProps {
    id : string
}


function Darbareh({id} : DarbarehProps) {
        // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه
        const {setActiveSection} = useActiveSection() ;
        const {ref , inView} = useInView({threshold : 0.5})
    
        useEffect(() => {
            if (inView) {
                setActiveSection(id)
            }
        } , [inView , id , setActiveSection])
        // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه


    return (
        <>
        {/* کلی و گریدینت دار */}
        <section id="marketSection6" className="hidden md:grid pt-3  relative dark:bg-gradient-to-tr from-regal-blue from-0% to-60% to-slate-800 bottom-0  w-full h-80">
            {/* تقسیم بندی چهار ستونه */}
            <section className="w-full h-full relative grid grid-cols-4 dark:text-white">
                {/* بازار */}
                <div className="col-start-1 h-full w-full col-span-1 flex  justify-center items-start">
                    {/* لیست */}
                    <ul className="flex flex-col gap-2 ">
                    <MenueFooterHead>
                     بازار
                    </MenueFooterHead>
                        <MenueFooterList>مجله باسلام</MenueFooterList>
                        <MenueFooterList>درباره باسلام</MenueFooterList>
                        <MenueFooterList>به‌روزرسانی‌های باسلام</MenueFooterList>
                        <MenueFooterList>فرصت‌های شغلی</MenueFooterList>
                        <MenueFooterList>اعتماد به باسلام</MenueFooterList>
                        <MenueFooterList>شیوه کار باسلام</MenueFooterList>
                        <MenueFooterList>قوانین و شرایط بازار</MenueFooterList>
                        <MenueFooterList>شرکای ما</MenueFooterList>
                    </ul>
                    {/* لیست */}
                </div>
                {/* بازار */}

                {/* پشتیبانی */}
                <div className="col-start-2 h-full w-full col-span-1 flex justify-center items-start">
                    {/* لیست */}
                    <ul className="flex flex-col gap-2" ref={ref} id={id}>
                    <MenueFooterHead>
                     پشتیبانی
                    </MenueFooterHead>
                        <MenueFooterList>تماس با ما</MenueFooterList>
                        <MenueFooterList>سوالات متداول</MenueFooterList>
                        <MenueFooterList>پیگیری سفارش‌ها</MenueFooterList>
                        <MenueFooterList>گزارش خطای فنی</MenueFooterList>
                        <MenueFooterList>پیشنهاد امکان جدید</MenueFooterList>
                    </ul>
                    {/* لیست */}
                </div>
                {/* پشتیبانی */}


                {/* خرید و فروش */}
                <div className="col-start-3 h-full w-full col-span-1 flex justify-center items-start">
                    {/* لیست */}
                    <ul className="flex flex-col gap-2 ">
                    <MenueFooterHead>
                    خرید و فروش 
                    </MenueFooterHead>
                        <MenueFooterList>فروش در فروشگاه</MenueFooterList>
                        <MenueFooterList>کیف پول من</MenueFooterList>
                        <MenueFooterList>مدیریت فروشگاه</MenueFooterList>
                    </ul>
                    {/* لیست */}
                </div>
                {/* با ما بینهایت خرید کنید */}
                <div style={{fontFamily : 'vazir'}} className="dark:text-white text-2xl  col-start-4 h-full w-full col-span-1 flex flex-col gap-4 justify-center items-center">
                    <div className="relative bg-slate-300 dark:bg-slate-500  dark:text-white  flex flex-col justify-center items-center gap-4 p-4 rounded-md">
                        <div className="absolute h-auto w-auto top-0 right-0">
                        <SiMautic className="text-green-500" />
                        </div>
                    <p>با ما</p>
                    <p>بی نهایت</p>
                    <p>خرید کنید</p>
                    </div>
                    <p  className= " dark:text-white p-2 bg-slate-300 dark:bg-slate-500  rounded-lg" style={{fontFamily : 'cursive'}}>manaf grocery</p>
                </div>
                {/* با ما بینهایت خرید کنید */}
            </section>
            {/* تقسیم بندی چهار ستونه */}
        </section>
        {/* کلی و گریدینت دار */}
        </>
    )
}

export default Darbareh