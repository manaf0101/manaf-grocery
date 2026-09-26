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

    const imageSrc = seller.userProfileImage
        ? `http://localhost:8000${seller.userProfileImage}`
        : "/pictures/icon-7797704_1280.png"

    return (
        <div className="stall-card">
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