import React, { Component } from "react";

class Figure extends Component {   
    
    render() {
      const { data } = this.props;
  
      return <div className="figure">
        <div>{data.gname}</div>
        <img src={"https://img.amiami.com/" + data.thumb_url} />
        </div>;
    }
  }
  
  export default Figure;