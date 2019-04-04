import React from 'react';
import { connect } from 'react-redux'
import '../style/menubar.css'
const MenuBar = (props) => {
    return (
        <div id="menuBar">
          <div id="logo"> KeepTrack</div>
          <div id="menuBar-buttons">
            <button>DashBoard</button>
            <button>To-Do's</button>
            <button>Reminders</button>
            <button>Projects</button>
          </div>
          <div id="user-logo">
            HI
            {console.log("User:", props.user)}
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
