import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { login } from '../Redux/actions'
import Login from '../Components/Login'
import SignUp from '../Components/SignUp'
import '../style/register.css'

class Register extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
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
            this.props.login(this.state)
            this.setState({
                email: '',
                password:''
            })
    }
    handleSignUp = (e) => {
        e.preventDefault();
            // this.props.login(this.state)
            this.setState({
                email: '',
                password:''
            })
    }
  render() {
    return (
      <div id="register">
      {}
        <SignUp handleChange={this.handleChange} handleSubmit={this.handleSignUp} state={this.state}/>
        <Login handleChange={this.handleChange} handleSubmit={this.handleLogin} state={this.state}/>
      </div>
    )}
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (userObj) => dispatch(login(userObj))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
