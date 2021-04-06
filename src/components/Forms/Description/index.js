import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@material-ui/core';
import useStyles from './style';

const DescriptionForm = ({ resources, onChange }) => {
  const classes = useStyles();
  const [loadedData, setLoadedData] = useState({});

  useEffect(() => {
    if (resources) {
      setLoadedData(resources);
    }
  }, [resources]);

  const handleInputChange = (type, value) => {
    setLoadedData({
      ...loadedData,
      [type]: value
    });

    onChange({
      ...loadedData,
      [type]: value
    });
  };

  return (
    <Box className={classes.root}>
      <TextField
        label="Title *"
        size="small"
        variant="outlined"
        value={loadedData?.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
        className={classes.inputArea}
      />
      <TextField
        label="Short description"
        size="small"
        variant="outlined"
        value={loadedData?.short}
        onChange={(e) => handleInputChange('short', e.target.value)}
        className={classes.inputArea}
        multiline
        rows={3}
      />
      <TextField
        label="Long description"
        size="small"
        variant="outlined"
        multiline
        rows={8}
        value={loadedData?.long}
        onChange={(e) => handleInputChange('long', e.target.value)}
        className={classes.inputArea}
      />
    </Box>
  );
};

export default DescriptionForm;
