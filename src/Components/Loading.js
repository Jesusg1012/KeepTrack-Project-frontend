import React from 'react';
import '../style/menubar.css'
import Spinner from 'react-bootstrap/Spinner'
// import 'bootstrap/dist/css/bootstrap.min.css';
const Loading = (props) => {
    return (
      <div id="loading-container">
      <div style={{width:"100%", height:"40%"}}></div>
        <h1>LOADING</h1>
        <Spinner animation="border" />
        <div style={{width:"100%", height:"40%"}}></div>

      </div>
    )
  }
export default Loading
