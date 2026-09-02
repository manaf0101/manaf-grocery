import { useLoaderData } from "react-router-dom"
import { FaChevronLeft, FaFileInvoice, FaUndoAlt, FaHourglassHalf, FaQuestionCircle } from "react-icons/fa"

interface Order {
    _id: string
    orderCode: string
    orderDate: string
    totalPrice: number
    productImage?: string
    invoiceUrl?: string
    processStatus: 'unknown' | 'in-progress' | 'completed'
}

function toPersianDigits(num: number | string): string {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/[0-9]/g, (digit) => persianDigits[Number(digit)]);
}

function formatOrderDate(isoDate: string) {
    return new Date(isoDate).toLocaleDateString('fa-IR')
}

// آیکون بر اساس مرحله‌ی پردازش سفارش مرجوع‌شده، به‌صورت داینامیک انتخاب می‌شود
function getProcessIcon(processStatus: Order['processStatus']) {
    switch (processStatus) {
        case 'completed':
            return <FaUndoAlt className="text-orange-500" title="مرجوع شد" />
        case 'in-progress':
            return <FaHourglassHalf className="text-yellow-500" title="در حال انجام" />
        default:
            return <FaQuestionCircle className="text-gray-400" title="نامشخص" />
    }
}

function ReturnedOrders() {
    const orders = useLoaderData() as Order[]

    return (
        <>
            <section className="flex flex-col h-fit w-full dark:text-white">
                <div className="flex flex-col w-full h-full justify-center items-center ">
                    <div className="border-b-2 border-blue-500 font-bold">سفارش های مرجوع شده</div>
                </div>

                {orders && orders.length > 0 ? (
                    <div className="flex flex-col w-full gap-4 mt-4">
                        {orders.map((order, index) => (
                            <div key={order._id} className="border rounded-md p-3 flex flex-col gap-3">

                                <div className="flex justify-between items-start text-sm">
                                    <div className="flex flex-col lg:flex-row gap-3">
                                        <p className="font-bold flex items-center gap-2">
                                            سفارش {toPersianDigits(index + 1)} از {toPersianDigits(orders.length)}
                                            {getProcessIcon(order.processStatus)}
                                        </p>
                                        <span className="text-gray-200 lg:flex lg:flex-row gap-1">
                                            تاریخ مرجوعی: <span className="text-gray-400">{formatOrderDate(order.orderDate)}</span>
                                        </span>
                                        <span className="text-gray-200 lg:flex lg:flex-row gap-1">
                                            کد سفارش: <span className="text-gray-400">{order.orderCode}</span>
                                        </span>
                                        <span className="text-gray-200 lg:flex lg:flex-row gap-1">
                                            مبلغ: <span className="text-gray-400">{toPersianDigits(order.totalPrice.toLocaleString())} تومان</span>
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1 cursor-pointer text-blue-500 hover:text-blue-600 shrink-0">
                                        <span className="text-xs">نمایش جزئیات</span>
                                        <FaChevronLeft className="size-3" />
                                    </div>
                                </div>

                                <div className="flex justify-center items-center w-full h-32">
                                    <img
                                        src={order.productImage || "/pictures/document-list.svg"}
                                        alt="تصویر محصول"
                                        className="h-full object-contain"
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-2 cursor-pointer text-gray-500 hover:text-black dark:hover:text-white">
                                    <FaFileInvoice />
                                    <span className="text-sm">نمایش فاکتور</span>
                                </div>

                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col w-full h-full justify-center items-center ">
                        <div className="w-1/2 h-1/2">
                            <img src="/pictures/document-list.svg" alt="سفارش مرجوعی ندارید" className="w-full h-full object-contain" />
                        </div>
                        <p className="text-gray-400 text-lg">هیچ سفارش مرجوع‌شده‌ای ندارید</p>
                    </div>
                )}
            </section>
        </>
    )
}

export default ReturnedOrders