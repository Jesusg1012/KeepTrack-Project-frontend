import React from 'react';
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
          </div>
        </div>
    )
}

export default MenuBar
