import React from 'react';
import clsx from 'clsx';
import { Card } from '@material-ui/core';
import useStyles from './style';

const DefaultCard = ({ style, children, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} {...rest}>
      <main
        className={clsx({
          [classes.content]: !style,
          [style]: style
        })}
      >
        {children}
      </main>
    </Card>
  );
};

export default DefaultCard;
