import Image from 'react-bootstrap/Image';
import imageSrc from '../../../public/pictures/1696162108939.jpg'; 
import { useLocalStorage } from "../../Hooks/useLocalStorage" 
import { useParams } from 'react-router-dom';  
import useDarkMood from '../../Hooks/useDarkMood';
import { useEffect } from 'react';


  function UserProfile () {

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


    // دریافت آی دی اختصاصی کاربر از دامین سایت که به صورت داینامیک وارد شده بود
    const { userId } = useParams();
    // دریافت آی دی اختصاصی کاربر از دامین سایت که به صورت داینامیک وارد شده بود


//استخراج نام کاربر صاحب اکانت .....................

    // کلیه کاربران را از localStorage می گیرد 
    const [userNamesValus] = useLocalStorage<any>('userNames' , '')
    // کلیه کاربران را از localStorage می گیرد 

    // تابعی که از بین کاربران ، کاربری را پیدا میکند که صفحه متعلق به اوست 
   const res =  userNamesValus.filter((item : any) => {
        return item.userId === userId
    })
    // تابعی که از بین کاربران ، کاربری را پیدا میکند که صفحه متعلق به اوست 

    // استخراج نام کاربری کاربر مربوطه
      function theUserUserName() {
        let theUser  =  'guest'
        if (res) {
            res.forEach((item : any) => {
                theUser = item.userName
            })
        } 
        return theUser
    }
    // استخراج نام کاربری کاربر مربوطه
  
//استخراج نام کاربر صاحب اکانت .....................
    

    return (
        <>
{/*----------- < sm ---------- */}
        {/* دو ستون مربوط به پروفایل و نام تجاری سایت و منوی کاربری در کوچکتر از ---sm--- */}
        <div className='sm:hidden bg-slate-100 dark:bg-slate-900 grid grid-cols-2'>
            {/* ستون مربوط به نام تجاری */}
            <div className='col-start-1 bg-slate-200 dark:bg-slate-500  flex justify-center items-center pl-2 text-white'>
            <p  className= " text-slate-600 dark:text-white " style={{fontFamily : 'cursive'}}>manaf grocery</p>
            </div>
            {/* ستون مربوط به نام تجاری */}

            {/* ستون مرکزی شامل پروفایل */}
            <div className='col-start-2 col-span-1 flex justify-center items-center pr-3 pt-3  dark:text-white'>
                {/* سطر مرکزی */}
                <div className='grid grid-rows-2'>
                    {/* سطر مربوط به عکس */}
                    <div className='row-start-1 row-span-1 flex justify-center items-center'>
                    <div>
                    <Image src={imageSrc}  title='image' alt='profile image' style={{ width: '50px', height: '50px' }} roundedCircle  />
                    </div>
                    </div>
                    {/* سطر مربوط به عکس */}

                    {/* سطر مربوط به یوزرنیم کاربر */}
                    <div className="row-start-2 row-span-1 flex justify-center items-center">{theUserUserName()}</div>
                    {/* سطر مربوط به یوزرنیم کاربر */}
                </div>
                {/* سطر مرکزی */}
            </div>
            {/* ستون مرکزی شامل پروفایل */}
        </div>
        {/* دو ستون مربوط به پروفایل و نام تجاری سایت و منوی کاربری در کوچکتر از ---sm--- */}
{/*----------- < sm ---------- */}

{/* -----------sm<----------- */}
    {/*سه ستون مربوط به عکس و نام کاربری برای نمایش گر های بزرگتر از -----sm------*/}    
        <div className="hidden sm:grid bg-slate-100 dark:sm:bg-slate-900  sm:grid-cols-3">

            {/*ستون مرکزی*/}
            <div className="col-start-2 col-span-1 flex justify-center items-center dark:text-slate-100">
                {/* سطر های مرکزی */}
               <div className="grid grid-rows-2 ">
                {/* سطر مربوط به عکس */}
                 <div className="row-start-1 row-span-1 flex justify-center items-center">
                    <div>
                    <Image src={imageSrc}  title='image' alt='profile image' style={{ width: '50px', height: '50px' }} roundedCircle  />
                    </div>
                 </div>
                {/* سطر مربوط به عکس */}

                {/* سطر مربوط به یوزرنیم کابر */}
                 <div className="row-start-2 row-span-1 flex justify-center items-center">{theUserUserName()}</div>
                {/* سطر مربوط به یوزرنیم کابر */}
               </div>
                {/* سطر های مرکزی */}
            </div>
            {/*ستون مرکزی*/}
        </div>
    {/*سه ستون مربوط به عکس و نام کاربری برای نمایش گر های بزرگتر از -----sm------*/}    
  
        {/*تک خط سفید زیر نام و عکس پروفایل برای نمایش گر های بزرگتر از ------sm-----*/}
    <div className='hidden sm:grid sm:grid-cols-3 bg-slate-100 dark:sm:bg-slate-900'>
        <div className='col-start-2 col-span-1'>
            <hr className='dark:text-white size-full mb-2'/>
        </div>
    </div>
        {/*تک خط سفید زیر نام و عکس پروفایل برای نمایش گر های بزرگتر از ------sm-----*/}  

{/* -----------sm<----------- */}

        </>
    )
}

export default UserProfile