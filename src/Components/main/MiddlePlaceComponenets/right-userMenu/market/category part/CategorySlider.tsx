import { useNavigate, useParams } from "react-router-dom";

import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { FaKitchenSet } from "react-icons/fa6";
import { FaGlassMartini } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { GiHealthPotion } from "react-icons/gi";
import { GiLipstick } from "react-icons/gi";
import { FaVolleyball } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { FaPlugCircleBolt } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { GiGoldBar } from "react-icons/gi";
import { FaBookOpen } from "react-icons/fa";
import Slider from 'react-slick';
import Items from "./Items";

// جهت کتابخانه ی  Aos وقتی اسکرول می کنیم به پایین ، آیتم ها را با حالت مکس می آورد
import { useEffect } from "react";
import Aos from "aos";
// جهت کتابخانه ی  Aos

// فلش سمت چپ
const SampleNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div dir="ltr" className= "fdd bg-gg-5 dark:bg-slate-800 m-1 rounded-sm"
      onClick={onClick}
    >
      <MdArrowBackIosNew className="size-10 rounded-lg bg-gg-3" />
    </div>
  );
};
// فلش سمت چپ

// فلش سمت راست
const SamplePrevArrow = (props: any) => {
  const { onClick } = props;
  return (
      <div className= "fdd bg-gg-5 dark:bg-slate-800 m-1 rounded-sm" dir="rtl" onClick={onClick}>
      <MdArrowForwardIos className="size-10 rounded-lg bg-gg-3" />
    </div>
  );
};
// فلش سمت راست


function CategorySlider() {

  // جهت کتابخانه ی  Aos
      useEffect(() => {
        Aos.init({ duration: 1000 });
      }, []);
      // جهت کتابخانه ی  Aos

    // تنظیمات دیو اسلایدر
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "40px",
    slidesToShow: 3,
    speed: 500,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive : [
      //**تا اسکرین سایز هزار ، یک اسلاید نشان می دهد ولی از
      //**هزار به بعد فقط تعداد پیش فرض یعنی سه عدد .
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };
    // تنظیمات دیو اسلایدر


    const navigate = useNavigate()
  const { userId } = useParams<{ userId: string }>()

  // با کلیک روی هر دسته‌بندی، کاربر به صفحه‌ی AllProducts هدایت می‌شه
  // و تگ انتخاب‌شده به‌صورت query string همراهش می‌ره
  const goToCategory = (tag: string) => {
    navigate(`/TheUserPage/${userId}/main/userMenu/all-products?tag=${encodeURIComponent(tag)}`)
  }

  return (
    <>
      <style>
        {`  
           .center {
            display: flex;
            flex-direction: row-reverse
          }

          .slider-container .slick-slider .slick-list {
              padding: 0px 40px !important;
              height: auto;    
          }
          
          .fdd {
              display: flex;
              flex-direction: column;
              justify-content: center;
          }
            
        `}
      </style>

      <section data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" className="w-full h-auto">
        <div className="slider-container">
          <Slider {...settings}>
<div onClick={() => goToCategory("مواد غذایی")} className="cursor-pointer">
              <Items tag="مواد غذایی" children={<IoFastFood className="size-16" />} />
            </div>
            <div onClick={() => goToCategory("مد و پوشاک")} className="cursor-pointer">
              <Items tag="مد و پوشاک" children={<GiClothes className="size-16" />} />
            </div>
            {/* تگ اصلاح شد: قبلاً "خانه و آشپز خانه" بود، تا با مقدار واقعی محصولات یکی بشه "خانه و آشپزخانه" شد */}
            <div onClick={() => goToCategory("خانه و آشپزخانه")} className="cursor-pointer">
              <Items tag="خانه و آشپزخانه" children={<FaKitchenSet className="size-16" />} />
            </div>
            <div onClick={() => goToCategory("صنایع دستی")} className="cursor-pointer">
              <Items tag="صنایع دستی" children={<FaGlassMartini className="size-16" />} />
            </div>
            <div onClick={() => goToCategory("سلامت و درمان")} className="cursor-pointer">
              <Items tag="سلامت و درمان" children={<GiHealthPotion className="size-16" />} />
            </div>
            <div onClick={() => goToCategory("آرایشی و بهداشتی")} className="cursor-pointer">
              <Items tag="آرایشی و بهداشتی" children={<GiLipstick className="size-16" />} />
            </div>
            {/* تگ اصلاح شد: "فرهنگی،آموزشی" -> "فرهنگی آموزشی" */}
            <div onClick={() => goToCategory("فرهنگی آموزشی")} className="cursor-pointer">
              <Items tag="فرهنگی آموزشی" children={<FaBook className="size-16" />} />
            </div>
            <div onClick={() => goToCategory("ورزشی")} className="cursor-pointer">
              <Items tag="ورزشی" children={<FaVolleyball className="size-16" />} />
            </div>
            {/* تگ اصلاح شد: "خدمات،کسب وکار" -> "خدمات و کسب و کار" */}
            <div onClick={() => goToCategory("خدمات و کسب و کار")} className="cursor-pointer">
              <Items tag="خدمات و کسب و کار" children={<MdOutlineWork className="size-16" />} />
            </div>
            <div onClick={() => goToCategory("کالای دیجیتال")} className="cursor-pointer">
              <Items tag="کالای دیجیتال" children={<FaPlugCircleBolt className="size-16" />} />
            </div>
            <div onClick={() => goToCategory("خودرویی")} className="cursor-pointer">
              <Items tag="خودرویی" children={<FaCar className="size-16" />} />
            </div>
            <div onClick={() => goToCategory("طلا")} className="cursor-pointer">
              <Items tag="طلا" children={<GiGoldBar className="size-16" />} />
            </div>
            <div onClick={() => goToCategory("کتاب")} className="cursor-pointer">
              <Items tag="کتاب" children={<FaBookOpen className="size-16" />} />
            </div>
          </Slider>
        </div>
      </section>
    </>
  );
}

export default CategorySlider;
