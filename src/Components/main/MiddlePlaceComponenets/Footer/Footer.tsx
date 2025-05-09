import LogoFooter from "./LogoFooter"
import CommitmentsFooter from "./CommitmentsFooter"
import Darbareh from "./Darbareh"


function Footer() {
    return (
        <>
        <footer data-aos="fade-up" className="relative w-full h-auto flex flex-col">
            {/* دیو خالی سطر اول */}
            <div className="w-full h-12  dark:bg-slate-950"></div>
            {/* دیو خالی سطر اول */}

            {/* لوگو و ایمیل جهت تخفیف ها */}
            <LogoFooter id="marketSection5"/>
            {/* لوگو و ایمیل جهت تخفیف ها */}

            {/* تعهدات */}
            <CommitmentsFooter />
            {/* تعهدات */}

            <hr className="dark:text-white "/>

            {/* آخرین */}
            <Darbareh id="marketSection6"/>
            {/* آخرین */}

        </footer>
        </>
    )
}

export default Footer