
type Items = {
    children : React.ReactNode ,
    tag : string

}

function Items ({children , tag} : Items) {
    return (
        <>
        <div className="flex flex-col bg-gg-5 dark:bg-slate-800 h-52 p-2">
            <div className="grid grid-rows-2 h-full w-full bg-gg-3 dark:bg-slate-600 rounded-md">
                <div className="row-start-1 flex justify-center items-center dark:text-white">
                {children}
                </div>
                <div className="row-start-2 flex justify-center items-center">
                <p className="text-2xl text-center dark:text-white" style={{fontFamily : 'VAZIR'}}>{tag}</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Items