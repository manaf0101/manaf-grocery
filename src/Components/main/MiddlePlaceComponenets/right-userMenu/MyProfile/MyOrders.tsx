import { useLoaderData } from "react-router-dom"


function MyOrders() {

    const orders = useLoaderData()

return (
    <>
    <div className="w-full">
        My orders
    </div>
    </>
)
}

export default MyOrders