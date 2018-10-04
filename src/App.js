import React, { Component } from 'react';
import logo from './logo.svg';
import TreeGraph from './components/tree_graph'

class App extends Component {
  render() {
    return (
      <div className="App">
        <TreeGraph/>
      </div>
    );
  }
}

export default App;
