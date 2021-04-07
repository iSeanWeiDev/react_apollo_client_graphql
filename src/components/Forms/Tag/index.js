import React, { useState } from 'react';
import { Box, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import testData from './data';
import useStyles from './style';

const TagForm = () => {
  const classes = useStyles();
  const [loadedData, setLoadedData] = useState(testData.data);

  const handleInputChange = (e) => {
    setLoadedData([
      ...loadedData,
      { label: e.target.value, value: e.target.value }
    ]);
  };

  const handleTagChange = (e, value) => {
    console.log(value);
  };

  return (
    <Box className={classes.root}>
      <Autocomplete
        multiple
        id="size-small-outlined-multi"
        size="small"
        options={loadedData}
        getOptionLabel={(option) => option.label}
        onChange={handleTagChange}
        defaultValue={[loadedData[13]]}
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
