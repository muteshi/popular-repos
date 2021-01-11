import React, { Component, Fragment } from "react";
import { Route } from "react-router";
import RepoCard from "./Repos/Repo/Repo";

import Repositories from "./Repos/Repos";

class App extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <h2>Most popular repositories</h2>
        <Route path="/repository/:repoId" exact component={RepoCard} />
        <Route exact path="/" component={Repositories} />
      </Fragment>
    );
  }
}

export default App;
