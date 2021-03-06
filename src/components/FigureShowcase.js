import React, { Component } from "react";

class FigureShowcase extends Component {   
    state = {
        message: null,
        solaris: null
      };

    componentDidMount() {
      const {gname} = this.props;
      this.lookup(gname);
    }

    componentWillReceiveProps(nextProps) {
      const {gname} = this.props;
      
      if (nextProps.gname !== gname) {
        this.setState({
          message: null,
          solaris: null
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
          this.lookupSolaris(res.message.jancode);
        });
    };

    lookupSolaris = (jan) => {
      fetch('http://localhost:3001/api/solaris/'+jan)
        .then((data) => data.json())
        .then((res) => {
          this.setState({ solaris: res.message })
        });
    };
    
    render() {
      const {message, solaris} = this.state;
      const {onClick} = this.props;
    
      if (!message) {
          return <div>Loading....</div>
      }

      return <div className="figure-showcase">
            <div className="showcase-name"><h2>{message.gname}</h2></div>
            <div className="showcase-contents">
            <div><img className="showcase-img" alt="figure" src={"https://img.amiami.com/" + message.main_image_url} /></div>
            <div className="showcase-left">
            <div className = "showcase-meta">
            <div className="showcase-manu">Manufactured by: {message.maker_name}</div>
            <div className="showcase-release-date">Release Date: {message.releasedate}</div>
            <div className="showcase-price">Price: {message.price}</div>
            <div className="showcase-jan">JAN: {message.jancode}</div>
            </div>
            <div className="showcase-pricing">
              <div className="showcase-price-compare">Solaris Price: {solaris ? solaris : "loading"}</div>
            </div>
            </div>
            </div>
            <button className="showcase-exit" onClick={onClick}>Close</button> 
        </div>;
    }
  }
  
  export default FigureShowcase;