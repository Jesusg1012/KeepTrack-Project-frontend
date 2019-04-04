import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import '../style/main.css'
import '../style/reminder.css'
class Reminder extends Component {
  state={
    selected: {}
  }
  componentDidUpdate(prevProps){
    if(prevProps.user !== this.props.user){
      this.setState({selected: this.props.user.reminders[0]})
    }
  }
  render() {
    return (
      <div id="reminder-container">
      <div id="reminder-header-wrapper">
        <div id="reminder-header">
          <div class="top-reminder">Reminders</div>
          <div class="top-reminder">Description</div>
          <div class="top-reminder">Date</div>
        </div>
        </div>
        {this.props.user ?
        <div id="reminder-wrapper">
          <div id="reminder-list">
          <div class="reminder"></div>

            {this.props.user.reminders.map(reminder => {
                  return <div class="reminder-listed">{reminder.title}</div>
                })}
          </div>

          <div id="reminder-content">
          <div class="reminder"></div>
          {this.props.user.reminders.map(reminder => {
                return <div class="reminder">{reminder.description}</div>
              })}
              </div>
              <div id="reminder-date">
              <div class="reminder"></div>
                  {this.props.user.reminders.map(reminder => {
                    return <div class="reminder">{reminder.time}</div>
                  })}
                  </div>
              </div>
          : "LOADING"}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state.user)
  return {
    user: state.user
  }
}

// const mapDispatchToProps = { getHobbits }
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);
