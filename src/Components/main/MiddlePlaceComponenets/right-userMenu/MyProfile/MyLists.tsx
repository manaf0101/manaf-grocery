import { useLoaderData } from "react-router-dom"


function MyLists() {

    const lists = useLoaderData()

return (
    <>
    <div>My lists</div>
    </>
)
}

export default MyLists