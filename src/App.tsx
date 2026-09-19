import Welcome from "./Components/Welcome";
import ErrorPage from "./Components/ErrorPage";
import ThemeMood from "./Components/ThemeMood";
import MyInput from "./Components/MyInput";
import TheUser from "./Components/TheUser";
import SignUp from "./Components/SignUp";
import Index from "./Components/main/MiddlePlaceComponenets/Index";

// مایکت من 
import { mineMarketLoader } from "./Loaders/mineMarketLoader";
import { storeAction } from "./Actions/storeAction";
import { productAction } from "./Actions/productAction";
// مایکت من 

// کامپوننت های MyProfile
import { editProfileAction } from "./Actions/editProfileAction"
import SummaryOfActivities from "./Components/main/MiddlePlaceComponenets/right-userMenu/MyProfile/SummaryOfActivities";
import EditMyProfile from "./Components/main/MiddlePlaceComponenets/right-userMenu/MyProfile/EditMyProfile";
import MyOrders from "./Components/main/MiddlePlaceComponenets/right-userMenu/MyProfile/MyOrders";
import MyLists from "./Components/main/MiddlePlaceComponenets/right-userMenu/MyProfile/MyLists";
import MyCurrentOrders from "./Components/main/MiddlePlaceComponenets/right-userMenu/MyProfile/MyCurrentOrders";
import DeliveredOrders from "./Components/main/MiddlePlaceComponenets/right-userMenu/MyProfile/DeliveredOrders";
import ReturnedOrders from "./Components/main/MiddlePlaceComponenets/right-userMenu/MyProfile/ReturnedOrders";
import CanceledOrders from "./Components/main/MiddlePlaceComponenets/right-userMenu/MyProfile/CanceledOrders";

import { usersLoader } from "./Loaders/usersLoader";
import { profileLoader } from "./Loaders/profileLoader";
import { ordersLoaderCounting } from "./Loaders/ordersLoaderCounting";
import { listsLoader } from "./Loaders/listsLoader";
import { currentOrdersLoader } from "./Loaders/currentOrdersLoader";
import { deliveredOrdersLoader } from "./Loaders/deliveredOrdersLoader";
import { returnedOrdersLoader } from "./Loaders/returnedOrdersLoader";
import { canceledOrdersLoader } from "./Loaders/canceledOrdersLoader";
// import { editProfileAction } from "./Actions/editProfileAction";
// کامپوننت های MyProfile

// کامپوننت های قسمت میانی Theuser
import RahnemayehSite from "./Components/main/MiddlePlaceComponenets/right-userMenu/rahnemayeh-site/RahnemayehSite";
import Market from "./Components/main/MiddlePlaceComponenets/right-userMenu/market/Market";
import MineMarket from "./Components/main/MiddlePlaceComponenets/right-userMenu/mineMarket/MineMarket";
import Gavanin from "./Components/main/MiddlePlaceComponenets/right-userMenu/gavanin/Gavanin";
import Mahdodiatha from "./Components/main/MiddlePlaceComponenets/right-userMenu/mahdodiatha/Mahdodiatha";
import EtebarehTejary from "./Components/main/MiddlePlaceComponenets/right-userMenu/etebareh tejary/EtebarehTejary";
import Settings from "./Components/main/MiddlePlaceComponenets/right-userMenu/settingss/Settings";
import Hamkary from "./Components/main/MiddlePlaceComponenets/right-userMenu/hamkary/Hamkary";
import MyProfile from "./Components/main/MiddlePlaceComponenets/right-userMenu/MyProfile/MyProfile";
// کامپوننت های قسمت میانی Theuser

// CONTEXT بولد شدن ساید بار سمت چپ
import { ActiveSectionProvider } from "./Components/contexts/ActiveSectionContext";
// CONTEXT بولد شدن ساید بار سمت چپ

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const userMenuPaths = '/TheUserPage/:userId/main/userMenu/'

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Welcome />,
      errorElement: <ErrorPage />
    },
    {
      path: '/theme-mood-third-page',
      element: < ThemeMood />
    },
    {
      path: '/MyInput',
      element: < MyInput />,
    },
    {
      path: '/MyInput/:userId/userName',
      element: < MyInput />,
    },
    {
      path: '/signUP',
      element: <SignUp /> ,
      loader : usersLoader
    },
    {
      path: '/TheUserPage/:userId/main',
      element: <TheUser />,
      children: [
        {
          path: `${userMenuPaths}rahnemayeh-site`,
          element: <RahnemayehSite />
        },

        {
          path: `${userMenuPaths}market`,
          element: <Market />
        },

        {
          path: `${userMenuPaths}mine-market`,
          element: <MineMarket />,
          loader: mineMarketLoader,
          action: storeAction,
          // fetcher.submit می‌تونه با پارامتر action، درخواست رو به هر 
          // route دیگه‌ای (نه فقط route فعلی) بفرسته. برای همین یه route
          //  جدید ساختیم که هیچ elementی نداره
          //  (پس هیچ‌وقت چیزی رو صفحه رندر نمی‌کنه)، فقط یه action داره — 
          // این الگوی رایجیه به اسم resource route.
          children: [
            {
              path: `${userMenuPaths}mine-market/products`,
              action: productAction,   // ← resource route؛ بدون element، فقط برای اکشن محصولات
            }
          ]
        },
        {
          path: `${userMenuPaths}Gavanin`,
          element: <Gavanin />
        },
        {
          path: `${userMenuPaths}Mahdodiatha`,
          element: <Mahdodiatha />
        },

        {
          path: `${userMenuPaths}EtebarehTejary`,
          element: <EtebarehTejary />
        },

        {
          path: `${userMenuPaths}Settings`,
          element: <Settings />
        },

        {
          path: `${userMenuPaths}Hamkary`,
          element: <Hamkary />
        },

        {
          path: `${userMenuPaths}MyProfile`,
          element: <MyProfile />,
          loader: profileLoader,
          children: [
            {
              path: `${userMenuPaths}MyProfile/edit`,
              element: <EditMyProfile />,
              loader: profileLoader,        // برای پر کردن فرم با اطلاعات فعلی
              action: editProfileAction,    // برای ساب‌میت فرم ویرایش
            },
            {
              path: `${userMenuPaths}MyProfile/MyOrders`,
              element: <MyOrders />,
              loader: ordersLoaderCounting,
              children: [
                {
                  path: `${userMenuPaths}MyProfile/MyOrders/deliveredOrders`,
                  element: <DeliveredOrders />,
                  loader: deliveredOrdersLoader,
                },
                {
                  path: `${userMenuPaths}MyProfile/MyOrders/returnedOrders`,
                  element: <ReturnedOrders />,
                  loader: returnedOrdersLoader,
                },
                {
                  path: `${userMenuPaths}MyProfile/MyOrders/canceledOrders`,
                  element: <CanceledOrders />,
                  loader: canceledOrdersLoader,
                },
                {
                  index: true,
                  element: <MyCurrentOrders />,
                  loader: currentOrdersLoader,
                }
              ]
            },
            {
              path: `${userMenuPaths}MyProfile/MyLists`,
              element: <MyLists />,
              loader: listsLoader,
            },
            {
              index: true,
              element: <SummaryOfActivities />,
              loader: ordersLoaderCounting,
            }
          ]
        },

        { index: true, element: <Index /> },
      ],
    }
  ]);

  return (
    <ActiveSectionProvider>
      <RouterProvider router={router} />
    </ActiveSectionProvider>
  )

}

export default App