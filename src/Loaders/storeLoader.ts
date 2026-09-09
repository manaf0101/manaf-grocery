import axios from "axios";

export async function storeLoader({ params }: any) {
    const response = await axios.get(
        `http://localhost:8000/api/store/${params.userId}`
    );
 
    return response.data;
}