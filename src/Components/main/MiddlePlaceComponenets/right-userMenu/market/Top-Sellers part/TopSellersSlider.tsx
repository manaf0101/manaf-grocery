// جهت کتابخانه ی  Aos
import { useEffect } from "react";
import Aos from "aos";
// جهت کتابخانه ی  Aos

import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import Slider from 'react-slick';
import SellerProfile from "./SellerProfile";

const SampleNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div dir="ltr" className="fdd  dark:bg-slate-800 m-1 rounded-sm"
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
    <div className="fdd  dark:bg-slate-800 m-1 rounded-sm" dir="rtl" onClick={onClick}>
      <MdArrowForwardIos className="size-10 rounded-lg bg-gg-3" />
    </div>
  );
};
// فلش سمت راست

function TopSellersSlider() {
  // جهت کتابخانه ی  Aos
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  // جهت کتابخانه ی  Aos

  // فلش سمت چپ




  // تنظیمات دیو اسلایدر
  const settings = {
    className: "centeer",
    centerMode: true,
    infinite: true,
    centerPadding: "40px",
    slidesToShow: 3,
    speed: 500,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
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

  return (
    <>
      <style>
        {`  
           .centeer {
            display: flex;
            flex-direction: row-reverse
          }

          .slider-containeer .slick-slider .slick-list {
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
        <div className="slider-containeer">
          <Slider {...settings}>
            <SellerProfile />
            <SellerProfile />
            <SellerProfile />
            <SellerProfile />
            <SellerProfile />
            <SellerProfile />
            <SellerProfile />
            <SellerProfile />
            <SellerProfile />
            <SellerProfile />
            <SellerProfile />
            <SellerProfile />
            <SellerProfile />
          </Slider>
        </div>
      </section>
    </>
  );
};

export default TopSellersSlider;