import React from 'react';
const SignUp = (props) => {
    return (
      <div id="sign-up">
      <div className="header">Sign Up</div>
        <input type="text" name="name" onChange={props.handleChange} value={props.state.name}></input>
        <input type="text" name="email" onChange={props.handleChange} value={props.state.email}></input>
        <input type="text" name="number" onChange={props.handleChange} value={props.state.number}></input>
        <input type="text" name="password" onChange={props.handleChange} value={props.state.password}></input>
        <input type="text" name="pass02" onChange={props.handleChange} value={props.state.pass02}></input>
        <button onClick={props.handleSubmit}>submit</button>
        <div className="footer"></div>
      </div>
    );
}
export default SignUp;
