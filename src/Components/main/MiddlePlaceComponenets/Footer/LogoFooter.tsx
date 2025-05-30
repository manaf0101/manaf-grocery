import './logoFooter.css'
// icons
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
// icons

// مربوط به دکمه ی ارسال
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
// مربوط به دکمه ی ارسال


// برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه
import { useActiveSection } from '../../../contexts/ActiveSectionContext';
import { useInView } from 'react-intersection-observer'
// برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه


interface LogoFooterProps {
    id: string
}


function LogoFooter({ id }: LogoFooterProps) {
    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه
    const { setActiveSection } = useActiveSection();
    const { ref, inView } = useInView({ threshold: 0.5 })

    useEffect(() => {
        if (inView) {
            setActiveSection(id)
        }
    }, [inView, id, setActiveSection])
    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه

    // مربوط به دکمه ی ارسال
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        function simulateNetworkRequest() {
            return new Promise(resolve => {
                setTimeout(resolve, 2000);
            });
        }

        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);
    // مربوط به دکمه ی ارسال


    return (
        <>
            {/* برای اسکرین های بزرگ */}
            {/* کلی */}
            <section className="hidden md:grid relative w-full h-80 bg-footer-1 dark:bg-slate-800">
                <div className="grid grid-cols-2 relative" dir="rtl">
                    {/* سمت راست - لوگو و توضیح */}
                    <div className="col-start-1">
                        {/* کلی */}
                        <div className="grid grid-rows-2 h-full">
                            {/* logo */}
                            <div className="row-start-1 flex justify-center items-center">
                                <svg width="138" height="138" viewBox="0 0 138 138" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="138" height="138" rx="34" fill="#EFEFEF" />
                                    <path d="M34.5 37.375V59.4729C34.5 59.8718 34.5 60.0712 34.3712 60.1426C34.2424 60.214 34.0733 60.1083 33.735 59.8969L12.44 46.5875C11.9805 46.3003 11.7507 46.1567 11.6254 45.9305C11.5 45.7043 11.5 45.4334 11.5 44.8915V23M34.5 37.375L11.5 23M34.5 37.375L54.7864 24.696C56.0043 23.9348 56.6132 23.5542 56.6132 23C56.6132 22.4458 56.0043 22.0652 54.7864 21.304L35.56 9.2875C35.0445 8.96533 34.7868 8.80425 34.5 8.80425C34.2132 8.80425 33.9555 8.96533 33.44 9.2875L11.5 23" stroke="#33363F" strokeLinejoin="round" />
                                    <path d="M57 34.5C57 34.7761 57.2239 35 57.5 35C57.7761 35 58 34.7761 58 34.5H57ZM56.56 22.4125L56.825 21.9885L56.56 22.4125ZM57.3746 23.0695L56.9373 23.3119L57.3746 23.0695ZM57 24.1085V34.5H58V24.1085H57ZM56.825 21.9885L46.265 15.3885L45.735 16.2365L56.295 22.8365L56.825 21.9885ZM58 24.1085C58 23.847 58.0005 23.616 57.9821 23.423C57.9626 23.2194 57.9195 23.0211 57.812 22.8271L56.9373 23.3119C56.9552 23.3441 56.9747 23.3943 56.9866 23.5182C56.9995 23.6527 57 23.8281 57 24.1085H58ZM56.295 22.8365C56.5327 22.9851 56.6812 23.0785 56.7884 23.1607C56.8872 23.2364 56.9195 23.2797 56.9373 23.3119L57.812 22.8271C57.7045 22.6331 57.5592 22.4915 57.3968 22.367C57.2429 22.2491 57.0468 22.1271 56.825 21.9885L56.295 22.8365Z" fill="#33363F" />
                                    <ellipse cx="50.3125" cy="47.4375" rx="7.1875" ry="7.1875" stroke="#33363F" />
                                    <path d="M60.375 57.5L56.0625 53.1875" stroke="#33363F" strokeLinecap="round" />
                                    <path d="M40.515 57.2052C40.7492 57.0589 40.8204 56.7504 40.674 56.5163C40.5276 56.2821 40.2192 56.2109 39.985 56.3573L40.515 57.2052ZM37.375 58.5781L37.64 59.0021L37.375 58.5781ZM35.56 59.7125L35.825 60.1365L35.56 59.7125ZM34.5 60.1958L34.5 59.6958L34.5 60.1958ZM33.705 59.2885L23.265 52.7635L22.735 53.6115L33.175 60.1365L33.705 59.2885ZM37.11 58.1541L35.295 59.2885L35.825 60.1365L37.64 59.0021L37.11 58.1541ZM39.985 56.3573L38.5475 57.2557L39.0775 58.1037L40.515 57.2052L39.985 56.3573ZM38.5475 57.2557L37.11 58.1541L37.64 59.0021L39.0775 58.1037L38.5475 57.2557ZM33.175 60.1365C33.424 60.2921 33.6426 60.4295 33.8361 60.5241C34.0401 60.6239 34.2536 60.6958 34.5 60.6958L34.5 59.6958C34.4596 59.6958 34.4008 59.6871 34.2754 59.6258C34.1394 59.5593 33.9715 59.4551 33.705 59.2885L33.175 60.1365ZM35.295 59.2885C35.0285 59.4551 34.8606 59.5593 34.7246 59.6258C34.5992 59.6871 34.5404 59.6958 34.5 59.6958L34.5 60.6958C34.7464 60.6958 34.9599 60.6239 35.1639 60.5241C35.3574 60.4295 35.576 60.2921 35.825 60.1365L35.295 59.2885Z" fill="#33363F" />
                                    <rect x="46" y="103.5" width="11.5" height="20.125" rx="3" stroke="#222222" strokeLinejoin="round" />
                                    <rect x="11.5" y="103.5" width="11.5" height="20.125" rx="3" stroke="#222222" strokeLinejoin="round" />
                                    <path d="M11.5 106.375V115" stroke="#222222" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M57.5 106.375V115" stroke="#222222" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M57.5 106.375C57.5 99.5125 55.0768 92.9311 50.7635 88.0786C46.4501 83.2261 40.6 80.5 34.5 80.5C28.4 80.5 22.5499 83.2261 18.2365 88.0786C13.9232 92.9311 11.5 99.5125 11.5 106.375" stroke="#222222" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M93.4375 61.8125H113.562" stroke="#33363F" strokeLinecap="round" />
                                    <path d="M103.5 60.375V48.875" stroke="#33363F" strokeLinecap="round" />
                                    <path d="M85.375 23.5H121.625C122.111 23.5 122.424 23.5011 122.656 23.5322C122.873 23.5613 122.94 23.6084 122.979 23.6464C123.017 23.6845 123.064 23.7525 123.093 23.9694C123.124 24.2006 123.125 24.5145 123.125 25V32.875C123.125 36.6604 123.124 39.4491 122.837 41.5866C122.551 43.7096 121.991 45.1151 120.928 46.1783C119.865 47.2415 118.46 47.8011 116.337 48.0866C114.199 48.3739 111.41 48.375 107.625 48.375H99.375C95.5896 48.375 92.8009 48.3739 90.6634 48.0866C88.5404 47.8011 87.1349 47.2415 86.0717 46.1783C85.0085 45.1151 84.4489 43.7096 84.1634 41.5866C83.8761 39.4491 83.875 36.6604 83.875 32.875V25C83.875 24.5145 83.8761 24.2006 83.9072 23.9694C83.9363 23.7525 83.9834 23.6845 84.0214 23.6464C84.0595 23.6084 84.1275 23.5613 84.3444 23.5322C84.5756 23.5011 84.8895 23.5 85.375 23.5Z" stroke="#33363F" strokeLinecap="round" />
                                    <path d="M103.019 34.3626C102.943 34.6282 103.097 34.9049 103.363 34.9808C103.628 35.0566 103.905 34.9029 103.981 34.6374L103.019 34.3626ZM108.981 15.3182L109.461 15.4556L109.461 15.4556L108.981 15.3182ZM110.161 14.0107L109.975 13.5464L110.161 14.0107ZM109.334 14.4513L109.706 14.7863L109.706 14.7863L109.334 14.4513ZM103.981 34.6374L109.461 15.4556L108.5 15.1808L103.019 34.3626L103.981 34.6374ZM110.346 14.4749L123.811 9.08924L123.439 8.16076L109.975 13.5464L110.346 14.4749ZM109.461 15.4556C109.607 14.9452 109.646 14.8522 109.706 14.7863L108.963 14.1162C108.712 14.3948 108.619 14.7649 108.5 15.1808L109.461 15.4556ZM109.975 13.5464C109.573 13.7071 109.215 13.8377 108.963 14.1162L109.706 14.7863C109.765 14.7204 109.854 14.6721 110.346 14.4749L109.975 13.5464Z" fill="#33363F" />
                                    <path d="M110.688 129.375V113.125C110.688 112.573 110.24 112.125 109.687 112.125H97.3125C96.7602 112.125 96.3125 112.573 96.3125 113.125V129.375" stroke="#222222" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M83.375 100.625V125.375C83.375 127.261 83.375 128.203 83.9608 128.789C84.5466 129.375 85.4894 129.375 87.375 129.375H119.625C121.511 129.375 122.453 129.375 123.039 128.789C123.625 128.203 123.625 127.261 123.625 125.375V100.625" stroke="#222222" />
                                    <path d="M82.9963 79.1399C83.1782 78.4124 83.2691 78.0486 83.5404 77.8368C83.8116 77.625 84.1866 77.625 84.9366 77.625H122.063C122.813 77.625 123.188 77.625 123.46 77.8368C123.731 78.0486 123.822 78.4124 124.004 79.1399L128.754 98.1399C129.04 99.2839 129.183 99.8558 128.882 100.24C128.582 100.625 127.993 100.625 126.813 100.625H121.264C119.645 100.625 118.836 100.625 118.277 100.151C117.717 99.6771 117.584 98.8789 117.318 97.2826L116.635 93.1837C116.56 92.7334 116.522 92.5083 116.437 92.5083C116.353 92.5083 116.315 92.7334 116.24 93.1837L115.557 97.2826C115.291 98.8789 115.158 99.6771 114.598 100.151C114.039 100.625 113.23 100.625 111.611 100.625H108.326C106.708 100.625 105.898 100.625 105.339 100.151C104.78 99.6771 104.646 98.8789 104.38 97.2826L103.697 93.1837C103.622 92.7334 103.585 92.5083 103.5 92.5083C103.415 92.5083 103.378 92.7334 103.303 93.1837L102.62 97.2826C102.354 98.8789 102.22 99.6771 101.661 100.151C101.102 100.625 100.292 100.625 98.674 100.625H95.3885C93.7702 100.625 92.961 100.625 92.4015 100.151C91.842 99.6771 91.709 98.8789 91.4429 97.2826L90.7598 93.1837C90.6847 92.7334 90.6472 92.5083 90.5625 92.5083C90.4778 92.5083 90.4403 92.7334 90.3652 93.1837L89.6821 97.2826C89.416 98.8789 89.283 99.6771 88.7235 100.151C88.164 100.625 87.3548 100.625 85.7365 100.625H80.1866C79.0074 100.625 78.4178 100.625 78.1176 100.24C77.8173 99.8558 77.9603 99.2839 78.2463 98.1399L82.9963 79.1399Z" stroke="#222222" />
                                </svg>
                            </div>
                            {/* logo */}
                            {/* ..................... */}
                            {/* توضیحات */}
                            <div className="row-start-2 gap-2 flex flex-col justify-center items-center">
                                <p className="dark:text-white" style={{ fontFamily: 'VAZIR' }}>پلتفرم فروشگاه آنلاین</p>
                                <p style={{ fontFamily: 'inherit' }} className="text-blue-600">manaf grocery</p>
                            </div>
                            {/* توضیحات */}
                        </div>
                        {/* کلی */}
                    </div>
                    {/* سمت راست - لوگو و توضیح */}

                    {/* سمت چپ - ایمیل و شبکه های اجتماعی */}
                    <div className="col-start-2">
                        {/* کلی */}
                        <div className="grid grid-rows-2 ">
                            {/* ایمیل تخفیف */}
                            <div className="row-start-1 flex flex-col justify-center items-center">
                                {/* متن */}
                                <p className="mt-2 dark:text-white" style={{ fontFamily: 'VAZIR' }}>برای اطلاع از تخفیف ها ایمیل خود را وارد کنید</p>
                                {/* متن */}
                                {/* .................. */}
                                {/* فرم */}
                                <form className="mt-2 w-full flex flex-col justify-center items-center">
                                    <input className="w-80 h-8 bg-slate-200 discountEmail rounded-md pr-3" placeholder='ایمیل' type="text" />
                                    <Button
                                        className='mt-2 rounded-2xl'
                                        variant="secondary"
                                        disabled={isLoading}
                                        onClick={isLoading ? () => { } : handleClick}
                                    >
                                        {isLoading ? 'در حال ارسال ...' : 'ارسال'}
                                    </Button>
                                </form>
                                {/* فرم */}
                            </div>
                            {/* ایمیل تخفیف */}
                            {/* .................. */}
                            {/* مارا درشبکه های اجتماعی دنبال کنید */}
                            <div className='row-start-2 pt-16 flex flex-col justify-center items-center'>
                                {/* متن */}
                                <p ref={ref} id={id} className='dark:text-white' style={{ fontFamily: 'VAZIR' }}>
                                    مارا در شبکه های اجتماعی دنبال کنید
                                </p>
                                {/* متن */}

                                {/* آیکون ها */}
                                <div className='gap-4 mt-3 flex flex-row relative w-full h-auto justify-center items-center' dir='ltr'>
                                    <FaSquareInstagram className='size-5 dark:text-white' />
                                    <FaLinkedin className='size-5 dark:text-white' />
                                    <BsTelegram className='size-5 dark:text-white' />
                                    <IoLogoWhatsapp className='size-5 dark:text-white' />
                                    <FaSquareXTwitter className='size-5 dark:text-white' />
                                </div>
                                {/* آیکون ها */}
                            </div>
                            {/* مارا درشبکه های اجتماعی دنبال کنید */}
                        </div>
                        {/* کلی */}
                    </div>
                    {/* سمت چپ - ایمیل و شبکه های اجتماعی */}
                </div>
            </section>
            {/* کلی */}
            {/* برای اسکرین های بزرگ */}

            {/* .............................................................. */}

            {/* برای اسکرین هخای موبایل */}
            {/* کلی موبایل */}
            <section className='md:hidden bg-footer-1 dark:bg-slate-800 h-60 w-full'>
                <div className='flex flex-col justify-center items-center w-full h-full'>
                    {/* ایمیل تخفیف- موبایل */}
                    <div className='w-full h-1/2  flex flex-col justify-center items-center'>
                        {/*متن-موبایل*/}
                        <p className="mt-2 dark:text-white" style={{ fontFamily: 'VAZIR' }}>برای اطلاع از تخفیف ها ایمیل خود را وارد کنید</p>
                        {/*متن-موبایل*/}

                        {/* فرم - موبایل*/}
                        <form className="mt-2 w-full flex flex-col justify-center items-center">
                            <input className="w-80 h-8 bg-slate-200 discountEmail rounded-md pr-3" placeholder='ایمیل' type="text" />
                            <Button
                                className='mt-2 rounded-2xl'
                                variant="secondary"
                                disabled={isLoading}
                                onClick={isLoading ? () => { } : handleClick}
                            >
                                {isLoading ? 'در حال ارسال ...' : 'ارسال'}
                            </Button>
                        </form>
                        {/* فرم - موبایل*/}
                    </div>
                    {/* ایمیل تخفیف- موبایل */}
                    {/* ................................... */}
                    {/* شبکه های اجتماعی - موبایل */}
                    <div className="w-full h-1/2 flex flex-col justify-center items-center">
                        {/*متن-موبایل*/}
                        <p className='dark:text-white' style={{ fontFamily: 'VAZIR' }}>
                            مارا در شبکه های اجتماعی دنبال کنید
                        </p>
                        {/*متن-موبایل*/}

                        {/*آیکون ها-موبایل*/}
                        <div className='gap-4 mt-3 flex flex-row relative w-full h-auto justify-center items-center' dir='ltr'>
                            <FaSquareInstagram className='size-5 dark:text-white' />
                            <FaLinkedin className='size-5 dark:text-white' />
                            <BsTelegram className='size-5 dark:text-white' />
                            <IoLogoWhatsapp className='size-5 dark:text-white' />
                            <FaSquareXTwitter className='size-5 dark:text-white' />
                        </div>
                        {/*آیکون ها-موبایل*/}
                    </div>
                    {/* شبکه های اجتماعی - موبایل */}
                </div>
            </section>
            {/* کلی موبایل */}
            {/* برای اسکرین هخای موبایل */}
        </>
    )
}


export default LogoFooter