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
        <div class="top-padding"></div>
        <div id="reminder-wrapper">
          <div id="reminder-list">
            {this.props.user ?
                this.props.user.reminders.map(reminder => {
                  return <div class="reminder">{reminder.title}</div>
                })
                : "LOADING"}
          </div>
          <div id="reminder-content">{this.props.user ?
              this.props.user.reminders.map(reminder => {
                return <div class="reminder">{reminder.description}</div>
              })
              : "LOADING"}</div>
          </div>
          <div class="bottom-padding"></div>
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
