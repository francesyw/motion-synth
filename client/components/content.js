import React, { Component } from 'react';
import sketch from './sketch.js';
import { fmod, sequencer, phaser, shifter } from './synth.js';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.nx = undefined;
    this.loop = undefined;
    Tone.Transport.bpm.value = 90;
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  componentDidMount() {
    this.canvas = new p5(sketch, 'p5-container');
    Nexus.colors.accent = "#49ef63"
    this.nx = new Nexus.Sequencer('#synthui', {
      size: [800, 200],
      mode: 'toggle',
      rows: 6,
      columns: 16
    });
    this.nx.interval.ms(120);
    this.loop = sequencer(this.nx, fmod(phaser, shifter));
    Tone.Transport.start('+0.1');
  }

  componentWillReceiveProps(nextProps) {
    this.canvas.pushProps({ ...this.props.data });
      let freq = mapRange(Math.abs(this.props.data.az), 0, 40, 1, 180);
      freq = freq < 0 ? 1 : freq;
      let pitch = mapRange(this.props.data.ax, -20, 20, -7, 7);
      phaser.set('frequency', freq);
      shifter.set('pitch', pitch);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.canvas.remove();
  }

  handleStart(event) {
    this.loop.start()
  }

  handleStop(event) {
    this.loop.stop();
  }

  render() {
    return (
      <div className="container">
        <button onClick={this.handleStart}>START</button>
        <button onClick={this.handleStop}>STOP</button>
        <div id="synthui"></div>
        <div id="p5-container" />
        <p id="zaxis">z-axis</p>
        <p id="xaxis">x-axis</p>
      </div>
    );
  }
}

function mapRange(num, inMin, inMax, outMin, outMax) {
  let output =  Math.floor((num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin);
  return output;
}
