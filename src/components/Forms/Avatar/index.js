import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { DropzoneArea } from 'material-ui-dropzone';
import { Box, IconButton, LinearProgress, Grid } from '@material-ui/core';
import { Img } from 'react-image';
import { useSnackbar } from 'notistack';
import { getBase64 } from '@app/utils/file';
import { Close } from '@material-ui/icons';
import useStyles from './style';
import './style.css';

const AvatarForm = ({ acceptedFiles }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [loadedData, setLoadedData] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = async (files) => {
    try {
      if (files.length > 0) {
        setLoading(true);
        const base64string = await getBase64(files[0]);
        setLoadedData(base64string);

        setLoading(false);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleClose = () => {
    setLoadedData('');
  };

  return (
    <Box className={classes.root}>
      {loadedData ? (
        <Box position="relative">
          <Img
            src={loadedData}
            className={classes.media}
            loader={<LinearProgress />}
          />
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      ) : (
        <DropzoneArea
          dropzoneText={'Drag and Drop a Logo'}
          dropzoneClass={classes.dropzone}
          dropzoneParagraphClass={classes.dropzoneParagraph}
          showPreviewsInDropzone={false}
          showPreviews={false}
          acceptedFiles={acceptedFiles ? acceptedFiles : ['image/*']}
          filesLimit={1}
          onChange={handleChange}
        />
      )}
    </Box>
  );
};

export default AvatarForm;
