import CategorySlider from "./CategorySlider"

function Category () {
    
    return (
        <>
        <section className="mt-5 dark:bg-slate-950">
            {/* نوشته ی خرید بر اساس دسته بندی */}
            <div className="flex justify-center items-center">خرید براساس دسته بندی</div>
            {/* نوشته ی خرید بر اساس دسته بندی */}

            {/* دسته بندی ها - اسلایدر */}
            <div className="pr-10 pl-10 mt-6">
                <CategorySlider />
            </div>
            {/* دسته بندی ها - اسلایدر */}
        </section>
        </>
    )
}

export default Category