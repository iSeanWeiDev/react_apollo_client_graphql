import React from 'react';
import { withRouter } from 'react-router-dom';
// import Preloader from "./partials/Preloader";
import Timer from './partials/Countdown';
import Optin from './partials/Optin';
import './style.css';

const ComingSoonContainer = ({ history }) => {
  return (
    <div className="coming-soon-page-wrapper">
      <div className="container">
        <h1>
          Website
          <br />
          Coming Soon
        </h1>
        <Timer />
        <Optin />
        {/* <Preloader /> */}
      </div>
    </div>
  );
};

export default withRouter(ComingSoonContainer);
