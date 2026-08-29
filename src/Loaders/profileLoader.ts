// این loader  میباشد . برای کامپوننت MyProfile.tsx 

import axios from "axios"

export async function profileLoader({ params } : any) {
    const { userId } = params
    const response = await axios.get(`http://localhost:8000/api/profile/${userId}`)
    return response.data
}
