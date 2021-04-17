import React, { useState } from 'react';
import { TextField, FormControlLabel, Radio, Button } from '@material-ui/core';
import useStyles from './style';

const ProfileSecurity = () => {
  const classes = useStyles();
  const [loadedData, setLoadedData] = useState({});
  const handleInputChange = (type, value) => {};

  const submitSecInfo = () => {
    console.log(
      'save password...',
      loadedData.newPassword,
      loadedData.oldPassword,
      loadedData.rePassword,
      loadedData.twoStep
    );
  };

  return (
    <div>
      <TextField
        label="Old Password"
        className={classes.inputArea}
        variant="outlined"
        size="small"
        type="password"
        value={loadedData.oldPassword}
        onChange={(e) => handleInputChange('oldPassword', e.target.value)}
      />
      <TextField
        label="New Password"
        className={classes.inputArea}
        variant="outlined"
        size="small"
        type="password"
        value={loadedData.newPassword}
        onChange={(e) => handleInputChange('newPassword', e.target.value)}
      />
      <TextField
        label="Confirm Password"
        className={classes.inputArea}
        variant="outlined"
        size="small"
        type="password"
        value={loadedData.rePassword}
        onChange={(e) => handleInputChange('rePassword', e.target.value)}
      />
      <FormControlLabel
        control={
          <Radio
            checked={loadedData.twoStep}
            onChange={(e) => handleInputChange('twoStep', e.target.checked)}
            name="checkedB"
            color="primary"
          />
        }
        label="2 Step Verification Enabled"
      />
      <Button
        variant="contained"
        className={classes.saveSecBtn}
        onClick={submitSecInfo}
      >
        Submit New Password
      </Button>
    </div>
  );
};

export default ProfileSecurity;
