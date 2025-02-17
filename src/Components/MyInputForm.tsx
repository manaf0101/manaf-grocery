import { FormEvent, ReactNode } from "react"

type MyInputForm =  {
    handleClick : (e : FormEvent ) => void 
    setButtonStyle : any 
    setInputStyle : any
    setWarningStle : any
    setPasswordWarningStyele : any
    setPasswordButtonStyle : any
    setInputPasswordStyle :any
    children : ReactNode , 
    setWarningText : any , 
}

function MyInputForm ({handleClick ,setWarningText , setButtonStyle,setPasswordButtonStyle, setInputStyle,setInputPasswordStyle , setPasswordWarningStyele , setWarningStle , children} : MyInputForm) {

   
    return (
        <>
        
        <form 
        onSubmit={(e) => 
            // این تابع در کامپوننت MyInput.tsx  تعریف شده .
            {handleClick (e)
            }
            // این تابع در کامپوننت MyInput.tsx  تعریف شده .

        }
        onChange={(e) => {
            if (e.currentTarget.input?.value.includes('@gmail.com')) {
                // تابعی که استایل دکمه ی continue را عوض می کند
                setButtonStyle(
                 "dark:bg-slate-900  border-2 p-1 rounded-lg text-base w-full text-teal-400 border-teal-400"
                )
                // تابعی که استایل دکمه ی continue را عوض می کند


             } else {
                setInputStyle("p-1  dark:bg-slate-900  w-full rounded-lg border-2 border-slate-600 focus-visible:outline-none dark:caret-teal-400")
                setButtonStyle("dark:bg-slate-900 border-slate-600 border-2 p-1 rounded-lg text-base w-full")
                setWarningStle("hidden")
             }
             if (e.currentTarget.passwordinput?.value) {
                if (e.currentTarget.passwordinput.value.length > 7) {
                    setPasswordButtonStyle( "dark:bg-slate-900  border-2 p-1 rounded-lg text-base w-full text-teal-400 border-teal-400")
                    setPasswordWarningStyele("hidden")
                    setInputPasswordStyle("p-1  dark:bg-slate-900  w-full rounded-lg border-2 border-slate-600 focus-visible:outline-none dark:caret-teal-400")
                } else {
                    setPasswordButtonStyle("dark:bg-slate-900 border-slate-600 border-2 p-1 rounded-lg text-base w-full")
                    setInputPasswordStyle("p-1  dark:bg-slate-900  w-full rounded-lg border-2 border-slate-600 focus-visible:outline-none dark:caret-teal-400")
                    setPasswordWarningStyele(" hidden")
                }
             }

            //  برای زمانی که ایمیل کاربر از قبل موجود بوده و آلارم ظاهر شده بود ، و حالا پس از تایپ مجدد حتی یک کلمه آلارم از بین برود
             setInputStyle("p-1  dark:bg-slate-900  w-full rounded-lg border-2 border-slate-600 focus-visible:outline-none dark:caret-teal-400")
             setButtonStyle("dark:bg-slate-900 border-slate-600 border-2 p-1 rounded-lg text-base w-full")
             setWarningStle("text-red-600 hidden")
             setWarningText('')
            //  برای زمانی که ایمیل کاربر از قبل موجود بوده و آلارم ظاهر شده بود ، و حالا پس از تایپ مجدد آلارم از بین برود

            
        }}
        >
            {/* این children بعدا در کامپوننت MyInput.tsx به صورت شرطی تعریف می شود */}
            {children}
            {/* این children بعدا در کامپوننت MyInput.tsx به صورت شرطی تعریف می شود */}
        </form>
        </>
    )
}


export default MyInputForm