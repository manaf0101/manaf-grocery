// نکته:هر جا از عبارت ........ استفاده شد ، یعنی توسعه دهنده می خواهد 
// .نکته ای را بگوید که شاید در هنگام مطالعه کد ، برای خواننده سوال باشد .





import { VscArrowSmallRight } from "react-icons/vsc";
import useDarkMood from "../Hooks/useDarkMood";
import { FormEvent,useRef,useState , useEffect } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import { v4 as uuidv4 } from 'uuid';
import MyInputuserEmail from "./MyInputuserEmail";
import MyInputForm from "./MyInputForm";
import MyInputPassword from "./MyInputPassword";
import { Link } from "react-router-dom";
import MyInputuserName from "./MyInputUserName";




type MyInput = { 
    props : any
}

type Users = {
    userEmail  : string  , 
    password : string ,
    userId : string
}


function MyInput( ) {
// DARK MOOD

//.کاستوم هوک دارک مود که خودمان توسعه داده ایم و برای هماهنگ بودن با تیلویند توسعه داده شده 
    const [theme]  =  useDarkMood()
//.کاستوم هوک دارک مود که خودمان توسعه داده ایم و برای هماهنگ بودن با تیلویند توسعه داده شده 


    // برای زمانی که صفحه را رفرش می کنیم  و مجدد بالا می آید ، بداند که حالت دارک مود است یا غیره 
   useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } , [theme])
    // برای زمانی که صفحه را رفرش می کنیم  و مجدد بالا می آید ، بداند که حالت دارک مود است یا غیره 

// DARK MOOD

    const MyInputuserEmailRef = useRef<HTMLInputElement>(null)
    const MyInputUserPasswordRef = useRef<HTMLInputElement>(null)
    const [usersEmail , setUsersEmail]  =  useState('')
    // به خاطر بررسی اینکه آیا عملیات وارد کردن ایمیل و پسوورد
    // توسط کاربر به طور کامل انجام شده است یا نه ؟ 
    // که اگر انجام شده باشد برویم سراغ انتخاب userName
    // توسط کابر که از طریق کامپوننت MyInputuserName انجام می شود
    const [userExistence , setUserExistence] = useState(false)
        // به خاطر بررسی اینکه آیا عملیات وارد کردن ایمیل و پسوورد
    // توسط کاربر به طور کامل انجام شده است یا نه ؟ 
    // که اگر انجام شده باشد برویم سراغ انتخاب userName
    // توسط کابر که از طریق کامپوننت MyInputuserName انجام می شود
    const [users , setUsers]   =  useState<Users[]>([])
    const [value , setValue]   =  useLocalStorage('users' , users)
    const [hash , setHash]  = useState(window.location.hash)
    const [PasswordButtonStyle , setPasswordButtonStyle] = useState ("dark:bg-slate-900  border-2 p-1 border-slate-600 rounded-lg text-base w-full")
    const [buttonstyle , setButtonStyle]  = useState("dark:bg-slate-900  border-2 p-1 border-slate-600 rounded-lg text-base w-full")
    const [inputStyle , setInputStyle] = useState("p-1  dark:bg-slate-900 w-full rounded-lg border-2 border-slate-600 focus-visible:outline-none dark:caret-teal-400")
    const [inputPasswordStyle  ,  setInputPasswordStyle] = useState("p-1  dark:bg-slate-900 w-full rounded-lg border-2 border-slate-600 focus-visible:outline-none dark:caret-teal-400")
    const [warningStyele , setWarningStle] = useState("text-red-600 hidden")
    const [warningText , setWarningText] = useState('')
    const [passwordWarningStyele , setPasswordWarningStyele] = useState("text-red-600 hidden")



// تابعی که در کامپوننت MyInputForm برای زمانی که تابع را submit می کنیم استفاده می شود.
// ..............تابع به این دلیل async  می باشد که در فرایند ذخیره سازی در localstorage از فرایند جا نماند
   async function  handleClickuserEmail(e : FormEvent) {
        e.preventDefault()  

        // بررسی کادر پسوورد که در صورت نداشتن 8 کاراکتر ، هشدار دهد
        if (MyInputUserPasswordRef.current?.value.length) {
            if (MyInputUserPasswordRef.current.value.length < 8 ) {
                setPasswordButtonStyle("dark:bg-slate-900  border-2 p-1 rounded-lg text-base w-full text-red-600 border-red-600")
                setInputPasswordStyle("p-1  dark:bg-slate-900 w-full rounded-lg border-2 border-red-600 focus-visible:outline-none dark:caret-teal-400")
                setPasswordWarningStyele("text-red-600 visible")
            } 
        // بررسی کادر پسوورد که در صورت نداشتن 8 کاراکتر ، هشدار دهد

        
        // هنگام وارد شدن پسورد توسط کاربر ، مقادیر در localstorage ذخیره می شوند . 
            if (MyInputUserPasswordRef.current.value.length > 7 ) {
                 let newUser = {
                    userEmail : usersEmail , 
                    password : MyInputUserPasswordRef.current.value , 
                    userId :  hash
                }
 // await ...........را به خاطر این اضافه میکنیم که هنگام رفتن به آدرس جدید ، فرایند ذخیره سازی جا نماند
                   await setUsers([...users , newUser])
                   await setValue([...value , newUser])

          // به خاطر بررسی اینکه اگر عملیات وارد کردن ایمیل و پسوورد
         // توسط کاربر به طور کامل انجام شده باشد   
        // که اگر انجام شده باشد برویم سراغ انتخاب userName
       // توسط کابر که از طریق کامپوننت MyInputuserName انجام می شود
                   setUserExistence(true)
                   window.location.href = `/MyInput#${newUser.userId}/userName`
          // به خاطر بررسی اینکه اگر عملیات وارد کردن ایمیل و پسوورد
         // توسط کاربر به طور کامل انجام شده باشد   
        // که اگر انجام شده باشد برویم سراغ انتخاب userName
       // توسط کابر که از طریق کامپوننت MyInputuserName انجام می شود

                //   ******************* navigate(`${newUser.userId}/userName`)


                //    انتقال به کامپوننت مخصوص کاربر یعنی (TheUser.tsx) پس از ورود رمز و ذخیره سازی
                        //  **************navigate(`${newUser.userId}/theUser`) ***************
                //    انتقال به کامپوننت مخصوص کاربر یعنی (TheUser.tsx) پس از ورود رمز و ذخیره سازی
            } 
        }
        // هنگام وارد شدن پسورد توسط کاربر ، مقادیر در localstorage ذخیره می شوند . 

        // مقداری که داخل اینپوت ایمیل نوشته می شود
        const currentEmail = MyInputuserEmailRef.current?.value; 
        // مقداری که داخل اینپوت ایمیل نوشته می شود

        // بررسی میکند آیا مقدار ایمیل وارد شده در فرم توسط کاربر ، آیا از قبل وجود داشته یا نه
        const isEmailExists = value.some(  
            (item) => item.userEmail === currentEmail  
        );  
        // بررسی میکند آیا مقدار ایمیل وارد شده در فرم توسط کاربر ، آیا از قبل وجود داشته یا نه

        // بررسی میکند آیا ایمیل وارد شده توسط کاربر ایراد نگارشی دارد یه نه
        if (!currentEmail?.includes('@gmail.com')) {
            setButtonStyle("dark:bg-slate-900  border-2 p-1 rounded-lg text-base w-full text-red-600 border-red-600")
            setInputStyle("p-1  dark:bg-slate-900 w-full rounded-lg border-2 border-red-600 focus-visible:outline-none dark:caret-teal-400")
            setWarningStle("text-red-600 visible")
            setWarningText('لطفا ایمیل خود را صحیح وارد کنید !')
            return ;
        } 


        // بررسی میکند آیا ایمیل وارد شده توسط کاربر ایراد نگارشی دارد یه نه

        // بررسی میکند آیا مقدار ایمیل وارد شده در فرم توسط کاربر ، آیا از قبل وجود داشته یا نه
        if (isEmailExists) {
            setButtonStyle("dark:bg-slate-900  border-2 p-1 rounded-lg text-base w-full text-red-600 border-red-600")
            setInputStyle("p-1  dark:bg-slate-900 w-full rounded-lg border-2 border-red-600 focus-visible:outline-none dark:caret-teal-400")
            setWarningStle("text-red-600 visible")
            setWarningText('این ایمیل قبلا استفاده شده است !')
            return ;
        } 
        // بررسی میکند آیا مقدار ایمیل وارد شده در فرم توسط کاربر ، آیا از قبل وجود داشته یا نه

//  ..........اگر شروط بالا بدون ایراد گذر شوند اعمال زیر اجرا می شوند
        let newUserId  = { 
            userId : uuidv4() , 
        }
        let userId : string = newUserId.userId
        // این دو مقوله بعدا و هنگامی که کاربر رمز را افزود استفاده میشوند برای ذخیره سازی مقادیر
        setUsersEmail(currentEmail)
        setHash(userId)
        // این دو مقوله بعدا و هنگامی که کاربر رمز را افزود استفاده میشوند برای ذخیره سازی مقادیر
        
        
        // اضافه شدن آی دی مخصوص کاربر جدید به دامین سایت
        window.location.hash = userId
        // اضافه شدن آی دی مخصوص کاربر جدید به دامین سایت
    }
// تابعی که در کامپوننت MyInputForm برای زمانی که تابع را submit می کنیم استفاده می شود.


    return (
        <>
        <div  className="flex flex-row justify-center items-center h-screen dark:bg-gray-800 ">
        <div className="h-full w-1/6 flex flex-col">
    
        <div className="h-1/2 dark:bg-slate-900"></div>
        <div className="h-1/2 dark:bg-gradient-to-tr from-regal-purple from-10% to-50% to-slate-900"></div>
    
        </div>
           
            <div className="justify-center items-center flex flex-col dark:bg-slate-900 h-full w-4/6">
                {/* کارد کلی فرم */}
                <div className="dark:text-white dark:bg-slate-900 bg-slate-300  w-4/5 h-auto rounded-lg border-slate-600 border-2 box-content p-4">
                    <div className="whitespace-break-spaces mb-4" style={{fontFamily:'cursive'}}>hello ! <br />welcome to manaf grocery , let's being the adventure .</div>

                      {/* form */}
                      <MyInputForm setWarningText={setWarningText} setPasswordButtonStyle={setPasswordButtonStyle} handleClick={handleClickuserEmail}  setButtonStyle={setButtonStyle} setInputPasswordStyle={setInputPasswordStyle} setInputStyle={setInputStyle} setPasswordWarningStyele={setPasswordWarningStyele} setWarningStle={setWarningStle}>
{/*...................استفاده از window.location.hash && usersEmail
 به این دلیل است که اگر کاربر به صفحه ی بعدی رفت و دوباره برگشت ،
  قسمت ایمیل خالی نماند و فقط یک تیک خالی نشان ندهد 
 . و به جای آن دوباره برگردد به کامپوننت یوزر ایمیل  */}

 {/* .......... دلیل استفاده از userExistence در بالا توضیح داده شده .*/}
                          {userExistence && usersEmail? <MyInputuserName /> : window.location.hash && usersEmail ? <MyInputPassword setPasswordButtonStyle={setPasswordButtonStyle} usersEmail={usersEmail} VscArrowSmallRight={<VscArrowSmallRight/>} PasswordButtonStyle={PasswordButtonStyle} inputPasswordStyle={inputPasswordStyle} passwordWarningStyele={passwordWarningStyele} ref={MyInputUserPasswordRef} /> : <MyInputuserEmail warningText={warningText} VscArrowSmallRight={<VscArrowSmallRight/>} buttonstyle={buttonstyle} inputStyle={inputStyle} warningStyele={warningStyele} ref={MyInputuserEmailRef}/>}
                      </MyInputForm>
                      {/* form */}
                </div>
                {/* کارد کلی فرم */}

                <div className="m-4 text-slate-600 hover:text-slate-950 dark:hover:text-slate-400 dark:text-slate-600">
                    <Link to={'/signUP'}><p className="underline">I have already an account</p></Link>
                </div>

            </div>
    
            <div className="dark:bg-gradient-to-bl from-regal-blue from-20% to-40% to-slate-900 h-full w-1/6"></div>
    
    
        </div>
    
        
    </>
        
    )
}


export default MyInput