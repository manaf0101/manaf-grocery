import { useLoaderData, Outlet, useParams, useNavigate, useNavigation } from "react-router-dom"

interface OrdersSummary {
    current: number
    delivered: number
    returned: number
    canceled: number
}

function MyOrders() {

    function toPersianDigits(num: number | string): string {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return num.toString().replace(/[0-9]/g, (digit) => persianDigits[Number(digit)]);
    }

    const orderCounts = useLoaderData() as OrdersSummary

    const { userId } = useParams();
    const navigate = useNavigate();
    const mainLocation = `/TheUserPage/${userId}/main/userMenu/MyProfile/MyOrders`
    const deliveredOrdersPath = `/TheUserPage/${userId}/main/userMenu/MyProfile/MyOrders/deliveredOrders`
    const returnedOrdersPath = `/TheUserPage/${userId}/main/userMenu/MyProfile/MyOrders/returnedOrders`
    const canceledOrdersPath = `/TheUserPage/${userId}/main/userMenu/MyProfile/MyOrders/canceledOrders`


    const navigation = useNavigation()
    const isLoading = navigation.state === "loading"


    return (
        <>
            <div className="flex flex-col w-full gap-4 dark:text-white">
                <div className="flex w-full justify-start ">
                    <p className="border-b-2 border-blue-500 font-bold">سفارش های من</p>
                </div>
                <div className="grid w-full grid-cols-4 gap-4">
                    {/* firt-جاری */}
                    <div
                        onClick={() => navigate(mainLocation)}
                        className="flex flex-col lg:flex-row gap-2 items-center border-l hover:cursor-pointer">
                        <div
                            className="relative w-10 h-10 overflow-hidden lg:w-16 lg:h-16"
                            style={{ backgroundImage: "url('/pictures/Cloud-Icon.svg')", backgroundOrigin: 'border-box', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                        >
                            <div className="lg:hidden absolute flex justify-center items-center bottom-0 left-0 w-3 h-3 bg-gray-300 dark:bg-gray-500 rounded-sm">
                                <p>{toPersianDigits(orderCounts.current)}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="hidden lg:grid"><span className="text-red-400">{toPersianDigits(orderCounts.current)}</span><p className="font-bold">سفارش</p></div>
                            <div><p className="text-sm">جاری</p></div>
                        </div>
                    </div>
                    {/* firt-جاری */}

                    {/* seconed-تحویل شده */}
                    <div
                        onClick={() => navigate(deliveredOrdersPath)}
                        className="flex flex-col lg:flex-row gap-2 items-center border-l hover:cursor-pointer">
                        <div
                            className="relative w-10 h-10 overflow-hidden lg:w-16 lg:h-16"
                            style={{ backgroundImage: "url('/pictures/temp_icon.svg')", backgroundOrigin: 'border-box', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                        >
                            <div className="lg:hidden absolute flex justify-center items-center bottom-0 left-0 w-3 h-3 bg-gray-300 dark:bg-gray-500 rounded-sm">
                                <p>{toPersianDigits(orderCounts.delivered)}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="hidden lg:grid"><span className="text-red-400">{toPersianDigits(orderCounts.delivered)}</span> <p className="font-bold">سفارش</p></div>
                            <div ><p className="text-sm">تحویل شده</p></div>
                        </div>
                    </div>
                    {/* seconed-تحویل شده */}

                    {/* third-مرجوع شده */}
                    <div
                        onClick={() => navigate(returnedOrdersPath)}
                        className="flex flex-col lg:flex-row gap-2 items-center border-l hover:cursor-pointer">
                        <div
                            className="relative w-10 h-10 overflow-hidden lg:w-16 lg:h-16"
                            style={{ backgroundImage: "url('/pictures/return-bag 1.svg')", backgroundOrigin: 'border-box', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                        >
                            <div className="lg:hidden absolute flex justify-center items-center bottom-0 left-0 w-3 h-3 bg-gray-300 dark:bg-gray-500 rounded-sm">
                                <p>{toPersianDigits(orderCounts.returned)}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="hidden lg:grid"><span className="text-red-400">{toPersianDigits(orderCounts.returned)}</span> <p className="font-bold">سفارش</p></div>
                            <div ><p className="text-sm">مرجوع شده</p></div>
                        </div>
                    </div>
                    {/* third-مرجوع شده */}

                    {/* forth-لغو شده */}
                    <div
                        onClick={() => navigate(canceledOrdersPath)}
                        className="flex flex-col lg:flex-row gap-2 items-center hover:cursor-pointer">
                        <div
                            className="relative w-10 h-10 overflow-hidden lg:w-16 lg:h-16"
                            style={{ backgroundImage: "url('/pictures/cancel.svg')", backgroundOrigin: 'border-box', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                        >
                            <div className="lg:hidden absolute flex justify-center items-center bottom-0 left-0 w-3 h-3 bg-gray-300 dark:bg-gray-500 rounded-sm">
                                <p>{toPersianDigits(orderCounts.canceled)}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="hidden lg:grid"><span className="text-red-400">{toPersianDigits(orderCounts.canceled)}</span> <p className="font-bold">سفارش</p></div>
                            <div><p className="text-sm">لغو شده</p></div>
                        </div>
                    </div>
                    {/* forth-لغو شده */}
                </div>

                <div className="flex w-full min-h-[300px]">
                    {isLoading ? (
                        <div className="flex w-full h-full items-center justify-center">
                            <span className="text-gray-400 text-xl animate-pulse">...</span>
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </div>
            </div>
        </>
    )
}

export default MyOrders