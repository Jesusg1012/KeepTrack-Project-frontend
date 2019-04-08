import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import '../style/main.css'
import '../style/reminder.css'
import { reminderChanger, changeNotification, addReminder } from '../Redux/actions'
import Loading from '../Components/Loading.js'
class Reminder extends Component {
  state={
    selected: {}
  }
  handleClick = (e) => {
    if(e.target.tagName !== "INPUT" && e.target.tagName !== "BUTTON"){
    this.setState({
        selected: {id: e.target.id, type: e.target.getAttribute('name'), text: e.target.innerText}
      })
      this.handleSubmit();
    }
    else if (e.target.name === "email" || e.target.name === "phone") {
      this.props.changeNotification(e.target.id, e.target.name, localStorage.token)
    }
  }
  handleChange = (e) => {
    let att = this.state.selected
    att.text = e.target.value
    this.setState({
      selected: att
    })
  }
  handleEnter = (e) => {
    if(e.key === "Enter"){
      this.handleSubmit()
      this.setState({
        selected: {}
      })
    }
  }
  handleSubmit = () => {
    if(this.state.selected.id){
    this.props.reminderChanger(this.state.selected, localStorage.token)
  }
  }
  handleRemove = (e) => {
    if(e.target.id !== this.state.selected.id && this.state.selected.id){
      this.setState({
        selected: {}
      })
    }
  }
  handleCancel = () => {
    this.setState({
      selected: {}
    })
  }
  addHandler = () => {
    this.props.addReminder(localStorage.token)
  }
  handleForm = (reminder, text) =>{
    return <div className="edit-holder">
    <input type="text" class="edit" id={reminder.id} name={text} onKeyDown={this.handleEnter} onChange={this.handleChange} value={this.state.selected.text}></input>
    <button class="cancel" id={reminder.id} name={text} onClick={this.handleCancel}>X</button>
    </div>
  }
  render() {
    return (
      <div id="reminder-container" onClick={this.handleRemove}>
      {this.props.user ?
        <div id="two-grid">
        <div id="reminder-list">
        <div class="top-reminder-fix"><text class="reminder-text">Reminders</text></div>
          {this.props.user.reminders.map(reminder => {
                return <div className="reminder-listed" id={reminder.id} name="title" onClick={this.handleClick}>

                {
                    this.state.selected.id === `${reminder.id}` && this.state.selected.type === "title"

                  ? this.handleForm(reminder, "title")

                      :  <text className="reminder-text" id={reminder.id} name="title">{reminder.title}</text>
                }

                </div>
              })}
              <div class="reminder-listed adder" onClick={this.addHandler}><text class="reminder-text"><i class="fas fa-plus"></i></text></div>
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
                return <div class="reminder-listed" id={reminder.id} name="description" onClick={this.handleClick}>

                {
                    this.state.selected.id === `${reminder.id}` && this.state.selected.type === "description"

                  ? this.handleForm(reminder, "description")

                      :  <text class="reminder-text" id={reminder.id} name="description" >{reminder.description}</text>
                }

                </div>
              })}
              <div class="reminder"><text class="reminder-text" ></text></div>
              </div>



              <div class="email-phone">
              {console.log(this.props.user.reminders)}
              {this.props.user.reminders.map(reminder => {
                    return <div class="reminder" >
                    <input type="checkbox"  id={reminder.id} name="email" onClick={this.handleClick} checked={reminder.email}></input>
                    </div>
                  })}<div class="reminder"><text class="reminder-text"></text></div></div>



              <div class="email-phone">
                {console.log(this.props.user.reminders)}
              {this.props.user.reminders.map(reminder => {
                    return <div class="reminder">
                      <input type="checkbox" id={reminder.id} name="phone" onClick={this.handleClick} checked={reminder.phone}></input>
                    </div>
                  })}
                  <div class="reminder"><text class="reminder-text"></text></div></div>



            <div id="reminder-date">
            {this.props.user.reminders.map(reminder => {
                  return <div class="reminder-listed" id={reminder.id} name="time" onClick={this.handleClick}>

                  {
                      this.state.selected.id === `${reminder.id}` && this.state.selected.type === "time"

                    ? this.handleForm(reminder, "time")
                        :  <text class="reminder-text" id={reminder.id} name="time">{reminder.time}</text>
                  }

                  </div>
                })}
                  <div class="reminder"><text class="reminder-text"></text></div>
                  </div>
              </div>
              </div>
              </div>
          : <Loading />}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => ({
  reminderChanger: (reminder, token) => dispatch(reminderChanger(reminder, token)),
  changeNotification: (id, type, token) => dispatch(changeNotification(id, type, token)),
  addReminder: (token) => dispatch(addReminder(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);
