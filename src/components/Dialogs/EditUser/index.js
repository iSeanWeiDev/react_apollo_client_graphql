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

  const handleInputChange = (type, value) => {
    setLoadedData({
      ...loadedData,
      [type]: value
    });

    setLastValue({
      ...loadedData,
      [type]: value
    });
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
        <TextField
          label="User name"
          variant="outlined"
          className={classes.inputArea}
          size="small"
          value={loadedData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
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
