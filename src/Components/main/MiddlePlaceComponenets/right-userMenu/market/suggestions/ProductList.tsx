import ProductCard from "./ProductCard";
import { useLoaderData } from "react-router-dom";

interface Seller {
  storeId: string
  storeName: string
  sellerID: string
  storeCreatedAt: string
  userId: string
  username: string
  userProfileImage?: string
}

interface AllProducts {
  _id: string,
  createdAt: string,
  description?: string,
  imageUrl: string,
  name: string,
  price: number,
  discountPrice?: number,
  sellerId: string,
  tag: string,
  updatedAt: string,
}

interface SellersAndAllProducts {
  usersWithStore: Seller[];
  allProducts: AllProducts[];
}

const ProductList = () => {

  const { allProducts } = useLoaderData() as SellersAndAllProducts;

  // قیمت، تخفیف و توضیحات هم لازم شدن، پس دیگه فقط اسم و عکس کافی نیست
  const products = allProducts.map((product) => ({
    _id: product._id,
    name: product.name,
    image: product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `http://localhost:8000${product.imageUrl}`,
    price: product.price,
    discountPrice: product.discountPrice,
    description: product.description,
  }));

  return (
    <ProductCard
      products={products}
      id="marketSection4"
    />
  );
};

export default ProductList;