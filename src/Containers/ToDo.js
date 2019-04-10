import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import LeftMenu from '../Components/LeftMenu'
import Footer from '../Components/Footer'
import '../style/main.css'

class ToDo extends Component {
  render() {
    return (
      <div id="dashboard">
      Work In progress
      </div>
    );
  }
}

export default withRouter(ToDo);
