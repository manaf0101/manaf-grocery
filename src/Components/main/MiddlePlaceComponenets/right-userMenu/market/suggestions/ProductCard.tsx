import { useState, useEffect } from "react";
import { useNavigation , useFetcher , useParams} from "react-router-dom";

import { Modal, Button, Spinner } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaShoppingCart, FaPlus, FaMinus, FaTrashAlt, FaTimes } from "react-icons/fa";
import { MdOutlineChevronLeft } from "react-icons/md";

// برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه
import { useActiveSection } from "../../../../../contexts/ActiveSectionContext";
import { useInView } from 'react-intersection-observer'
// برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه

// برای سبد خرید
import { useCart } from "../../../../../contexts/CartContext";


type product = {
    _id: string
    image: string
    name: string
    price: number
    discountPrice?: number
    description?: string
    sellerId?: string
}


type ProductCardProps = {
    products: product[],
    id: string
}


// بیشتر از این تعداد محصول در این بخش نمایش داده نمی‌شود
const MAX_VISIBLE_PRODUCTS = 8


// یک سطر ساده برای نمایش برچسب و مقدار در فاکتور، بدون امکان ویرایش توسط کاربر
function InvoiceRow({ label, value, valueClassName }: { label: string; value: string; valueClassName?: string }) {
    return (
        <div className="flex justify-between items-center">
            <span className={`font-bold text-sm ${valueClassName ?? ''}`}>{value}</span>
            <span className="text-blue-500 text-sm">{label}</span>
        </div>
    )
}


// هر کارت محصول، وضعیت سبد خرید خودش رو جدا از بقیه نگه می‌داره
function ProductTile({ product, isLoaded }: { product: product; isLoaded: boolean }) {


    // جهت پروسه ی افزودن به سبد خرید
    const userDomainId = useParams<{ userId: string }>().userId || '';
    const cartFetcher = useFetcher()
    const { setCartCount } = useCart()
    // مسیر UsersCard، چون action مربوط به سبد خرید همونجا تعریف شده
    const cartActionPath = `/TheUserPage/${userDomainId}/main/userMenu/UsersCard`




    // صفر یعنی هنوز به سبد خرید اضافه نشده
    const [quantity, setQuantity] = useState(0)

    // نمایش مدال فاکتور خرید
    const [showInvoiceModal, setShowInvoiceModal] = useState(false)

    // فیلد کد تخفیف خریدار
    const [couponCode, setCouponCode] = useState("")
    const [couponError, setCouponError] = useState<string | null>(null)
    const [isCheckingCoupon, setIsCheckingCoupon] = useState(false)
    // مبلغی که از طرف کد تخفیف خریدار کسر شده (جدا از تخفیف خود فروشنده)
    const [couponDiscountAmount, setCouponDiscountAmount] = useState(0)




    // اگر تعداد به صفر برسه، کد تخفیف و مبلغ تخفیفش هم پاک می‌شن
    // (دقیقاً همون کاری که دکمه‌ی سطل زباله می‌کنه)
    const decrease = () => {
        setQuantity((q) => {
            const next = Math.max(0, q - 1)
            if (next === 0) {
                setCouponCode('')
                setCouponDiscountAmount(0)
            }
            return next
        })
    }

    const increase = () => setQuantity((q) => q + 1)


    // دکمه ی سطل آشغال
    const clear = () => {
        setQuantity(0)
        setCouponCode('')
        setCouponDiscountAmount(0)
    }

    // با کلیک روی «تایید و ادامه»، مدال فاکتور باز می‌شود
    const confirmAndContinue = () => {
        setShowInvoiceModal(true)
    }

    const closeInvoiceModal = () => {
        setShowInvoiceModal(false)
    }



    // مجموع قیمت پایه، بدون هیچ تخفیفی (همون عدد سیاه ضرب در تعداد)
    const totalPrice = quantity * product.price

    // مجموع قیمت با تخفیف فروشنده (همون عدد سبز)؛ اگر فروشنده تخفیفی نگذاشته باشد، با قیمت پایه یکسان است
    const sellerDiscountedTotal = quantity * (product.discountPrice ?? product.price)

    // بعد از کسر تخفیف کد خریدار از تخفیف فروشنده، مجموع نهایی به دست می‌آید
    const finalDiscountedTotal = Math.max(0, sellerDiscountedTotal - couponDiscountAmount)

    // سود خریدار یعنی اختلاف بین مجموع قیمت پایه و مجموع قیمت نهایی با تخفیف
    const savings = totalPrice - finalDiscountedTotal

    // بررسی کد تخفیف؛ چون قرار است این بخش بعداً به سرور وصل شود،
    // همین الان هم به‌صورت async نوشته شده تا فقط داخلش عوض شود
    const applyCouponCode = async () => {
        if (!couponCode.trim()) return

        setIsCheckingCoupon(true)
        setCouponError(null)

        try {
            // فعلاً به‌جای درخواست واقعی، یک تاخیر کوتاه شبیه‌سازی شده است
            // این بخش بعداً با فراخوانی واقعی سرور جایگزین می‌شود
            await new Promise((resolve) => setTimeout(resolve, 700))

            // کد نمونه برای تست ظاهر؛ در نسخه‌ی واقعی این بررسی سمت سرور انجام می‌شود
            const isValidCode = couponCode.trim().toUpperCase() === "MANAF10"

            if (!isValidCode) {
                setCouponError("کد تخفیف نامعتبر است")
                setCouponDiscountAmount(0)
                return
            }

            // مقدار تخفیف کد، ده درصد از مجموع قیمت با تخفیف فعلی در نظر گرفته شده
            setCouponDiscountAmount(Math.round(sellerDiscountedTotal * 0.1))

        } finally {
            setIsCheckingCoupon(false)
        }
    }

        // پروسه افزودن به سبد خرید 
    const addingToCardProcess = () => {

// اطلاعاتی که باید تو سبد خرید ذخیره بشه؛ فقط همون‌هایی که بدون کد تخفیف خریدار حساب می‌شن
const payload: Record<string, string | number> = {
            intent: "add",
            productId: product._id,
            productName: product.name,
            sellerId: product.sellerId || "",
            quantity: quantity,
            totalPrice: totalPrice,
            sellerDiscountedTotalPrice: sellerDiscountedTotal,
            productImage: product.image,
        }

        cartFetcher.submit(payload, {
            method: "post",
            action: cartActionPath,
            encType: "application/json",
        })

        // بلافاصله عدد بالای آیکون سبد خرید زیاد می‌شه، بدون اینکه منتظر جواب سرور بمونیم
        setCartCount((prev) => prev + quantity)

        setShowInvoiceModal(false)
    }

    return (
        <div className=" w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.7rem)] lg:w-[calc(25%-0.75rem)] border rounded-md p-3 flex flex-col gap-2 dark:bg-slate-800">

            <div className="w-full h-40 rounded-md overflow-hidden bg-gray-100 dark:bg-slate-700">
                {!isLoaded && (
                    <Skeleton
                        className="h-40"
                        borderRadius={8}
                        baseColor="#cdd2db"
                        highlightColor="#f5f5ff"
                    />
                )}

                <img
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? "visible" : "collapse"
                        }`}
                    src={product.image}
                    alt={product.name}
                />
            </div>

            <div className="grid grid-cols-2 gap-1 items-center dark:text-white">
                <p className="font-bold truncate">{product.name}</p>
                <p className="text-sm font-bold text-stone-400 truncate">{product._id}</p>
            </div>

            <div className="flex items-center gap-2">
                {product.discountPrice ? (
                    <>
                        <span className="text-gray-400 text-sm line-through">
                            {product.price.toLocaleString()} تومان
                        </span>
                        <span className="text-green-600 font-bold text-sm">
                            {product.discountPrice.toLocaleString()} تومان
                        </span>
                    </>
                ) : (
                    <span className="font-bold text-sm">
                        {product.price.toLocaleString()} تومان
                    </span>
                )}
            </div>

            {product.description && (
                <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-3">
                    {product.description}
                </p>
            )}

            {quantity === 0 ? (
                // تا وقتی چیزی انتخاب نشده، فقط همین دکمه دیده می‌شود
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => setQuantity(1)}
                        className="flex items-center justify-center gap-1 text-sm rounded-md py-1 mt-auto bg-blue-600 text-white hover:bg-blue-700"
                    >
                        <FaShoppingCart className="size-3" />
                        افزودن به سبد خرید
                    </button>

                    <button className="flex flex-row justify-center items-center text-sm text-blue-700">
                        <span>نمایش جزئیات</span>
                        <MdOutlineChevronLeft />
                    </button>
                </div>
            ) : (
                // بعد از اولین کلیک، دکمه بالا جاش رو به کنترل تعداد می‌ده
                <div className="flex flex-col gap-2 mt-auto">
                    <div dir="rtl" className="flex items-center justify-between border rounded-md p-1 dark:border-slate-600 dark:bg-white">
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
                            onClick={clear}
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700 text-red-500"
                        >
                            <FaTrashAlt className="size-3" />
                        </button>
                    </div>

                    <button
                        onClick={confirmAndContinue}
                        className="text-sm font-bold rounded-md py-1.5 bg-green-600 text-white hover:bg-green-700"
                    >
                        تایید و ادامه
                    </button>

                    <button className="flex flex-row justify-center items-center text-sm edameKharid text-blue-700">
                        <span>نمایش جزئیات</span>
                        <MdOutlineChevronLeft />
                    </button>
                </div>

            )}

            {/* مدال فاکتور خرید */}
            <Modal show={showInvoiceModal} onHide={closeInvoiceModal} centered dialogClassName="invoice-modal">
                <Modal.Body>

                    {/* سربرگ فاکتور: دکمه بستن سمت راست، عنوان سمت چپ */}
                    <div className="flex items-center justify-between mb-3 ">
                        <button onClick={closeInvoiceModal} className="text-stone-400 hover:text-black dark:hover:text-white">
                            <FaTimes className="size-4" />
                        </button>
                        <span className="font-bold">فاکتور خرید</span>
                    </div>
                    <hr className="mb-3 text-red-900" />

                    <div className="flex flex-col gap-3 text-right">

                        {/* این چهار مورد ثابت و غیرقابل‌ویرایش هستند */}
                        <InvoiceRow label="نام محصول" value={product.name} />
                        <hr className="text-red-300" />
                        <InvoiceRow label="کد محصول" value={product._id} />
                        <hr className="text-red-300" />
                        <InvoiceRow label="تعداد" value={quantity.toString()} />
                        <hr className="text-red-300" />
                        <InvoiceRow label="مجموع قیمت" value={`${totalPrice.toLocaleString()} تومان`} />
                        <hr className="text-red-300" />

                        {/* اعمال کد تخفیف خریدار */}
                        <div className="flex flex-col gap-1">
                            <span className="text-stone-400 text-sm">اعمال کد تخفیف</span>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) => { setCouponCode(e.target.value); setCouponError(null) }}
                                    placeholder="کد تخفیف را وارد کنید"
                                    className="flex-1 p-2 border rounded-md dark:bg-slate-800 dark:text-white"
                                />
                                <Button
                                    onClick={applyCouponCode}
                                    variant="primary"
                                    disabled={isCheckingCoupon}
                                >
                                    {isCheckingCoupon ? <Spinner animation="border" size="sm" /> : "تایید"}
                                </Button>
                            </div>
                            {couponError && (
                                <p className="text-red-600 text-xs">{couponError}</p>
                            )}
                            {couponDiscountAmount > 0 && !couponError && (
                                <p className="text-green-600 text-xs">کد تخفیف با موفقیت اعمال شد</p>
                            )}
                        </div>
                        <hr className="text-red-300" />

                        <InvoiceRow label="مجموع قیمت با تخفیف" value={`${finalDiscountedTotal.toLocaleString()} تومان`} />
                        <InvoiceRow
                            label="سود شما از این خرید"
                            value={`+${savings.toLocaleString()} تومان`}
                            valueClassName="text-green-600"
                        />

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeInvoiceModal}>انصراف</Button>
                    <Button variant="primary" onClick={addingToCardProcess} disabled={cartFetcher.state !== "idle"}>
                        {cartFetcher.state !== "idle" ? "در حال ثبت..." : "افزودن به سبد خرید"}
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* مدال فاکتور خرید */}

        </div>
    )
}


const ProductCard = ({ products, id }: ProductCardProps) => {

    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه
    const { setActiveSection } = useActiveSection();
    const { ref, inView } = useInView({ threshold: 0.5 })

    useEffect(() => {
        if (inView) {
            setActiveSection(id)
        }
    }, [id, inView, setActiveSection])
    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه


    // تا وقتی روتر داره اطلاعات همین صفحه رو می‌گیره، اسکلت نمایش داده می‌شه
    const navigation = useNavigation()
    const isLoaded = navigation.state === "idle"


    // فقط هشت محصول اول نشون داده می‌شه، بدون تکرار اولی برای پر کردن جا
    const visibleProducts = products.slice(0, MAX_VISIBLE_PRODUCTS)


    return (
        <>
            {/* استایل دارک‌مود مدال فاکتور خرید */}
            <style>
                {`
                    .dark .invoice-modal .modal-content {
                        background-color: rgb(30 41 59);
                        color: white;
                        border: 1px solid rgb(51 65 85);
                    }
                    .dark .invoice-modal .modal-footer {
                        border-top: 1px solid rgb(51 65 85);
                    }
                `}
            </style>
            {/* استایل دارک‌مود مدال فاکتور خرید */}

            {/* نوشته ی پیشنهادات */}
            <div
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
                className="flex justify-center items-center dark:text-white text-lg mt-4"
                style={{ fontFamily: 'VAZIR' }}
            >
                <p className="bg-gg-5 dark:bg-slate-800 p-2 rounded-md">
                    پیشنهادات
                </p>
            </div>
            {/* نوشته ی پیشنهادات */}

            <section
                id={id}
                ref={ref}
                data-aos-anchor-placement="center-bottom"
                className="gap-4 p-2 sm:p-0 sm:pr-5 sm:pl-5 mt-3 sm:mt-4 h-auto w-auto"
            >
                {visibleProducts.length > 0 ? (
                    <div className="flex justify-center flex-wrap gap-4">
                        {visibleProducts.map((product) => (
                            <ProductTile key={product._id} product={product} isLoaded={isLoaded} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-center py-6">
                        هنوز محصولی وجود ندارد
                    </p>
                )}
            </section>

        </>
    );
};

export default ProductCard;