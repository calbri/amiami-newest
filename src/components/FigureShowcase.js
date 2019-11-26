import React, { Component } from "react";

class FigureShowcase extends Component {   
    state = {
        message: null
      };

    componentDidMount() {
        this.lookup();
    }
      
      lookup = () => {
        const { gname } = this.props;
        fetch('http://localhost:3001/api/item/'+gname)
          .then((data) => data.json())
          .then((res) => this.setState({ message: res.message }));
      };
    
    render() {
      const {message} = this.state;
    
      if (!message) {
          return <div>loading....</div>
      }

      return <div className="figure-showcase">
            <div className="showcase-name">{message.gname}</div>
        </div>;
    }
  }
  
  export default FigureShowcase;