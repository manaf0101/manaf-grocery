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
        navigate(`${basePath}MyProfile/edit`)
    }


    return (
        <>
            <div
                className="relative isolate grid w-full grid-cols-1 overflow-hidden  border border-slate-200 bg-gg-3 shadow-sm transition-colors dark:border-slate-700 dark:bg-gg-3-dark sm:grid-cols-3 "
                dir="rtl"
            >
                <div className="order-2  col-span-1 flex flex-col justify-center items-center  gap-3 px-4 py-5 text-center sm:order-1 sm:items-start sm:px-5 sm:py-6 sm:text-right">
                    <p className="text-base font-bold leading-7 text-gg-4 sm:text-xl lg:text-2xl">
                        تو هم می‌خوای بفروشی؟
                    </p>
                    
                    <div className='w-full flex justify-center items-center'>
                        <Button
                            id={id}
                            ref={ref}
                            onClick={handleCreateStoreClick}
                            className="!flex !min-h-12 !w-full !items-center !justify-center !rounded-xl !border-0 !bg-gg-4 !px-5 !py-3 !text-sm !font-bold !text-white shadow-md transition-all duration-200 hover:!brightness-110 active:!scale-[0.98] sm:!w-auto sm:!min-w-36 sm:!text-base"
                            style={{ fontFamily: 'VAZIR' }}
                            variant="primary"
                            size="lg"
                        >
                            ایجاد فروشگاه
                        </Button>
                    </div>
                </div>

                {/*image*/}
                <div className="order-1 col-span-1 h-36 w-full overflow-hidden bg-[url(/pictures/joinUs.jpg)] bg-cover bg-center bg-no-repeat sm:order-2 sm:col-span-2 sm:h-full sm:min-h-48">
                    <div className="h-full w-full bg-gradient-to-t from-black/30 via-transparent to-transparent sm:bg-gradient-to-l sm:from-transparent sm:via-transparent sm:to-black/10"></div>
                </div>
            </div>

            {/* مودال هشدار تکمیل نبودن پروفایل */}
            <Modal
                show={showIncompleteModal}
                onHide={() => setShowIncompleteModal(false)}
                centered
                dialogClassName="join-us-modal"
            >
                <Modal.Body className="rounded-2xl border border-slate-200 bg-white p-5 text-center text-slate-700 shadow-xl dark:!border-slate-600 dark:!bg-slate-800 dark:!text-slate-100 sm:p-6">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-xl text-amber-600 dark:bg-amber-900/40 dark:text-amber-300">
                        !
                    </div>

                    <p className="mb-4 text-sm font-medium leading-7 sm:text-base">
                        برای استفاده از رابط کاربری مارکت من، ابتدا باید پروفایل خود را کامل کنید!
                    </p>

                    <hr className="mb-4 border-slate-200 dark:border-slate-600" />

                    <div className="flex flex-col justify-center gap-2 sm:flex-row sm:gap-3">
                        <Button
                            variant="primary"
                            onClick={handleGoToProfile}
                            className="!min-h-11 !w-full !rounded-xl !font-bold sm:!w-auto"
                        >
                            تکمیل پروفایل
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={() => setShowIncompleteModal(false)}
                            className="!min-h-11 !w-full !rounded-xl !font-medium sm:!w-auto"
                        >
                            متوجه شدم
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default JoinUs