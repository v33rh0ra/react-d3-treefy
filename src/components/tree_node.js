import React, { Component } from 'react'
import d3 from 'd3';
import ReactDOM from 'react-dom';
import NodeCircle from './node_circle';

export default class TreeNode extends Component {
  constructor(props){
      super(props);
      this.state={
          data: props.data,
      }
      this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
      this.d3Node = d3.select(ReactDOM.findDOMNode(this));
      console.log(this.state.data);
      this.d3Node.datum(this.state.data).attr("transform",(d)=>{
          console.log(d);
          if (d.parent !== null){
            return `translate(${d.parent.y},${d.parent.x})`;
          }else{
              return `translate(${d.y},${d.x})`;
          }
          
      }).transition()
      .duration(750)
      .attr("transform",(d)=>{
          return `translate(${d.y},${d.x})`;
      })
  }//componentDidMount

  handleClick(){
      if (!this.state.data.children){
        return false;
      }
      this.props.onCollapse(this.state.data.name);
  }
  render() {
      let {x,y} = this.props.data;
    return (
        <NodeCircle key={this.props.key}
            name={this.props.data.name}
            onClick={this.handleClick}
        />

    )
  }
}
