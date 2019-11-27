import React, { Component } from "react";

class Manufacturer extends Component { 
    getLogo(name) {
        switch(name) {
            case "Good Smile Company":
                return <img alt={name} src="img/gsc_logo.png" />
            case "Max Factory":
                return <img alt={name} src="img/mxf_logo.svg" />
            case "Phat Company":
                return <img alt={name} src="img/phat_logo.png" />
            case "FREEing":
                return <img alt={name} src="img/free_logo.png" />
            case "Kotobukiya":
                return <img alt={name} src="img/koto_logo.png" />
            case "SkyTube":
                return <img alt={name} src="img/skt_logo.gif" />
            case "Alphamax":
                return <img alt={name} src="img/amx_logo.png" />
            default:
                return <div className="manufacturerText">{name}</div>;
        }
    }  
    
    render() {
      const { data } = this.props;
  
      return <div className="manufacturer">
            {this.getLogo(data)}
        </div>;
    }
  }
  
  export default Manufacturer;