import logo from "./logo.svg";
import "./App.css";
import ImageMapper from "react-image-mapper";
import React, { Component } from "react";
let MAP = {
  name: "my-map",
  areas: [

  ],
};
class App extends Component {
  state = {
    Map: {},
    hoveredArea: null,
    msg:null,
    infoMessage:null
  };
  handleclick = (e,event) => {
    this.state.MAP.areas.map((item)=>{
if(item.name == e.name){
item.infoMessage=this.state.infoMessage
}
    })
    this.state.infoMessage=""
  };
  handleChange=(event)=> {
    this.setState({infoMessage: event.target.value});
  }
  enterArea(area) {
    this.setState({
			hoveredArea: area,
			msg: `You entered ${area.shape} ${area.name} at coords ${JSON.stringify(
				area.coords
			)} !`
		});
  }
  leaveArea(area) {
    console.log(area);
  }
  moveOnArea(area) {
    console.log(area);
  }

  clickedOutside(area) {
    let coordinates = [area.nativeEvent.layerX, area.nativeEvent.layerY, 25];
    console.log(MAP.areas);
    let obj = {
      shape: "circle",
      coords: coordinates,
      name:MAP.areas.length+1
    };

    MAP.areas.push(obj);
    this.setState({ MAP: MAP });
   
  }
  getTipPosition(area) {
		return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
	}
 
  render() {
    const { MAP,infoMessage } = this.state;
    console.log(this.state);
    return (
     <React.Fragment>
      <div style={{ position: "relative" }}>
        <ImageMapper
          map={MAP}
          src={require("../src/assets/imageTagging.PNG")}
          width={500}
          onClick={(area) => this.handleclick(area)}
          onImageClick={(area) => this.clickedOutside(area)}
          onMouseEnter={area => this.enterArea(area)}
          lineWidth={4}
          strokeColor={"white"}
        />
       {
    	this.state.hoveredArea &&
    	<span className="tooltip"
    	    style={{ ...this.getTipPosition(this.state.hoveredArea)}}>
    		{ this.state.hoveredArea && this.state.hoveredArea.name}
    	</span>
    }
    
    {
        this.state.hoveredArea && 
        <div className="textinput" style={{ ...this.getTipPosition(this.state.hoveredArea)}}>
            <input  type="text"   value={this.state.infoMessage} onChange={this.handleChange}></input>
           <input type="button" value="submit"   onClick={$event => this.handleclick(this.state.hoveredArea,$event)}></input>
        </div>
    }
      {
        this.state.hoveredArea &&
        <span className="textinfo"
        style={{ ...this.getTipPosition(this.state.hoveredArea)}}>
      { this.state.hoveredArea && this.state.hoveredArea.infoMessage}
    </span>
       
    }

      </div>
      </React.Fragment>
    );
  }
}

export default App;
