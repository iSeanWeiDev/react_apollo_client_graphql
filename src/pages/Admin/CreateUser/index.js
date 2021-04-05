import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  DialogTitle,
  Button
} from '@material-ui/core';
import { useInput } from '@app/utils/hooks/form';
import useStyles from './style';

const CreateUserDialog = ({ open, type, onChange }) => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const {
    value: name,
    setValue: setName,
    reset: resetName,
    bind: bindName
  } = useInput('');
  const {
    value: firstName,
    reset: resetFirstName,
    setValue: setFirstName,
    bind: bindFirstName
  } = useInput('');
  const {
    value: lastName,
    reset: resetLastName,
    setValue: setLastName,
    bind: bindLastName
  } = useInput('');
  const {
    value: phone,
    reset: resetPhone,
    setValue: setPhone,
    bind: bindPhone
  } = useInput('');
  const {
    value: email,
    reset: resetEmail,
    setValue: setEmail,
    bind: bindEmail
  } = useInput('');

  useEffect(() => {
    resetName();
    resetFirstName();
    resetLastName();
    resetPhone();
    resetEmail();
  }, [open]);

  useEffect(() => {
    if (type === 'sysAdmin') return setTitle('System Admin');
    if (type === 'stationAdmin') return setTitle('Station Admin');
    if (type === 'districtAdmin') return setTitle('District Admin');
    if (type === 'schoolAdmin') return setTitle('School Admin');
  }, [type]);

  const handleClose = () => {
    onChange(false);
  };

  const handleChange = () => {
    onChange(true, {
      name,
      firstName,
      lastName,
      email,
      phone
    });
  };

  return (
    <Dialog maxWidth="xs" onClose={handleClose} open={open}>
      <DialogTitle className={classes.dialogTitle} onClose={handleClose}>
        Add {title}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="User name"
          className={classes.createInput}
          onChange={(e) => setName(e.target.value)}
          {...bindName}
        />
        <TextField
          label="First name"
          className={classes.createInput}
          onChange={(e) => setFirstName(e.target.value)}
          {...bindFirstName}
        />
        <TextField
          label="Last name"
          className={classes.createInput}
          onChange={(e) => setLastName(e.target.value)}
          {...bindLastName}
        />
        <TextField
          label="Email"
          className={classes.createInput}
          onChange={(e) => setEmail(e.target.value)}
          {...bindEmail}
        />
        <TextField
          label="Phone"
          className={classes.createInput}
          onChange={(e) => setPhone(e.target.value)}
          {...bindPhone}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleChange} color="primary">
          Add {title}
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

export default CreateUserDialog;
