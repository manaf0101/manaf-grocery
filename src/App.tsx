import Welcome from "./Components/Welcome";
import ErrorPage from "./Components/ErrorPage";
import ThemeMood from "./Components/ThemeMood";
import MyInput from "./Components/MyInput";
import TheUser from "./Components/TheUser";
import SignUp from "./Components/SignUp";
import Index from "./Components/main/MiddlePlaceComponenets/Index";

// کامپوننت های قسمت میانی Theuser
import RahnemayehSite from "./Components/main/MiddlePlaceComponenets/right-userMenu/rahnemayeh-site/RahnemayehSite";
import Market      from "./Components/main/MiddlePlaceComponenets/right-userMenu/market/Market";
import Ettehadieh     from "./Components/main/MiddlePlaceComponenets/right-userMenu/mineMarket/MineMarket";
import Gavanin        from "./Components/main/MiddlePlaceComponenets/right-userMenu/gavanin/Gavanin";
import Mahdodiatha    from "./Components/main/MiddlePlaceComponenets/right-userMenu/mahdodiatha/Mahdodiatha";
import EtebarehTejary from "./Components/main/MiddlePlaceComponenets/right-userMenu/etebareh tejary/EtebarehTejary";
import Settings       from "./Components/main/MiddlePlaceComponenets/right-userMenu/settingss/Settings";
import Hamkary        from "./Components/main/MiddlePlaceComponenets/right-userMenu/hamkary/Hamkary";
// کامپوننت های قسمت میانی Theuser

// CONTEXT بولد شدن ساید بار سمت چپ
import { ActiveSectionProvider } from "./Components/contexts/ActiveSectionContext";
// CONTEXT بولد شدن ساید بار سمت چپ


import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

function App () { 
  const userMenuPaths = '/TheUserPage/:userId/main/userMenu/'

    const router =  createBrowserRouter([
        {
          path: "/",
          element: <Welcome /> , 
          errorElement: <ErrorPage />
        },
        {
          path : '/theme-mood-third-page' , 
          element : < ThemeMood/>
        } ,
       {
        path : '/MyInput' , 
        element : < MyInput />,
        } ,
        // {
        //   path : '/MyInput/:userId/userName',
        //   element : <MyInputuserName />
        // } ,
        {
          path : '/signUP' ,
          element : <SignUp /> 
        } ,
        {
          path : '/TheUserPage/:userId/main',
          element : <TheUser />,
          children : [
            {
          path :`${userMenuPaths}rahnemayeh-site`,
          element : <RahnemayehSite />
            },

            {
            path : `${userMenuPaths}market` ,
            element : <Market />
            },

            {
            path : `${userMenuPaths}mine-market`,
            element : <Ettehadieh /> 
            },
            {
              path : `${userMenuPaths}Gavanin`,
              element : <Gavanin />
            } ,
            {
              path : `${userMenuPaths}Mahdodiatha`,
              element : <Mahdodiatha />
            },

            {
              path : `${userMenuPaths}EtebarehTejary`,
              element : <EtebarehTejary />
            },

            {
              path : `${userMenuPaths}Settings`,
              element : <Settings />
            },

            {
              path : `${userMenuPaths}Hamkary` ,
              element : <Hamkary />
            } ,

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