import React from "react";
import logo from "./react.svg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./Home.css";

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Server Side Rendered React App.</h2>
          <p className="Home-intro">
            To get started, edit <code>src/App.js</code> or{" "}
            <code>src/Home.js</code> and save to reload.
          </p>
          <ul className="Home-resources">
            <li>
              <a href="https://github.com/jaredpalmer/razzle">Docs</a>
            </li>
            <li>
              <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
            </li>
            <li>
              <a href="https://palmer.chat">Community Slack</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const loadData = store => {
  console.log("fatching data.");
  // return store.dispatch(getMovies())
};

const mapDispatch = dispatch => bindActionCreators({}, dispatch);

export default {
  loadData,
  component: connect(
    null,
    mapDispatch
  )(Home)
};
