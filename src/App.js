import './App.css';
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Register from './Containers/Register'
import Main from './Containers/Main'
import { connect } from 'react-redux'
import { getUser, getProject} from './Redux/actions'
import Loading from './Components/Loading'
import Project from './Components/Project'
class App extends Component {
  componentDidMount(){
    let token = localStorage.token;
    token ? this.props.getUser(token) : this.props.history.push("/authorization");
    if(this.props.user && !localStorage.currentProject)
    {
      console.log(this.props.user.projects[0])
      this.props.getProject(this.props.user.projects[0].id, localStorage.token)
    }
    else{

      this.props.getProject(localStorage.currentProject, localStorage.token)
    }
  }

  componentDidUpdate(prevProps){
    console.log(this.props.project)
    if(prevProps.user !== this.props.user || prevProps.project !== this.props.project){
        this.setState({})
    }
    if(this.props.user && !localStorage.currentProject)
    {
      console.log(this.props.user.projects[0])
      this.props.getProject(this.props.user.projects[0].id, localStorage.token)
    }
  }
  render() {
    return (
      <Switch>
        <Route path="/authorization" render={() => <Register />} />
        <Route path="/project" render={() => <Project />} />
        <Route path="/" render={() => {
          if(this.props.user && this.props.project){
            return <Main />}
          else{
            return <Loading />
          }}} />
      </Switch>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    project: state.project
  }
}

// const mapDispatchToProps = { getHobbits }
const mapDispatchToProps = (dispatch) => ({
  getUser: (token) => dispatch(getUser(token)),
  getProject: (project, token) => dispatch(getProject(project, token))
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
