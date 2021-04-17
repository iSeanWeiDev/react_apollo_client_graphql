import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import useStyles from './style';

const ProfileAbout = () => {
  const classes = useStyles();
  const [loadedData, setLoadedData] = useState({});

  const handleInputChange = (type, value) => {};

  return (
    <div>
      <TextField
        label="User name"
        className={classes.inputArea}
        variant="outlined"
        size="small"
        value={loadedData.userName}
        onChange={(e) => handleInputChange('userName', e.target.value)}
      />
      <TextField
        label="First name"
        className={classes.inputArea}
        variant="outlined"
        size="small"
        value={loadedData.firstName}
        onChange={(e) => handleInputChange('firstName', e.target.value)}
      />
      <TextField
        label="Last name"
        className={classes.inputArea}
        variant="outlined"
        size="small"
        value={loadedData.lastName}
        onChange={(e) => handleInputChange('lastName', e.target.value)}
      />
      <TextField
        label="Email"
        className={classes.inputArea}
        variant="outlined"
        size="small"
        value={loadedData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
      />
      <TextField
        label="Phone"
        className={classes.inputArea}
        variant="outlined"
        size="small"
        value={loadedData.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
      />
      <TextField
        label="Address"
        className={classes.inputArea}
        variant="outlined"
        size="small"
        value={loadedData.address}
        onChange={(e) => handleInputChange('address', e.target.value)}
      />
      <FormControl
        variant="outlined"
        size="small"
        className={classes.inputArea}
      >
        <InputLabel id="user-role-select-outlined-label">User Role</InputLabel>
        <Select
          value={loadedData.role || ''}
          onChange={(e) => handleInputChange('role', e.target.value)}
          label="User Role"
        >
          <MenuItem value={'admin'}>Admin</MenuItem>
          <MenuItem value={'user'}>User</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant="outlined"
        size="small"
        className={classes.inputArea}
      >
        <InputLabel id="user-sex-select-outlined-label">Sex</InputLabel>
        <Select
          value={loadedData.sex || ''}
          onChange={(e) => handleInputChange('sex', e.target.value)}
          label="Sex"
        >
          <MenuItem value={'male'}>Male</MenuItem>
          <MenuItem value={'female'}>Female</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default ProfileAbout;
