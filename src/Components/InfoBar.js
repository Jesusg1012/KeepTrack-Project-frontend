import React, { Component } from 'react';
import '../style/menubar.css'
import { connect } from 'react-redux'
class InfoBar extends Component {
  reminders = () =>{
    let array = []
    let count = 0;
    this.props.user.reminders.forEach(reminder => {
      if(reminder.active && count < 5)
      {
        array.push(reminder)
        count++
      }
    })
    return array.map(reminder => {
      return <div>{reminder.title}</div>
    })
  }
  componentDidUpdate(prevprops){
  if(this.props.user !== prevprops.user){
    this.setState({})
  }
}
render(){
    return (
      <div id="infoBar">
      <div id="APINotice">Notice: we use the free service of the Twilio API for texting, so text messages are disabled</div>
      {this.props.user ?
      <div className="user-info">
      <div>Upcoming reminders:</div>
        {this.reminders()}
        </div>: null
      }
      </div>
    )
  }
}
  const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  }
export default connect(mapStateToProps)(InfoBar)
