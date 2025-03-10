
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

const SamplePrevArrow = (props: any) => {
  const { onClick } = props;
  return (
      <div className= "fdd bg-gg-5 dark:bg-slate-800 m-1 rounded-sm" dir="rtl" onClick={onClick}>
      <MdArrowForwardIos className="size-10 rounded-lg bg-gg-3" />
    </div>
  );
};

function CategorySlider() {
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

      <section className="w-full h-auto">
        <div className="slider-container">
          <Slider {...settings}>
            <Items tag="مواد غذایی" children = {<IoFastFood className="size-16"/>}/>
            <Items tag="مد و پوشاک" children = {<GiClothes className="size-16"/>} />
            <Items tag="خانه و آشپز خانه" children = {<FaKitchenSet className="size-16"/>} />
            <Items tag="صنایع دستی" children = {<FaGlassMartini className="size-16"/>} />
            <Items tag="سلامت و درمان" children = {<GiHealthPotion className="size-16"/>} />
            <Items tag="آرایشی و بهداشتی" children = {<GiLipstick className="size-16"/>} />
            <Items tag="فرهنگی،آموزشی" children = {<FaBook className="size-16"/>} />
            <Items tag="ورزشی" children = {<FaVolleyball className="size-16"/>} />
            <Items tag="خدمات،کسب وکار" children = {<MdOutlineWork className="size-16"/>} />
            <Items tag="کالای دیجیتال" children = {<FaPlugCircleBolt className="size-16"/>} />
            <Items tag="خودرویی" children = {<FaCar className="size-16"/>} />
            <Items tag="طلا" children = {<GiGoldBar className="size-16"/>} />
            <Items tag="کتاب" children = {<FaBookOpen className="size-16"/>} />
          </Slider>
        </div>
      </section>
    </>
  );
}

export default CategorySlider;
