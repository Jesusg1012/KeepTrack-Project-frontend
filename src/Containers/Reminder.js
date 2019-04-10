import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import '../style/main.css'
import '../style/reminder.css'
import { reminderChanger, changeNotification, addReminder, removeReminder } from '../Redux/actions'
import Loading from '../Components/Loading.js'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class Reminder extends Component {
  state={
    selected: {}
  }
  handleClick = (e) => {
    if(e.target.tagName !== "INPUT" && e.target.tagName !== "BUTTON" && !e.target.className.includes("react")){
      if(e.target.getAttribute('name') === "time"){
        let time = new Date(Number(e.target.getAttribute('value')))
    this.setState({
        selected: {id: e.target.id, type: e.target.getAttribute('name'), text: time}
        })
        this.handleSubmit();
      }
      else if (e.target.getAttribute('name')=== "delete" || e.target.parentNode.getAttribute('name') === "delete"){
        this.props.removeReminder(localStorage.token, e.target.id)
      }
      else{
        this.setState({
            selected: {id: e.target.id, type: e.target.getAttribute('name'), text: e.target.innerText}
            })
            this.handleSubmit();
      }
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
      if(this.state.selected.type === "time"){
        let selected = this.state.selected
        let time = selected.text
        selected.text = time.valueOf()
        this.props.reminderChanger(selected, localStorage.token)
      }
      else{
        this.props.reminderChanger(this.state.selected, localStorage.token)
      }
    }
  }
  handleRemove = (e) => {
    if(e.target.id !== this.state.selected.id && this.state.selected.id && e.target.tagName !== "INPUT" && !e.target.className.includes("react")){
      this.setState({
        selected: {}
      })
      this.handleSubmit()
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
  makeDate = (reminder) =>{
    let date = new Date(reminder.time);
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} at ${this.formatAMPM(date)}`
  }
  formatAMPM =(date)=> {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
  handleTimeChange = (e) =>{
    let selected = this.state.selected
    console.log(this.state.selected)
    let time = Date.parse(e)
    let newTime = new Date(time)
    console.log(newTime)
    selected.text = newTime
    this.setState({ selected })
  }
  handleTime = (reminder) => {
    let date = new Date(this.state.selected.text)
    return <div className="edit-holder" id={reminder.id} name="time">
    <DatePicker selected={date}
    onChange={this.handleTimeChange}
    showTimeSelect
    timeFormat="HH:mm"
    timeIntervals={15}
    dateFormat="MMMM d, yyyy hh:mm aa"
    timeCaption="time"
    className="time"
    />
    <button class="cancel" id={reminder.id} name="time" onClick={this.handleCancel}>X</button>

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
                return <div className={reminder.active ? "reminder-listed": "reminder-listed not-active"} id={reminder.id} name="title" onClick={this.handleClick}>

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
            <div class="top-reminder"><text class="reminder-text">Delete</text></div>
          </div>
          </div>

          <div id="reminder-wrapper">
          <div id="reminder-content">
          {this.props.user.reminders.map(reminder => {
                return <div class={reminder.active ? "reminder-listed": "reminder-listed not-active"} id={reminder.id} name="description" onClick={this.handleClick}>

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
              {this.props.user.reminders.map(reminder => {
                    return <div class={reminder.active ? "reminder":"reminder not-active"} >
                    {reminder.active ?
                    <input type="checkbox"  id={reminder.id} name="email" onClick={this.handleClick} checked={reminder.email}></input>: null
                    }
                    </div>
                  })}<div class="reminder"><text class="reminder-text"></text></div></div>



              <div class="email-phone">
              {this.props.user.reminders.map(reminder => {
                    return <div class={reminder.active ? "reminder":"reminder not-active"}>
                    {reminder.active?
                      <input type="checkbox" id={reminder.id} name="phone" onClick={this.handleClick} checked={reminder.phone}></input>: null
                    }
                    </div>
                  })}
                  <div class="reminder"><text class="reminder-text"></text></div></div>



            <div id="reminder-date">
            {this.props.user.reminders.map(reminder => {
                  return <div class={reminder.active ? "reminder-listed": "reminder-listed not-active"} id={reminder.id} name="time" onClick={this.handleClick} value={reminder.time} >

                  {
                      this.state.selected.id === `${reminder.id}` && this.state.selected.type === "time"

                    ? this.handleTime(reminder)
                        :  <text class="reminder-text" id={reminder.id} name="time" value={reminder.time}>{this.makeDate(reminder)}</text>
                  }

                  </div>
                })}
                  <div class="reminder"><text class="reminder-text"></text></div>
                  </div>
              <div id="deletes">
              {this.props.user.reminders.map(reminder => {
                    return <div class={reminder.active ? "reminder-listed": "reminder-listed not-active"} id={reminder.id} name="delete" onClick={this.handleClick}>
                      <text class="reminder-text" id={reminder.id} name="delete"><i class="fas fa-minus"></i></text>
                    </div>
                  })}
                  <div class="reminder-listed"><text class="reminder-text"></text></div>
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
  addReminder: (token) => dispatch(addReminder(token)),
  removeReminder: (token, id) => dispatch(removeReminder(token, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);
