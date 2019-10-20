import React from 'react';
import '../styles/homeCarousel.css';

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
      slideWidth: 300, //I know, hardcoded, need to find a workaround
      slideMaxX: null,
      //dots
      indicatorDots: null,
      dotsOffset: 0,
      dotsindex: 0,
      dotsTotal: this.props.photos.length,
      dotsWidth: 17, //I know, hardcoded, need to find a workaround
      dotsMaxX: null,
      allDots: null,
      currDot: 0
      // currentDot: null,
      // endDotLeft: null,
      // endDotRight: null,

    }
  // home
  this.moveSlides = this.moveSlides.bind(this);
  // dots
  this.moveDots = this.moveDots.bind(this);
  this.setupDots = this.setupDots.bind(this);

  this.nextClick = this.nextClick.bind(this);
  this.prevClick = this.prevClick.bind(this);
  }

  //for photos
  moveSlides(moveAmount) {
    this.state.homeCarousel.style.transform = 'translateX(-' + moveAmount + 'px)';
    console.log(this.state.indicatorDots.children);
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

    //secondary offset to keep track of index, if index is certain num, start real offset
    if (this.state.dotsOffset !== this.state.dotsMaxX) {
      if (this.state.currDot >= 4) {
        if (this.state.currDot <=  (this.state.dotsTotal - 4)) {
          this.state.dotsOffset += this.state.dotsWidth;
          this.moveDots(this.state.dotsOffset);
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
    if (this.state.dotsOffset !== 0) {
      if (this.state.currDot >= 3) {
        if (this.state.currDot <=  (this.state.dotsTotal - 5)) {
          this.state.dotsOffset -= this.state.dotsWidth;
          this.moveDots(this.state.dotsOffset);
        };
      };
    };
  }

  setupDots() {
    this.state.indicatorDots.children[0].classList.add('curr-dot');
  }

  componentDidMount() {
    this.setState({
      homeCarousel: document.querySelector('.home-carousel'+this.props.id),
      prevButton: document.querySelector('.home-carousel-button-prev'),
      nextButton: document.querySelector('.home-carousel-button-next'),
      // slideWidth: document.querySelector('.slide').style.width,
      slideMaxX: this.state.slideWidth * (this.state.slidesTotal - 1),

      indicatorDots: document.querySelector('.indicator-dots'+this.props.id),
      dotsMaxX: this.state.dotsWidth * (this.state.dotsTotal - 7),

    });

    setTimeout(()=>{this.setupDots()}, 0);


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
        <div className="button-wrapper">
          <div className="home-carousel-button-prev" onClick={this.prevClick}>L</div>
          <div className="home-carousel-button-next" onClick={this.nextClick}>R</div>
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
      </div>
    )
  }
}

export default HomeCarousel;
