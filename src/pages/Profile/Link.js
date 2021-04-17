import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import useStyles from './style';
import {
  Apple as AppleIcon,
  Link as LinkIcon,
  Facebook as FacebookIcon,
  GitHub as GithubIcon,
  LinkOff as LinkOffIcon
} from '@material-ui/icons';

const ProfileLink = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={3} className={classes.linkListContainer}>
        <Grid item xs={8}>
          <AppleIcon /> <Typography variant="caption">Apple </Typography>
        </Grid>
        <Grid item xs={4}>
          <LinkIcon />
        </Grid>
        <Grid item xs={8}>
          <FacebookIcon /> <Typography variant="caption">Facebook </Typography>
        </Grid>
        <Grid item xs={4}>
          <LinkIcon />
        </Grid>
        <Grid item xs={8}>
          <GithubIcon /> <Typography variant="caption">Github </Typography>
        </Grid>
        <Grid item xs={4}>
          <LinkOffIcon />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileLink;
