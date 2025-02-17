import { Stack  } from "react-bootstrap"
import { TiTick } from "react-icons/ti";
import { forwardRef, useEffect, useState } from "react"
import { VscEyeClosed } from "react-icons/vsc";
import { HiOutlineEye } from "react-icons/hi2";

type PropsType = {
    PasswordButtonStyle : string
    passwordWarningStyele : string
    VscArrowSmallRight : any
    usersEmail : string , 
    setPasswordButtonStyle : any
    inputPasswordStyle : any 
}

const MyInputPassword = forwardRef<HTMLInputElement , PropsType>(function MyInputuserEmail(props , ref) {

    const {inputPasswordStyle,PasswordButtonStyle , passwordWarningStyele ,usersEmail,VscArrowSmallRight} : any = props

    // مربوط به تغییر حالت اینپوت پسوورد با کلیک روی علامت چشم
    const [eye , setEye] = useState(false)
    const [inputType , setInputType] = useState('password')
    const [eyeMark , setEyeMark] = useState(<VscEyeClosed className="size-5"/>)

    useEffect(() => {
        if (eye == false) {
            setInputType('password')
            setEyeMark(<VscEyeClosed className="size-5"/>)
        } else {
            setInputType ('text')
            setEyeMark(<HiOutlineEye className="size-4"/>)
        }
    } , [eye])
    // مربوط به تغییر حالت اینپوت پسوورد با کلیک روی علامت چشم



    return (
        <Stack gap={2}>
        
        {/* ایمیلی که کاربر وارد کرده را با یک تیک سبز کنارش به کاربر نشان می دهد */}
        <div className="grid grid-cols-12 gap-1">
            <div className="col-start-1 col-span-1 flex justify-end"><TiTick className="text-teal-200"/></div>
            <div className="col-start-2 col-span-11"><p className="dark:text-teal-400  text-slate-950 ml-2"style={{fontFamily : 'cursive'}}>{usersEmail}</p></div>
        </div>
        {/* ایمیلی که کاربر وارد کرده را با یک تیک سبز کنارش به کاربر نشان می دهد */}

             
             {/* create a password's text */}
        <div className="grid grid-cols-12 gap-1" style={{fontFamily : 'cursive'}}>
            <div className="col-start-1 col-span-1 flex justify-end"></div>
           <p className=" col-start-2 col-span-11 ml-2 text-teal-400">create a password<span className="text-red-600 ml-1">*</span></p>
        </div>
             {/* create a password's text */}


   {/* مربوط به پر کردن ایمیل و دکمه ی continue */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-1">
            <div className="flex justify-center col-start-1 col-span-1  md:col-start-1 md:col-span-1 mt-2">
                {VscArrowSmallRight}
            </div>
        
            <div className="col-start-2 col-span-2 md:col-start-2 md:col-span-8">
                <input  type={`${inputType}`} name="passwordinput" ref={ref} className={`${inputPasswordStyle}`}/>
            </div>
                 
                 {/* علامت چشم */}
                 <div className="col-start-4 col-span-1 md:col-start-10 md:col-span-1 flex justify-center items-center">
                    <button 
                    onClick={(e) => {
                        e.preventDefault()
                        setEye(!eye)
                    }}
                    name="eyeButton">
                        {eyeMark}
                    </button>
                 </div>
                 {/* علامت چشم */}


            <div className="col-start-2 col-span-2  md:col-start-11 md:col-span-2 flex justify-center "> 
            <button  name="btps" className={`${PasswordButtonStyle}`} >continue</button>
            </div>
        </div>
   {/* مربوط به پر کردن ایمیل و دکمه ی continue */}


          <div className="grid grid-cols-3">
            <div className="col-start-2 col-span-2">
                <div className="flex justify-center">
                    <p dir="rtl" className={`${passwordWarningStyele}`} style={{fontFamily : 'VAZIR'}}>رمز باید بیشتر از "8" کاراکتر داشته باشد !!</p>
                </div>
            </div>
          </div>
              
    </Stack>       
    )

})

export default MyInputPassword





