import Tips from "./Tips"

// 1
import { TbCircleNumber1Filled } from "react-icons/tb";
// 1


function Start () {
    return (
        <>
        {/* نکته ی شماره ی 1 */}
            <Tips className="mt-4" icon={<TbCircleNumber1Filled className="size-8 dark:text-cyan-100"/>}>
            {
            <p className="leading-loose dark:text-cyan-500">
                فروشگاه manaf grocery یک فروشگاه کسب و کار آنلاین می باشد و برای شروع بهتر است بدانید که شما می توانید به دو طریق در این فروشگاه فعالیت کنید : ۱-فروشنده(داشتن حساب کاربری الزامی) 2-خریدار (داشتن حساب کاربری الزامی نیست). اما شایان به ذکر است برای داشتن تجربه ی بهتر ، پیشنهاد میشود حساب کاربری باز کنید . 
            </p>
            }
            </Tips>
        {/* نکته ی شماره ی 1 */}

        {/* نکته ی شماره ی 2  */}
        
        {/* نکته ی شماره ی 2  */}
        </>
    )
}

export default Start