import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import JSONEditor from '@app/components/JSONEditor';
import useStyles from './style';

const PreviewPackage = () => {
  const classes = useStyles();
  const [loadedData, setLoadedData] = useState({});
  const handleChange = (value) => {};
  return (
    <Box className={classes.previewRoot}>
      <JSONEditor
        disable={false}
        resources={loadedData}
        onChange={handleChange}
      />
    </Box>
  );
};

export default PreviewPackage;
