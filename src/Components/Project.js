import React, { Component } from 'react';
import '../style/projects.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { newList } from '../Redux/actions.js'
import { projectChanger, getProject, postProject } from '../Redux/actions'
class ProjectPopup extends Component {
  state = {
    check: false,
    selected: 0,
    new: ""
  }
  handleChange = (e) => {
    let att = this.state.selected
    att.title = e.target.value
    this.setState({
      selected: att
    })
  }
  handleSubmit = () => {
    if(this.state.selected.id){
      this.props.projectChanger(this.state.selected, localStorage.token)
    }
  }
  handleForm = (project) =>{
    return <div className="project-edit-holder">
    <input class="project-edit" id={project.id} onKeyDown={this.handleEnter} onChange={this.handleChange} value={this.state.selected.title}></input>
    <button class="project-cancel" id={project.id} onClick={this.handleCancel}><i class="fas fa-times"></i></button>
    </div>
  }
  changeState = () =>{
    this.setState({check: !this.state.check})
  }
  handleClick = (e) =>{
    if(e.target.className==="project-div")
    {
      let newProject = {}
      this.props.user.projects.forEach(project => {
        if(`${project.id}` === e.target.id){
          console.log(`${project.id}`, e.target.id)
          newProject = project
        }
      })
      if(newProject.id && e.target.tagName !== "BUTTON"){
        localStorage.currentProject=e.target.id
        this.props.getProject(newProject.id, localStorage.token)
        this.props.history.push("/")
      }
    }
    else{
    let newProject = {}
    this.props.user.projects.forEach(project => {
      if(`${project.id}` === e.target.id){
        console.log(`${project.id}`, e.target.id)
        newProject = project
      }
    })
    if(newProject.id && e.target.tagName !== "BUTTON"){
      this.setState({selected: newProject})
    }
  }
}
  handleCancel = () =>{
    this.setState({selected: {}})
  }
  handleEnter = (e) => {
    if(e.key === "Enter"){
      this.handleSubmit()
      this.setState({
        selected: {}
      })
    }
  }
  handleNewChange = (e) =>{
    let att = this.state.selected
    att = e.target.value
    this.setState({
      new: att
    })
  }
  handleNewSubmit = (e) =>{
    if(this.state.new.length > 1){
      this.props.postProject(this.state.new)
      this.props.history.push('/')
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps.user!==this.props.user){
      this.setState({selected:{}})
    }
  }
  render() {
    return (
      <div id="project-container">
      {console.log(this.state.selected)}
      <div className={this.state.check?"project-hidder right":"project-hidder left"} onMouseEnter={this.changeState}>
      <div style={{width:"100%", height:"40%"}}></div>
        {this.state.check? <div className="hidder-content">View all Projects here</div>:<div className="hidder-content">Create new Project here</div> }
        <div style={{width:"100%", height:"40%"}}></div>
      </div>
      <div id="project-wrapper">
      <div id="new-project">
      <div className="project-header">
      </div>
      <div className="project-container">
        <div style={{width:"100%", height:"20%", padding:"10px", textAlign:"center"}}>
        </div>
        <div>
        <h1 style={{textAlign:"center",  color:"rgb(50,50,50)"}}>Create new Project</h1>
        <div className="input-container" style={{margin:"auto"}}>
        <label>Title</label><br />
          <input type="text" name="email" onChange={this.handleNewChange} value={this.state.new}></input>
        </div>
        <div className="input-container" style={{margin:"auto"}}><button onClick={this.handleNewSubmit}>Submit</button></div>
        </div>
        <div style={{width:"100%", height:"60%"}}></div>
      </div>
      <div className="project-footer">
      </div>
      </div>
        <div id="project-all">
          <div className="project-header">
          </div>
          <div className="project-container" onClick={this.handleClick}>
          <div id="all-projects-header">
          {this.props.user?
            <h1>{this.props.user.name}</h1>:null
          }
          <h2>All Projects</h2>
          </div>
          <div className="project-controller">
          {this.props.user ?
            this.props.user.projects.map(project => {
              return <div id={project.id} className="project-div">
              {
                  this.state.selected.id === project.id

                ? this.handleForm(project)
                    : <text>{project.title}<i id={project.id} style={{float:"right"}}class="fas fa-pen"></i></text>
              }
              </div>
            })
            :null}
            </div>
          </div>
          <div className="project-footer">
          </div>
        </div>
      </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  projectChanger: (project) => dispatch(projectChanger(project)),
  getProject: (project, token) => dispatch(getProject(project, token)),
  postProject: (title) => dispatch(postProject(title))
})
const mapStateToProps = (state) => {
  return {
    user: state.user,
    project: state.project
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectPopup));
