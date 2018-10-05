
import React, { Component } from 'react'
import _ from 'lodash';
import ReactDOM from 'react-dom';
import ReactFauxDOM from 'react-faux-dom';
import d3 from 'd3';
import TreeNode from './tree_node';
import TreeLink from './tree_link';
import  './d3_tree_my.css'


export default class Tree extends Component {
    constructor(props){
        super(props);
        var margin = {top: 20, right: 120, bottom: 20, left: 120};
        var width = window.innerWidth - margin.right - margin.left;
        var height = window.innerHeight - margin.top - margin.bottom;
        this.state={
            data:this.defaultData(),
            width: width,
            height: height,
            margin:margin,
        }
        this.updateTree = this.updateTree.bind(this);
        // this.handleCollapse = this.handleCollpase.bind(this);

    }//constructor

    defaultData(){
        return [{
            name:"src",
            parent: null,
            children:[
                {
                    name:"tgt",
                    parent:"src"
                }
            ]
        }]
    }
    updateTree(nodes,name){
        return nodes.map((node)=>{
            if (node.name === name){
                if(node.children){
                    node._children = node.children;
                    node.children = null;
                }else{
                    node.children = node._children;
                    node._children = null;
                }
                return node;
            }else if(!node.children){
                return node;
            }
            return this.updateTree(node.children, name)
        });
    }

    handleCollapse = (nodeName) =>{
        let newTree = _.cloneDeep(this.state.data);
        let updatedTree = this.updateTree(newTree,nodeName);
        this.setState({data:updatedTree});
    }
    handleClick = (nodeData) => {
        console.log(nodeData);
    }
    
  render() {
    let tree = d3.layout.tree().size([400, 400]),
    root = this.state.data[0],
    nodes = tree.nodes(root),
    links = tree.links(nodes),
    diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; }),
    nodeComponents = nodes.map((node, i) => {
        return <TreeNode key={i} data={node} onCollapse={this.handleCollapse}/>
    }),
    linkComponents = links.map((link,i)=>{
        return <TreeLink key={i} link = {link} diagonal={diagonal} onClick={this.handleClick}/>
    })
    // console.log(linkComponents);
    return (
        <div>
            <h4>Graph</h4>
            <svg width={this.state.width+this.state.margin.right+this.state.margin.left} 
                 height={this.state.height+this.state.margin.top+this.state.margin.bottom}>
                <g ref="container" transform={`translate(${this.state.margin.left}, ${this.state.margin.top})`}>
                    {nodeComponents}
                    {linkComponents}
                </g>
            </svg>
        </div>
    )
  }
}
