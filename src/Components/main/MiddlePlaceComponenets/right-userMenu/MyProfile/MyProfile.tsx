
import ProgressionBar from "./ProgressionBar"
import { Outlet } from "react-router-dom"


function MyProfile() {


    return (
        <div className="flex flex-col gap-4 p-4">
            <ProgressionBar />
            {/* تمامی route های myProfile */}
            <div className="flex">
                <Outlet />
            </div>
            {/* تمامی route های myProfile */}
        </div>
    )
}

export default MyProfile