import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";

import MemoryMap from "./containers/MemoryMap";
import PhotoUploader from "./containers/PhotoUploader";
import { getMarkers } from "./actions/index";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    if (this.props.isFetchingMarkers) {
      this.props.getMarkers();
    }
    return (
      <div className="App">
        <Router>
          <div>
            <header className="App-header">
              <Link to="/">
                <h1 className="App-title">Upload</h1>
              </Link>
              <Link to={`/${this.props.currentUserSecret}`}>
                <h1 className="App-title">Current map</h1>
              </Link>
            </header>
            <Route exact path="/" component={PhotoUploader} />
            <Route
              exact
              path={`/${this.props.currentUserSecret}`}
              component={MemoryMap}
            />{" "}
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  currentUserSecret: state.currentUserSecret,
  isFetchingMarkers: state.isFetchingMarkers
});

const mapDispatchToProps = dispatch => {
  return {
    getMarkers: () => {
      const res = getMarkers();
      dispatch(res);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
