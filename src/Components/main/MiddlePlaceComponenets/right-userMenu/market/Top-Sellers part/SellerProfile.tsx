import { useNavigate, useParams } from "react-router-dom"

interface Seller {
    storeId: string
    storeName: string
    sellerID: string
    storeCreatedAt: string
    userId: string
    username: string
    userProfileImage?: string
}

interface SellerProfileProps {
    seller: Seller
}

function SellerProfile({ seller }: SellerProfileProps) {

    const navigate = useNavigate()
    // userId همون کاربر لاگین‌شده‌ایه که داره لیست فروشگاه‌ها رو نگاه می‌کنه
    // (نه userId خود فروشنده؛ آدرس همیشه از دید کاربر جاری ساخته می‌شه)
    const { userId } = useParams<{ userId: string }>()

    const imageSrc = seller.userProfileImage
        ? `http://localhost:8000${seller.userProfileImage}`
        : "/pictures/icon-7797704_1280.png"


        // با کلیک روی کارت غرفه، کاربر وارد فروشگاه همون فروشنده می‌شه
    // از sellerID به‌عنوان شناسه‌ی داخل آدرس استفاده شد چون یکتاست
    const goToSellerMarket = () => {
        if (!seller?.sellerID) {
            console.warn("sellerID not available")
            return
        }
        navigate(`/TheUserPage/${userId}/main/userMenu/seller-Market/${seller.sellerID}`)
    }

return (
        <div className="stall-card cursor-pointer" onClick={goToSellerMarket}>
            <div className="stall-card-awning" />
            <div className="stall-card-photo-ring">
                <img src={imageSrc} alt={seller.username} className="stall-card-photo" />
            </div>
            <p className="stall-card-name" style={{ fontFamily: 'VAZIR' }}>{seller.storeName}</p>
            <p className="stall-card-handle">@{seller.username}</p>
        </div>
    )
}

export default SellerProfile