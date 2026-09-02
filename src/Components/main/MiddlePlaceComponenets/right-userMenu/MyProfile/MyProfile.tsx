
import ProgressionBar from "./ProgressionBar"
import { Outlet , useNavigation } from "react-router-dom"


function MyProfile() {

    const navigation = useNavigation()
    const isLoading = navigation.state === 'loading'

    return (
        <div className="flex flex-col gap-4 p-4">
            <ProgressionBar />
            {/* تمامی route های myProfile */}
            <div className="flex w-full h-fit border rounded-md p-4">
                {isLoading ? (
                    <span className="text-gray-400 text-2xl animate-pulse">...</span>
                ) : (
                    <Outlet />
                )}
            </div>
            {/* تمامی route های myProfile */}
        </div>
    )
}

export default MyProfile