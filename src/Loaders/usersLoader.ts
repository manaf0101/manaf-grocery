// برای کامپوننت sign UP 
// که چک کند ورودی را

import axios from "axios";

export const usersLoader = async () => {
    try {
        const response = await axios.get("https://manafgrocey-api.onrender.com/api/users");

        return response.data;

    } catch (error) {
        console.log("Error getting users:", error);
        throw new Response("Failed to load users", {
            status: 500
        });
    }
};