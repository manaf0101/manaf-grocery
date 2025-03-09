
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import Slider from 'react-slick';
import Items from "./Items";


const SampleNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div dir="ltr" className=""
      onClick={onClick}
    >
        <MdArrowBackIosNew className="size-7 dark:text-white"/>
    </div>   
  );
};

const SamplePrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="fdd" dir="rtl"
      onClick={onClick}
    >
        <MdArrowForwardIos className="size-7 dark:text-white"/>
    </div>
  );
};

function CategorySlider() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "40px",
    slidesToShow: 4,
    speed: 500,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow /> ,
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
              padding: 5px 40px !important;
          }
            
        `}
      </style>

      <section className="w-full h-auto">
        <div className="slider-container">
          <Slider {...settings}>
            <Items />
            <Items />
            <Items />
            <Items />
            <Items />
          </Slider>
        </div>
      </section>
    </>
  );
}

export default CategorySlider;
