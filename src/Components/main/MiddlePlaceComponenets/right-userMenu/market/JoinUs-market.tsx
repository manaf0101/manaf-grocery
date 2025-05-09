import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';

    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه
import { useActiveSection } from '../../../../contexts/ActiveSectionContext';
import {useInView} from 'react-intersection-observer'
    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه


interface JoinUsProps {
    id : string
}


function JoinUs({id} : JoinUsProps) {

    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه
    const {setActiveSection} = useActiveSection() ;
    const {ref , inView} = useInView({threshold : 0.5})

    useEffect(() => {
        if (inView) {
            setActiveSection(id)
        }
    } , [inView , id , setActiveSection])
    // برای بولد شدن ساید بار سمت چپ بار رسیدن کاربر به بخش مربوطه

    
    return (
        <>
        <div  className="w-full h-auto  dark:border-none border-t border-b bg-gg-3 dark:bg-gg-3-dark grid grid-cols-3" dir="rtl">
            <div className="col-start-1 col-span-1 flex flex-col justify-center items-center">
                <p className="font-bold text-2xl text-gg-4">تو هم می خوای</p>
                <p className="font-bold text-2xl text-gg-4">بفروشی ؟ </p>
            </div>

                <div className="col-start-2 col-span-1 flex justify-center items-center">
                    <Button id={id} ref={ref} className='bg-gg-4' style={{fontFamily:'VAZIR'}} variant="primary" size="lg">
                        ایجاد فروشگاه 
                    </Button>
                </div>

            {/*image*/}
            <div className="col-start-3 col-span-1 w-full h-36
                bg-[url(../../../../../../public/pictures/joinUs.jpg)] bg-center bg-cover bg-no-repeat">
            </div>
        </div>
        </>
    )
}

export default JoinUs