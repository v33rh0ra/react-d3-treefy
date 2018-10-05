import React, { Component } from 'react';
import logo from './logo.svg';
// import TreeGraph from './components/tree_graph'
import Tree from './components/d3_tree_my';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tree/>
      </div>
    );
  }
}

export default App;
