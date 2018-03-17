import "normalize.css/normalize.css";
import "./App.css";
import { connect } from "react-redux";
import * as actions from "./actions";
import { BrowserRouter, Route } from "react-router-dom";
import React, { Component } from "react";

import Header from "./components/Header";
import Content from "./components/Content";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <main>
          <Header />
          <Content />
        </main>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
