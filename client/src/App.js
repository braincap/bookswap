import 'normalize.css/normalize.css';
import './App.css';
import { connect } from 'react-redux';
import * as actions from './actions';
import { BrowserRouter, Route } from 'react-router-dom';
import React, { Component } from 'react';

import Header from './components/Header';
import Content from './components/Content';
import Profile from './components/Profile';
import Requests from './components/Requests';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <main>
          <Route path="/" component={Header} />
          <Route exact path="/" component={Content} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/requests" component={Requests} />
        </main>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
