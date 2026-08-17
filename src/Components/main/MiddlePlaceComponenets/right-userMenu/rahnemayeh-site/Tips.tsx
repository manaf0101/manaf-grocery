// ...................این کامپوننت ، قالب مستطیل های آماده
//  برای نوشتن صفحه ی راهنمای سایت می باشد

import { ReactNode } from "react"


type Tips = {
    children : ReactNode 
    icon : React.ReactElement
    className : string
}

function Tips({children , icon , className} : Tips) {
    return (
        <>
        {/* نکته   */}
            <div className="w-full h-auto flex justify-center items-center pr-2 pl-2">
                <div className={`flex flex-col bg-search-box dark:bg-cyan-900 w-5/6 h-auto  rounded-lg border-2 border-gray-200 dark:border-cyan-300 ${className}`}>
                {/* icon */}
                <div className="w-full h-auto justify-start items-start">
                    <div>{icon}</div>
                </div>
                {/* icon */}

                {/* tips */}
                    <div className="leading-loose mt-2 pr-4 pl-4 break-words whitespace-normal">
                        {children}
                    </div>
                {/* tips */}
                </div>
            </div>
        {/* نکته   */}
        </>
    )
}

export default Tips