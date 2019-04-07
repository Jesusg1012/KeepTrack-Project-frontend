import React from 'react';
import { withRouter } from 'react-router-dom';

const Login = (props) => {

    return (
      <div id="login" className={props.history.location.pathname === '/authorization/signup' ?  "hide": "normal"}>
      <div className="header"></div>
      <div id="login-content">
      <div className="header"></div>
        <div className="input-container">
        <label>Email</label><br />
          <input type="text" name="email" onChange={props.handleChange} value={props.state.email}></input>
        </div>
        <div className="input-container">
          <label>Password</label><br />
          <input type="text" name="password" onChange={props.handleChange} value={props.state.password}></input>
        </div>
        <div>
          <button onClick={props.handleSubmit}>submit</button>
        </div>
        <div className="footer"></div>
        </div>
        <div className="footer"></div>
      </div>
    );
}
export default withRouter(Login);
