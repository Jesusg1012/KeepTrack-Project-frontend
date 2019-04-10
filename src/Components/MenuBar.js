import React from 'react';
import { connect } from 'react-redux'
import '../style/menubar.css'
import { withRouter } from 'react-router-dom';
import img from '../img/logo.png'
import Dropdown from 'react-bootstrap/Dropdown'
import { logout } from '../Redux/actions'

const MenuBar = (props) => {
  const handleClick = (e) => {
    if(e.target.id !== "selected-menu"){
      if(e.target.innerText === "DashBoard"){
        props.history.push("/dashboard")
      }
      else if(e.target.innerText === "To-Do's"){
        props.history.push("/to-do")
      }
      else if(e.target.innerText === "Reminders"){
        props.history.push("/reminders")
      }
      else if(e.target.innerText === "Projects"){
        props.history.push("/projects")
      }
    }
  }
  const logout = () => {
    localStorage.removeItem("token")
    props.logout()
    props.history.push("/authorization")
  }
  // <button id={props.history.location.pathname === "/projects" ? "selected-menu":""} onClick={handleClick}>Projects</button>
    return (
        <div id="menuBar">
        <div id="top-header">
        <div id="logo"> <img src={img} /></div>
        </div>
          <div id="menuBar-buttons">
            <button id={props.history.location.pathname === "/dashboard" ? "selected-menu":""} onClick={handleClick}>DashBoard</button>
            <button id={props.history.location.pathname === "/to-do" ? "selected-menu":""} onClick={handleClick}>To-Do's</button>
            <button id={props.history.location.pathname === "/reminders" ? "selected-menu":""} onClick={handleClick}>Reminders</button>
          </div>
          <div id="user-logo">
            {
              props.user ?
              <img src={props.user.avatar} onClick={logout}/>
              :null
            }
          </div>
          <div id="user-content">

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
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MenuBar))
