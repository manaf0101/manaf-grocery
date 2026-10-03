// برای سبد خرید UserCard.tsx

import axios from "axios";
 

export const cartLoader = async ({params} : any) => {
    const [getCartResponse , getAllProductsResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/cart/${params.userId}`) , 
        axios.get("http://localhost:8000/api/gerAllproducts")
    ]) ;

    return {
        getCart : getCartResponse.data ,
        getAllProducts : getAllProductsResponse.data ,
    }
}
    
