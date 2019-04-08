import React from 'react';
import { connect } from 'react-redux'
import '../style/menubar.css'
import { withRouter } from 'react-router-dom';
import img from '../img/logo.png'
const MenuBar = (props) => {
    return (
        <div id="menuBar">

          <div id="logo"> <img src={img} /></div>
          <div id="menuBar-buttons">
            <button id={props.history.location.pathname === "/dashboard" ? "selected-menu":""}>DashBoard</button>
            <button id={props.history.location.pathname === "/to-do's" ? "selected-menu":""}>To-Do's</button>
            <button id={props.history.location.pathname === "/reminders" ? "selected-menu":""}>Reminders</button>
            <button id={props.history.location.pathname === "/projects" ? "selected-menu":""}>Projects</button>
          </div>
          <div id="user-logo">
          </div>
        </div>
    )
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MenuBar))
