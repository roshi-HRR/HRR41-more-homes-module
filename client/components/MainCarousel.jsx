import React from 'react';
import '../styles/Carousel.css';


class MainCarousel extends React.Component {
  constructor(props) {
    super(props)

  }
  componentDidMount() {
    const mainCarousel = document.querySelector('.main-carousel');
    const leftButton = document.querySelector('.main-carousel-button-prev');
    const rightButton = document.querySelector('.main-carousel-button-next');

    const slides = Array.from(mainCarousel.children); //array of cards
    const slideWidth = 320;

    let offset = 0;
    let maxX = (slides.length - 3) * slideWidth;

    rightButton.addEventListener('click', e => {

      //shift cards
      if (offset !== maxX) {
        offset = offset + slideWidth;
        mainCarousel.style.transform = 'translateX(-' + offset + 'px)';
      }
    });

    leftButton.addEventListener('click', e => {

      if (offset !== 0) {
        offset = offset - slideWidth;
        mainCarousel.style.transform = 'translateX(-' + offset + 'px)';
      }

    });

  }

  render() {
    return(
      <div className="main-carousel-wrapper">
        <ul className="main-carousel">
          <li className="card curr-card">1</li>
          <li className="card">2</li>
          <li className="card">3</li>
          <li className="card">4</li>
          <li className="card">5</li>
          <li className="card">6</li>
          <li className="card">7</li>
          <li className="card">8</li>
          <li className="card">9</li>
        </ul>
        <div className="button-wrapper">
          <div className="main-carousel-button-prev">L</div>
          <div className="main-carousel-button-next">R</div>
        </div>

      </div>
    )
  }


}


export default MainCarousel;
