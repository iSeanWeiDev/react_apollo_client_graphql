import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  DialogTitle,
  TextareaAutosize,
  Button
} from '@material-ui/core';
import { useInput } from '@app/utils/hooks/form';
import useStyles from './style';

const CreateResource = ({ open, onChange }) => {
  const classes = useStyles();
  const {
    value: name,
    setValue: setName,
    reset: resetName,
    bind: bindName
  } = useInput('');
  const {
    value: title,
    setValue: setTitle,
    reset: resetTitle,
    bind: bindTitle
  } = useInput('');
  const {
    value: short,
    reset: resetShort,
    setValue: setShort,
    bind: bindShort
  } = useInput('');
  const {
    value: long,
    reset: resetLong,
    setValue: setLong,
    bind: bindLong
  } = useInput('');

  useEffect(() => {
    resetName();
    resetTitle();
    resetShort();
    resetLong();
  }, [open]);

  const handleClose = () => {
    onChange(false);
  };

  const handleChange = () => {
    onChange(true, {
      name,
      title,
      short,
      long
    });
  };

  return (
    <Dialog maxWidth="xs" onClose={handleClose} open={open}>
      <DialogTitle className={classes.dialogTitle} onClose={handleClose}>
        Create Resource
      </DialogTitle>
      <DialogContent>
        <TextField
          size="small"
          label="Resource name"
          variant="outlined"
          className={classes.inputArea}
          onChange={(e) => setName(e.target.value)}
          {...bindName}
        />
        <TextField
          size="small"
          label="Title"
          variant="outlined"
          className={classes.inputArea}
          onChange={(e) => setTitle(e.target.value)}
          {...bindTitle}
        />
        <TextareaAutosize
          placeholder="Short Description"
          className={classes.textArea}
          rowsMin={2}
          rowsMax={5}
          onChange={(e) => setShort(e.target.value)}
          {...bindShort}
        />
        <TextareaAutosize
          className={classes.textArea}
          placeholder="Long Description"
          onChange={(e) => setLong(e.target.value)}
          rowsMin={4}
          rowsMax={8}
          {...bindLong}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleChange} color="primary">
          Submit
        </Button>
        <Button
          autoFocus
          onClick={handleClose}
          className={classes.dialogAddBtn}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateResource;
