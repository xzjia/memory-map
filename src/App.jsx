import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";

import MemoryMap from "./containers/MemoryMap";
import PhotoUploader from "./containers/PhotoUploader";
import { getMarkers } from "./actions/index";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    if (this.props.isFetchingMarkers) {
      this.props.getMarkers();
    }
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={PhotoUploader} />
          <Route
            exact
            path={`/${this.props.currentUserSecret}`}
            component={MemoryMap}
          />
        </Switch>
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
