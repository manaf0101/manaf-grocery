import Welcome from "./Components/Welcome";
import ErrorPage from "./Components/ErrorPage";
import ThemeMood from "./Components/ThemeMood";
import MyInput from "./Components/MyInput";
import TheUser from "./Components/TheUser";
import SignUp from "./Components/SignUp";
import Index from "./Components/main/MiddlePlaceComponenets/Index";

// کامپوننت های قسمت میانی Theuser
import RahnemayehSite from "./Components/main/MiddlePlaceComponenets/right-userMenu/rahnemayeh-site/RahnemayehSite";
import Documents      from "./Components/main/MiddlePlaceComponenets/right-userMenu/documentss/Documents";
import Ettehadieh     from "./Components/main/MiddlePlaceComponenets/right-userMenu/ettehadieh/Ettehadieh";
import Gavanin        from "./Components/main/MiddlePlaceComponenets/right-userMenu/gavanin/Gavanin";
import Mahdodiatha    from "./Components/main/MiddlePlaceComponenets/right-userMenu/mahdodiatha/Mahdodiatha";
import EtebarehTejary from "./Components/main/MiddlePlaceComponenets/right-userMenu/etebareh tejary/EtebarehTejary";
import Settings       from "./Components/main/MiddlePlaceComponenets/right-userMenu/settingss/Settings";
import Hamkary        from "./Components/main/MiddlePlaceComponenets/right-userMenu/hamkary/Hamkary";
// کامپوننت های قسمت میانی Theuser


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
            path : `${userMenuPaths}documents` ,
            element : <Documents />
            },

            {
            path : `${userMenuPaths}ettehadieh`,
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
        <RouterProvider router={router} />
    )
   
}

export default App