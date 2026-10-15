// برای کامپوننت market و سپس TopSellers 

import axios from "axios"

export const usersWithStoreAndAllProducys = async () => { 

        const [usersWithStoreResponse , allProductsResponse] = await Promise.all([
            axios.get("https://manafgrocey-api.onrender.com/api/users-with-store") ,
            axios.get("https://manafgrocey-api.onrender.com/api/getAllProducts")
        ]) ;
        return {
            usersWithStore : usersWithStoreResponse.data  , 
            allProducts : allProductsResponse.data , 
        }
    } 
