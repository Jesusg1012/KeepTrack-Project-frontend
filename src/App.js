import './App.css';
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Register from './Containers/Register'
import Main from './Containers/Main'
import { connect } from 'react-redux'

import { getUser } from './Redux/actions'
class App extends Component {
  componentDidMount(){
    let token = localStorage.token;
    token ? this.props.getUser(token) : this.props.history.push("/authorization");
  }
  componentDidUpdate(){
    console.log("HEELLP", this.props.user)
  }
  render() {
    return (
      <Switch>
        <Route path="/authorization" render={() => <Register />} />
        <Route path="/" render={() => <Main />} />
      </Switch>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

// const mapDispatchToProps = { getHobbits }
const mapDispatchToProps = (dispatch) => ({
  getUser: (token) => dispatch(getUser(token))
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
