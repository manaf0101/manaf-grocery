import { useState , useEffect } from "react"

function useDarkMood () {

   const render = window.localStorage.getItem('theme')
    
   const [theme , setTheme]  =  useState<any>(() => {
      if (render) {
         return render
      } else {
         return 'light'
      }
   })
   


   useEffect(() => {
 //.......... استفاده از کلید window جهت ارتباط بین صفحات نرم افزار می باشد .
      window.addEventListener('storage' , (e) => {
         const render = window.localStorage.getItem('theme')
         if (e.key === 'theme' ) {
            setTheme(render)
            // بررسی می کند اگر رندر برابر با دارک بود ، به تگ اچ تی ام ال کلاس دارک خواهد داد.
               document.documentElement.classList.toggle('dark', render === 'dark');
            // بررسی می کند اگر رندر برابر با دارک بود ، به تگ اچ تی ام ال کلاس دارک خواهد داد.
         }
      }) 
   }  , [theme])

   return [theme] 
}



export default useDarkMood