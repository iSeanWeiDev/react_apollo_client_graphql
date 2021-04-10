import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import useStyles from './style';

const AppTabPanel = (props) => {
  const classes = useStyles();
  const { children, value, index, style, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      className={clsx({
        [classes.root]: !style,
        [style]: style
      })}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

AppTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default AppTabPanel;
