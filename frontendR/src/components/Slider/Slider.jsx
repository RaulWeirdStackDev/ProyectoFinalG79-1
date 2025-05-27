import Carousel from 'react-bootstrap/Carousel';
import './slider.css'

export function Slider() {
  return (
    <>
    <div className='container'>
    <Carousel>
      <Carousel.Item className="slider-item">
        <img
          src="/imagen1.jpeg"
          alt="First slide"
          style={{ width: '100%', height: '250px' }} 
        />
        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="slider-item">
        <img
          src="/imagen2.jpeg"
          alt="Second slide"
          style={{ width: '100%', height: '250px' }} 
        />
        <Carousel.Caption>
          {/* <h3>Second slide label</h3>
          <p>Descripción de la segunda imagen.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    </>
  );
}

