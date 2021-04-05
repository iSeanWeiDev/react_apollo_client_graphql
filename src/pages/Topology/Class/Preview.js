import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import {
  Box,
  Slide,
  Button,
  Dialog,
  Divider,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  TextareaAutosize,
  CircularProgress
} from '@material-ui/core';
import { useFormChangeValidator } from '@app/utils/hooks/form';
import graphql from '@app/graphql';
import useStyles from './style';

const PreviewClass = ({ open, resources, onChange }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [loadedData, setLoadedData] = useState({});
  const { isChanged, setInitialValue, setLastValue } = useFormChangeValidator(
    resources,
    loadedData
  );

  const [updateGrouping] = useMutation(graphql.mutations.updateGrouping, {
    update(cache, { data: { updateGrouping } }) {
      const existData = cache.readQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: 'class'
        }
      });
      let tmp = existData.grouping.slice();
      const idx = tmp.findIndex((el) => el['_id'] === updateGrouping['_id']);
      if (idx > -1) {
        tmp[idx] = updateGrouping;
      }

      cache.writeQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: 'class'
        },
        data: {
          grouping: tmp
        }
      });
    }
  });

  useEffect(() => {
    if (resources) {
      const tmp = {
        name: resources.name,
        title: resources.desc?.title,
        short: resources.desc?.short,
        long: resources.desc?.long
      };

      setLoadedData(tmp);
      setInitialValue(tmp);
    }
  }, [resources, open]);

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

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updateGrouping({
        variables: {
          id: resources['_id'],
          version: resources.version,
          schemaType: resources.schemaType,
          schemaVer: resources.schemaVer,
          name: loadedData.name,
          desc: {
            title: loadedData.title,
            short: loadedData.short,
            long: loadedData.long
          }
        }
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  return (
    <Dialog
      onClose={() => onChange(false)}
      aria-labelledby="customize-user-dialog-title"
      open={open}
      maxWidth="md"
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Preview {resources?.name}</Typography>
          <Box position="relative">
            <Button
              variant="contained"
              className={classes.buttonSuccess}
              onClick={handleSubmit}
              disabled={!isChanged || loading}
            >
              Submit
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Box>
        </Box>
        <Divider className={classes.separator} />
      </DialogTitle>
      <DialogContent>
        <TextField
          size="small"
          label="Class name"
          variant="outlined"
          className={classes.inputArea}
          value={loadedData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
        <TextField
          size="small"
          label="Title"
          variant="outlined"
          className={classes.inputArea}
          value={loadedData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
        />
        <TextareaAutosize
          placeholder="Short Description"
          className={classes.textArea}
          rowsMin={3}
          rowsMax={5}
          value={loadedData.short}
          onChange={(e) => handleInputChange('short', e.target.value)}
        />
        <TextareaAutosize
          className={classes.textArea}
          placeholder="Long Description"
          rowsMin={5}
          rowsMax={8}
          value={loadedData.long}
          onChange={(e) => handleInputChange('long', e.target.value)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PreviewClass;
