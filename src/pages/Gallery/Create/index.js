import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  DialogTitle,
  Button,
  Slide,
  Grid
} from '@material-ui/core';
import { useInput } from '@app/utils/hooks/form';
import useStyles from './style';
import AvatarForm from '@app/components/Forms/Avatar';

const CreateGalleryDialog = ({ title, open, type, onChange }) => {
  const classes = useStyles();
  const {
    value: photo,
    setValue: setPhoto,
    reset: resetPhoto,
    bind: bindPhoto
  } = useInput('');
  const {
    value: name,
    setValue: setName,
    reset: resetName,
    bind: bindName
  } = useInput('');
  const {
    value: altText,
    reset: resetAltText,
    setValue: setAltText,
    bind: bindAltText
  } = useInput('');
  const {
    value: galleryType,
    reset: resetGalleryType,
    setValue: setGalleryType,
    bind: bindGalleryType
  } = useInput('');

  useEffect(() => {
    resetPhoto();
    resetName();
    resetAltText();
    resetGalleryType();
  }, [open]);

  const handleClose = () => {
    onChange(false);
  };

  const handleChange = () => {
    onChange(true, {
      photo,
      name,
      altText,
      galleryType
    });
  };

  return (
    <Dialog
      onClose={() => onChange(false)}
      open={open}
      maxWidth="sm"
      classes={{ paper: classes.dialogPaper }}
      TransitionComponent={Slide}
      TransitionProps={{
        direction: 'left'
      }}
    >
      <DialogTitle>Add {title}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Grid container className={classes.root}>
          <Grid item xs={12} md={12} lg={4} className={classes.photo}>
            <AvatarForm
              docId={`galleries/${type}`}
              resources={photo}
              acceptedFiles={['image/png']}
              {...bindPhoto}
              onChange={(value) => setPhoto(value)}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={8} className={classes.info}>
            <TextField
              label="Name"
              variant="outlined"
              size="small"
              className={classes.createInput}
              onChange={(e) => setName(e.target.value)}
              {...bindName}
            />
            <TextField
              label="Alt Text"
              variant="outlined"
              size="small"
              className={classes.createInput}
              onChange={(e) => setAltText(e.target.value)}
              {...bindAltText}
            />
            <TextField
              label="Type"
              variant="outlined"
              size="small"
              className={classes.createInput}
              onChange={(e) => setGalleryType(e.target.value)}
              {...bindGalleryType}
            />
            <TextField
              disabled
              label="URL"
              variant="outlined"
              size="small"
              className={classes.createInput}
              value={photo}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
        <Button autoFocus onClick={handleChange} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateGalleryDialog;
