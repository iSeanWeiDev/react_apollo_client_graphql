import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import LinearProgressWithLabel from './Progress';
import useStyles from './style';

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired
};

const LoadingCard = ({
  loading,
  height,
  children,
  percentage,
  isShadow,
  isProgress,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Box component={isShadow ? Card : 'div'} className={classes.root} {...rest}>
      {loading && isProgress && (
        <LinearProgressWithLabel
          value={percentage}
          className={classes.loading}
        />
      )}
      <main>
        {loading ? (
          <Box className={classes.skeleton}>
            <Skeleton variant="rect" width={'100%'} height={height} />
          </Box>
        ) : (
          children
        )}
      </main>
    </Box>
  );
};

export default LoadingCard;
