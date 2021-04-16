import React, { Component } from 'react';
import './optin.css';

class Optin extends Component {
  modal() {
    document.location.href = './dashboard';
    // const modal = document.getElementById("modal");
    // modal.classList.toggle("is_open");
  }

  render() {
    return (
      <div className="optin">
        <p>Return back to other page</p>
        <button onClick={() => this.modal()}>Click Me</button>
      </div>
    );
  }
}

export default Optin;
