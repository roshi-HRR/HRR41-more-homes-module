import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MainCarousel from './components/MainCarousel.jsx'
import './styles/style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: null
    };

  }



  componentDidMount(){
    const homeId = new URL(window.location.href).searchParams.get('house_id');

    axios.get('/homes', {
      params: {
        'id': homeId
      }
    })
    .then((response) => {
      this.setState({homes: response.data[0].homes});
    })
    .catch((error) => {
      console.log(error);
    });

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
