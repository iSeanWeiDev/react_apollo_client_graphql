import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { useInput } from '@app/utils/hooks/form';
import useStyles from './style';

const CreateUserDialog = ({
  open,
  type,
  classOptions,
  districtOptions,
  onChange
}) => {
  const _classes = useStyles();
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
  const {
    value: district,
    reset: resetDistrict,
    setValue: setDistrict,
    bind: bindDistrict
  } = useInput('');
  const {
    value: classes,
    reset: resetClasses,
    setValue: setClasses,
    bind: bindClasses
  } = useInput('');

  useEffect(() => {
    resetName();
    resetFirstName();
    resetLastName();
    resetPhone();
    resetEmail();
    resetClasses();
    resetDistrict();
  }, [open]);

  useEffect(() => {
    if (type === 'sysAdmin') return setTitle('System Admin');
    if (type === 'stationAdmin') return setTitle('Station Admin');
    if (type === 'districtAdmin') return setTitle('District Admin');
    if (type === 'schoolAdmin') return setTitle('School Admin');
    if (type === 'educator') return setTitle('Educator');
    if (type === 'student') return setTitle('Student');
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
      phone,
      classes,
      district
    });
  };

  return (
    <Dialog maxWidth="xs" onClose={handleClose} open={open}>
      <DialogTitle className={_classes.dialogTitle} onClose={handleClose}>
        Add {title}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="User name"
          className={_classes.createInput}
          onChange={(e) => setName(e.target.value)}
          {...bindName}
        />
        <TextField
          label="First name"
          className={_classes.createInput}
          onChange={(e) => setFirstName(e.target.value)}
          {...bindFirstName}
        />
        <TextField
          label="Last name"
          className={_classes.createInput}
          onChange={(e) => setLastName(e.target.value)}
          {...bindLastName}
        />
        <TextField
          label="Email"
          className={_classes.createInput}
          onChange={(e) => setEmail(e.target.value)}
          {...bindEmail}
        />
        <TextField
          label="Phone"
          className={_classes.createInput}
          onChange={(e) => setPhone(e.target.value)}
          {...bindPhone}
        />
        {(type === 'educator' || type === 'student') && (
          <FormControl className={_classes.createInput}>
            <InputLabel id="demo-simple-select-outlined-label">
              District Name
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={(e) => setDistrict(e.target.value)}
              label="Districts"
              {...bindDistrict}
            >
              {districtOptions.map((el) => (
                <MenuItem key={el.value} value={el.value}>
                  {el.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {type === 'student' && (
          <FormControl className={_classes.createInput}>
            <InputLabel id="demo-simple-select-outlined-label">
              Class Name
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={(e) => setClasses(e.target.value)}
              label="Classes"
              {...bindClasses}
            >
              {classOptions.map((el) => (
                <MenuItem key={el.value} value={el.value}>
                  {el.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleChange} color="primary">
          Add {title}
        </Button>
        <Button
          autoFocus
          onClick={handleClose}
          className={_classes.dialogAddBtn}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserDialog;
