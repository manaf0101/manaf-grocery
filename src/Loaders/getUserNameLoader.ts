import axios from "axios";

export async function getUserNameLoader({ params } : any) {

    const response = await axios.get(
        `http://localhost:8000/api/username/${params.userId}`
    );
    return response.data;
}

