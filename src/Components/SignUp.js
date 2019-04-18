import React from 'react';
import { withRouter } from 'react-router-dom';

const SignUp = (props) => {

    return (
      <div id="sign-up" className={props.history.location.pathname === '/authorization/login' ?  "hide": "normal"}>
      <div className="header"></div>
      <div id="sign-up-content">
      <div className="header"></div>
      <div className="input-container"><label>Username</label><br /><input type="text" name="username" onChange={props.handleChange} value={props.state.username}></input></div>
        <div className="input-container"><label>Name</label><br /><input type="text" name="name" onChange={props.handleChange} value={props.state.name}></input></div>
        <div className="input-container"><label>Email</label><br /><input type="text" name="email" onChange={props.handleChange} value={props.state.email}></input></div>
        <div className="input-container"><label>Phone Number</label><br /><input type="text" name="number" onChange={props.handleChange} value={props.state.number}></input></div>
        <div className="input-container"><label>Password</label><br /><input type="password" name="password" onChange={props.handleChange} value={props.state.password}></input></div>
        <div className="input-container"><button onClick={props.handleSubmit}>Submit</button></div>
        <div className="header"></div>
        </div>
        <div className="footer"></div>
      </div>
    );
}
export default withRouter(SignUp);
