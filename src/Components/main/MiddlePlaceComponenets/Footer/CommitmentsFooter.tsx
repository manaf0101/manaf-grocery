function CommitmentsFooter() {
    return (
        <>
        {/*کلی برای اسکرین های بزرگ*/}
        <section className="hidden md:grid relative w-full h-40 bg-footer-1 dark:bg-slate-800">
            <div className="w-full h-auto flex flex-row justify-center items-center relative gap-5">
                {/* پرداخت امن از درگاه بانکی */}
                <div className="grid grid-rows-2 relative w-auto h-auto">
                    <div className="row-start-1  flex justify-center items-center">
                    <img src="/pictures/managf-shield.svg" className="size-28" title="تضمین بازگشت وجه" />
                    </div>
                    <div className="row-start-2 flex justify-center items-start">
                    <p className="dark:text-white" style={{fontFamily: 'VAZIR'}}>پرداخت امن از درگاه بانکی</p>
                    </div>
                </div>
                {/* پرداخت امن از درگاه بانکی */}

                {/* تضمین بازگشت وجه */}
                <div className="grid grid-rows-2 relative w-auto h-auto">
                    <div className="row-start-1  flex justify-center items-center">
                    <img src="/pictures/manaf-return.svg" className="size-28" title="تضمین بازگشت وجه" />
                    </div>
                    <div className="row-start-2 flex justify-center items-start">
                    <p className="dark:text-white" style={{fontFamily: 'VAZIR'}}>تضمین بازگشت وجه </p>
                    </div>
                </div>
                {/* تضمین بازگشت وجه */}

                {/* ارتباط مستقیم طرفین */}
                <div className="grid grid-rows-2 relative w-auto h-auto">
                    <div className="row-start-1  flex justify-center items-center">
                    <img src="/pictures/manaf-chat.svg" className="size-28" title="تضمین بازگشت وجه" />
                    </div>
                    <div className="row-start-2 flex justify-center items-start">
                    <p className="dark:text-white" style={{fontFamily: 'VAZIR'}}>ارتباط مستقیم طرفین </p>
                    </div>
                </div>
                {/* ارتباط مستقیم طرفین */}

                {/* پشتیبانی آنلاین و تلفنی */}
                <div className="grid grid-rows-2 relative w-auto h-auto">
                    <div className="row-start-1  flex justify-center items-center">
                    <img src="/pictures/manaf-support.svg" className="size-28" title="تضمین بازگشت وجه" />
                    </div>
                    <div className="row-start-2 flex justify-center items-start">
                    <p className="dark:text-white" style={{fontFamily: 'VAZIR'}}>پشتیبانی آنلاین و تلفنی </p>
                    </div>
                </div>
                {/* پشتیبانی آنلاین و تلفنی */}
            </div>
        </section>
        {/*کلی برای اسکرین های بزرگ*/}

        {/* ................................................................... */}

        {/* کلی برای اسکرین های موبایل */}
         <section className="md:hidden pt-2 pb-2 bg-footer-1 dark:bg-slate-800 relative w-full h-60">
            <div dir="rtl" className="relative grid grid-cols-2 w-full h-full">
                {/* راست */}
                <div className="col-start-1 w-full h-full flex flex-col">
                    {/* پرداخت امن  */}
                    <div className=" w-full h-1/2 flex justify-center items-center">
                    <img src="/pictures/managf-shield.svg" className="size-16" title="تضمین بازگشت وجه" />
                    </div>
                    <p className="dark:text-white text-center" style={{fontFamily: 'VAZIR'}}>پرداخت امن از درگاه بانکی</p>
                    {/* پرداخت امن  */}
                    {/* ........................ */}
                    {/* ارتباط مستقیم */}
                    <div className=" w-full h-1/2 flex justify-center items-center">
                    <img src="/pictures/manaf-chat.svg" className="size-16" title="تضمین بازگشت وجه" />
                    </div>
                    <p className="dark:text-white text-center" style={{fontFamily: 'VAZIR'}}>ارتباط مستقیم طرفین</p>
                    {/* ارتباط مستقیم */}
                </div>
                {/* راست */}

                {/* چپ */}
                <div className="col-start-2  w-full h-full flex flex-col">
                    {/* تضمین بازگشت وجه */}
                    <div className=" w-full h-1/2 flex justify-center items-center">
                    <img src="/pictures/manaf-return.svg" className="size-16" title="تضمین بازگشت وجه" />
                    </div>
                    <p className="dark:text-white text-center" style={{fontFamily: 'VAZIR'}}>تضمین بازگشت وجه</p>
                    {/* تضمین بازگشت وجه */}
                    {/* .................................... */}
                    {/* پشتیبانی آنلاین و تلفنی */}
                    <div className=" w-full h-1/2 flex justify-center items-center">
                    <img src="/pictures/manaf-support.svg" className="size-16" title="تضمین بازگشت وجه" />
                    </div>
                    <p className="dark:text-white text-center" style={{fontFamily: 'VAZIR'}}>پشتیبانی آنلاین و تلفنی</p>
                    {/* پشتیبانی آنلاین و تلفنی */}
                </div>
                {/* چپ */}
            </div>
         </section>

        {/* کلی برای اسکرین های موبایل */}
        </>
    )
}

export default CommitmentsFooter;