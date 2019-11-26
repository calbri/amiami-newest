import React, { Component } from "react";

class FigureShowcase extends Component {   
    state = {
        message: null
      };

    componentDidMount() {
      const {gname} = this.props;
      this.lookup(gname);
    }

    componentWillReceiveProps(nextProps) {
      const {gname} = this.props;
      
      if (nextProps.gname !== gname) {
        this.setState({
          message: null
        })
        this.lookup(nextProps.gname);
      }
    }
  
    lookup = (gname) => {
      fetch('http://localhost:3001/api/item/'+gname)
        .then((data) => data.json())
        .then((res) => this.setState({ message: res.message }));
    };
    
    render() {
      const {message} = this.state;
      const {onClick} = this.props;
    
      if (!message) {
          return <div>Loading....</div>
      }

      return <div className="figure-showcase">
            <div className="showcase-name">{message.gname}</div>
            <button onClick={onClick}>Close</button> 
        </div>;
    }
  }
  
  export default FigureShowcase;