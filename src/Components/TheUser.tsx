import { useState } from "react"
import UserProfile from "./main/UserProfile"
import UpperMenu from "./main/UpperMenu"
import UserMenu from "./main/UserMenu"
import BottomMenu from "./main/BottomMenu"
import UserMenuLeft from "./main/UserMenuLeft"
import ClickMenuIcon from "./main/ClickMenuIcon"
import { Outlet } from "react-router-dom"

function TheUser () {

  // برای زمانی که علامت سه خط کنار منوی کاربری را می زنیم و منوی کاربری ظاهر می شود . 
  const [smallAsideVisible , setSmallAsideVisible] = useState('')
  // برای زمانی که علامت سه خط کنار منوی کاربری را می زنیم و منوی کاربری ظاهر می شود . 

  // برای کارکردن حالت ترنزیشن در منوی کاربری 
  const [showRightCart , setShowRightCart] = useState('cart')
  // برای کارکردن حالت ترنزیشن در منوی کاربری 

  // تابع باز وبستن منوی کاربری
     function smallAside () {
      if (smallAsideVisible === '') {
       setSmallAsideVisible('transparentBcg')
       setShowRightCart ('showCart')
      } else {
        setSmallAsideVisible('')
        setShowRightCart('cart')
      }
     }
     


    return (
        <>
{/* دیو flex-col */}
  <div className="h-full  relative">
    {/* header سایت */}
      <header>
        {/*عکس و پروفایل*/}
          <UserProfile /> 
        {/*عکس و پروفایل*/}     
      </header>
    {/* header سایت */}

{/* ----------------------------------------------------------------------------------------------------------*/}
   
    {/* میانی */}
    {/* برای بزرگتر از lg */}
{/*rowwwwwwwwwwwwwwwwwwwww*/}
  <div className="grid  grid-rows-[auto_1fr]  gap-0 relative">
    {/* row 1 */}
    <div className="row-start-1 sticky top-0 z-50">
        {/*منوی بالا - زیر کامپوننت عکس و پروفایل*/}
           <div className="hidden sm:grid relative">
             <div className="sticky top-0 z-40"><UpperMenu openUserMenu={smallAside}/></div>
             <div className="w-full h-full z-20 lg:hidden dark:bg-slate-950" dir="rtl"><Outlet /></div>
             <ClickMenuIcon showCart={showRightCart} closeIt={smallAside} visable={smallAsideVisible}/>
           </div>
        {/*منوی بالا - زیر کامپوننت عکس و پروفایل*/}        
    </div>
    {/* row 1 */}

    {/* row 2 */}
<div className="row-start-2 relative ">
  <div className="hidden relative lg:grid md:grid-cols-5 h-auto" dir="rtl">  
     <div className="relative col-start-1 col-span-4 grid grid-cols-subgrid dark:bg-slate-950  h-auto">  
{/*...................این کد : h-[calc(100vh-5rem)] باعث می شود ویژگی sticky , به طور صحیح 
......................عمل کند و با رسیدن اسکرول به انتهای صفحه ، ابن ویژگی قطع نشود*/}
           <div className=" col-start-1 sticky top-10 z-10 dark:bg-slate-950  h-[calc(100vh-5rem)]">  
                  <UserMenu /> 
           </div>  
            <div className=" h-screen col-start-2 col-span-3 p-0 dark:bg-slate-950" dir="rtl">  
               <Outlet />  
            </div>  
      </div>  
      {/* منوی سمت چپ */}
    <div className="relative col-start-5 col-span-1  dark:bg-slate-950 h-auto" dir="ltr">
       <UserMenuLeft />
    </div>  
      {/* منوی سمت چپ */}
  </div>
</div>
    {/* row 2 */}
  </div>
{/*rowwwwwwwwwwwwwwwwwwwww*/}
    {/* برای بزرگتر از lg */}

    {/* برای زمانی که کوچکتر از lg باشد و روی علامت منوی سه خط کلیک شود */}
    <div className="sm:hidden relative w-full ">
      <div className="sticky top-0 z-40"><UpperMenu openUserMenu={smallAside}/></div>
      <div className="w-full h-auto dark:bg-slate-950" dir="rtl"><Outlet /></div>
      <ClickMenuIcon showCart={showRightCart} closeIt={smallAside} visable={smallAsideVisible}/>
    {/* منوی پایینی برای کوچکتر از sm */}
    <BottomMenu />
    {/* منوی پایینی برای کوچکتر از sm */}
    </div>
    {/* برای زمانی که کوچکتر از lg باشد و روی علامت منوی سه خط کلیک شود */}
</div>   
    {/* میانی */}
{/* دیو flex-col */}
        </>
    )
}

export default TheUser


