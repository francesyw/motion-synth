import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Home, Mobile } from './components';

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/mobile"  component={Mobile} />
        <Route exact path="/" component={Home} />
      </Switch>
    );
  }
}

export default withRouter(App);
