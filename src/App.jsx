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
            <ul className="menu-bar">
              <li className="menu-item">
                <Link to="/">Upload</Link>
              </li>
              <li className="menu-item">
                <Link to={`/${this.props.currentUserSecret}`}>Current map</Link>
              </li>
            </ul>
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
