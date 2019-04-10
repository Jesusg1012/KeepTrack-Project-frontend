import React from 'react';
import { connect } from 'react-redux'
const Footer = (props) => {
    return (
      <div id="footer">
      <div id="counter-footer">
        {props.user ?
          props.user.reminders.length
          : "0"
        } Reminders
        </div>
      </div>
    )
  }
  const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  }

export default connect(mapStateToProps)(Footer)
