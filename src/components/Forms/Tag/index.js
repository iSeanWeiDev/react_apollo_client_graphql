import React from 'react';
import { Box } from '@material-ui/core';
import useStyles from './style';

const TagForm = () => {
  const classes = useStyles();

  return <Box className={classes.root}>Tag Form</Box>;
};

export default TagForm;
