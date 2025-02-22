import Slider from "react-slick";  

function PauseOnHover() {  
  const settings = {  
    dots: true,  
    infinite: true,  
    speed: 500,  
    slidesToShow: 3,  
    slidesToScroll: 1,  
    autoplay: true,  
    autoplaySpeed: 2000,  
    pauseOnHover: true,  
    responsive: [  
      {  
        breakpoint: 1024, // lg  
        settings: {  
          slidesToShow: 3,  
          slidesToScroll: 1,  
        },  
      },  
      {  
        breakpoint: 768, // md  
        settings: {  
          slidesToShow: 3,  
          slidesToScroll: 1,  
        },  
      },  
      {  
        breakpoint: 640, // sm  
        settings: {  
          slidesToShow: 1,  
          slidesToScroll: 1,  
        },  
      },  
    ],  
  };  

  const slides = [  
    { id: 1, bgImage: "../../../../../../public/pictures/elegant-smartphone-composition.jpg" },  
    { id: 2, bgColor: "gray-200" },  
    { id: 3, bgColor: "gray-200" },  
    { id: 4, bgColor: "gray-200" },  
    { id: 5, bgColor: "gray-200" },  
    { id: 6, bgColor: "gray-200" },  
  ];  

  return (  
    <section className="w-full h-auto">  
      <div className="container ">  
        <Slider {...settings}>  
          {slides.map((slide) => (  
            <div  
              key={slide.id}  
              className={`w-full h-52 ${slide.bgImage ? `bg-[url(${slide.bgImage})]` : `bg-${slide.bgColor}`} bg-cover`}  
            ></div>  
          ))}  
        </Slider>  
      </div>  
    </section>  
  );  
}  

export default PauseOnHover;