import React from 'react';
import { withRouter } from 'react-router-dom';

const HomeContainer = ({ history }) => {
  return <h1>Home Container</h1>;
};

export default withRouter(HomeContainer);
