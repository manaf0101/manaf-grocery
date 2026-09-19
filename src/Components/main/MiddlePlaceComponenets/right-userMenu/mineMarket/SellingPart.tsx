import React, { useState, useRef, useEffect } from "react"
import { Modal, Button, ModalBody, Form, Dropdown } from "react-bootstrap"
import { useLoaderData, useFetcher, useParams } from "react-router-dom"
import { FaPen, FaTag } from "react-icons/fa"
import { IoIosWarning } from "react-icons/io"

interface Product {
    _id: string
    sellerId: string
    tag: string
    name: string
    price: number
    discountPrice?: number
    description: string
    imageUrl: string
}

// برای منوی کشویی محصول
const CustomToggle = React.forwardRef<
    HTMLAnchorElement,
    {
        children: React.ReactNode
        onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
    }
>(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault()
            onClick?.(e)
        }}
        className="flex flex-row items-center text-decoration-none"
    >
        {children}
        <span className="text-sm font-bold text-blue-600 ms-2">▼</span>
    </a>
))

CustomToggle.displayName = "CustomToggle"

const CustomMenu = React.forwardRef<
    HTMLDivElement,
    {
        children?: React.ReactNode
        style?: React.CSSProperties
        className?: string
        "aria-labelledby"?: string
    }
>(({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("")

    const filteredChildren = React.Children.toArray(children).filter((child) => {
        if (!value) return true

        if (React.isValidElement(child)) {
            const text = String(child.props.children ?? "")
            return text.toLowerCase().startsWith(value.toLowerCase())
        }

        return false
    })

    return (
        <div
            ref={ref}
            style={{ ...style, overflowX: 'hidden' }}
            className={`${className ?? ''} category-menu-scroll`}
            aria-labelledby={labeledBy}
        >
            <Form.Control
                autoFocus
                className="category-search-input mx-3 my-2 w-auto"
                placeholder="... جستجوی دسته بندی"
                onChange={(e) => setValue(e.target.value)}
                value={value}
            />
            <ul className="list-unstyled mb-0">
                {filteredChildren}
            </ul>
        </div>
    )
})

CustomMenu.displayName = "CustomMenu"

function SelloingPart() {
    const { products } = useLoaderData() as { store: any; products: Product[] }
    const { userId } = useParams()
    const productFetcher = useFetcher()

    // مسیر resource route که اکشن محصولات به آن وصل است
    const productsActionPath = `/TheUserPage/${userId}/main/userMenu/mine-market/products`

    const [showModal, setShowModal] = useState(false)
    const [deletModal, setDeleteModal] = useState(false)
    const [editingProductId, setEditingProductId] = useState<string | null>(null)

    // فیلدهای فرم داخل مودال
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [showDiscountInput, setShowDiscountInput] = useState(false)
    const [discountPrice, setDiscountPrice] = useState("")
    const [description, setDescription] = useState("")
    const [formError, setFormError] = useState("")
    const [tag, setTag] = useState("")

    const fileInputRef = useRef<HTMLInputElement>(null)

    // وقتی fetcher با موفقیت جواب داد، مودال بسته می‌شود
    // (لیست محصولات خودکار توسط React Router دوباره از لودر گرفته می‌شود)
    useEffect(() => {
        if (productFetcher.state === "idle" && productFetcher.data?.success) {
            setShowModal(false)
            setDeleteModal(false)
            resetForm()
        }
    }, [productFetcher.state, productFetcher.data])

    const resetForm = () => {
        setImageFile(null)
        setImagePreview("")
        setName("")
        setPrice("")
        setShowDiscountInput(false)
        setDiscountPrice("")
        setDescription("")
        setFormError("")
        setTag("")
        setEditingProductId(null)
    }

    const openAddModal = () => {
        resetForm()
        setShowModal(true)
    }

    const openEditModal = (product: Product) => {
        setEditingProductId(product._id)
        setTag(product.tag)
        setImagePreview(product.imageUrl.startsWith('http') ? product.imageUrl : `http://localhost:8000${product.imageUrl}`)
        setImageFile(null)
        setName(product.name)
        setPrice(product.price.toString())

        if (product.discountPrice) {
            setShowDiscountInput(true)
            setDiscountPrice(product.discountPrice.toString())
        } else {
            setShowDiscountInput(false)
            setDiscountPrice("")
        }

        setDescription(product.description)
        setFormError("")
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        resetForm()
    }

    const closeDeleteModal = () => {
        setDeleteModal(false)
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setImageFile(file)
        setImagePreview(URL.createObjectURL(file))
    }

    const pupUpDeletModal = () => {
        setDeleteModal(true)
    }

    // حذف محصول از طریق fetcher (نه state محلی)
    const handleDeletProduct = () => {
        if (!editingProductId) return

        const formData = new FormData()
        formData.append("intent", "delete")
        formData.append("productId", editingProductId)

        productFetcher.submit(formData, {
            method: "post",
            action: productsActionPath,
            encType: "multipart/form-data",
        })
    }

    // ذخیره کردن محصول (افزودن یا ویرایش) از طریق fetcher
    const handleSaveProduct = () => {

        if (!tag) {
            setFormError('انتخاب تگ محصول اجباری است')
            return
        }
        if (!name.trim()) {
            setFormError("نام محصول الزامی است")
            return
        }
        if (!price || isNaN(Number(price))) {
            setFormError("قیمت محصول را به‌درستی وارد کنید")
            return
        }
        if (!imagePreview) {
            setFormError("افزودن عکس محصول الزامی است")
            return
        }

        const formData = new FormData()
        formData.append("intent", editingProductId ? "edit" : "add")
        if (editingProductId) formData.append("productId", editingProductId)
        formData.append("tag", tag)
        formData.append("name", name.trim())
        formData.append("price", price)
        if (showDiscountInput && discountPrice) {
            formData.append("discountPrice", discountPrice)
        }
        formData.append("description", description.trim())
        // فقط اگر کاربر عکس جدیدی انتخاب کرده، فایل واقعی ارسال می‌شود
        if (imageFile) {
            formData.append("productImage", imageFile)
        }

        productFetcher.submit(formData, {
            method: "post",
            action: productsActionPath,
            encType: "multipart/form-data",
        })
    }

    // نمایش سه‌نقطه‌ی متحرک به‌جای گرید محصولات، در حین ارسال یا بازخوانی داده
    const isProductsBusy = productFetcher.state !== "idle"

    return (
        <div className="w-full flex flex-col gap-6 dark:text-white">

            <style>
                {`
                    .dark .product-modal .modal-content {
                        background-color: rgb(30 41 59);
                        color: white;
                        border: 1px solid rgb(51 65 85);
                    }
                    .dark .product-modal .modal-header {
                        border-bottom: 1px solid rgb(51 65 85);
                    }
                    .dark .product-modal .modal-footer {
                        border-top: 1px solid rgb(51 65 85);
                    }
                    .dark .product-modal .form-control {
                        background-color: rgb(51 65 85);
                        color: white;
                        border: 1px solid rgb(71 85 105);
                    }
                    .dark .product-modal .form-control:focus {
                        background-color: rgb(51 65 85);
                        color: white;
                        box-shadow: 0 0 0 2px rgb(56 189 248 / 0.4);
                    }
                    .dark .product-modal .btn-close {
                        filter: invert(1);
                    }

                    .dark .delete-modal .modal-content {
                        background-color: rgb(30 41 59);
                        color: white;
                        border: 1px solid rgb(51 65 85);
                    }
                    .dark .delete-modal .modal-header {
                        border-bottom: 1px solid rgb(51 65 85);
                    }
                    .dark .delete-modal .modal-footer {
                        border-top: 1px solid rgb(51 65 85);
                    }
                    .dark .delete-modal .btn-close {
                        filter: invert(1);
                    }

                    .dark .category-toggle-text {
                        color: rgb(191 219 254);
                    }
                    .category-menu-scroll {
                        background-color: white;
                        color: rgb(51 65 85);
                        border: 1px solid rgb(203 213 225);
                        text-align: right;
                        font-size: 0.875rem;
                        line-height: 1.25rem;
                        font-weight: 700;
                    }
                    .category-menu-item {
                        color: rgb(51 65 85);
                        background-color: white;
                    }
                    .category-menu-item:hover,
                    .category-menu-item:focus {
                        background-color: rgb(239 246 255);
                        color: rgb(15 23 42);
                    }
                    .category-tag-input {
                        background-color: white;
                        color: rgb(15 23 42);
                        border-color: rgb(203 213 225);
                    }
                    .category-tag-input::placeholder {
                        color: rgb(71 85 105);
                    }
                    .category-search-input {
                        background-color: white;
                        color: rgb(15 23 42);
                        border-color: rgb(203 213 225);
                        text-align: right;
                        font-size: 0.875rem;
                        line-height: 1.25rem;
                        font-weight: 700;
                    }
                    .category-search-input::placeholder {
                        color: rgb(71 85 105);
                    }
                    .dark .category-menu-scroll {
                        background-color: rgb(30 41 59);
                        color: rgb(226 232 240);
                        border: 1px solid rgb(51 65 85);
                    }
                    .dark .category-menu-item {
                        color: rgb(226 232 240);
                        background-color: rgb(30 41 59);
                    }
                    .dark .category-menu-item:hover,
                    .dark .category-menu-item:focus {
                        background-color: rgb(51 65 85);
                        color: white;
                    }
                    .dark .category-tag-input {
                        background-color: rgb(51 65 85);
                        color: white;
                        border-color: rgb(71 85 105);
                    }
                    .dark .category-tag-input::placeholder {
                        color: rgb(148 163 184);
                    }
                    .dark .category-search-input {
                        background-color: rgb(51 65 85);
                        color: white;
                        border-color: rgb(71 85 105);
                    }
                    .dark .category-search-input::placeholder {
                        color: rgb(226 232 240);
                    }
                    .dark .category-search-input:focus {
                        background-color: rgb(51 65 85);
                        color: white;
                        box-shadow: 0 0 0 2px rgb(56 189 248 / 0.4);
                    }
                    .dark .category-menu-scroll {
                        scrollbar-color: rgb(71 85 105) rgb(30 41 59);
                    }
                    .dark .category-menu-scroll::-webkit-scrollbar {
                        width: 8px;
                    }
                    .dark .category-menu-scroll::-webkit-scrollbar-track {
                        background: rgb(30 41 59);
                    }
                    .dark .category-menu-scroll::-webkit-scrollbar-thumb {
                        background: rgb(71 85 105);
                        border-radius: 9999px;
                    }
                    .dark .category-menu-scroll::-webkit-scrollbar-thumb:hover {
                        background: rgb(100 116 139);
                    }

                    .add-product-button {
                        background: linear-gradient(135deg, #60a5fa, #2563eb);
                        border: none;
                        color: white;
                        position: relative;
                        transform-origin: center center;
                        animation: mobileVibration 4.5s linear infinite;
                    }
                    .add-product-button:hover {
                        background: linear-gradient(135deg, #60a5fa, #2563eb);
                        border: none;
                        color: white;
                    }
                    .add-product-button .wave-word {
                        display: inline-block;
                    }
                    @keyframes mobileVibration {
                        0% { transform: translate(0, 0) rotate(0deg); }
                        2% { transform: translate(-3px, 2px) rotate(-1deg); }
                        4% { transform: translate(4px, -2px) rotate(1deg); }
                        6% { transform: translate(-3px , 1px) rotate(-1.5deg); }
                        8% { transform: translate(3px , -1px) rotate(1.5deg); }
                        10% { transform: translate(-3px , 2px) rotate(-1.5deg); }
                        12% { transform: translate(3px , -2px) rotate(1.5deg); }
                        14% { transform: translate(-3px , 1px) rotate(-1.5deg); }
                        16% { transform: translate(3px , -1px) rotate(1.5deg); }
                        18% { transform: translate(-4px, 2px) rotate(-1.2deg); }
                        20% { transform: translate(4px, -2px) rotate(1.2deg); }
                        22% { transform: translate(-3px , 1px) rotate(-1.5deg); }
                        24% { transform: translate(3px , -1px) rotate(1.5deg); }
                        26% { transform: translate(-3px , 2px) rotate(-1.5deg); }
                        28% { transform: translate(3px , -2px) rotate(1.5deg); }
                        30% { transform: translate(-4px, 1px) rotate(-1.2deg); }
                        32% { transform: translate(4px, -1px) rotate(1.2deg); }
                        34% { transform: translate(-3px , 2px) rotate(-1.5deg); }
                        36% { transform: translate(3px , -2px) rotate(1.5deg); }
                        38% { transform: translate(-3px , 1px) rotate(-1.5deg); }
                        40% { transform: translate(3px , -1px) rotate(1.5deg); }
                        100% { transform: translate(0, 0) rotate(0deg); }
                    }
                `}
            </style>

            <div className="flex justify-between items-center pr-2 pl-2">
                <h3 className="text-lg font-bold border-b-2 border-blue-500 w-fit pb-1">محصولات فروشگاه</h3>
                <Button className="add-product-button" variant="primary" onClick={openAddModal}>
                    <span className="wave-word">+ </span>
                    <span className="wave-word">افزودن</span>
                    <span className="wave-word"> </span>
                    <span className="wave-word">محصول</span>
                </Button>
            </div>

            {/* حالت لودینگ: سه‌نقطه‌ی متحرک به‌جای گرید محصولات */}
            {isProductsBusy ? (
                <div className="flex justify-center items-center py-10">
                    <span className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                    </span>
                </div>
            ) : products.length > 0 ? (
                <div className="flex justify-center flex-wrap gap-4">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.7rem)] lg:w-[calc(25%-0.75rem)] border rounded-md p-3 flex flex-col gap-2 dark:bg-slate-800"
                        >
                            <div className="w-full h-40 rounded-md overflow-hidden bg-gray-100 dark:bg-slate-700">
                                <img
                                    src={product.imageUrl.startsWith('http') ? product.imageUrl : `http://localhost:8000${product.imageUrl}`}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="grid grid-rows-2-2 gap-1 items-center">
                                <p className="font-bold truncate">{product.name}</p>
                                <p className="text-sm font-bold text-stone-400">{product._id}</p>
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

                            <button
                                onClick={() => openEditModal(product)}
                                className="flex items-center justify-center gap-1 text-sm border rounded-md py-1 mt-auto hover:bg-gray-100 dark:hover:bg-slate-700"
                            >
                                <FaPen className="size-3" />
                                ویرایش
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400 text-center py-6">هنوز محصولی اضافه نکرده‌اید</p>
            )}

            {/* مودال افزودن / ویرایش محصول */}
            <Modal show={showModal} onHide={closeModal} centered dialogClassName="product-modal">
                <Modal.Header closeButton>
                    <Modal.Title>{editingProductId ? "ویرایش محصول" : "افزودن محصول"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="flex flex-col gap-3 text-right">

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-stone-400">
                                {'(جهت دسته بندی) تگ محصول '}
                            </label>
                            <section className="grid grid-cols-2 gap-2">
                                <div className="border rounded-md flex justify-end items-center">
                                    <Dropdown
                                        onSelect={(eventKey) => {
                                            if (eventKey) setTag(eventKey)
                                        }}
                                    >
                                        <Dropdown.Toggle as={CustomToggle as any} id="dropdown-custom-components">
                                            <span className="category-toggle-text text-sm font-bold text-blue-600 dark:text-blue-300">دسته‌ بندی</span>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu
                                            as={CustomMenu as any}
                                            className="text-right"
                                            style={{ maxHeight: '260px', overflowY: 'auto', overflowX: 'hidden' }}
                                        >
                                            <Dropdown.Item eventKey="ورزشی" className="category-menu-item text-right text-sm font-bold text-stone-400">ورزشی</Dropdown.Item>
                                            <Dropdown.Item eventKey="خدمات و کسب و کار" className="category-menu-item text-right text-sm font-bold text-stone-400">خدمات و کسب و کار</Dropdown.Item>
                                            <Dropdown.Item eventKey="کالای دیجیتال" className="category-menu-item text-right text-sm font-bold text-stone-400">کالای دیجیتال</Dropdown.Item>
                                            <Dropdown.Item eventKey="فرهنگی آموزشی" className="category-menu-item text-right text-sm font-bold text-stone-400">فرهنگی آموزشی</Dropdown.Item>
                                            <Dropdown.Item eventKey="آرایشی و بهداشتی" className="category-menu-item text-right text-sm font-bold text-stone-400">آرایشی و بهداشتی</Dropdown.Item>
                                            <Dropdown.Item eventKey="سلامت و درمان" className="category-menu-item text-right text-sm font-bold text-stone-400">سلامت و درمان</Dropdown.Item>
                                            <Dropdown.Item eventKey="صنایع دستی" className="category-menu-item text-right text-sm font-bold text-stone-400">صنایع دستی</Dropdown.Item>
                                            <Dropdown.Item eventKey="خانه و آشپزخانه" className="category-menu-item text-right text-sm font-bold text-stone-400">خانه و آشپزخانه</Dropdown.Item>
                                            <Dropdown.Item eventKey="مد و پوشاک" className="category-menu-item text-right text-sm font-bold text-stone-400">مد و پوشاک</Dropdown.Item>
                                            <Dropdown.Item eventKey="مواد غذایی" className="category-menu-item text-right text-sm font-bold text-stone-400">مواد غذایی</Dropdown.Item>
                                            <Dropdown.Item eventKey="کتاب" className="category-menu-item text-right text-sm font-bold text-stone-400">کتاب</Dropdown.Item>
                                            <Dropdown.Item eventKey="طلا" className="category-menu-item text-right text-sm font-bold text-stone-400">طلا</Dropdown.Item>
                                            <Dropdown.Item eventKey="خودرویی" className="category-menu-item text-right text-sm font-bold text-stone-400">خودرویی</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <input
                                    type="text"
                                    readOnly
                                    value={tag}
                                    dir="rtl"
                                    onChange={(e) => setTag(e.target.value)}
                                    className="category-tag-input p-2 border rounded-md dark:bg-slate-800 dark:text-white"
                                    style={{ textAlign: 'right', fontSize: '0.875rem', lineHeight: '1.25rem', fontWeight: '700' }}
                                />
                            </section>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-stone-400">عکس محصول</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full h-40 rounded-md border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50 dark:bg-slate-700"
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="پیش‌نمایش" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-gray-400 text-sm">برای انتخاب عکس کلیک کنید</span>
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-stone-400">نام محصول</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="p-2 border rounded-md dark:bg-slate-800 dark:text-white"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-stone-400">قیمت محصول (تومان)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="p-2 border rounded-md dark:bg-slate-800 dark:text-white"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            {!showDiscountInput ? (
                                <button
                                    type="button"
                                    onClick={() => setShowDiscountInput(true)}
                                    className="flex items-center gap-1 text-sm text-blue-600 w-fit"
                                >
                                    <FaTag className="size-3" />
                                    اعمال تخفیف
                                </button>
                            ) : (
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-bold text-stone-400">قیمت با تخفیف (تومان)</label>
                                    <input
                                        type="number"
                                        value={discountPrice}
                                        onChange={(e) => setDiscountPrice(e.target.value)}
                                        className="p-2 border rounded-md dark:bg-slate-800 dark:text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => { setShowDiscountInput(false); setDiscountPrice("") }}
                                        className="text-xs text-red-500 w-fit"
                                    >
                                        حذف تخفیف
                                    </button>
                                </div>
                            )}

                            {price && (
                                <div className="flex items-center gap-2 mt-1">
                                    {showDiscountInput && discountPrice ? (
                                        <>
                                            <span className="text-gray-400 text-sm line-through">
                                                {Number(price).toLocaleString()} تومان
                                            </span>
                                            <span className="text-green-600 font-bold text-sm">
                                                {Number(discountPrice).toLocaleString()} تومان
                                            </span>
                                        </>
                                    ) : (
                                        <span className="font-bold text-sm">
                                            {Number(price).toLocaleString()} تومان
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-stone-400">توضیحات محصول</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="p-2 border rounded-md dark:bg-slate-800 dark:text-white resize-none"
                            />
                        </div>

                        {formError && (
                            <p className="text-red-600 text-sm">{formError}</p>
                        )}

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {editingProductId && <Button variant="danger" onClick={pupUpDeletModal}>حذف</Button>}
                    <Button variant="secondary" onClick={closeModal}>انصراف</Button>
                    <Button variant="primary" onClick={handleSaveProduct} disabled={productFetcher.state !== "idle"}>
                        {productFetcher.state !== "idle"
                            ? "در حال ثبت..."
                            : editingProductId ? "ذخیره تغییرات" : "افزودن محصول"}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* مدال حذف محصول */}
            <Modal show={deletModal} onHide={closeDeleteModal} centered size="lg" dialogClassName="delete-modal">
                <Modal.Header closeButton className="d-flex justify-content-between align-items-center">
                    <div className="flex-grow-1 text-right">
                        <Modal.Title className="mb-0 d-flex align-items-center gap-2">
                            <IoIosWarning className="text-warning size-10" />
                            حذف محصول
                        </Modal.Title>
                    </div>
                </Modal.Header>
                <ModalBody className="text-right">
                    <p className="mb-0 text-center font-bold text-lg text-red-600">آیا از حذف محصول مطمئن هستید ؟ </p>
                </ModalBody>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteModal}>انصراف</Button>
                    <Button variant="primary" onClick={handleDeletProduct} disabled={productFetcher.state !== "idle"}>
                        {productFetcher.state !== "idle" ? "در حال حذف..." : "تأیید"}
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default SelloingPart