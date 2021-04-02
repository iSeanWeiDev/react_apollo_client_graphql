import React from 'react';
import { CssBaseline } from '@material-ui/core';

const BasicLayout = (props) => {
  return (
    <React.Fragment>
      <CssBaseline />
      {props.children}
    </React.Fragment>
  );
};

export default BasicLayout;
