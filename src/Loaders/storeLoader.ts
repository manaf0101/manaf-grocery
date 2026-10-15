// بلا استفاده می باشد



import axios from "axios";

export async function storeLoader({ params }: any) {
    const response = await axios.get(
        `https://manafgrocey-api.onrender.com/api/store/${params.userId}`
    );
 
    return response.data;
}