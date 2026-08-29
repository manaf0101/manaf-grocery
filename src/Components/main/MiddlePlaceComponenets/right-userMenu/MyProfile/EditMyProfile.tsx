import { useLoaderData } from "react-router-dom"

function EditMyProfile() {

    const profile = useLoaderData()

    return (
        <>
        <div>edit profile</div>
        </>
    )
}

export default EditMyProfile