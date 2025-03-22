import ProductCard from "./ProductCard";

const ProductList = () => {
  const products = [
    { name: "محصول ۱", image: "../../../../../../../public/pictures/1111.jpg_512X512X70.jpg" },
    { name: "محصول ۲", image: "../../../../../../../public/pictures/2222.jpg_1080X1920X70.jpg" },
    { name: "محصول ۳", image: "../../../../../../../public/pictures/3333.jpg_1080X1920X70.jpg" },
    { name: "محصول 4", image: "../../../../../../../public/pictures/4444.jpg_512X512X70.jpg" },
    { name: "محصول 5", image: "../../../../../../../public/pictures/5555.jpg_512X512X70.jpg" },
    { name: "محصول 6", image: "../../../../../../../public/pictures/6666.jpg_1080X1920X70.jpg" },
    { name: "محصول 7", image: "../../../../../../../public/pictures/7777.jpg" },
    { name: "محصول 8", image: "../../../../../../../public/pictures/8888.jpg_512X512X70.jpg" },
  ];

  return (
    <>
        <ProductCard  products={products}/>
    </>
  );
};

export default ProductList;









  //   <div className="py-10">
  //   <h1 className="text-2xl font-bold text-center mb-6">محصولات</h1>
  //   <div className="flex gap-6 justify-center">
  //     {products.map((product, index) => (
  //       <ProductCard key={index} {...product} />
  //     ))}
  //   </div>
  // </div>