import React, { Component } from 'react';
import '../style/main.css'
import { connect } from 'react-redux'
import { newList } from '../Redux/actions.js'
class AddList extends Component {
  state = {creating: false}
  makeList = (e) => {
    this.setState({title: "new list", creating: true})
  }
  handleChange = (e) => {
    this.setState({title: e.target.value})
  }
  handleSubmit = (e) =>{
    this.setState({creating: false})
    this.props.newList(this.state.title.trim())
  }
  handleCancel = () =>{
    this.setState({creating: false})

  }
  handleEnter = (e) => {
    if(e.key === "Enter"){
      this.handleSubmit(e)
      this.setState({
        selected: {}
      })
    }
  }
  render() {
    return (
      <div className={this.state.creating? "new-list": "plus"} >
        {this.state.creating? <input type="text" value={this.state.title} onChange={this.handleChange} onBlur={this.handleSubmit} onKeyDown={this.handleEnter}></input>
        :<i class="fas fa-plus-square" onClick={this.makeList}></i>}
        {this.state.creating? <i class="fas fa-window-close" onClick={this.handleCancel} id="cancel"></i>: null}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  newList: (title) => dispatch(newList(title))
})
export default connect(null, mapDispatchToProps)(AddList);
