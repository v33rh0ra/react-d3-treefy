
import React, { Component } from 'react'

import ReactDOM from 'react-dom';
var d3 = require('d3');

export default class MyD3Tree extends Component {
  constructor(props){
      super(props);
      
      var margin = {top: 20, right: 120, bottom: 20, left: 120};
      var width = window.innerWidth - margin.right - margin.left;
      var height = window.innerHeight - margin.top - margin.bottom;
      var tree = d3.layout.tree().size([height, width]);
      var diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y, d.x]; });
      this.state = {
          margin: margin,
          width: width,
          height: height,
          nodes:[],
          links:[],
          tree:tree,
          diagonal:diagonal,
          svg: null,
          root: null,
          duration:750,         
      }
  }

  
  componentDidMount(){
    var mountNode = ReactDOM.findDOMNode(this);
    console.log(this.props.treeData);
    this.renderTree(this.props.treeData, mountNode);
  }
  shouldComponentUpdate(nextProps, nextState){
    // Delegate rendering the tree to a d3 function on prop change
    // console.log(this.props.treeData);
    this.renderTree(this.props.treeData, ReactDOM.findDOMNode(this));

    // Do not allow react to render the component on prop change
    return false;
  }
//   componentWillUpdate(){
//     console.log(this.props.treeData);
//     renderTree(this.props.treeData, ReactDOM.findDOMNode(this));  
//   }
  handleClick = (d)=>{
        console.log('node clicked')
        if (d.children){
            d._children = d.children;
            d.children = null;
        }else{
            d.children = d._children;
            d._children = null;
        }
        return d;
  };

    handleCollapse=(d)=>{
        console.log(d);
        if (d.children){
            d._children = d.children;
            d._children.forEach(child => this.handleCollapse(child));
            d.children = null;
        }
    }

    renderTree = (treeData, svgDomNode)=>{
        
        
        var i = 0, root;
        var margin = this.state.margin;
        var width = this.state.width;
        var height = this.state.height;

        var svg = d3.select(svgDomNode)
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        root = treeData[0];
        root.x0=height/2;
        root.y0 = 0;

        
        
        root.children.forEach(child => this.handleCollapse(child));
        
        this.handleUpdate(svg,root);

    }



  
  handleUpdate = (svg,source) => {
    console.log(source);
    var tree = this.state.tree;
    var diagonal = this.state.diagonal;
    var duration = this.state.duration;

    // Compute the new tree layout.
    var nodes = tree.nodes(source).reverse(),
        links = tree.links(nodes);

    
    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 180; });
    var i =0;
    // Declare the nodes…
    var node = svg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // Enter the nodes.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { 
            return "translate(" + source.y0 + "," + source.x0 + ")"; });

    nodeEnter.append("circle")
        .attr("r", 10)
        .style("fill", function(d){
            // var clr = '#fff'
            var clr = 'steelblue'
            return d._children? clr:'#fff';
        });
        

    nodeEnter.append("text")
        .attr("x", function(d) { 
            return d.children || d._children ? -20: 10; })
        .attr("y", function(d){
            return d.children || d._children ? 20 :10;
        })
        .attr("dy", ".6em")
        .attr("fill", 'red')
        .attr("text-anchor", function(d) { 
            return d.children || d._children ? "end" : "start"; })
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1)
        .on("click",this.handleClick);

    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d){ return "translate("+d.y+","+d.x+")";}
        );
    
    nodeUpdate.select("circle")
    .attr("r",function(d){
        return 10;
    })
    .style("fill",function(d){
        return d._children?'#fff':'steelblue';
    });

    nodeUpdate.select("text")
    .style("fill-opacity",1);

    var nodeExit = node.exit().transition()
    .duration(duration)
    .attr("transform", function(d){
        return "translate("+source.y+","+source.x+")";
    })
    .remove();

    nodeExit.select("circle")
    .attr("r",1e-6);

    nodeExit.select("text")
    .style("fill-opacity", 1e-6);
    // Declare the links…
    var link = svg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });

    // Enter the links.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d){
            var o = {x: source.x0, y:source.y0};
            return diagonal({source:o, target:o});
        })
        .on("click",this.handleClick)
        ;
    
    link.transition()
        .duration(duration)
        .attr("d",diagonal);
    
    link.exit().transition()
        .duration(duration)
        .attr("d",function(d){
            var o = {x:source.x, y:source.y};
            return diagonal({source:o, target:o});
        })
        .remove();
    
    //stash old positions for transition
    nodes.forEach(function(d){
        d.x0 = d.x;
        d.y0 = d.y;
    });
    
}
  render() {
    return (
      <svg></svg>
    )
  }



}


