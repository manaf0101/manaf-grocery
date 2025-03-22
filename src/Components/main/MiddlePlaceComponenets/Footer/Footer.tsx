import LogoFooter from "./LogoFooter"
import CommitmentsFooter from "./CommitmentsFooter"


function Footer() {
    return (
        <>
        <footer data-aos="fade-up" className="relative w-full h-auto flex flex-col">
            {/* دیو خالی سطر اول */}
            <div className="w-full h-12  dark:bg-slate-950"></div>
            {/* دیو خالی سطر اول */}

            {/* لوگو و ایمیل جهت تخفیف ها */}
            <LogoFooter />
            {/* لوگو و ایمیل جهت تخفیف ها */}

            {/* تعهدات */}
            <CommitmentsFooter />
            {/* تعهدات */}

        </footer>
        </>
    )
}

export default Footer