import React, { Component } from "react";
import Manufacturer from "./Manufacturer";

class Figure extends Component {   
    
    render() {
      const { data, onClick } = this.props;
  
      return <div className="figure" onClick = {onClick}>
          <div className="figure-details">
            <div className="figure-name">{data.gname}</div>
            <Manufacturer data={data.maker_name}/>
            </div>
          <div className="figure-img-container">
          <img className="figure-img" alt="figure" src={"https://img.amiami.com/" + data.thumb_url} />
          </div>
        </div>;
    }
  }
  
  export default Figure;