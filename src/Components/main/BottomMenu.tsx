import { CgProfile } from "react-icons/cg";
import { RiHome2Line } from "react-icons/ri";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { useNavigate , useParams} from "react-router";
import { useProfile } from "../contexts/ProfileContext";
import { BsMoonStars } from "react-icons/bs";
import useDarkMood from "../../Hooks/useDarkMood";
 
function BottomMenu () {


        // DARK MOOD

    const [themes, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    })

    useEffect(() => {
        document.documentElement.classList.toggle('dark', themes === 'dark');
        localStorage.setItem('theme', themes);
    }, [themes]);

    function changeMood() {
        if (themes === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    const [theme] = useDarkMood();

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme])

    // DARK MOOD


const {userId} = useParams<{userId: string}>()
    const userDomainId = useParams<{ userId: string }>().userId || '';

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
        navigate(`${basePath}MyProfile/edit`)
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
            <div
            onClick={() => navigate(`/TheUserPage/${userDomainId}/main/userMenu/UsersCard`)}
            style={{ cursor: "pointer" }}
            className="col-start-2 dark:text-white flex justify-center item-center pt-2 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:bg-gray-300">
            <div className="grid-rows-2">
                    <div className="row-start-1 flex justify-center items-center">
                    <p className="dark:text-white "><MdOutlineShoppingCart className="size-5"/></p>
                    </div>
                    <div className="row-start-2 flex justify-center items-center">
                    <p className="dark:text-white">سبد خرید</p>
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
            <div 
            onClick={changeMood} style={{ cursor: "pointer" }}
            className="col-start-4 dark:text-white flex justify-center item-center pt-2 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:bg-gray-300">
            <div className="grid-rows-2">
                    <div className="row-start-1 flex justify-center items-center">
                    <p className="dark:text-white "><BsMoonStars className="size-5"/></p>
                    </div>
                    <div className="row-start-2 flex justify-center items-center">
                    <p className="dark:text-white">مود</p>
                    </div>
             </div>
            </div>
            {/* تنظیمات */}

            {/* خانه */}
            <div
            onClick={() => navigate(`/TheUserPage/${userId}/main/userMenu/market`)}
            style={{cursor: "pointer"}}
            className="col-start-5 dark:text-white flex justify-center item-center pt-2 dark:hover:bg-cyan-900 hover:transition duration-200 ease-in-out hover:bg-gray-300">
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