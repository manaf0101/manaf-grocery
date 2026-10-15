import { useEffect, useRef, useState } from "react"

import { useFetcher, useNavigate, useParams } from "react-router-dom"

import { FaTimes } from "react-icons/fa"

// شکل جوابی که از اندپوینت ترکیبی جستجو برمی‌گرده

interface SearchStoreResult {
    storeName: string
    username: string
    sellerID: string
}

interface SearchProductResult {
    _id: string
    name: string
    price: number
    discountPrice?: number
    imageUrl?: string
    sellerID: string | null   // ممکنه فروشگاه مادرش به هر دلیلی پیدا نشده باشه
}

interface SearchResponse {
    stores: SearchStoreResult[]
    products: SearchProductResult[]
}

function SearchBar() {
    const navigate = useNavigate()

    const { userId } = useParams<{ userId: string }>()

    // fetcher.load برای صدا زدن یه resource route که فقط loader داره؛

    // درست همون الگویی که تو این پروژه برای سبد خرید و محصولات هم استفاده شده

    const searchFetcher = useFetcher<SearchResponse>()

    const [query, setQuery] = useState("")

    const [isOpen, setIsOpen] = useState(false)

    // برای تشخیص کلیک بیرون از باکس و بستن خودکار دراپ‌داون

    const wrapperRef = useRef<HTMLDivElement>(null)

    // برای دیبانس: هر تایپ جدید، تایمر قبلی رو پاک می‌کنه و یکی جدید می‌ذاره

    // تا وقتی کاربر پشت سر هم تایپ می‌کنه، درخواست اضافه به سرور نره

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        if (!query.trim()) {
            setIsOpen(false)
            return
        }

        if (debounceRef.current) clearTimeout(debounceRef.current)

        debounceRef.current = setTimeout(() => {
            searchFetcher.load(`/TheUserPage/${userId}/main/userMenu/search?q=${encodeURIComponent(query.trim())}`)
            setIsOpen(true)
        }, 350)

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    // با کلیک روی هر جای بیرون از باکس، دراپ‌داون بسته می‌شه

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") setIsOpen(false)
    }

    const clearQuery = () => {
        setQuery("")
        setIsOpen(false)
    }

    // با کلیک روی یک فروشگاه، مستقیم به صفحه‌ی همون فروشگاه می‌ریم

    // آدرس بر اساس sellerID ساخته می‌شه (همون چیزی که بک‌اند getSellerMarket انتظارش رو داره)

    const goToStore = (sellerID: string) => {
        setIsOpen(false)
        navigate(`/TheUserPage/${userId}/main/userMenu/seller-Market/${sellerID}`)
    }

    // چون هنوز صفحه‌ی اختصاصی برای تک‌محصول نداریم، با کلیک روی یک محصول

    // کاربر رو به فروشگاهِ همون محصول می‌بریم تا از همون‌جا بتونه بخردش

    const goToProduct = (product: SearchProductResult) => {
        if (!product.sellerID) return   // اگه فروشگاه مادرش پیدا نشده بود، کلیک بی‌اثر بمونه

        setIsOpen(false)
        navigate(`/TheUserPage/${userId}/main/userMenu/seller-Market/${product.sellerID}`)
    }

    const results = searchFetcher.data

    const isLoading = searchFetcher.state === "loading"

    const hasAnyResult = !!results && (results.stores.length > 0 || results.products.length > 0)

    return (
        <div ref={wrapperRef} className="relative w-full">

            {/* پیل جستجو: آیکون ذره‌بین + اینپوت + دکمه‌ی پاک‌کردن */}

            <div className="flex w-full items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl transition-colors dark:border-slate-700 dark:bg-slate-900 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">

                {/* ذره بین */}

                <div className="flex h-5 w-5 shrink-0 items-center justify-center text-slate-400 dark:text-slate-400">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 19L14.6569 14.6569M14.6569 14.6569C16.1046 13.2091 17 11.2091 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17C11.2091 17 13.2091 16.1046 14.6569 14.6569Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* ذره بین */}

                <input
                    style={{ fontFamily: 'VAZIR' }}
                    id="search-box"
                    className="w-full border-0 bg-transparent p-0 text-[0.95rem] font-medium leading-6 tracking-[0.01em] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0 dark:text-slate-100 dark:placeholder:text-slate-500"
                    type="text"
                    placeholder="جستجو . . ."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.trim() && setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                />

                {/* دکمه‌ی پاک کردن، فقط وقتی چیزی تایپ شده نمایش داده می‌شه */}

                {query && (
                    <button
                        type="button"
                        onClick={clearQuery}
                        className="shrink-0 rounded-full p-1 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                    >
                        <FaTimes className="size-3" />
                    </button>
                )}
            </div>

            {/* پیل جستجو */}

            {/* دراپ‌داون نتایج */}

            {isOpen && (
                <div
                    className="absolute top-full z-50 mt-2 max-h-96 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white text-slate-800 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:!bg-slate-900 dark:text-slate-100 dark:shadow-black/40"
                    dir="rtl"
                >
                    {isLoading ? (

                        // حالت لودینگ: سه‌نقطه‌ی متحرک، هماهنگ با همون الگویی که تو SelloingPart هم استفاده کردیم

                        <div className="flex justify-center items-center py-6">
                            <span className="flex gap-1">
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                            </span>
                        </div>

                    ) : hasAnyResult ? (
                        <>
                            {/* بخش فروشگاه‌ها */}

                            {results!.stores.length > 0 && (
                                <div className="flex flex-col gap-1 p-2">
                                    <span className="px-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                                        فروشگاه‌ها
                                    </span>

                                    {results!.stores.map((store) => (
                                        <button
                                            key={store.sellerID}
                                            onClick={() => goToStore(store.sellerID)}
                                            className="flex items-center gap-2 rounded-lg bg-transparent p-2 text-right text-slate-700 transition-colors duration-150 hover:!bg-slate-200 hover:!text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-transparent dark:text-slate-200 dark:hover:!bg-slate-700 dark:hover:!text-white dark:focus-visible:ring-blue-400"
                                        >
                                            <span className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">
                                                {store.storeName}
                                            </span>

                                            <span className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                                                @{store.username}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* بخش فروشگاه‌ها */}

                            {results!.stores.length > 0 && results!.products.length > 0 && (
                                <hr className="border-0 border-t border-slate-200 dark:border-slate-700" />
                            )}

                            {/* بخش محصولات */}

                            {results!.products.length > 0 && (
                                <div className="flex flex-col gap-1 p-2">
                                    <span className="px-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                                        محصولات
                                    </span>

                                    {results!.products.map((product) => {
                                        const image = product.imageUrl
                                            ? (product.imageUrl.startsWith("http")
                                                ? product.imageUrl
                                                : `https://manafgrocey-api.onrender.com${product.imageUrl}`)
                                            : "/pictures/document-list.svg"

                                        return (
                                            <button
                                                key={product._id}
                                                onClick={() => goToProduct(product)}
                                                className="flex items-center gap-2 rounded-lg bg-transparent p-2 text-right text-slate-700 transition-colors duration-150 hover:!bg-slate-200 hover:!text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-transparent dark:text-slate-200 dark:hover:!bg-slate-700 dark:hover:!text-white dark:focus-visible:ring-blue-400"
                                            >
                                                <div className="h-9 w-9 shrink-0 overflow-hidden rounded-md bg-slate-100 ring-1 ring-slate-200/70 dark:bg-slate-800 dark:ring-slate-700">
                                                    <img
                                                        src={image}
                                                        alt={product.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>

                                                <span className="flex-1 truncate text-sm font-bold text-slate-800 dark:text-slate-100">
                                                    {product.name}
                                                </span>

                                                <span className="shrink-0 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                                                    {(product.discountPrice ?? product.price).toLocaleString()} تومان
                                                </span>
                                            </button>
                                        )
                                    })}
                                </div>
                            )}

                            {/* بخش محصولات */}
                        </>
                    ) : (
                        <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                            چیزی پیدا نشد
                        </p>
                    )}
                </div>
            )}

            {/* دراپ‌داون نتایج */}
        </div>
    )
}

export default SearchBar