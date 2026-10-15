import axios from "axios";

export async function editProfileLoader({ params } : any) {

    const response = await axios.get(
        `https://manafgrocey-api.onrender.com/api/profile/${params.userId}`
    );

    return response.data;
}