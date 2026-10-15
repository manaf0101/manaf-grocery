// برای سبد خرید UserCard.tsx

import axios from "axios";
 

export const cartLoader = async ({params} : any) => {
    const [getCartResponse , getAllProductsResponse] = await Promise.all([
        axios.get(`https://manafgrocey-api.onrender.com/api/cart/${params.userId}`) , 
        axios.get("https://manafgrocey-api.onrender.com/api/getAllProducts")
    ]) ;

    return {
        getCart : getCartResponse.data ,
        getAllProducts : getAllProductsResponse.data ,
    }
}
     
