import React, { Component } from 'react'

export default class LinkPath extends Component {
  render() {
      console.log(this.props.d);
    return (
        <path className={this.props.cssClass} d={this.props.d}/>
    )
  }
}
