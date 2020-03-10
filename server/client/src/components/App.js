import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {connect} from 'react-redux';
import Header from './Header';
import Landing from './Landing';
import * as actions from "../actions";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

export class App extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={Landing}></Route>
            <Route path="/surveys" exact component={Dashboard}></Route>
            <Route path="/surveys/new" exact component={SurveyNew}></Route>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
