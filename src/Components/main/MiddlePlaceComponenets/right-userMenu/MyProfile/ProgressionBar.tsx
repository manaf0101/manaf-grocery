import { useLoaderData } from "react-router-dom";


type User = {
    userEmail: string;
    username: string;
    password: string;
    userId: string;
    userPhone?: number;
    userBirth?: string;
    userNationalityCode?: number;
    userProfileImage?: string ; 
};

export default function ProgressionBar() {

    const user = useLoaderData() as User

    const profileFields = [
        user.userEmail,
        user.username,
        user.password,
        user.userPhone,
        user.userBirth,
        user.userNationalityCode,
        user.userProfileImage ,
    ];

    // حساب کردن تعداد فیلد های تکمیل شده
    const completedFields = profileFields.filter(
        field => field !== undefined && field !== null && field !== ""
    ).length
    // حساب کردن تعداد فیلد های تکمیل شده

    // درصد فیلد های تکمیل شده
    const profileProgress = Math.round(
        (completedFields / profileFields.length) * 100
    )
    // درصد فیلد های تکمیل شده
    return (
        <>
            <div className="p-4 flex items-center flex-col border-1 ">
                <div className="flex justify-between mb-2">


                    <p className="text-sm dark:text-white font-medium">
                        شما
                        <span className="text-blue-500 font-bold  mr-2 ml-2">
                            {profileProgress}%
                        </span>
                        از پروفایل خود را تکمیل کرده اید . 
                    </p>



                </div>
                <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden ">

                    <div
                        className="h-full bg-green-600 dark:bg-blue-500 rounded-full flex  transition-all duration-500"
                        style={{
                            width: `${profileProgress}%`
                        }}
                    />
                </div>
            </div>
        </>
    )
}
