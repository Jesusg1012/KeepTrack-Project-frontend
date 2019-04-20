import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { deleteColumn, deleteRow, addRow, addColumn, getList, changeInfo } from '../Redux/actions'
import '../style/list.css'
class List extends Component {
  state = {
    list: {},
    selected: {}
  }
  handleClick = (e) => {
    if(e.target.tagName !== "INPUT" && e.target.tagName !== "BUTTON" && !e.target.className.includes("react")){
      if(e.target.tagName !== "I"){
        this.setState({
            selected: {id: e.target.id, type: e.target.getAttribute('name'), text: e.target.innerText}
            })
            this.handleSubmit();
      }
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
        this.props.changeInfo(this.state.list.id, this.state.selected.type, this.state.selected.text, this.state.selected.id)
    }
  }
  handleRemove = (e) => {
    if(e.target.id !== this.state.selected.id && this.state.selected.id && e.target.tagName !== "INPUT" && !e.target.className.includes("react") && e.target.tagName !== "I"){
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
  addHandler = (e) => {
    if(e.target.getAttribute('name') === "add-column"){
    this.props.addColumn(this.state.list.id)
    }
    else{
      this.props.addRow(this.state.list.id)
    }
  }
  deleteHandler = (e) => {
    if(e.target.getAttribute('name') === "delete-column"){
    this.props.deleteColumn(this.state.list.id, e.target.id)
    }
    else{
      this.props.deleteRow(this.state.list.id, e.target.id)
    }
  }
  handleForm = (info, text) =>{
    return <div className="edit-holder">
    <input type="text" class="edit" id={info.id} name={text} onKeyDown={this.handleEnter} onChange={this.handleChange} value={this.state.selected.text}></input>
    <button class="cancel" id={info.id} name={text} onClick={this.handleCancel}><i class="fas fa-times" onClick={this.handleCancel}></i></button>
    </div>
  }


  componentDidMount(){
    this.changeList()
    }
  componentDidUpdate(prevProps){
    if(this.props.list){
      if(`/lists/${this.props.list.title}` !== this.props.history.location.pathname){
      this.changeList()
      }
      else if(prevProps.list !== this.props.list){
        this.setState({ list: this.props.list })
      }
    }
  }
  changeList = () => {
      let pathname = this.props.history.location.pathname
      this.props.project.lists.forEach(list => {
        if(`/lists/${list.title}` === pathname){
          this.props.getList(list.id, this.props.project.id)
          }
        })
  }
  render() {
    return (
      <div id="list-wrapper" onClick={this.handleRemove}>
      {console.log(this.state.selected)}
        <div id="names-wrapper">
        <div className="row top-row"><text className="text">Name</text></div>
          {this.state.list.names ? this.state.list.names.map(row => {
            return <div className="row" id={row.id} name="name" onClick={this.handleClick}>
            {
                this.state.selected.id === `${row.id}` && this.state.selected.type === "name"

              ? this.handleForm(row, "name")
              :
              <text className="text" id={row.id} name="name">{row.name}
              </text>
            }
            </div>
          }): <div className="row top-row">Loading...</div>}
          <div class="row add top-column" onClick={this.addHandler}><text class="reminder-text"><i class="fas fa-plus"></i></text></div>
        </div>




        {this.state.list.id?
        <div id="content">
          {
            this.state.list.infos.map(column =>{

            return <div className="column-wrapper">
            <div className="row top-column column" id={column.id} name="column" onClick={this.handleClick}>
            {
              this.state.selected.id === `${column.id}` && this.state.selected.type === "column" ?
              this.handleForm(column, "column")
              :<text className="text" id={column.id} name="column" >{column.name}</text>
            }
            </div>
            {this.state.list.name_infos.map(info => {
              if(info.info_id === column.id){
                return <div className="row column" id={info.id} name="info" onClick={this.handleClick}>
                {
                this.state.selected.id === `${info.id}` && this.state.selected.type === "info" ?
                this.handleForm(info, "info")
                :<text className="text" id={info.id} name="info">{info.content}</text>
                }
                </div>
              }
            })}
            <div className="row column delete-column" id={column.id} name="delete-column" onClick={this.deleteHandler}><i class="fas fa-minus" onClick={this.deleteHandler} id={column.id} name="delete-column"></i></div>
            </div>
          })
          }
          <div className="column-wrapper">
          <div style={{zIndex:"2"}} className="row top-column column add column-adder" onClick={this.addHandler} name="add-column"><text class="text" name="add-column"><i class="fas fa-plus" name="add-column"></i></text></div>
          {
            this.state.list.names.map(row => {
              return <div className="row column delete" id={row.id} onClick={this.deleteHandler} name="delete-row"><text class="text" id={row.id} onClick={this.deleteHandler} name="delete-row"><i class="fas fa-minus" id={row.id} onClick={this.deleteHandler} name="delete-row"></i></text></div>
            })
        }
        <div className="row column top-column delete"></div>
        </div>
        </div>
        : null}
      </div>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    project: state.project,
    list: state.list
  }
}

const mapDispatchToProps = (dispatch) => ({
  getList: (list, project) => dispatch(getList(list, project)),
  addRow: (id) => dispatch(addRow(id)),
  addColumn: (id) => dispatch(addColumn(id)),
  deleteColumn: (id, column) => dispatch(deleteColumn(id, column)),
  deleteRow: (id, row) => dispatch(deleteRow(id, row)),
  changeInfo: (id, type, text, type_id) => dispatch(changeInfo(id, type, text, type_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(List));
