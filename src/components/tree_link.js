import React, { Component } from 'react'
import LinkPath from './link_path';
import d3 from 'd3';
import ReactDOM from 'react-dom';
export default class TreeLink extends Component {
    constructor(props){
      super(props);
      this.state={
        link:props.link,
        d:props.diagonal(props.link)
      }
    }
    componentDidMount(){
            // Enter the links.
        // link.enter().insert("path", "g")
        // .attr("class", "link")
        // .attr("d", function(d){
        //     var o = {x: source.x0, y:source.y0};
        //     return diagonal({source:o, target:o});
        // })
        // .on("click",this.handleClick)
        // ;

        // link.transition()
        //     .duration(duration)
        //     .attr("d",diagonal);

        // link.exit().transition()
        //     .duration(duration)
        //     .attr("d",function(d){
        //         var o = {x:source.x, y:source.y};
        //         return diagonal({source:o, target:o});
        //     })
        //     .remove();
        this.d3Link = d3.select(ReactDOM.findDOMNode(this));

        // console.log(this.state.link);
        this.d3Link.datum(this.state.link).attr("transform",(d)=>{
          var o = {x: d.source.x, y:d.source.y}
          return `translate(${d.source.y},${d.source.x})`
        }).transition()
        .duration(750)
        .attr("transform",(d)=>{
          return `translate(${d.source.y},${d.source.y})`
        });
      //   this.d3Node.datum(this.state.data).attr("transform",(d)=>{
      //     console.log(d);
      //     if (d.parent !== null){
      //       return `translate(${d.parent.y},${d.parent.x})`;
      //     }else{
      //         return `translate(${d.y},${d.x})`;
      //     }
          
      // }).transition()
      // .duration(750)
      // .attr("transform",(d)=>{
      //     return `translate(${d.y},${d.x})`;
      // })
    }//componentDidMount
    handleClick =() =>{
      this.props.onClick(this.state.link);
    }
  render() {
    console.log(this.props.link);
    // this.setState({d:this.props.diagonal(this.props.link)})
    return (
      // <LinkPath cssClass="link" d={this.state.d} onClick={this.handleClick}/>
      <path className="link" d={this.state.d} onClick={this.handleClick}/>
    )
  }
}
