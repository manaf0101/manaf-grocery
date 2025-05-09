function CommitmentsFooter() {
    return (
        <>
        {/* کلی */}
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
        {/* کلی */}
        </>
    )
}

export default CommitmentsFooter;