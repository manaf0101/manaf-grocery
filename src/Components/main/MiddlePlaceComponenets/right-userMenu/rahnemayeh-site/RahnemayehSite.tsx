import Start from "./Start"
import Heading from "../../Heading"
import DiagonalStripes from "./DiagonalStripes"

function RahnemayehSite() {
    return (
        <>
            <section className="grid grid-cols-ddf h-full w-full">
                {/* حاشیه راه راه مورب */}
                <section className="hidden lg:grid col-start-1">
                    <DiagonalStripes />
                </section>
                {/* حاشیه راه راه مورب */}

                <section className="relative dark:bg-slate-900  col-start-2 col-ddk lg:col-ddd h-full w-full flex flex-col">
                    {/* heading */}
                    <Heading />
                    {/* heading */}

                    {/* سرفصل استارت */}
                    <Start />
                    {/* سرفصل استارت */}
                </section>

                {/* حاشیه راه راه مورب */}
                <section className="hidden lg:grid col-start-ddg col-span-1" dir="ltr">
                    <DiagonalStripes />
                </section>
                {/* حاشیه راه راه مورب */}

            </section>
        </>
    )
}

export default RahnemayehSite