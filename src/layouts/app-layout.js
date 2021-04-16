import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { AppNavbar } from '@app/components/App';

const BasicLayout = (props) => {
  return (
    <React.Fragment>
      <AppNavbar position="fixed" fullWidth />

      <CssBaseline />
      {props.children}
    </React.Fragment>
  );
};

export default BasicLayout;
