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
        .then((res) => {
          console.log(res.message);
          this.setState({ message: res.message })
        });
    };
    
    render() {
      const {message} = this.state;
      const {onClick} = this.props;
    
      if (!message) {
          return <div>Loading....</div>
      }

      return <div className="figure-showcase">
            <div className="showcase-name"><h2>{message.gname}</h2></div>
            <div><img className="showcase-img" alt="figure" src={"https://img.amiami.com/" + message.main_image_url} /></div>
            <div className = "showcase-meta">
            <div className="showcase-manu">Manufactured by: {message.maker_name}</div>
            <div className="showcase-release-date">Release Date: {message.releasedate}</div>
            <div className="showcase-price">Price: {message.list_price}</div>
            </div>
            <button className="showcase-exit" onClick={onClick}>Close</button> 
        </div>;
    }
  }
  
  export default FigureShowcase;