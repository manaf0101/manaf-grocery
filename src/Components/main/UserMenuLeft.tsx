

function UserMenuLeft() {
return (
    <>
        <div className= " sticky top-10 h-auto dark:bg-slate-950">
           <div className="h-[calc(100vh-5rem)]">
            <aside className="h-fit pl-8 dark:bg-slate-950" style={{fontFamily : 'VAZIR'}}>
             <div className="h-screen overflow-y-scroll  scrollbar-thin dark:scrollbar-thumb-slate-700 scrollbar-thumb-slate-400 scrollbar-track-rounded-full scrollbar-thumb-rounded-full dark:scrollbar-track-slate-400 scrollbar-track-slate-200 pt-3 pb-3">
                {/*نوشته و سرتیتر  : در این صفحه*/}    
                <div className="grid grid-cols-1 cursor-pointer">
                    <p className="flex justify-start items-center col-start-1 col-span-1 pr-2 dark:text-white">
                        در این صفحه
                    </p>
                 </div>
                {/*نوشته و سرتیتر  : در این صفحه*/}  
              {/* لیست منو */}
              <ul className="grid grid-rows-8 cursor-pointer text-stone-400 mt-2 mr-2 ">
                    <li className="row-start-1 row-span-1 border-l-2 pl-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white">راهنمای سایت</li>
                    <li className="row-start-2 row-span-1 border-l-2 pl-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white">مستندات</li>
                    <li className="row-start-3 row-span-1 border-l-2 pl-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white">اتحادیه</li>
                    <li className="row-start-4 row-span-1 border-l-2 pl-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white">قوانین و مقررات</li>
                    <li className="row-start-5 row-span-1 border-l-2 pl-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white">محدودیت ها</li>
                    <li className="row-start-6 row-span-1 border-l-2 pl-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white">اعتبار تجاری</li>
                    <li className="row-start-7 row-span-1 border-l-2 pl-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white">تنظیمات</li>
                    <li className="row-start-8 row-span-1 border-l-2 pl-3 pb-2 pt-2 dark:border-stone-600 hover:text-stone-800 dark:hover:text-white hover:border-stone-800 hover:dark:border-white">درخواست همکاری</li>
                </ul>
              {/* لیست منو */}  
             </div>
             </aside>
           </div>
        </div>
    </>
)
}


export default UserMenuLeft