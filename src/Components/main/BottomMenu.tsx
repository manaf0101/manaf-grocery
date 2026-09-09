import { CgProfile } from "react-icons/cg";
import { RiHome2Line } from "react-icons/ri";
import { SlCallIn } from "react-icons/sl";
import { HiUserGroup } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { useState } from "react";
import { useNavigate , useParams} from "react-router";
import { useProfile } from "../contexts/ProfileContext";

function BottomMenu () {
const {userId} = useParams<{userId: string}>()

        // مسیر پایه
    const basePath = `/TheUserPage/${userId}/main/userMenu/`;

    // مربوط به بررسی تکمیل بودن پروفایل
    const [showIncompleteModal, setShowIncompleteModal] = useState(false)
    const navigate = useNavigate()
    const {profileProgress} = useProfile()

        const handleMyMarketButton = () => {
        if (profileProgress === 100) {
            navigate(`${basePath}mine-market`)
        } else {
            setShowIncompleteModal(true)
        }
    }

        // با کلیک روی دکمه‌ی «تکمیل پروفایل» داخل مودال
    const handleGoToProfile = () => {
        setShowIncompleteModal(false)
        navigate(`${basePath}MyProfile`)
    }
    // مربوط به بررسی تکمیل بودن پروفایل

    return (
        <>
        {/*----------- < sm ---------- */}
{/* منوی پایینی برای کوچکتر از sm */}
<div className="sm:hidden" style={{fontFamily: 'VAZIR'}}>
    <div className="fixed z-40 bottom-0 right-0 left-0 bg-slate-100 dark:bg-slate-950">
        <div className="grid grid-cols-5">
            {/* مارکت من */}
            <button
            onClick={handleMyMarketButton}
            className="col-start-1  dark:text-white flex justify-center item-center pt-2  dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:bg-gray-300">
                <div className="grid-rows-2">
                    <div className="row-start-1 flex justify-center items-center">
                    <p className="dark:text-white "><CgProfile className="size-5"/></p>
                    </div>
                    <div className="row-start-2 flex justify-center items-center">
                    <p className="dark:text-white">مارکت من</p>
                    </div>
                </div>
            </button>
            {/* مارکت من */}

            {/* تماس با ما */}
            <div className="col-start-2 dark:text-white flex justify-center item-center pt-2 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:bg-gray-300">
            <div className="grid-rows-2">
                    <div className="row-start-1 flex justify-center items-center">
                    <p className="dark:text-white "><SlCallIn className="size-5"/></p>
                    </div>
                    <div className="row-start-2 flex justify-center items-center">
                    <p className="dark:text-white">تماس با ما</p>
                    </div>
             </div>
            </div>
            {/* تماس با ما */}

            {/* درباره ی ما */}
            <div className="col-start-3 dark:text-white flex justify-center item-center pt-2 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:bg-gray-300">
            <div className="grid-rows-2">
                    <div className="row-start-1 flex justify-center items-center">
                    <p className="dark:text-white "><HiUserGroup className="size-6"/></p>
                    </div>
                    <div className="row-start-2 flex justify-center items-center">
                    <p className="dark:text-white">درباره ما</p>
                    </div>
             </div>
            </div>
            {/* درباره ی ما */}

            {/* تنظیمات */}
            <div className="col-start-4 dark:text-white flex justify-center item-center pt-2 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:bg-gray-300">
            <div className="grid-rows-2">
                    <div className="row-start-1 flex justify-center items-center">
                    <p className="dark:text-white "><IoSettingsOutline className="size-5"/></p>
                    </div>
                    <div className="row-start-2 flex justify-center items-center">
                    <p className="dark:text-white">تنظیمات</p>
                    </div>
             </div>
            </div>
            {/* تنظیمات */}

            {/* خانه */}
            <div className="col-start-5 dark:text-white flex justify-center item-center pt-2 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:bg-gray-300">
            <div className="grid-rows-2">
                    <div className="row-start-1 flex justify-center items-center">
                    <p className="dark:text-white "><RiHome2Line className="size-5"/></p>
                    </div>
                    <div className="row-start-2 flex justify-center items-center">
                    <p className="dark:text-white">خانه</p>
                    </div>
             </div>
            </div>
            {/* خانه */}
        </div>
    </div>
</div>
{/* منوی پایینی برای کوچکتر از sm */}
{/*----------- < sm ---------- */}

            {/* مودال هشدار تکمیل نبودن پروفایل */}
            <Modal show={showIncompleteModal} onHide={() => setShowIncompleteModal(false)} centered>
                <Modal.Body className="text-center py-4 dark:bg-slate-700 dark:text-gray-200 rounded-lg p-2">
                    <p className='mb-2'>! برای استفاده از رابط کاربری مارکت من،ابتدا باید پروفایل خود را کامل کنید </p>
                    <hr />
                    <div className="flex flex-row justify-center gap-2 mt-2">
                        <Button variant="primary" onClick={handleGoToProfile}>
                            تکمیل پروفایل
                        </Button>
                        <Button variant="secondary" onClick={() => setShowIncompleteModal(false)}>
                            متوجه شدم
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default BottomMenu