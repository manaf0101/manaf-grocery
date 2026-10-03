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
import { SellingPanelProvider, useSellingPanel } from "./contexts/SellingPanelContext"
import { CartProvider, useCart } from "./contexts/CartContext"

// کامپوننت داخلی که محتوای اصلی TheUser را رندر می‌کند
// چون useSellingPanel و useCart باید داخل Providerهای مربوطه صدا زده شوند، نمی‌توانند مستقیم داخل خود TheUser باشند
function TheUserContent() {
  const location = useLocation()

  const isMyProfile = location.pathname.includes("MyProfile")
  const isMineMarket = location.pathname.includes("mine-market")
  const isUsersCard = location.pathname.includes("UsersCard")

  const [smallAsideVisible, setSmallAsideVisible] = useState('')
  const [showRightCart, setShowRightCart] = useState('cart')

  function smallAside() {
    if (smallAsideVisible === '') {
      setSmallAsideVisible('transparentBcg')
      setShowRightCart('showCart')
    } else {
      setSmallAsideVisible('')
      setShowRightCart('cart')
    }
  }

  const { isSellingPanelEnabled } = useSellingPanel()

  // تعداد سبد خرید، برای پاس دادن به UpperMenu به‌صورت prop
  const { cartCount } = useCart()

  

  return (
    <div className="h-full w-full relative dark:bg-slate-950">

      <header>
        <UserProfile />
      </header>

      <div className="sticky top-0 z-40">
        <UpperMenu openUserMenu={smallAside} isSellingPanelEnabled={isSellingPanelEnabled} cartCount={cartCount} />
      </div>

      <ClickMenuIcon showCart={showRightCart} closeIt={smallAside} visable={smallAsideVisible} />

      <div className="grid grid-cols-1 lg:grid-cols-5 relative dark:bg-slate-950" dir="rtl">

        <div className="hidden lg:block lg:col-start-1 lg:col-span-1 sticky top-10 z-10 h-[calc(100vh-5rem)] dark:bg-slate-950">
          <UserMenu />
        </div>

        <div
          className={`w-full min-h-screen pb-20 sm:pb-0 dark:bg-slate-950 lg:col-start-2 ${isMineMarket || isUsersCard ? 'lg:col-span-4' : 'lg:col-span-3'
            }`}
        >
          <Outlet />
        </div>

        {!isMineMarket && !isUsersCard && (
          <div className="hidden lg:block lg:col-start-5 lg:col-span-1 dark:bg-slate-950" dir="ltr">
            {isMyProfile ? <MyProfileLeftMenu /> : <UserMenuLeft />}
          </div>
        )}

      </div>

      <div className="sm:hidden">
        <BottomMenu />
      </div>

    </div>
  )
}

function TheUser() {
  return (
    <ProfileProvider>
      <SellingPanelProvider>
        <CartProvider>
          <TheUserContent />
        </CartProvider>
      </SellingPanelProvider>
    </ProfileProvider>
  )
}

export default TheUser