import { useSearchParams, useLoaderData, useNavigation } from "react-router-dom"
import { ProductTile, product } from "./suggestions/ProductCard"

type ApiProduct = {
    _id: string
    name: string
    price: number
    discountPrice?: number
    description?: string
    sellerId?: string
    tag?: string
    image?: string
    imageUrl?: string
}

export default function AllProducts () {
    // تگ دسته‌بندی از query string خونده می‌شه؛ همونی که CategorySlider موقع navigate فرستاده
    const [searchParams] = useSearchParams()
    const selectedTag = searchParams.get("tag") || ""

    const { allProducts } = useLoaderData() as { allProducts?: ApiProduct[] }

    const allProduct = (allProducts ?? []).map((item) => {
        const imageUrl = item.imageUrl?.startsWith("http")
            ? item.imageUrl
            : item.imageUrl
                ? `https://manafgrocey-api.onrender.com${item.imageUrl}`
                : item.image || "/pictures/document-list.svg"

        return {
            ...item,
            image: imageUrl,
            tag: item.tag ?? "",
        } as product
    })

    // فقط محصولاتی که تگشون دقیقاً همون دسته‌بندی انتخاب‌شده‌ست
    const filteredProducts = allProduct.filter((item) => item.tag === selectedTag)

    // دقیقاً مثل ProductCard: تا وقتی روتر مشغول لود کردنه، اسکلت نمایش داده می‌شه
    const navigation = useNavigation()
    const isLoaded = navigation.state === "idle"

    return (
        <section className="flex flex-col gap-4 p-3 sm:p-5">

            {/* عنوان صفحه = همون دسته‌بندی انتخاب‌شده */}
            <div className="flex pr-3 pl-3 pt-3">
                <span className="border-b-4 rounded-sm border-blue-600 dark:text-white text-lg font-bold">
                    {selectedTag || "همه محصولات"}
                </span>
            </div>

            <hr className="dark:text-blue-400" />

            {filteredProducts.length > 0 ? (
                <div className="flex justify-center flex-wrap gap-4">
                    {filteredProducts.map((item) => (
                        // دقیقاً همون ProductTile، با همون سبد خرید، فاکتور، کد تخفیف و اسکلت لودینگ
                        <ProductTile key={item._id} product={item} isLoaded={isLoaded} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-400 text-center py-10">
                    هنوز محصولی در این دسته‌بندی وجود ندارد
                </p>
            )}

        </section>
    )
}