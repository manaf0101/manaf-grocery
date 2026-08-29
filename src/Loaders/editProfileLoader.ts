import axios from "axios";

export async function editProfileLoader({ params } : any) {

    const response = await axios.get(
        `http://localhost:8000/api/profile/${params.userId}`
    );

    return response.data;
}