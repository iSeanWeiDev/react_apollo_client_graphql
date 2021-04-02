import React from 'react';
import { Zoom, useScrollTrigger } from '@material-ui/core';
import useStyles from './style';

const ScrollTop = ({ children, window }) => {
  const classes = useStyles();

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  });

  const handleClick = (e) => {
    const anchor = (e.target.ownerDocument || Document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
};

export default ScrollTop;
