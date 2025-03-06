import Carousel from 'react-bootstrap/Carousel';



function Slider2() {
  return (
    <Carousel pause={'hover'} interval={1} prevLabel={null}>
      <Carousel.Item>
      <div className="h-52 bg-[url(../../../../../../public/pictures/elegant-smartphone-composition.jpg)] bg-cover">
      </div>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div className="h-52 bg-[url(../../../../../../public/pictures/elegant-smartphone-composition.jpg)] bg-cover">
      </div>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div className="h-52 bg-[url(../../../../../../public/pictures/elegant-smartphone-composition.jpg)] bg-cover">
      </div>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider2;