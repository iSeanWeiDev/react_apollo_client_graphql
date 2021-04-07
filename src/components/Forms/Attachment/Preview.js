import React from 'react';
import { Box } from '@material-ui/core';
import PDFReader from '@app/components/PDFReader';

const AttachmentPreview = ({ resources }) => {
  const { type, url } = resources;

  return (
    <React.Fragment>
      {type === 'video/mp4' && (
        <Box
          mt="2"
          borderRadius="2px"
          component="video"
          controls
          autoPlay
          width="100%"
          src={url}
        />
      )}

      {(type === 'image/png' || type === 'image/jpeg') && (
        <Box
          mt="2"
          borderRadius="2px"
          component="img"
          controls
          autoPlay
          width="100%"
          src={url}
        />
      )}

      {type === 'application/pdf' && (
        <Box mt="2" borderRadius="2px" component={PDFReader} url={url} />
      )}
    </React.Fragment>
  );
};

export default AttachmentPreview;
