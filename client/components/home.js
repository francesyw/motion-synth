import React, { Component } from 'react';
import io from 'socket.io-client';
import Content from './content';
// import { connect } from 'react-redux';

const socket = io(window.location.origin);

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceleration: {
        ax: 0,
        ay: 0,
        az: 0
      },
      direction: 0,
      hasController: false,
      isSelfConnected: false
    };
    connectApp(() => this.setState({ hasController: true }));
    disconnectApp(() => this.setState({ hasController: false }));
    fetchData(acceleration => this.setState({ acceleration }));
  }

  componentDidMount() {
    socket.on('connect', () => {
      this.setState({ isSelfConnected: true });
    });
  }

  render() {
    // let { ax, ay, az } = this.state.acceleration;
    return (
      <React.Fragment>
        <header>
        <h1>Home</h1>
        { this.state.isSelfConnected ?
          <p>Connected to the server.</p> :
          <p>Not connected to the serve</p> }
        { this.state.hasController ?
          <p>A controller is connected!</p> :
          <p>No controllers...</p>}
        </header>
        <Content data={this.state.acceleration} />
      </React.Fragment>
    );
  }
}

function connectApp(cb) {
  socket.on('app-join-client', () => {
    console.log('app on');
    cb();
  });
}

function disconnectApp(cb) {
  socket.on('app-leave-client', () => {
    console.log('app off');
    cb();
  });
}

function fetchData(cb) {
  socket.on('accl-to-client', data => {
    // console.log('data---', data)
    cb(data);
  });
}

