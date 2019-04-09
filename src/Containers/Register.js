import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { login, postUser } from '../Redux/actions'
import Login from '../Components/Login'
import SignUp from '../Components/SignUp'
import '../style/register.css'
import Hidder from '../Components/Hidder'

class Register extends Component {
  state = {
    name: '',
    email: '',
    number: '',
    password:'',
    pass02: '',
    error: {
      check: false,
      type: ''
    }
  }
  handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleLogin = (e) => {
        e.preventDefault();
            this.props.login({email: this.state.email, password: this.state.password})
            this.setState({
                email: '',
                password:''
            })
    }
    handleSignUp = (e) => {
        e.preventDefault();
        let user = {name: this.state.name, email: this.state.email, password: this.state.password, number: this.state.number}
            this.props.postUser(user)
            this.setState({
                email: '',
                password:''
            })
    }
  render() {
    return (
      <div id="body">
      <div className={this.props.history.location.pathname === '/authorization/signup' ?  "tester-left": "tester-right"}></div>

      <div id="register">
      {this.props.history.location.pathname === '/authorization'
        ? this.props.history.push('/authorization/login') : null}
        <SignUp handleChange={this.handleChange} handleSubmit={this.handleSignUp} state={this.state}/>
        <Hidder />
        <Login handleChange={this.handleChange} handleSubmit={this.handleLogin} state={this.state}/>
      </div>
      </div>
    )}
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (userObj) => dispatch(login(userObj)),
    postUser: (userObj) => dispatch(postUser(userObj))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
