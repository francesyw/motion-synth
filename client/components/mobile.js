import React, { Component } from 'react';
import io from 'socket.io-client';
import { NavLink } from 'react-router-dom';
// import { connect } from 'react-redux';

class Mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceleration: {
        ax: 0,
        ay: 0,
        az: 0
      },
      isConnected: false,
    }
    this.socket = io(window.location.origin);
    this.handleClick = this.handleClick.bind(this);
    this.counter = 0;
  }

  componentDidMount() {
    window.addEventListener('devicemotion', this.handleMotionEvent, true);
    this.socket.on('connect', () => {
      console.log('controller connected!');
      this.setState({ isConnected: true });
      this.socket.emit('app-on');
    })
  }

  componentWillUnmount() {
    window.removeEventListener('devicemotion', this.handleMotionEvent);
    this.setState({ isConnected: false });
    this.socket.emit('leave');
    console.log('leave');
  }

  handleMotionEvent = event => {
    let acceleration = {
      ax: round(event.acceleration.x * 5),
      ay: round(event.acceleration.y * 5),
      az: round(event.acceleration.z * 5)
    }
      // console.log('direction: ', this.state.direction, ' | accl: ', acceleration.az);
    // }
    this.counter++;
    if (this.counter % 3 === 0) {
      // console.log(this.counter);
      this.socket.emit('data', this.state.acceleration);
    }
    this.setState({ acceleration });
    // dist: this.state.dist + (accl * interval * interval * 0.5) (current position)
  }

  handleClick = event => {
    this.socket.emit('touch', 'pressed');
  }

  render() {
    let { ax, ay, az } = this.state.acceleration;
    return (
      <React.Fragment>
        <h1>Controller Acceleration</h1>
        <p>ax: {ax}</p>
        <p>ay: {ay}</p>
        <p>az: {az}</p>
        <button style={{ fontSize: '10em' }} onTouchStart={this.handleClick} className="control-btn">Touch</button>
        <NavLink to="/">Home</NavLink>
      </React.Fragment>
    );
  }
}

export default Mobile;

function round(num) {
  if (!num) {
    return 0;
  }

  return +Number.parseFloat(num).toFixed(2);
  // return Math.round(num, 1);
}


