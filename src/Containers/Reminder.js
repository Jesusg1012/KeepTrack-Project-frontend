import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import '../style/main.css'
class Reminder extends Component {
  render() {
    return (
      <div id="reminder-container">
      <div class="top-padding"></div>
      <div id="reminder-content">
        Help
        </div>
        <div class="bottom-padding"></div>
      </div>
    );
  }
}

export default withRouter(Reminder);
