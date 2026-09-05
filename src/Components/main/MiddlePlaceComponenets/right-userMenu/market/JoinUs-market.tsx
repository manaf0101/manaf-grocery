import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfile } from '../../../../contexts/ProfileContext';
// برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه
import { useActiveSection } from '../../../../contexts/ActiveSectionContext';
import { useInView } from 'react-intersection-observer'
// برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه



interface JoinUsProps {
    id: string
}


function JoinUs({ id }: JoinUsProps) {

    // دستیابی به userId کاربر
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate()

    // درصد تکمیل پروفایل از context سراسری
    const { profileProgress } = useProfile()

    // برای نمایش مودال «ابتدا پروفایل خود را کامل کنید»
    const [showIncompleteModal, setShowIncompleteModal] = useState(false)

    // مسیر پایه
    const basePath = `/TheUserPage/${userId}/main/userMenu/`;

    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه
    const { setActiveSection } = useActiveSection();
    const { ref, inView } = useInView({ threshold: 0.5 })

    useEffect(() => {
        if (inView) {
            setActiveSection(id)
        }
    }, [inView, id, setActiveSection])
    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه


    // با کلیک روی دکمه‌ی «ایجاد فروشگاه»
    const handleCreateStoreClick = () => {
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


    return (
        <>
            <div className="w-full h-auto  dark:border-none border-t border-b bg-gg-3 dark:bg-gg-3-dark grid grid-cols-3" dir="rtl">
                <div className="col-start-1 col-span-1 flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl text-gg-4">تو هم می خوای</p>
                    <p className="font-bold text-2xl text-gg-4">بفروشی ؟ </p>
                </div>

                <div className="col-start-2 col-span-1 flex justify-center items-center">
                    <Button
                        id={id}
                        ref={ref}
                        onClick={handleCreateStoreClick}
                        className='bg-gg-4'
                        style={{ fontFamily: 'VAZIR' }}
                        variant="primary"
                        size="lg"
                    >
                        ایجاد فروشگاه
                    </Button>
                </div>

                {/*image*/}
                <div className="col-start-3 col-span-1 w-full h-36
                bg-[url(../../../../../../public/pictures/joinUs.jpg)] bg-center bg-cover bg-no-repeat">
                </div>
            </div>

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

export default JoinUs