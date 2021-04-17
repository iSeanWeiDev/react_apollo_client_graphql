import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1
  }
}));

const HomeCard = () => {
  const classes = useStyles();
  return <div className={classes.root}></div>;
};

export default HomeCard;
