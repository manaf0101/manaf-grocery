import { useLoaderData } from "react-router-dom"
import { FaChevronLeft, FaFileInvoice } from "react-icons/fa"

interface Order {
    _id: string
    orderCode: string
    orderDate: string
    totalPrice: number
    productImage?: string
    invoiceUrl?: string
}

// برای فارسی نمایش دادن اعداد
function toPersianDigits(num: number | string): string {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/[0-9]/g, (digit) => persianDigits[Number(digit)]);
}
// برای فارسی نمایش دادن اعداد

// تبدیل تاریخ ISO دریافتی از سرور به فرمت قابل‌خواندن فارسی
function formatOrderDate(isoDate: string) {
    return new Date(isoDate).toLocaleDateString('fa-IR')
}
// تبدیل تاریخ ISO دریافتی از سرور به فرمت قابل‌خواندن فارسی

function MyCurrentOrders() {
    const orders = useLoaderData() as Order[]

    return (
        <>
            <section className="flex flex-col h-fit w-full dark:text-white">
                {/* متن سفارش های جاری */}
                <div className="flex flex-col w-full h-full justify-center items-center ">
                    <div className="border-b-2 border-blue-500 font-bold">سفارش های جاری</div>
                </div>
                {/* متن سفارش های جاری */}

                {orders && orders.length > 0 ? (
                    // لیست سفارش‌های جاری
                    <div className="flex flex-col w-full gap-4 mt-4">
                        {orders.map((order, index) => (
                            <div key={order._id} className="border rounded-md p-3 flex flex-col gap-3">

                                {/* هدر: اطلاعات سفارش + نمایش جزئیات */}
                                <div className="flex justify-between items-start text-sm">
                                    <div className="flex flex-col lg:flex-row gap-3">
                                        <p className="font-bold">
                                            سفارش {toPersianDigits(index + 1)} از {toPersianDigits(orders.length)}
                                        </p>
                                        <p className="text-gray-200 lg:flex lg:flex-row gap-1">تاریخ:<p className="text-gray-400">{formatOrderDate(order.orderDate)}</p></p>
                                        <p className="text-gray-200 lg:flex lg:flex-row gap-1">کد سفارش:<p className="text-gray-400">{order.orderCode}</p></p>
                                        <p className="text-gray-200 lg:flex lg:flex-row gap-1">
                                            مبلغ:<p className="text-gray-400">{toPersianDigits(order.totalPrice.toLocaleString())} تومان</p> 
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1 cursor-pointer text-blue-500 hover:text-blue-600 shrink-0">
                                        <span className="text-xs">نمایش جزئیات</span>
                                        <FaChevronLeft className="size-3" />
                                    </div>
                                </div>

                                {/* تصویر محصول */}
                                <div className="flex justify-center items-center w-full h-32">
                                    <img
                                        src={order.productImage || "/pictures/document-list.svg"}
                                        alt="تصویر محصول"
                                        className="h-full object-contain"
                                    />
                                </div>

                                {/* نمایش فاکتور */}
                                <div className="flex items-center justify-end gap-2 cursor-pointer text-gray-500 hover:text-black dark:hover:text-white">
                                    <FaFileInvoice />
                                    <span className="text-sm">نمایش فاکتور</span>
                                </div>

                            </div>
                        ))}
                    </div>
                ) : (
                    // تصویر هنوز سفارشی ندارید
                    <div className="flex flex-col w-full h-full justify-center items-center ">
                        <div className="w-1/2 h-1/2">
                            <img src="/pictures/document-list.svg" alt="هنوز سفارشی ندارید" className="w-full h-full object-contain" />
                        </div>
                        <p className="text-gray-400 text-lg">هنوز سفارشی ندارید</p>
                    </div>
                )}
            </section>
        </>
    )
}

export default MyCurrentOrders