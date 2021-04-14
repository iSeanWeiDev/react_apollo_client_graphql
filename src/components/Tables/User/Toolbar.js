import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  InputBase
} from '@material-ui/core';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  CloudUpload as CloudUploadIcon
} from '@material-ui/icons';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: '1 1 100%'
  },
  input: {
    width: 300
  }
}));

const EnhancedTableToolbar = ({ schemaType, numSelected, onChange }) => {
  const classes = useToolbarStyles();
  const [canSearch, setCanSearch] = useState(false);

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {schemaType === 'educator' ? 'Educators' : 'Students'}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <React.Fragment>
          {canSearch && (
            <InputBase
              className={classes.input}
              onChange={(e) => onChange(e.target.value)}
              placeholder={`Search ${
                schemaType === 'educator' ? 'Educators' : 'Students'
              }... ...`}
              inputProps={{ 'aria-label': 'search users' }}
              autoFocus
            />
          )}
          <Tooltip title="Search Users">
            <IconButton
              aria-label="search users"
              onClick={() => setCanSearch(!canSearch)}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Upload Users">
            <IconButton
              aria-label="upload users"
              onClick={() => onChange('upload')}
            >
              <CloudUploadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add User">
            <IconButton aria-label="add user">
              <AddIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

export default EnhancedTableToolbar;
