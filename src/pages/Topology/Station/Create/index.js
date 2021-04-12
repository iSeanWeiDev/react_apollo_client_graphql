import React, { useEffect, useState } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  DialogTitle,
  TextareaAutosize,
  Button,
  CircularProgress
} from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { useInput } from '@app/utils/hooks/form';
import graphql from '@app/graphql';
import useStyles from './style';

const StationCreate = ({ open, onChange }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
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

  const [createGrouping] = useMutation(graphql.mutations.createGrouping, {
    update(cache, { data: { createGrouping } }) {
      const existData = cache.readQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: 'station'
        }
      });
      let data = existData ? existData.grouping.slice() : [];
      const idx = data.findIndex((el) => el['_id'] === createGrouping['_id']);
      if (idx > -1) {
        data[idx] = createGrouping;
      } else {
        data = [...data, createGrouping];
      }

      cache.writeQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: 'station'
        },
        data: {
          grouping: data
        }
      });
    }
  });

  useEffect(() => {
    resetName();
    resetTitle();
    resetShort();
    resetLong();
  }, [open]);

  const handleClose = () => {
    onChange();
  };

  const handleChange = async () => {
    try {
      setLoading(true);
      await createGrouping({
        variables: {
          schemaType: 'station',
          schemaVer: 1,
          version: 1,
          name: name,
          desc: {
            title: title,
            short: short,
            long: long
          }
        }
      });
      enqueueSnackbar('Successfully station created!', {
        variant: 'success'
      });
      setLoading(false);
      onChange();
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Dialog maxWidth="xs" onClose={handleClose} open={open}>
      <DialogTitle className={classes.title} onClose={handleClose}>
        Create Station
      </DialogTitle>
      <DialogContent>
        <TextField
          size="small"
          label="Station name"
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
        <Box position="relative">
          <Button
            autoFocus
            onClick={handleChange}
            color="primary"
            disabled={loading}
          >
            Submit
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
        </Box>
        <Button autoFocus onClick={handleClose} className={classes.addBtn}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StationCreate;
