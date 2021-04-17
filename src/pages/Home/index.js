import React from 'react';
import { withRouter } from 'react-router-dom';
import { Toolbar } from '@material-ui/core';
import HomeHeroImages from './Hero';
import HomeFooter from './Footer';
import useStyles from './style';

const HomeContainer = ({ history }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Toolbar />
      <HomeHeroImages />
      <HomeFooter />
    </div>
  );
};

export default withRouter(HomeContainer);
