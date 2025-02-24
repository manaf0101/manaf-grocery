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
      autoplaySpeed: 2000,
      pauseOnHover: true
    };
    return (
      <div className=" slider-container mt-2 ">
        <Slider  {...settings}>
          <div className="h-52 bg-[url(../../../../../../public/pictures/elegant-smartphone-composition.jpg)] bg-cover">
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
    );
  }
  
  export default PauseOnHover;
  