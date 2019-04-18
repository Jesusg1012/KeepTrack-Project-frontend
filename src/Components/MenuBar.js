import React from 'react';
import { connect } from 'react-redux'
import '../style/menubar.css'
import { withRouter } from 'react-router-dom';
import img from '../img/logo.png'
import Dropdown from 'react-bootstrap/Dropdown'
import { logout, deleteList, getProject } from '../Redux/actions'
import AddList from './AddList'


const MenuBar = (props) => {
  const handleClick = (e) => {
    if(e.target.id !== "selected-menu"){
      if(e.target.innerText === "DashBoard"){
        props.history.push("/dashboard")
      }
      else if(e.target.innerText === "To-Do's"){
        props.history.push("/to-do")
      }
      else if(e.target.innerText === "Reminders"){
        props.history.push("/reminders")
      }
      else if(e.target.innerText === "Projects"){
        props.history.push("/projects")
      }
      else if(e.target.tagName === "DIV" || e.target.tagName === "BUTTON"){
        if(e.target.className !== 'dropdown-toggle btn btn-primary' && e.target.className !== "list-menu dropdown" && e.target.parentNode.tagName !== "A"){
          props.history.push(`/lists/${e.target.innerText}`)
        }
      }
    }
  }
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("currentProject")

    props.logout()
    props.history.push("/authorization")
  }
  const deleteList = (e) => {
    props.deleteList(e.target.id)
    props.history.push("/reminders")
  }
  const renameList = (e) => {
    console.log(e.target)
  }
  const editList = (e) => {
    console.log(e.target)
  }
  const changeProject = (e) =>{
    props.getProject(e.target.id)
    props.history.push("/reminders")
  }

    return (
        <div id="menuBar">
        {console.log(props.history.location.pathname)}
        <div id="top-header">
        <div id="logo"> <img src={img} /></div>
          <Dropdown className="project-menu">
            <Dropdown.Toggle className="dropdown-project" variant="success" id="dropdown-basic">
                <i class="fas fa-caret-down"> {props.project.title} </i>
            </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-project-menu">
                {props.user.projects.map(project => {
                  if(props.project.id === project.id)
                  {return null}
                  else{
                  return <Dropdown.Item onClick={changeProject}><div onClick={changeProject} id={project.id}>{project.title}</div></Dropdown.Item>
                }
                })}
                <Dropdown.Item onClick={() => props.history.push("/project")}><div className="new-project">Edit</div></Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
        <div id="user-logo">
            <img src={props.user.avatar} onClick={logout}/>
        </div>
        </div>
          <div id="menuBar-buttons">
            <button id={props.history.location.pathname === "/reminders" ? "selected-menu":""} onClick={handleClick}>
            <div className="list-title">
              Reminders</div>

            </button>
            {props.project.lists.map(list => {
              console.log(props.history.location.pathname, `/lists/${list.title}`)
              console.log(props.history.location.pathname === `/lists/${list.title}`)
              return <button id={props.history.location.pathname  === `/lists/${list.title}`  ? "selected-menu":""} onClick={handleClick}>
              <div className="list-title">{list.title}</div>
              {props.history.location.pathname === `/lists/${list.title}` ?
              <Dropdown className="list-menu">
                <Dropdown.Toggle>
                  <i class="fas fa-caret-down"></i>
                </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-list-menu">
                  <Dropdown.Item onClick={deleteList}><div id={list.id}><i class="fas fa-trash dropdown-i"></i> Delete</div></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              :null}</button>
            })}
            <div></div>
            <AddList />
          </div>

          <div id="user-content">

          </div>
        </div>
    )
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    project: state.project
  }
}
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  deleteList: (id) => dispatch(deleteList(id)),
  getProject: (id) => dispatch(getProject(id, localStorage.token))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MenuBar))
