import Start from "./Start"
import Heading from "../../Heading"


function RahnemayehSite() {
    return (
        <>
            <section className="grid grid-cols-ddf h-screen w-full">

                <section className="relative dark:bg-slate-950 col-start-2 col-ddk lg:col-ddd h-full w-full flex flex-col">
                    {/* heading */}
                    <Heading />
                    {/* heading */}

                    {/* سرفصل استارت */}
                    <Start />
                    {/* سرفصل استارت */}
                </section>


            </section>
        </>
    )
}

export default RahnemayehSite