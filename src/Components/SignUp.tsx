import { Link, useLoaderData } from "react-router-dom";
import { VscEyeClosed } from "react-icons/vsc";
import { HiOutlineEye } from "react-icons/hi2";
import { useState, useEffect, useRef } from "react";
import axios from "axios";


function SignUp() {

    // اطلاعات تمام کاربران که توسط loader از سرور گرفته شده
    const users = useLoaderData() as any[];


    // مربوط به تغییر حالت اینپوت پسوورد با کلیک روی علامت چشم
    const [eye, setEye] = useState(false);
    const [inputType, setInputType] = useState("password");
    const [eyeMark, setEyeMark] = useState(
        <VscEyeClosed className="size-5" />
    );


    useEffect(() => {

        if (eye === false) {

            setInputType("password");

            setEyeMark(
                <VscEyeClosed className="size-5" />
            );

        } else {

            setInputType("text");

            setEyeMark(
                <HiOutlineEye className="size-5" />
            );

        }

    }, [eye]);
    // مربوط به تغییر حالت اینپوت پسوورد با کلیک روی علامت چشم


    const [warningText, setWarningText] = useState(
        "text-red-600 hidden"
    );


    const emailInputValue = useRef<HTMLInputElement>(null);
    const passwordInputValue = useRef<HTMLInputElement>(null);


    // تابعی که با کلیک روی Next عمل می کند
    async function handleButton() {

        const inputValue = emailInputValue.current?.value;
        const passwordValue = passwordInputValue.current?.value;


        // پیدا کردن کاربر بر اساس ایمیل
        const user = users.find(
            (item) =>
                item.userEmail.toLowerCase() ===
                inputValue?.toLowerCase()
        );


        // اگر ایمیل در دیتابیس وجود نداشت
        if (!user) {

            setWarningText("text-red-600");

            return;
        }


        try {

            // بررسی پسورد توسط سرور
            const response = await axios.post(
                "http://localhost:8000/api/check-password",
                {
                    userId: user.userId,
                    password: passwordValue
                }
            );


            // اگر پسورد صحیح بود
            if (response.data.valid) {

                window.open(
                    `/TheUserPage/${user.userId}/main`,
                    "_self"
                );

            } else {

                // پسورد اشتباه است
                setWarningText("text-red-600");

            }


        } catch (error) {

            console.log(
                "Error checking password:",
                error
            );

            setWarningText("text-red-600");

        }

    }
    // تابعی که با کلیک روی Next عمل می کند


    return (
        <>

            <div className="flex flex-row justify-center items-center h-screen dark:bg-gray-800">

                <div className="h-full w-1/6 flex flex-col">

                    <div className="h-1/2 dark:bg-slate-900"></div>

                    <div className="h-1/2 dark:bg-gradient-to-tr from-regal-purple from-10% to-50% to-slate-900"></div>

                </div>


                <div className="justify-center items-center flex flex-col dark:bg-slate-900 h-full w-4/6">

                    {/* کادر کلی فرم */}
                    <div className="dark:text-white dark:bg-slate-900 bg-slate-300 w-2/5 h-auto rounded-lg border-slate-600 border-2 box-content p-3">

                        <form>

                            {/* مربوط به email */}
                            <div className="grid grid-cols-2">

                                <div className="col-start-1 col-span-1">

                                    <p
                                        className="dark:text-teal-400 text-slate-950 ml-2"
                                        style={{
                                            fontFamily: "cursive"
                                        }}
                                    >
                                        email
                                        <span className="text-red-600 ml-2">
                                            *
                                        </span>
                                    </p>

                                </div>

                            </div>
                            {/* مربوط به email */}


                            {/* مربوط به اینپوت ایمیل */}
                            <div className="grid grid-cols-5 mt-2">

                                <div className="flex justify-center items-center col-start-1 col-span-4">

                                    <input
                                        onChange={() =>
                                            setWarningText(
                                                "text-red-600 hidden"
                                            )
                                        }
                                        ref={emailInputValue} 
                                        type="text"
                                        className="p-1 dark:bg-slate-900 w-full rounded-lg border-2 border-slate-600 focus-visible:outline-none dark:caret-teal-400"
                                    />

                                </div>

                            </div>
                            {/* مربوط به اینپوت ایمیل */}


                            {/* مربوط به پسوورد */}
                            <div className="grid grid-cols-2 mt-10">

                                <div className="col-start-1 col-span-1">

                                    <p
                                        className="dark:text-teal-400 text-slate-950 ml-2"
                                        style={{
                                            fontFamily: "cursive"
                                        }}
                                    >
                                        password
                                        <span className="text-red-600 ml-2">
                                            *
                                        </span>
                                    </p>

                                </div>

                            </div>
                            {/* مربوط به پسوورد */}


                            {/* مربوط به اینپوت پسوورد و چشم */}
                            <div className="grid grid-cols-5 mt-2">

                                <div className="flex justify-center items-center col-start-1 col-span-4">

                                    <input
                                        onChange={() =>
                                            setWarningText(
                                                "text-red-600 hidden"
                                            )
                                        }
                                        ref={passwordInputValue}
                                        type={inputType}
                                        className="p-1 dark:bg-slate-900 w-full rounded-lg border-2 border-slate-600 focus-visible:outline-none dark:caret-teal-400"
                                    />

                                </div>


                                {/* علامت چشم */}
                                <div className="col-start-5 col-span-1 flex items-center justify-center">

                                    <button
                                        onClick={(e) => {

                                            e.preventDefault();

                                            setEye(!eye);

                                        }}
                                        name="eyeButton"
                                    >
                                        {eyeMark}
                                    </button>

                                </div>
                                {/* علامت چشم */}

                            </div>
                            {/* مربوط به اینپوت پسوورد و چشم */}


                            <div className="grid grid-cols-1">

                                <div
                                    className="col-start-1 col-span-1 mt-2 flex justify-start items-center"
                                    dir="rtl"
                                >

                                    <p className={warningText}>
                                        ایمیل یا نام کابری اشتباه می باشد !
                                    </p>

                                </div>

                            </div>


                            {/* دکمه ی next */}
                            <div className="grid grid-cols-3">

                                <div className="col-start-2 col-span-1 flex justify-center items-center">

                                    <button
                                        onClick={handleButton}
                                        className="btn btn-outline-secondary mt-4"
                                        name="ll"
                                        type="button"
                                    >
                                        next
                                    </button>

                                </div>

                            </div>
                            {/* دکمه ی next */}

                        </form>

                    </div>
                    {/* کادر کلی فرم */}


                    <div className="m-4 text-slate-600 dark:text-slate-600 hover:text-slate-950 dark:hover:text-slate-400">

                        <Link to={"/signUP"}>
                            <p className="underline">
                                Forgot password/username ?
                            </p>
                        </Link>

                    </div>

                </div>


                <div className="dark:bg-gradient-to-bl from-regal-blue from-20% to-40% to-slate-900 h-full w-1/6"></div>

            </div>

        </>
    );
}


export default SignUp;