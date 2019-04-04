import React, { Component } from 'react';
// import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import { login } from '../Redux/actions'

class Login extends Component {
  state = {
    email: '',
    password:''
  }
  handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
            this.props.login(this.state)
            this.setState({
                email: '',
                password:''
            })
    }

  render() {
    return (
      <div className="login">
        <input type="text" name="email" onChange={this.handleChange} value={this.state.email}></input>
        <input type="text" name="password" onChange={this.handleChange} value={this.state.password}></input>
        <button onClick={this.handleSubmit}>submit</button>
      </div>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
