import React, { Component } from 'react'
// import Tree from 'react-d3-tree'
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'
import MyD3Tree from './myd3tree'
const myTreeData = [
    {
      name: 'Parent Node',
      attributes: {
        keyA: 'val A',
        keyB: 'val B',
        keyC: 'val C',
      },
      nodeSvgShape: {
        shapeProps: {
          fill: 'blue',
        },
      },
      children: [
        {
          name: 'Inner Node',
          attributes: {
            keyA: 'val A',
            keyB: 'val B',
            keyC: 'val C',
          },
          nodeSvgShape: {
            shape: 'rect',
            shapeProps: {
              width: 20,
              height: 20,
              x: -10,
              y: -10,
              fill: 'red',
            },
          },
        },
        {
          name: 'Level 2: B',
        },
      ],
    },
  ];
const myStyleObject ={
    links:{
        stroke:'#ccc', strokeWidth:'1.5px', fill: 'none', 
        animateMotion:{
            dur:"3s"
        }
    },
    nodes:{
        node:{
            circle:{ r:"10", fill:'#fff', stroke:'steelblue', strokeWidth:'1.5px'},
            name:{},
            attributes:{},
        },
        leafNode:{
            circle:{ r:"1.5",fill:'#d3d3d3', stroke:'steelblue', strokeWidth:'1.5px'},

        }
    }
};

let data = [{
    name: 'Parent',
	children: [{
        name: 'Child One'
	}]
}];
export default class TreeGraph extends Component {
  render() {
    return (
        <div id="treeWrapper" style={{width: '50em', height: '20em'}}>
 
        {/* <Tree data={data} transitionDuration={750}     width={window.innerWidth} height={window.innerHeight}/> */}
        <MyD3Tree treeData={data}/>
 
      </div>
    )
  }
}
