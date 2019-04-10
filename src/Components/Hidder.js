import React from 'react';
import { withRouter } from 'react-router-dom';

const Hidder = (props) => {
  const handleLoginPush = () =>{
    props.history.push('/authorization/login')
  }
  const handleSignUpPush = () =>{
    props.history.push('/authorization/signup')
  }
    return (
        <div id="hidder">
        <div id={props.history.location.pathname === '/authorization/login' ?  "hidder-content": null} className={props.history.location.pathname === '/authorization/login' ?  "normal": "hide"}>
          <div className="header"></div>
          <div id="button-holder">
          <h1>KeepTrack</h1>
            <p>Don't Have an account?</p> <a onClick={()=> handleSignUpPush()}>Sign up!</a>
          </div>
          <div className="footer"></div>
        </div>
        <div id={props.history.location.pathname === '/authorization/signup' ?  "hidder-content": null} className={props.history.location.pathname === '/authorization/signup' ?  "normal": "hide"}>
          <div className="header"></div>
          <div id="button-holder">
            <h1>KeepTrack</h1>
            <p>Already have an account? </p><a onClick={() => handleLoginPush()}>log in</a>
          </div>
          <div className="footer"></div>
        </div>
      </div>
    );
}
export default withRouter(Hidder);
