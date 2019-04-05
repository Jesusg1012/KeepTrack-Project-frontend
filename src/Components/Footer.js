import React from 'react';
import { connect } from 'react-redux'
const Footer = (props) => {
    return (
      <div id="footer">
      <div id="counter-footer">
        {props.user.reminders ?
          props.user.reminders.length
          : "0"
        } Reminders
        </div>
      </div>
    )
  }
  const mapStateToProps = (state) => {
    console.log(state.user)
    return {
      user: state.user
    }
  }

export default connect(mapStateToProps)(Footer)
