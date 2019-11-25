import React, { Component } from "react";
import './App.css';
import Figure from './components/Figure';

class App extends Component {
  state = {
    message: null,
  };
  
  componentDidMount() {
    this.getNewestFigures();
  }
  
  getNewestFigures = () => {
    fetch('http://localhost:3001/api/new')
      .then((data) => data.json())
      .then((res) => this.setState({ message: res.message }));
  };
  
  render() {
    const { message } = this.state;

    if (!message) {
      return <div>loading...</div>
    }
    return <div>
      {message.map((value, index) => {
        return <Figure data={value} />
      })}
    </div>;
  }
}

export default App;