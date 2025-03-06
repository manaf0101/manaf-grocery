// ******** کتابخانه ی React Slick 
// ******** این فایل جهت استفاده در Market.tsx می باشد و اسلاید را نشان می دهد 
// ******** از سایت https://react-slick.neostack.com/

import Slider from "react-slick";



function PauseOnHover() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    arrows : true
  };
  return (
    <div className=" slider-container dark:bg-slate-900">
      {/* استایل برای نقطه های زیر اسلایدر */}
      <style>
        {`  
    .dark .slick-dots li button:before {  
      color: #ffffff; /* رنگ سفید برای حالت دارک */  
    }  
    .dark .slick-dots li.slick-active button:before {  
      color: #ffffff; /* رنگ سفید برای دات فعال در حالت دارک */  
    }  
  `}
      </style>
      <Slider {...settings}>
        <div className="h-52 bg-[url(../../../../../../public/pictures/elegant-smartphone-composition.jpg)] bg-cover">
        </div>
        <div className="h-52 bg-[url(../../../../../../public/pictures/elegant-smartphone-composition.jpg)] bg-cover">
        </div>
        <div className="h-52 bg-[url(../../../../../../public/pictures/elegant-smartphone-composition.jpg)] bg-cover">
        </div>
        <div className="h-52 bg-[url(../../../../../../public/pictures/elegant-smartphone-composition.jpg)] bg-cover">
        </div>
        <div className="h-52 bg-[url(../../../../../../public/pictures/elegant-smartphone-composition.jpg)] bg-cover">
        </div>
        <div className="h-52 bg-[url(../../../../../../public/pictures/elegant-smartphone-composition.jpg)] bg-cover">
        </div>
      </Slider>
    </div>
  );
}

export default PauseOnHover;

// import Carousel from 'react-elastic-carousel';

// const Item = ({ children }: { children: React.ReactNode }) => (
//   <div className="item">
//     {children}
//   </div>
// );

// function PauseOnHover() {
//   return (
//     <div>
//       <div>
//         <Carousel enableAutoPlay autoPlaySpeed={1500}>
//             <Item>1</Item>
//             <Item>2</Item>
//             <Item>3</Item>
//             <Item>4</Item>
//             <Item>5</Item>
//             <Item>6</Item>
//         </Carousel>
//       </div>
//     </div>
//   );
// }

// export default PauseOnHover;  