import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {homes: []};

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
    return(
      <div>
        <h1>More homes you may like</h1>
        {/* Carousel Component */}
      </div>
    )
  };
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);