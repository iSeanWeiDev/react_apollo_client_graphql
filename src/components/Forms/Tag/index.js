import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import useStyles from './style';

const TagForm = ({ resources, onChange }) => {
  const classes = useStyles();
  const [value, setValue] = useState([]);
  const [loadedData, setLoadedData] = useState([]);
  useEffect(() => {
    if (resources) {
      setLoadedData(resources);
      setValue(resources);
    } else {
      setLoadedData([]);
      setValue([]);
    }
  }, [resources]);

  const handleInputChange = (e) => {
    setLoadedData([...loadedData, e.target.value]);
  };

  return (
    <Box className={classes.root}>
      <Autocomplete
        multiple
        id="size-small-outlined-multi"
        size="small"
        options={loadedData}
        value={value}
        getOptionLabel={(option) => option}
        onChange={(e, value) => onChange(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="tags"
            onChange={handleInputChange}
          />
        )}
      />
    </Box>
  );
};

export default TagForm;
