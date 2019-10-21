import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import MainCarousel from './components/MainCarousel.jsx'
import './styles/style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: null
    };

    this.getHomes = this.getHomes.bind(this);
  }

  //ajax get request
  getHomes() {
    var saveHomes = function(data) {
      this.setState({homes: data});
    }.bind(this);

    $.ajax({
      url: '/homes',
      type: 'GET',
      success: function(data) {
        console.log('data----> ', data);
        saveHomes(data);
      },
      error: function(err) {
        console.log('err-----> ', err);
      }
    });
  };

  componentDidMount(){
    this.getHomes();
  }

  render() {
    const { homes } = this.state;

    if (homes === null) {
      return null;
    }
    return(
      <div className="main-wrapper">
        <div className="module-title">
        <div >More homes you may like</div>
        </div>
        {/* Carousel Component */}
        <MainCarousel homes={this.state.homes} />
      </div>
    )
  };
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);