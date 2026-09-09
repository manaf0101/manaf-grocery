import { useState } from "react"
import UserProfile from "./main/UserProfile"
import UpperMenu from "./main/UpperMenu"
import UserMenu from "./main/UserMenu"
import BottomMenu from "./main/BottomMenu"
import UserMenuLeft from "./main/UserMenuLeft"
import ClickMenuIcon from "./main/ClickMenuIcon"
import MyProfileLeftMenu from "./main/MiddlePlaceComponenets/right-userMenu/MyProfile/MyProfileLeftMenu"
import { Outlet, useLocation } from "react-router-dom"

import { ProfileProvider } from "./contexts/ProfileContext"

function TheUser() {
  const location = useLocation()

  // برای شرطی کردن کامپوننت‌های منو در صفحات خاص
  const isMyProfile = location.pathname.includes("MyProfile")
  const isMineMarket = location.pathname.includes("mine-market")
  // برای شرطی کردن کامپوننت‌های منو در صفحات خاص

  // برای زمانی که علامت سه خط کنار منوی کاربری را می‌زنیم و منوی کاربری ظاهر می‌شود
  const [smallAsideVisible, setSmallAsideVisible] = useState('')
  // برای زمانی که علامت سه خط کنار منوی کاربری را می‌زنیم و منوی کاربری ظاهر می‌شود

  // برای کارکردن حالت ترنزیشن در منوی کاربری
  const [showRightCart, setShowRightCart] = useState('cart')
  // برای کارکردن حالت ترنزیشن در منوی کاربری

  // تابع باز و بسته کردن منوی کاربری
  function smallAside() {
    if (smallAsideVisible === '') {
      setSmallAsideVisible('transparentBcg')
      setShowRightCart('showCart')
    } else {
      setSmallAsideVisible('')
      setShowRightCart('cart')
    }
  }
  // تابع باز و بسته کردن منوی کاربری

  return (
    <ProfileProvider>
      <div className="h-full w-full relative dark:bg-slate-950">

        {/* هدر سایت */}
        <header>
          {/* عکس و پروفایل */}
          <UserProfile />
          {/* عکس و پروفایل */}
        </header>
        {/* هدر سایت */}

        {/* منوی بالا — فقط یک‌بار رندر می‌شود و در همه‌ی اندازه‌های صفحه ثابت می‌ماند */}
        <div className="sticky top-0 z-40">
          <UpperMenu openUserMenu={smallAside} />
        </div>
        {/* منوی بالا */}

        {/* آیکون باز/بسته کردن منوی کاربری — فقط یک‌بار رندر می‌شود */}
        <ClickMenuIcon showCart={showRightCart} closeIt={smallAside} visable={smallAsideVisible} />
        {/* آیکون باز/بسته کردن منوی کاربری */}

        {/* بخش میانی: یک Outlet واحد که فقط چیدمانش با اندازه‌ی صفحه تغییر می‌کند */}
        <div className="grid grid-cols-1 lg:grid-cols-5 relative dark:bg-slate-950" dir="rtl">

          {/* منوی راست — فقط از lg به بالا نمایش داده می‌شود */}
          <div className="hidden lg:block lg:col-start-1 lg:col-span-1 sticky top-10 z-10 h-[calc(100vh-5rem)] dark:bg-slate-950">
            <UserMenu />
          </div>
          {/* منوی راست */}

          {/* محتوای اصلی صفحه — همان Outlet یکتا */}
          <div
            className={`w-full min-h-screen dark:bg-slate-950 lg:col-start-2 ${isMineMarket ? 'lg:col-span-4' : 'lg:col-span-3'
              }`}
          >
            <Outlet />
          </div>
          {/* محتوای اصلی صفحه */}

          {/* منوی چپ — فقط از lg به بالا، و فقط وقتی صفحه‌ی mine-market نیست */}
          {!isMineMarket && (
            <div className="hidden lg:block lg:col-start-5 lg:col-span-1 dark:bg-slate-950" dir="ltr">
              {isMyProfile ? <MyProfileLeftMenu /> : <UserMenuLeft />}
            </div>
          )}
          {/* منوی چپ */}

        </div>
        {/* بخش میانی */}

        {/* منوی پایینی — فقط برای صفحه‌ی کوچک‌تر از sm نمایش داده می‌شود */}
        <div className="sm:hidden">
          <BottomMenu />
        </div>
        {/* منوی پایینی */}

      </div>
    </ProfileProvider>
  )
}

export default TheUser
