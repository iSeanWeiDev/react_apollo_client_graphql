import React from 'react';
import { Box, TextField } from '@material-ui/core';
import useStyles from './style';

const DescriptionForm = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <TextField
        label="Title *"
        size="small"
        variant="outlined"
        className={classes.inputArea}
      />
      <TextField
        label="Short description"
        size="small"
        variant="outlined"
        className={classes.inputArea}
        multiline
        rows={3}
      />
      <TextField
        label="Long description"
        size="small"
        variant="outlined"
        multiline
        rows={6}
        className={classes.inputArea}
      />
    </Box>
  );
};

export default DescriptionForm;
