import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useLoaderData, useFetcher, useParams } from "react-router-dom";


interface CartItem {
    _id: string
    storeName?: string
    productName?: string
    productImage?: string
    quantity?: number
    totalPrice?: number
    sellerDiscountedTotalPrice?: number
}


// هر ردیف سبد خرید، وضعیت خودش (تعداد نمایشی و مودال حذف) رو جدا نگه می‌داره
function CartItemCard({ item }: { item: CartItem }) {

    const { userId } = useParams<{ userId: string }>()
    const deleteFetcher = useFetcher()
    const cartActionPath = `/TheUserPage/${userId}/main/userMenu/UsersCard`

    // این عدد فقط نمایشیه، به سرور فرستاده نمی‌شه
    const [quantity, setQuantity] = useState(item.quantity ?? 1)

    const increase = () => setQuantity((q) => q + 1)
    const decrease = () => setQuantity((q) => Math.max(0, q - 1))

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const askToDelete = () => setShowDeleteModal(true)
    const closeDeleteModal = () => setShowDeleteModal(false)

    const confirmDelete = () => {
        const payload: Record<string, string> = {
            intent: "delete",
            orderId: item._id,
        }

        deleteFetcher.submit(payload, {
            method: "post",
            action: cartActionPath,
            encType: "application/json",
        })
    }

    // بعد از حذف موفق، مودال بسته می‌شه
    // خود لیست چون از همین مسیر (UsersCard) لودر می‌گیره، خودکار دوباره از سرور تازه می‌شه
    useEffect(() => {
        if (deleteFetcher.state === "idle" && deleteFetcher.data?.success) {
            closeDeleteModal()
        }
    }, [deleteFetcher.state, deleteFetcher.data])

    return (
     <>
        <section className="flex flex-row w-full h-auto justify-center items-stretch">
            {/* محصول */}
            <div className="flex flex-col self-stretch rounded-2xl w-3/5 m-2 bg-slate-50">


                <div className="flex flex-row justify-between h-auto sm:flex-1 sm:min-h-0 bg-gray-200 dark:bg-gray-600 rounded-t-2xl p-3 dark:text-white">
                    <div className="flex flex-col gap-3 h-full">
                        <div className="flex flex-row gap-3 items-center">
                            <span className="font-bold">{item.storeName || "غرفه نامشخص"}</span>
                        </div>
                        <span className="text-sm sm:text-lg">هزینه ارسال و زمان تحویل  :   وابسته به آدرس</span>
                    </div>
                </div>


                <div className="flex flex-col sm:flex-row h-auto sm:flex-1 sm:min-h-0 bg-gray-100 dark:bg-gray-500 gap-2 rounded-b-2xl p-3 ">
                    <div className="w-full h-24 sm:w-1/5 sm:h-auto bg-slate-50 rounded-md overflow-hidden">
                        <img
                            src={item.productImage ? `http://localhost:8000${item.productImage}` : ""}
                            alt={item.productName || "محصول"}
                            className="w-full h-full object-cover"
                        />
                    </div>


                    <div className="flex flex-col w-full sm:w-3/5 justify-center gap-2">
                        <div className="font-bold truncate dark:text-slate-100">{item.productName}</div>
                        <div className="flex justify-start items-end">
                            <div className="flex flex-col gap-2 mt-auto w-full sm:w-1/2">
                                <div dir="rtl" className="dark:text-white flex items-center justify-between border rounded-md p-1 dark:border-slate-600 dark:bg-gray-700">
                                    <button
                                        onClick={increase}
                                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700"
                                    >
                                        <FaPlus className="size-3" />
                                    </button>

                                    <span className="text-sm font-bold">{quantity}</span>

                                    <button
                                        onClick={decrease}
                                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700"
                                    >
                                        <FaMinus className="size-3" />
                                    </button>

                                    <button
                                        onClick={askToDelete}
                                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700 text-red-700"
                                    >
                                        <FaTrashAlt className="size-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="flex flex-row sm:flex-col items-end gap-2 justify-end sm:p-3 w-full text-sm lg:text-lg">
                        {/* اگه فروشنده خودش تخفیف گذاشته بود، مجموع قیمت اصلی خط‌خورده می‌شه */}
                        <div className={item.sellerDiscountedTotalPrice ? "line-through text-gray-400" : ""}>
                            {(item.totalPrice ?? 0).toLocaleString()} تومان
                        </div>
                        {item.sellerDiscountedTotalPrice && (
                            <div className="text-green-600 font-bold">
                                {item.sellerDiscountedTotalPrice.toLocaleString()} تومان
                            </div>
                        )}
                    </div>
                </div>



                {/* مودال تایید حذف محصول از سبد خرید */}
                <Modal show={showDeleteModal} onHide={closeDeleteModal} centered>
                    <Modal.Body className="text-center py-4">
                        <p className="mb-0">آیا می‌خواهید محصول از سبد خرید شما حذف شود؟</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeDeleteModal}>انصراف</Button>
                        <Button variant="danger" onClick={confirmDelete} disabled={deleteFetcher.state !== "idle"}>
                            {deleteFetcher.state !== "idle" ? "در حال حذف..." : "تایید"}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* محصول */}


            {/* جزیات */}
            <div className=" flex flex-col justify-between p-3 w-2/5 rounded-2xl m-2 sm:text-lg text-sm bg-gray-100 dark:text-white dark:bg-gray-500 ">
                <div className="w-full flex justify-center items-center mb-3">
                    <span className="font-bold">جزئیات قیمت</span>
                </div>
{/*  */}
                <hr className="dark:text-white mb-3" />
{/*  */}
                <div className="flex flex-row justify-between mb-3">
                    <span>قیمت تمام شده</span>
                    <span>ل تومان</span>
                </div>
{/*  */}
                <hr className="dark:text-white mb-3" />
{/*  */}
                <div className="flex flex-row justify-between mb-3">
                    <span>هزینه ارسال</span>
                    <span className="text-red-500">نامشخص</span>
                </div>
{/*  */}
                <hr className="dark:text-white mb-3" />
{/*  */}
                <div className="flex justify-center items-start   ">
                    <Button variant="danger">تایید و ادامه</Button>
                </div>
            </div>
            {/* جزیات */}


        </section>
        <hr className="mb-2 mt-2 dark:text-white" />
     </>
    )
}


function UsersCard() {

    const cartItems = useLoaderData() as CartItem[]

    return (
        <section className="flex flex-col p-3">

            <div className="flex pr-3 pl-3 pt-3 text-black">
                <span className="border-b-4 rounded-sm border-red-600 dark:border-blue-600 dark:text-white">سبد خرید</span>
            </div>

            <hr className="mb-3 mt-3 dark:text-blue-400" />

            {cartItems.length === 0 ? (
                <p className="text-gray-400 text-center py-10">سبد خرید شما خالی است</p>
            ) : (
                <>
                    <div className="flex flex-col w-full h-auto">
                        {cartItems.map((item) => (
                            <CartItemCard key={item._id} item={item} />
                        ))}
                    </div>
                </>
            )}
        </section>
    )
}


export default UsersCard