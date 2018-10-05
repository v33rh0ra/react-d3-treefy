import React, { Component } from 'react'
// import d3 from 'd3';

export default class NodeCircle extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }//constructor
    handleClick(){
        this.props.onClick();
    }//handleClick

  render() {
    return (
      <g className="node"
            transform={this.props.transform}
            onClick = {this.handleClick}>
            <circle r="10" fill="steelblue"></circle>
            <text>{this.props.name}</text>
      </g>
    )
  }//render
}
