import { useState, useRef } from "react"
import { Modal, Button, ModalBody } from "react-bootstrap"
import { FaPen, FaTag } from "react-icons/fa"
import { IoIosWarning } from "react-icons/io";

interface Product {
    id: string
    imageUrl: string
    name: string
    price: number
    discountPrice?: number
    description: string
}

function SelloingPart() {
    const [products, setProducts] = useState<Product[]>([])
    const [showModal, setShowModal] = useState(false)
    const [deletModal , setDeleteModal] = useState(false)
    // const [deletingAsk, setDeletingAsk] = useState(false)
    const [editingProductId, setEditingProductId] = useState<string | null>(null)

    // فیلدهای فرم داخل مودال
    const [imagePreview, setImagePreview] = useState<string>("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [showDiscountInput, setShowDiscountInput] = useState(false)
    const [discountPrice, setDiscountPrice] = useState("")
    const [description, setDescription] = useState("")
    const [formError, setFormError] = useState("")

    const fileInputRef = useRef<HTMLInputElement>(null)

    // بازگرداندن فرم به حالت اولیه (هم برای بستن مودال، هم قبل از باز کردن حالت افزودن)
    const resetForm = () => {
        setImagePreview("")
        setName("")
        setPrice("")
        setShowDiscountInput(false)
        setDiscountPrice("")
        setDescription("")
        setFormError("")
        setEditingProductId(null)
    }

    const openAddModal = () => {
        resetForm()
        setShowModal(true)
    }

    // باز کردن مودال در حالت ویرایش، با پر کردن فرم از اطلاعات محصول موجود
    const openEditModal = (product: Product) => {
        setEditingProductId(product.id)
        setImagePreview(product.imageUrl)
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

    const closeDeleteModal =  () => {
        setDeleteModal(false)
    }

    // برای بارگذاری تصویر
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        // این یه متد استاندارد مرورگره که از یه فایل انتخاب‌شده
        // ، یه آدرس موقت (blob URL) می‌سازه که مستقیم تو <img src="...">
        //  قابل استفاده‌ست — سریع‌تر و سبک‌تر از تبدیل به base64 برای پیش‌نمایش
        //  موقته.
        setImagePreview(URL.createObjectURL(file))
    }

    // حذف محصول
    const pupUpDeletModal = () =>  {
        setDeleteModal(true)
    }

    const handleDeletProduct  =  () => {
        if (!editingProductId) return

        setProducts((prev) => prev.filter((product) => product.id !== editingProductId))
        closeDeleteModal()
        setEditingProductId(null)
        closeModal()
    }
    // حذف محصول




    // ذخیره کردن محصول
    const handleSaveProduct = () => {
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

        const newProduct: Product = {
            // یه متد استاندارد و built-in مرورگرهاست که یه شناسه‌ی
            //  یکتا تولید می‌کنه
            id: editingProductId || crypto.randomUUID(),
            imageUrl: imagePreview,
            name: name.trim(),
            price: Number(price),
            discountPrice: showDiscountInput && discountPrice ? Number(discountPrice) : undefined,
            description: description.trim(),
        }

        if (editingProductId) {
            setProducts((prev) => prev.map((p) => (p.id === editingProductId ? newProduct : p)))
        } else {
            setProducts((prev) => [...prev, newProduct])
        }

        closeModal()
    }
    // ذخیره کردن محصول


    return (
        <div className="w-full flex flex-col gap-6 dark:text-white">

            {/* استایل دارک‌مود مودال */}
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
                `}
            </style>
            {/* استایل دارک‌مود مودال */}

            <div className="flex justify-between items-center pr-2 pl-2">
                <h3 className="text-lg font-bold border-b-2 border-blue-500 w-fit pb-1">محصولات فروشگاه</h3>
                <Button variant="primary" onClick={openAddModal}>+ افزودن محصول</Button>
            </div>

            {/* لیست محصولات - ریسپانسیو با flex-wrap */}
            {products.length > 0 ? (
                <div className="flex justify-center flex-wrap gap-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.7rem)] lg:w-[calc(25%-0.75rem)] border rounded-md p-3 flex flex-col gap-2 dark:bg-slate-800"
                        >
                            {/* عکس محصول - اندازه‌ی یکسان برای همه‌ی کارت‌ها */}
                            <div className="w-full h-40 rounded-md overflow-hidden bg-gray-100 dark:bg-slate-700">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* نام محصول */}
                            <p className="font-bold truncate">{product.name}</p>

                            {/* قیمت و تخفیف */}
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

                            {/* توضیحات */}
                            {product.description && (
                                <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-3">
                                    {product.description}
                                </p>
                            )}

                            {/* دکمه ویرایش */}
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

                        {/* عکس محصول */}
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

                        {/* نام محصول */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-stone-400">نام محصول</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="p-2 border rounded-md dark:bg-slate-800 dark:text-white"
                            />
                        </div>

                        {/* قیمت محصول */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-stone-400">قیمت محصول (تومان)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="p-2 border rounded-md dark:bg-slate-800 dark:text-white"
                            />
                        </div>

                        {/* تخفیف */}
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

                            {/* پیش‌نمایش زنده‌ی قیمت، همان لحظه داخل مودال */}
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

                        {/* توضیحات */}
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
                    <Button variant="primary" onClick={handleSaveProduct}>
                        {editingProductId ? "ذخیره تغییرات" : "افزودن محصول"}
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* مودال افزودن / ویرایش محصول */}

            {/* مدال حذف محصول */}
            <Modal show={deletModal} onHide={closeDeleteModal} centered size="lg" dialogClassName="delete-modal">
                <Modal.Header closeButton className="d-flex justify-content-between align-items-center">
                    <div className="flex-grow-1 text-right">
                        <Modal.Title className="mb-0 d-flex align-items-center gap-2">
                            <IoIosWarning className="text-warning size-10"  />
                            حذف محصول
                        </Modal.Title>
                    </div>
                </Modal.Header>
                <ModalBody className="text-right">
                    <p className="mb-0 text-center font-bold text-lg text-red-600">آیا از حذف محصول مطمئن هستید ؟ </p>
                </ModalBody>

                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteModal}>انصراف</Button>
                    <Button variant="primary" onClick={handleDeletProduct}>تأیید</Button>
                </Modal.Footer>
            </Modal>
            {/* مدال حذف محصول */}

        </div>
    )
}

export default SelloingPart