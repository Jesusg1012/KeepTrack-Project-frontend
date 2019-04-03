import './App.css';
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './Containers/Login'
import Main from './Containers/Main'
class App extends Component {
  componentDidMount(){
    
  }
  render() {
    return (
      <Switch>
        <Route path="/login" render={() => <Login />} />
        <Route path="/" render={() => <Main />} />
      </Switch>
    );
  }
}

export default withRouter(App);
