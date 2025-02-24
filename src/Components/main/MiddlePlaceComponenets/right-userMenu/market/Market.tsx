import Heading from "../../Heading"
import MakingMarket from "./Making-market"
import JoinUs from "./JoinUs-market"
import PauseOnHover from "./Carousel"
import Slider2 from "./slider2"

function Market() {
    return (
        <>
            <section className=" w-full h-full flex flex-col ">
                {/* heading */}
                <Heading />
                {/* heading */}

                {/* ساخت مارکت خود */}
                <MakingMarket />
                {/* ساخت مارکت خود */}

                {/*مارکت خود را بسازید*/}
                <JoinUs />
                {/*مارکت خود را بسازید*/}

                {/* carousel */}
                <div className="hidden lg:block">
                <PauseOnHover />
                </div>

                <div className="lg:hidden">
                <Slider2 />
                </div>
                {/* carousel */}
            </section>
        </>
    )
}

export default Market