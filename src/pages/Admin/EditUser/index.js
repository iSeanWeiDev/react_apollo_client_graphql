import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Slide
} from '@material-ui/core';
import { useFormChangeValidator } from '@app/utils/hooks/form';
import useStyles from './style';

const EditUserDialog = ({ open, type, resources, onChange }) => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [loadedData, setLoadedData] = useState({});
  const [isEmailValidator, setEmailValidate] = useState(false);
  const [isReadOnlyUserName, setUserNameStatus] = useState(true);
  const [isReadOnlyFName, setFNameStatus] = useState(true);
  const [isReadOnlyLName, setLNameStatus] = useState(true);
  const [isReadOnlyEmail, setEmailStatus] = useState(true);
  const [isReadOnlyPhone, setPhoneStatus] = useState(true);

  const { isChanged, setInitialValue, setLastValue } = useFormChangeValidator(
    resources,
    loadedData
  );

  useEffect(() => {
    if (type === 'sysAdmin') return setTitle('System Admin');
    if (type === 'stationAdmin') return setTitle('Station Admin');
    if (type === 'districtAdmin') return setTitle('District Admin');
    if (type === 'schoolAdmin') return setTitle('School Admin');
  }, [type]);

  useEffect(() => {
    setLoadedData(resources);
    setInitialValue(resources);
  }, [resources]);

  const handleSave = () => {
    onChange(true, 'save', loadedData);
  };

  const handleDelete = () => {
    onChange(true, 'delete', loadedData);
  };

  const formatPhoneNumber = (value) => {
    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return value;
    // clean the input for any non-digit values.
    const phoneNumber = value.replace(/[^\d]/g, '');

    // phoneNumberLength is used to know when to apply our formatting for the phone number
    const phoneNumberLength = phoneNumber.length;

    // we need to return the value with no formatting if its less then four digits
    // this is to avoid weird behavior that occurs if you  format the area code to early
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumber.slice(0, 1) !== '1') return phoneNumber;

    // if phoneNumberLength is greater than 4 and less the 7 we start to return
    // the formatted number
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    // finally, if the phoneNumberLength is greater then seven, we add the last
    // bit of formatting and return it.
    return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(
      1,
      4
    )}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  const handleInputChange = (type, value) => {
    let formattedPhoneNumber = value;
    if (type === 'phone') {
      formattedPhoneNumber = formatPhoneNumber(value);
    }

    setLoadedData({
      ...loadedData,
      [type]: formattedPhoneNumber
    });

    setLastValue({
      ...loadedData,
      [type]: formattedPhoneNumber
    });
  };

  const handleBlur = (value) => {
    if (!isReadOnlyEmail) {
      let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(value)) {
        console.log(value);
        setEmailValidate(true);
      } else {
        setEmailValidate(false);
      }
    }
  };

  const handleUserNameStatus = () => {
    setUserNameStatus(false);
  };

  const handleFNameStatus = () => {
    setFNameStatus(false);
  };

  const handleLNameStatus = () => {
    setLNameStatus(false);
  };

  const handleEmailStatus = () => {
    setEmailStatus(false);
  };

  const handlePhoneStatus = () => {
    setPhoneStatus(false);
  };

  return (
    <Dialog
      onClose={() => onChange(false)}
      aria-labelledby="customize-user-dialog-title"
      open={open}
      maxWidth="sm"
      classes={{ paper: classes.dialogPaper }}
      TransitionComponent={Slide}
      TransitionProps={{
        direction: 'left'
      }}
    >
      <DialogTitle
        id="customize-user-dialog-title"
        onClose={() => onChange(false)}
      >
        Preview {title}
      </DialogTitle>
      <DialogContent>
        <div className={classes.containInputField}>
          <TextField
            label="User name"
            variant="outlined"
            className={classes.inputArea}
            size="small"
            value={loadedData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            inputProps={{ readOnly: isReadOnlyUserName }}
          />
          {isReadOnlyUserName && (
            <Button
              onClick={handleUserNameStatus}
              color="secondary"
              className={classes.buttonPos}
            >
              Edit
            </Button>
          )}
        </div>
        <div className={classes.containInputField}>
          <TextField
            label="First name"
            className={classes.inputArea}
            variant="outlined"
            size="small"
            value={loadedData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            inputProps={{ readOnly: isReadOnlyFName }}
          />
          {isReadOnlyFName && (
            <Button
              onClick={handleFNameStatus}
              color="secondary"
              className={classes.buttonPos}
            >
              Edit
            </Button>
          )}
        </div>
        <div className={classes.containInputField}>
          <TextField
            label="Last name"
            className={classes.inputArea}
            variant="outlined"
            size="small"
            value={loadedData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            inputProps={{ readOnly: isReadOnlyLName }}
          />
          {isReadOnlyLName && (
            <Button
              onClick={handleLNameStatus}
              color="secondary"
              className={classes.buttonPos}
            >
              Edit
            </Button>
          )}
        </div>
        <div className={classes.containInputField}>
          <TextField
            label="Email"
            className={classes.inputArea}
            variant="outlined"
            size="small"
            value={loadedData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={(e) => handleBlur(e.target.value)}
            inputProps={{ readOnly: isReadOnlyEmail }}
          />
          {isEmailValidator && (
            <div className={classes.validError}>
              <label className="error">Please enter the valid email.</label>
            </div>
          )}
          {isReadOnlyEmail && (
            <Button
              onClick={handleEmailStatus}
              color="secondary"
              className={classes.buttonPos}
            >
              Edit
            </Button>
          )}
        </div>
        <div className={classes.containInputField}>
          <TextField
            label="Phone"
            className={classes.inputArea}
            variant="outlined"
            size="small"
            value={loadedData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            inputProps={{ readOnly: isReadOnlyPhone }}
          />
          {isReadOnlyPhone && (
            <Button
              onClick={handlePhoneStatus}
              color="secondary"
              className={classes.buttonPos}
            >
              Edit
            </Button>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} color="secondary">
          Delete User
        </Button>
        <Button
          autoFocus
          onClick={handleSave}
          color="primary"
          disabled={!isChanged}
        >
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
