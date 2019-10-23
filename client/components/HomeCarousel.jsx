import React from 'react';
import '../styles/homeCarousel.css';
import $ from 'jquery';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';


class HomeCarousel extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      // homes
      homeCarousel: null,
      prevButton: null,
      nextButton: null,
      id: this.props.id,
      slideOffset: 0,
      slidesTotal: this.props.photos.length,
      slideWidth: 300, //I know, hardcoded, need to find a fix
      slideMaxX: null,
      controls: null,
      //dots
      indicatorDots: null,
      dotsOffset: 0,
      dotsindex: 0,
      dotsTotal: this.props.photos.length,
      dotsWidth: 17, //I know, hardcoded, need to find a fix
      dotsMaxX: null,
      allDots: null,
      currDot: 0

    }
  // home
  this.moveSlides = this.moveSlides.bind(this);
  // dots
  this.moveDots = this.moveDots.bind(this);
  this.setupDots = this.setupDots.bind(this);

  //click left and right
  this.nextClick = this.nextClick.bind(this);
  this.prevClick = this.prevClick.bind(this);


  }

  //for photos
  moveSlides(moveAmount) {
    this.state.homeCarousel.style.transform = 'translateX(-' + moveAmount + 'px)';
    console.log(this.state.slidesWidth);
  };

  // for dots
  moveDots(moveAmount) {
    this.state.indicatorDots.style.transform = 'translateX(-' + moveAmount + 'px)';
  };

  nextClick() {
    if (this.state.slideOffset !== this.state.slideMaxX) {
      this.state.slideOffset += this.state.slideWidth;
      this.moveSlides(this.state.slideOffset);

      //current dot highlight
      this.state.indicatorDots.children[this.state.currDot].classList.remove('curr-dot');
      this.state.currDot += 1;
      this.state.indicatorDots.children[this.state.currDot].classList.add('curr-dot');
    };

    //delay dots movement to keep in center
    if (this.state.dotsOffset !== this.state.dotsMaxX) {
      if (this.state.currDot >= 4) {
        if (this.state.currDot <=  (this.state.dotsTotal - 4)) {
          this.state.dotsOffset += this.state.dotsWidth;
          this.moveDots(this.state.dotsOffset);

          if(this.state.indicatorDots.children[(this.state.currDot-4)].classList.contains('small-dots')) {
            this.state.indicatorDots.children[(this.state.currDot-4)].classList.remove('small-dots')
          };

          if(this.state.indicatorDots.children[(this.state.currDot+2)].classList.contains('small-dots')) {
            this.state.indicatorDots.children[(this.state.currDot+2)].classList.remove('small-dots')
          };

          this.state.indicatorDots.children[(this.state.currDot-3)].classList.add('small-dots');
          this.state.indicatorDots.children[(this.state.currDot+3)].classList.add('small-dots');

          if(this.state.currDot === (this.state.dotsTotal - 4)) {
            if(this.state.indicatorDots.children[this.state.dotsTotal-1].classList.contains('small-dots')) {
              this.state.indicatorDots.children[this.state.dotsTotal-1].classList.remove('small-dots')
            };
          };
        };
      };
    };
  }

  prevClick() {
    if (this.state.slideOffset !== 0) {
      this.state.slideOffset -= this.state.slideWidth;
      this.moveSlides(this.state.slideOffset);

      //current dot highlight
      this.state.indicatorDots.children[this.state.currDot].classList.remove('curr-dot');
      this.state.currDot -= 1;
      this.state.indicatorDots.children[this.state.currDot].classList.add('curr-dot');
    };

    //delay dots movement to keep in center
    if (this.state.dotsOffset !== 0) {
      if (this.state.currDot >= 3) {
        if (this.state.currDot <=  (this.state.dotsTotal - 5)) {
          this.state.dotsOffset -= this.state.dotsWidth;
          this.moveDots(this.state.dotsOffset);

          if(this.state.indicatorDots.children[(this.state.currDot-2)].classList.contains('small-dots')) {
            this.state.indicatorDots.children[(this.state.currDot-2)].classList.remove('small-dots')
          };

          if(this.state.indicatorDots.children[(this.state.currDot+4)].classList.contains('small-dots')) {
            this.state.indicatorDots.children[(this.state.currDot+4)].classList.remove('small-dots')
          };

          this.state.indicatorDots.children[(this.state.currDot-3)].classList.add('small-dots');
          this.state.indicatorDots.children[(this.state.currDot+3)].classList.add('small-dots');

          if(this.state.currDot === 3) {
            if(this.state.indicatorDots.children[0].classList.contains('small-dots')) {
              this.state.indicatorDots.children[0].classList.remove('small-dots')
            };
          }
        };
      };
    };
  }

  setupDots() {
    this.state.indicatorDots.children[0].classList.add('curr-dot');
    this.state.indicatorDots.children[6].classList.add('small-dots');
  }



  componentDidMount() {
    this.setState({
      homeCarousel: document.querySelector('.home-carousel'+this.props.id),
      prevButton: document.querySelector('.home-carousel-button-prev'),
      nextButton: document.querySelector('.home-carousel-button-next'),
      // slideWidth: setTimeout(() => {document.querySelector('.slide').style.width}, 0),
      slideMaxX: this.state.slideWidth * (this.state.slidesTotal - 1),

      indicatorDots: document.querySelector('.indicator-dots'+this.props.id),
      dotsMaxX: this.state.dotsWidth * (this.state.dotsTotal - 7),

    });

    setTimeout(() => {this.setupDots()}, 0);

    $(".home-button-wrapper").hover(function(){
      $(this).css("opacity", "1");
      }, function(){
      $(this).css("opacity", "0");
    });
  }


  render() {

    return(
      <div className="home-carousel-wrapper">
        <ul className={'home-carousel'+this.props.id+'  home-carousel'}>
          {this.props.photos.map((photo, i) => {
            return(
              <li className="slide" key={i} >
                <img src={photo}
                key={i} />
              </li>
            )
          })
          }

        </ul>
        <div className="home-button-wrapper" >
          <div className="home-carousel-button-prev" onClick={this.prevClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div className="home-carousel-button-next" onClick={this.nextClick}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
        <div className="indicator-wrapper">
          <ul className={'indicator-dots'+this.props.id+' indicator-dots'}>
            {this.props.photos.map((item, i) =>{
              return(
                <li className="indicator-dot" key={i+'id'}></li>
              )
            }
            )}
          </ul>
          </div>
          <div className="favorite">
            <FontAwesomeIcon icon={faHeartRegular} />
          </div>

          {/* <div className="login-modal modal-shadow"></div> */}
      </div>
    )
  }
}

export default HomeCarousel;
