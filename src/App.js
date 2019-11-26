import React, { Component } from "react";
import './App.css';
import Figure from './components/Figure';
import FigureShowcase from "./components/FigureShowcase";

class App extends Component {
  state = {
    message: null,
    selected: null
  };
  
  componentDidMount() {
    this.getNewestFigures();
  }

  clicked(figure) {
    this.setState({
      selected: figure
    });
  }
  
  getNewestFigures = () => {
    fetch('http://localhost:3001/api/new')
      .then((data) => data.json())
      .then((res) => this.setState({ message: res.message }));
  };
  
  render() {
    const { message, selected } = this.state;

    if (!message) {
      return <div>loading...</div>
    }
    return <div>
      <h1>Updated on AmiAmi</h1>
      <div className = "content">
      <div className="amiami-list">
      {message.map((value, index) => {
        return <Figure data={value} onClick={() => this.clicked(value.gcode)} />
      })}
    </div>
    <div className = "showcase">
      {(selected) &&
        <div className="preview"><FigureShowcase gname={selected}/></div>
      }}
    </div>
    </div>
    </div>;
  }
}

export default App;