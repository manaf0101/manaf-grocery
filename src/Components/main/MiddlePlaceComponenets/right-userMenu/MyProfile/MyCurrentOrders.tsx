

function MyCurrentOrders() {
    return (
        <>
        <section className="flex flex-col h-fit w-full  dark:text-white">
            {/* متن سفارش های جاری */}
            <div className="flex flex-col w-full h-full justify-center items-center ">
                <div className="border-b-2 border-blue-500 font-bold">سفارش های جاری</div>
            </div>
            {/* متن سفارش های جاری */}

            {/* تصویر هنوز سفارشی ندارید */}
            <div className="flex flex-col w-full h-full justify-center items-center ">
                <div className="w-1/2 h-1/2">
                    <img src="/pictures/document-list.svg" alt="هنوز سفارشی ندارید" className="w-full h-full object-contain" />
                </div>
                <p className="text-gray-400 text-lg">هنوز سفارشی ندارید</p>
            </div>
            {/* تصویر هنوز سفارشی ندارید */}
        </section>      
        </>
    )
}


export default MyCurrentOrders