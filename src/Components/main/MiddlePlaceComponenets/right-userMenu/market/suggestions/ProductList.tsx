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
  createdAt: string,
  description?: string,
  imageUrl: string,
  name: string,
  price: number,
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


  // برای قبل از دیپلوی که استاتیک بود استفاده میشد 
  // const products = [
  //   { name: "محصول ۱", image:`${image[0]}`},
  //   { name: "محصول ۲", image: "../../../../../../../public/pictures/2222.jpg_1080X1920X70.jpg" },
  //   { name: "محصول ۳", image: "../../../../../../../public/pictures/3333.jpg_1080X1920X70.jpg" },
  //   { name: "محصول 4", image: "../../../../../../../public/pictures/4444.jpg_512X512X70.jpg" },
  //   { name: "محصول 5", image: "../../../../../../../public/pictures/5555.jpg_512X512X70.jpg" },
  //   { name: "محصول 6", image: "../../../../../../../public/pictures/6666.jpg_1080X1920X70.jpg" },
  //   { name: "محصول 7", image: "../../../../../../../public/pictures/7777.jpg" },
  //   { name: "محصول 8", image: "../../../../../../../public/pictures/8888.jpg_512X512X70.jpg" },
  // ];


  const products = allProducts.map((product) => ({
    name: product.name,
    image: product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `http://localhost:8000${product.imageUrl}`,
  }));


  return (
    <ProductCard
      products={products}
      id="marketSection4"
    />
  );
};

export default ProductList;