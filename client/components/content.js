import React, { Component } from 'react';
import sketch from './sketch.js';
import synth from './synth.js';

export default class Content extends Component {
  componentDidMount() {
    this.canvas = new p5(sketch, 'p5-container');
  }

  componentWillReceiveProps(nextProps) {
    this.canvas.pushProps({ ...this.props.data });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.canvas.remove();
  }

  render() {
    synth();
    return (
      <div id="p5-container" />
    );
  }
}
