import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import MenuBar from '../Components/MenuBar'
import InfoBar from '../Components/InfoBar'
import LeftMenu from '../Components/LeftMenu'
import Body from './Body'
import '../style/main.css'
class Main extends Component {
  render() {
    return (
      <div id="main">
      <MenuBar />
      <InfoBar />
      <Body />
      </div>
    );
  }
}

export default withRouter(Main);
