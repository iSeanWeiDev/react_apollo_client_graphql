import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Slide,
  Grid
} from '@material-ui/core';
import { useFormChangeValidator } from '@app/utils/hooks/form';
import useStyles from './style';
import { AvatarForm } from '@app/components/Forms';

const EditGalleryDialog = ({ title, open, type, resources, onChange }) => {
  const classes = useStyles();
  const [loadedData, setLoadedData] = useState({});

  const { isChanged, setInitialValue, setLastValue } = useFormChangeValidator(
    resources,
    loadedData
  );

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
      open={open}
      maxWidth="sm"
      classes={{ paper: classes.dialogPaper }}
      TransitionComponent={Slide}
      TransitionProps={{
        direction: 'left'
      }}
    >
      <DialogTitle>Preview {title}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Grid container className={classes.root}>
          <Grid item xs={12} md={12} lg={4} className={classes.photo}>
            <AvatarForm
              docId={`galleries/${type}`}
              resources={loadedData.avatar?.url}
              acceptedFiles={['image/png']}
              onChange={(value) =>
                handleInputChange('avatar', {
                  ...loadedData.avatar,
                  url: value
                })
              }
            />
          </Grid>
          <Grid item xs={12} md={12} lg={8} className={classes.info}>
            <TextField
              label="Name"
              variant="outlined"
              className={classes.inputArea}
              size="small"
              value={loadedData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <TextField
              label="Alt Text"
              variant="outlined"
              className={classes.inputArea}
              size="small"
              value={loadedData.avatar?.altText}
              onChange={(e) =>
                handleInputChange('avatar', {
                  ...loadedData.avatar,
                  altText: e.target.value
                })
              }
            />
            <TextField
              label="Type"
              variant="outlined"
              className={classes.inputArea}
              size="small"
              value={loadedData.avatar?.type}
              onChange={(e) =>
                handleInputChange('avatar', {
                  ...loadedData.avatar,
                  type: e.target.value
                })
              }
            />
            <TextField
              label="URL"
              variant="outlined"
              className={classes.inputArea}
              size="small"
              disabled
              value={loadedData.avatar?.url}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handleDelete} color="secondary">
          Delete gallery
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

export default EditGalleryDialog;
