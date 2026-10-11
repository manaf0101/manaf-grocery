import { useLoaderData, useNavigation } from "react-router-dom"
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaQuoteRight, FaIdBadge } from "react-icons/fa"
import { ProductTile, product } from "./suggestions/ProductCard"

// شکل داده‌ای که از سرور برمی‌گرده
interface ContactInfo {
    phone1?: string
    phone2?: string
    email?: string
    address?: string
}

interface StoreData {
    storeName?: string
    sellerID?: string
    username?: string
    welcomeMessage?: string
    contactInfo?: ContactInfo
    userProfileImage?: string
}

// محصول خام همون‌طور که از دیتابیس برمی‌گرده (imageUrl نه image)
type RawProduct = {
    _id: string
    sellerId?: string
    tag?: string
    name: string
    price: number
    discountPrice?: number
    description?: string
    imageUrl?: string
}

function SellerMarket() {

    const { store, products } = useLoaderData() as { store: StoreData; products: RawProduct[] }

    // دقیقا همون الگوی تبدیل عکس که تو AllProducts.tsx استفاده کردیم،
    // اینجا هم عیناً تکرار شد تا ProductTile همون شکل همیشگی داده رو بگیره
    const mappedProducts: product[] = (products ?? []).map((item) => {
        const image = item.imageUrl?.startsWith("http")
            ? item.imageUrl
            : item.imageUrl
                ? `http://localhost:8000${item.imageUrl}`
                : "/pictures/document-list.svg"

        return {
            ...item,
            image,
            sellerId: item.sellerId ?? "",
        }
    })

    const avatarSrc = store?.userProfileImage
        ? `http://localhost:8000${store.userProfileImage}`
        : "/pictures/icon-7797704_1280.png"

    const navigation = useNavigation()
    const isLoaded = navigation.state === "idle"

    // اگه فروشگاهی با این username پیدا نشده باشه
    if (!store?.storeName) {
        return (
            <section className="flex flex-col items-center justify-center min-h-[60vh] gap-2 dark:bg-slate-950 dark:text-white">
                <p className="text-gray-400 text-lg">فروشگاهی با این نام پیدا نشد</p>
            </section>
        )
    }

    return (
        <section className="flex flex-col gap-8 p-3 sm:p-6 dark:bg-slate-950 dark:text-white min-h-screen">

            {/* کارت پروفایل غرفه */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm">

                {/* نوار رنگی بالای کارت، فقط جنبه‌ی تزئینی داره */}
                <div className="h-16 sm:h-20 bg-gradient-to-l from-blue-200 to-blue-400 dark:from-slate-800 dark:to-slate-700" />

                <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4 sm:gap-5 px-4 sm:px-5 pb-4 sm:pb-6 -mt-8 sm:-mt-10">

                    {/* عکس پروفایل غرفه */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 bg-gray-100 dark:bg-slate-700 shrink-0 shadow-md">
                        <img src={avatarSrc} alt={store.username} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex flex-col gap-3 w-full text-center sm:text-start">

                        {/* نام غرفه و نام کاربری */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 sm:flex-wrap">
                            <h2 className="text-lg sm:text-xl font-bold" style={{ fontFamily: 'VAZIR' }}>{store.storeName}</h2>
                            <span className="text-xs sm:text-sm text-stone-400">@{store.username}</span>

                            {/* کد فروشنده؛ فعلاً فقط نمایشیه، بعداً قراره قسمت معرفی از همینجا توسعه پیدا کنه */}
                            {store.sellerID && (
                                <span className="flex items-center justify-center sm:justify-start gap-1 text-xs font-bold bg-blue-50 text-blue-700 dark:bg-slate-800 dark:text-blue-300 px-2 py-1 rounded-full">
                                    <FaIdBadge className="size-3" />
                                    {store.sellerID}
                                </span>
                            )}
                        </div>

                        {/* پیام خوش‌آمدگویی فروشنده */}
                        {store.welcomeMessage && (
                            <div className="flex gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-800 rounded-md p-2 sm:p-3">
                                <FaQuoteRight className="size-3 sm:size-4 mt-0.5 text-blue-400 shrink-0" />
                                <p className="line-clamp-3">{store.welcomeMessage}</p>
                            </div>
                        )}

                        {/* اطلاعات تماس */}
                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-stone-500 dark:text-stone-300">
                            {store.contactInfo?.phone1 && (
                                <span className="flex items-center justify-center sm:justify-start gap-1 truncate">
                                    <FaPhoneAlt className="size-3 shrink-0" />
                                    <span className="truncate">{store.contactInfo.phone1}</span>
                                </span>
                            )}
                            {store.contactInfo?.email && (
                                <span className="flex items-center justify-center sm:justify-start gap-1 truncate">
                                    <FaEnvelope className="size-3 shrink-0" />
                                    <span className="truncate">{store.contactInfo.email}</span>
                                </span>
                            )}
                            {store.contactInfo?.address && (
                                <span className="flex items-center justify-center sm:justify-start gap-1 truncate">
                                    <FaMapMarkerAlt className="size-3 shrink-0" />
                                    <span className="truncate">{store.contactInfo.address}</span>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* کارت پروفایل غرفه */}

            <hr className="dark:text-blue-400" />

            {/* محصولات این فروشگاه */}
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold border-b-2 border-blue-500 w-fit pb-1">محصولات این فروشگاه</h3>

                {mappedProducts.length > 0 ? (
                    <div className="flex justify-center flex-wrap gap-4">
                        {mappedProducts.map((item) => (
                            // دقیقا همون ProductTile که تو AllProducts هم استفاده شد: سبد خرید، فاکتور، کد تخفیف، همه یکسان
                            <ProductTile key={item._id} product={item} isLoaded={isLoaded} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-center py-10">این فروشگاه هنوز محصولی اضافه نکرده است</p>
                )}
            </div>
            {/* محصولات این فروشگاه */}

        </section>
    )
}

export default SellerMarket