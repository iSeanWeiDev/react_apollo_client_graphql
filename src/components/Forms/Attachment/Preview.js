import React, { useState, useEffect } from 'react';
import { Box, Divider, Typography, TextField, Button } from '@material-ui/core';
import { Img } from 'react-image';
import PDFReader from '@app/components/PDFReader';
import useStyles from './style';

const AttachmentPreview = ({ resources }) => {
  const classes = useStyles();
  const [loadedData, setLoadedData] = useState({});

  useEffect(() => {
    setLoadedData(resources);
  }, [resources]);

  const handleInputChange = (field, value) => {
    setLoadedData({
      ...loadedData,
      [field]: value
    });
  };
  return (
    <Box className={classes.preview}>
      <Box justifyContent="space-between" display="flex" alignItems="center">
        <Typography variant="h6" className={classes.previewTitle}>
          Preview
        </Typography>
        <Button size="small" className={classes.updateBtn}>
          Update
        </Button>
      </Box>
      <Divider className={classes.separator} />
      <TextField
        value={loadedData.name}
        variant="outlined"
        size="small"
        label="Name *"
        className={classes.inputArea}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />
      <TextField
        value={loadedData.altText}
        variant="outlined"
        size="small"
        label="Alternative Text"
        className={classes.inputArea}
        onChange={(e) => handleInputChange('altText', e.target.value)}
      />
      <Box display="flex" justifyContent="center">
        {loadedData.type === 'video/mp4' && (
          <video
            src={loadedData.url}
            controls
            autoPlay
            className={classes.previewVideo}
          />
        )}

        {(loadedData.type === 'image/png' ||
          loadedData.type === 'image/jpeg') && (
          <Img src={loadedData.url} className={classes.previewImg} />
        )}

        {loadedData.type === 'application/pdf' && (
          <Box className={classes.previewPdf}>
            <PDFReader url={loadedData.url} />
          </Box>
        )}
      </Box>

      <Box textAlign="center">
        <Typography variant="caption" className={classes.previewUrl}>
          {loadedData.url}
        </Typography>
      </Box>
    </Box>
  );
};

export default AttachmentPreview;
