import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import '../style/main.css'
import '../style/reminder.css'
class Reminder extends Component {
  state={
    selected: {}
  }
  // componentDidUpdate(prevProps){
  //   if(prevProps.user !== this.props.user){
  //     this.setState({selected: this.props.user.reminders[0]})
  //   }
  // }
  render() {
    return (
      <div id="reminder-container">
      {this.props.user ?
        <div id="two-grid">
        <div id="reminder-list">
        <div class="top-reminder-fix"><text class="reminder-text">Reminders</text></div>
          {this.props.user.reminders.map(reminder => {
                return <div class="reminder-listed"><text class="reminder-text">{reminder.title}</text></div>
              })}
              <div class="reminder-listed"><text class="reminder-text"><i class="fas fa-plus"></i></text></div>
        </div>

        <div>
        <div id="reminder-header-wrapper">
          <div id="reminder-header">
            <div class="top-reminder"><text class="reminder-text">Description</text></div>
            <div class="top-reminder"><text class="reminder-text">Email</text></div>
            <div class="top-reminder"><text class="reminder-text">Text</text></div>
            <div class="top-reminder"><text class="reminder-text">Date</text></div>
          </div>
          </div>

          <div id="reminder-wrapper">
          <div id="reminder-content">
          {this.props.user.reminders.map(reminder => {
                return <div class="reminder"><text class="reminder-text">{reminder.description}</text></div>
              })}
              <div class="reminder"><text class="reminder-text"></text></div>
              </div>
              <div class="email-phone">{this.props.user.reminders.map(reminder => {
                    return <div class="reminder"><input type="checkbox"></input></div>
                  })}<div class="reminder"><text class="reminder-text"></text></div></div>
              <div class="email-phone">{this.props.user.reminders.map(reminder => {
                    return <div class="reminder"><input type="checkbox"></input></div>
                  })}<div class="reminder"><text class="reminder-text"></text></div></div>
              <div id="reminder-date">
                  {this.props.user.reminders.map(reminder => {
                    return <div class="reminder"><text class="reminder-text">{reminder.time}</text></div>
                  })}
                  <div class="reminder"><text class="reminder-text"></text></div>
                  </div>
              </div>
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
