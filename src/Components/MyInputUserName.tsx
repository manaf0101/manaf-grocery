import { useRef , useState } from "react"
import { useLocalStorage } from "../Hooks/useLocalStorage"
import axios from "axios"


// write a function to
// find all images without alternate text
// and give them a red border





type userName = {
    userName : string
    userId  : string
} 



function MyInputuserName () {




    // استفاده در input
   const userNameRef = useRef<HTMLInputElement>(null)
    // استفاده در input

        // برای گرفتن userId از قسمت دامین که همراه با نام کابری ذخیره شود
        const hash = location.hash.substring(1); // از # به بعد .........  
        const firstSlashIndex = hash.indexOf('/');  
         const result = firstSlashIndex !== -1 ? hash.substring(0, firstSlashIndex) : hash;            
     // برای گرفتن userId از قسمت دامین که همراه با نام کابری ذخیره شود
 

    // state هایی برای عملیات سیو شدن
   const[userNames , setUserNames] =  useState<userName[]>([])
   const [userNamesValus , setUserNamesValus] = useLocalStorage('userNames' , userNames)
    // state هایی برای عملیات سیو شدن

    // متن اخطار در صورت تکراری بودن نام کاربری یا کمتر از 4 کاراکتر بودن آن
    const[warningText , setWarningText]  = useState("mt-4 text-red-600 hidden")
    // متن اخطار در صورت تکراری بودن نام کاربری یا کمتر از 4 کاراکتر بودن آن


// این تابع برای سیو شدن یوزرنیم بعد از کلیک کردن روی دکمه ی next می باشد
async function handleButton() {  

    // چیزی که کاربر داخل اینپوت مینویسد .
    const newUserName = userNameRef.current?.value ? userNameRef.current.value : '' 
    // چیزی که کاربر داخل اینپوت مینویسد .

     // بررسی میکند آیا نام کاربری تکراری است یا نه ؟ 
    const usernameExists = userNamesValus.some((item) =>   
        item.userName.toLowerCase() === newUserName.toLowerCase()  
    );  
     // بررسی میکند آیا نام کاربری تکراری است یا نه ؟ 

// ............. اگر بعد از کلیک روی next ، داخل اینپوت خالی نباشد ، 
// .............یعنی کاربر حتما چیزی تایپ کرده باشد و ما را به مسخره نگرفته 
// ............. باشد .
    if (newUserName !== '') {   
        // اگر نام کاربری تکراری باشد ، یعنی userNameExists = true یک متن اخطار ظاهر میشود.
        if (usernameExists || newUserName.length < 4 ) {   
            setWarningText("mt-4 text-red-600");  
        // اگر نام کاربری تکراری باشد ، یعنی userNameExists = true یک متن اخطار ظاهر میشود.

        // در صورت تکراری نبودن ، نام کاربری جدید ، به localStorage ذخیره میشود .
        } else {  
            setUserNames([...userNames, { userName: newUserName  , userId : result}]);  
            setUserNamesValus([...userNamesValus, { userName: newUserName , userId : result }]);

            // ارسال اطلاعات به دیتا بیس
            axios.post('http://localhost:8000/api/add-users' , {
                userName : newUserName
            })
            .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
            // ارسال اطلاعات به دیتا بیس

        
            // رفتن به دامین جدید که صفحه ی کاربری خود کاربر می باشد.
            window.open(`/TheUserPage/${result}/main`, '_self') 
            // رفتن به دامین جدید که صفحه ی کاربری خود کاربر می باشد.
        }  
        // در صورت تکراری نبودن ، نام کاربری جدید ، به localStorage ذخیره میشود .
    }  
}
// این تابع برای سیو شدن یوزرنیم بعد از کلیک کردن روی دکمه ی next می باشد .

    return (
        <>
            {/* مربوط به UserName */}
                    <div className="grid grid-cols-2">
                        <div className="col-start-1 col-span-1">
                            <p className="dark:text-teal-400  text-slate-950 ml-2" style={{fontFamily : 'cursive'}}>username<span className="text-red-600 ml-2"> *</span></p>
                        </div>
                    </div>
            {/* مربوط به UserName */}
                
            {/* اینپوت username */}
            <div className="grid grid-cols-3 md:grid-cols-5 mt-2 gap-1">
                 <div className=" col-start-1 col-span-3 md:col-start-1 md:col-span-4 flex justify-center items-center">
                    <input onChange={() => setWarningText("mt-4 text-red-600 hidden")} name="ffss" type="text" ref={userNameRef}  className="p-1  dark:bg-slate-900 w-full rounded-lg border-2 border-slate-600 focus-visible:outline-none dark:caret-teal-400" />
                </div>
                {/* next button */}
                <div className="col-start-1 col-span-3 md:col-start-5 md:col-span-1 items-center justify-center flex">
                  <button  onClick={handleButton}  type="button"  className="btn btn-outline-secondary rounded-lg p-1 w-full md:w-4/5">next</button>        
                </div>
                {/* next button */}
            </div>
            {/* اینپوت username */}

            {/* متن اخطار */}
            <div className={warningText}><p style={{fontFamily : 'VAZIR'}}  dir="rtl">نام کاربری نباید تکراری ، یا کمتر از چهار کاراکتر باشد !</p></div>
            {/* متن اخطار */}
        </>
        ) 
}


export default MyInputuserName