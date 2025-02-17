import Heading from "../../Heading"
import MakingMarket from "./Making-market"
import JoinUs from "./JoinUs-market"

function Market() {
    return (
        <>
            <section className="relative w-full h-full flex flex-col">
                {/* heading */}
                <Heading />
                {/* heading */}

                {/* ساخت مارکت خود */}
                <MakingMarket />
                {/* ساخت مارکت خود */}

                {/*مارکت خود را بسازید*/}
                <JoinUs />
                {/*مارکت خود را بسازید*/}

            </section>
        </>
    )
}

export default Market