import React from 'react';
import clsx from 'clsx';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from '@material-ui/core';
import noLogo from '@app/assets/imgs/no-logo.jpg';

import useStyles from '../style';

const ClassList = ({ data, selectedData, onChange, ...rest }) => {
  const classes = useStyles();

  return (
    <ListItem
      className={clsx(classes.listItem, {
        [classes.listItem]: data['_id'] !== selectedData['_id'],
        [classes.listItemSelected]: data['_id'] === selectedData['_id']
      })}
      onClick={() => onChange(data)}
      {...rest}
    >
      <ListItemAvatar>
        <Avatar
          alt="Remy Sharp"
          src={data.avatar?.url ? data.avatar?.url : noLogo}
        />
      </ListItemAvatar>
      <ListItemText primary={data.name} secondary={data.createdAt} />
    </ListItem>
  );
};

export default ClassList;
