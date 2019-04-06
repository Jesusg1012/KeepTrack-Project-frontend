import React from 'react';
const Login = (props) => {
    return (
      <div id="login">
      <div className="header">Login</div>
        <input type="text" name="email" onChange={props.handleChange} value={props.state.email}></input>
        <input type="text" name="password" onChange={props.handleChange} value={props.state.password}></input>
        <button onClick={props.handleSubmit}>submit</button>
        <div className="footer"></div>
      </div>
    );
}
export default Login;
