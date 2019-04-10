import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import LeftMenu from '../Components/LeftMenu'
import Footer from '../Components/Footer'
import Reminder from './Reminder'
import DashBoard from './DashBoard'
import ToDo from './ToDo.js'
import '../style/main.css'

class Body extends Component {
  render() {
    return (
      <div id="body-container">

          <Switch>
            <Route path='/reminders' render={() => <Reminder />} />
            <Route path='/dashboard' render={() => <DashBoard />} />
            <Route path='/to-do' render={() => <ToDo />} />
          </Switch>
          <Footer />
      </div>
    );
  }
}

export default withRouter(Body);
