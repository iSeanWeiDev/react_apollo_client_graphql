import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import JSONEditor from '@app/components/JSONEditor';
import useStyles from './style';

const PreviewPackage = ({ resources, onChange }) => {
  const classes = useStyles();

  const handleChange = (value) => {};
  return (
    <Box className={classes.previewRoot}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Preview</Typography>
        <Button size="small" onClick={() => onChange()}>
          Close
        </Button>
      </Box>
      <JSONEditor
        disable={false}
        resources={resources}
        onChange={handleChange}
      />
    </Box>
  );
};

export default PreviewPackage;
