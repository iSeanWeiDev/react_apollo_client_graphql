import React from 'react';
import { withRouter } from 'react-router-dom';
import { Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    minHeight: '80vh',
    textAlign: 'center',
    marginTop: theme.spacing(10),
    fontWeight: 700
  }
}));
const NotFound = ({ history }) => {
  const classes = useStyles();
  const handleClick = () => history.push({ pathname: '/dashboard' });

  return (
    <Box className={classes.root}>
      <Typography variant="h3">Page Not Found</Typography>
      <Button color="primary" onClick={handleClick}>
        Go Back To Dashboard
      </Button>
    </Box>
  );
};

export default withRouter(NotFound);
