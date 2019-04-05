import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import '../style/main.css'
import '../style/reminder.css'
class Reminder extends Component {
  state={
    selected: []
  }
  // componentDidUpdate(prevProps){
  //   if(prevProps.user !== this.props.user){
  //     this.setState({selected: this.props.user.reminders[0]})
  //   }
  // }
  handleClick = (e) =>{
    console.log(this.state.selected)
    if(!this.state.selected.find(current => {
      if(current.id === e.target.id && current.type === e.target.getAttribute('name')){
        return true
      }})){
    this.setState({
      selected: [...this.state.selected, {id: e.target.id, type: e.target.getAttribute('name')}]
    })
    }
    else{
      console.log("NOPE")
    }
  }
  handleChange = (e) => {
    let index = 0
    let att = this.state.selected.find(current => {
      if(current.id === e.target.id && current.type === e.target.getAttribute('name')){
        return true
      }
      index++
    })
    
  }
  render() {
    return (
      <div id="reminder-container">
      {this.props.user ?
        <div id="two-grid">
        <div id="reminder-list">
        <div class="top-reminder-fix"><text class="reminder-text">Reminders</text></div>
          {this.props.user.reminders.map(reminder => {
                return <div class="reminder-listed" id={reminder.id} name="title" onDoubleClick={this.handleClick}>

                {
                  this.state.selected.find(current => {
                    if(current.id === `${reminder.id}` && current.type === "title"){
                      return true
                    }
                  }) ?
                      <input type="text" class="edit-title" id={reminder.id} name="title" onChange={this.handleChange} value={reminder.title}></input>
                      :  <text class="reminder-text" id={reminder.id} name="title">{reminder.title}</text>
                }

                </div>
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
                return <div class="reminder" id={reminder.id} name="description" onDoubleClick={this.handleClick}>

                {
                  this.state.selected.find(current => {
                    if(current.id === `${reminder.id}` && current.type === "description"){
                      return true
                    }
                  }) ?
                      <input type="text" class="edit-title" id={reminder.id} name="description" onChange={this.handleChange}  value={reminder.title}></input>
                      :  <text class="reminder-text" id={reminder.id} name="description">{reminder.title}</text>
                }

                </div>
              })}
              <div class="reminder"><text class="reminder-text" ></text></div>
              </div>



              <div class="email-phone">
              {this.props.user.reminders.map(reminder => {
                    return <div class="reminder" ><input type="checkbox" id={reminder.id} name="email" onDoubleClick={this.handleClick}></input></div>
                  })}<div class="reminder"><text class="reminder-text"></text></div></div>



              <div class="email-phone">
              {this.props.user.reminders.map(reminder => {
                    return <div class="reminder">
                    <input type="checkbox" id={reminder.id} name="text" onDoubleClick={this.handleClick}></input>
                    </div>
                  })}
                  <div class="reminder"><text class="reminder-text"></text></div></div>



            <div id="reminder-date">
            {this.props.user.reminders.map(reminder => {
                  return <div class="reminder" id={reminder.id} name="time" onDoubleClick={this.handleClick}>

                  {
                    this.state.selected.find(current => {
                      if(current.id === `${reminder.id}` && current.type === "time"){
                        return true
                      }
                    }) ?
                        <input type="text" class="edit-title" id={reminder.id} name="time" onChange={this.handleChange}  value={reminder.title}></input>
                        :  <text class="reminder-text" id={reminder.id} name="time">{reminder.title}</text>
                  }

                  </div>
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
