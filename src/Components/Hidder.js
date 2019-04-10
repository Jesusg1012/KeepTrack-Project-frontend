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
        <div id="button-holder"><button onClick={()=> handleSignUpPush()}>Sign up</button></div>
        <div className="footer"></div>
        </div>
        <div id={props.history.location.pathname === '/authorization/signup' ?  "hidder-content": null} className={props.history.location.pathname === '/authorization/signup' ?  "normal": "hide"}>
          <div className="header"></div>
          <div id="button-holder"><button onClick={()=> handleLoginPush()}>Login</button></div>
          <div className="footer"></div>
        </div>
      </div>
    );
}
export default withRouter(Hidder);
