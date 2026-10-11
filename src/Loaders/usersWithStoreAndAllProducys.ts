// برای کامپوننت market و سپس TopSellers 

import axios from "axios"

export const usersWithStoreAndAllProducys = async () => { 

        const [usersWithStoreResponse , allProductsResponse] = await Promise.all([
            axios.get("http://localhost:8000/api/users-with-store") ,
            axios.get("http://localhost:8000/api/getAllProducts")
        ]) ;
        return {
            usersWithStore : usersWithStoreResponse.data  , 
            allProducts : allProductsResponse.data , 
        }
    } 
