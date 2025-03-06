import { BsDisplay } from "react-icons/bs";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import Slider from 'react-slick';


const SampleNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div dir="ltr" className=""
      onClick={onClick}
    >
        <MdArrowBackIosNew />
    </div>   
  );
};

const SamplePrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="fdd" dir="rtl"
      onClick={onClick}
    >
        <MdArrowForwardIos />
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
          .dark .slick-dots li button:before {  
            color: #ffffff; /* رنگ سفید برای حالت دارک */  
          }  
          .dark .slick-dots li.slick-active button:before {  
            color: #ffffff; /* رنگ سفید برای دات فعال در حالت دارک */  
          }  
          .custom-arrow {
            width: 20px;
            height: 20px;
            background: black ;
            color: aqua !important;
            border-radius: 10%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
          }
            .custom-arrow:hover {
            background: black; /* Change color on hover */
          }
          .dark .custom-arrow {
            background: #020617;
          }
          .custom-next-arrow {
            right: 10px;
          }
          .custom-prev-arrow {
            left: 10px;
          }

           .center {
            display: flex;
            flex-direction: row-reverse
          }
            
        `}
      </style>

      <section className="w-full h-auto">
        <div className="slider-container">
          <Slider {...settings}>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider>
        </div>
      </section>
    </>
  );
}

export default CategorySlider;
