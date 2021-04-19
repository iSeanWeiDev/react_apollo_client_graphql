import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    width: '100%',
    height: 500,
    marginTop: -60,
    zIndex: 100
  }
}));

const HomeCard = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Paper className={classes.paper}></Paper>
      </Container>
    </div>
  );
};

export default HomeCard;
