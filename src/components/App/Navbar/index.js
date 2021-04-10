import React, { useState } from 'react';
import clsx from 'clsx';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { Img } from 'react-image';
import PropTypes from 'prop-types';
import {
  Box,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Button,
  IconButton
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  AccountCircle as AccountIcon
} from '@material-ui/icons';
import { HideOnScroll } from '@app/components/ScrollButton';
import useStyles from './style';

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
};

const AppNavbar = ({ fullWidth, position, canClose, onChange }) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      window.localStorage.clear();
      history.push('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AppBar
      position={position}
      color="inherit"
      className={clsx({
        [classes.appBar]: !fullWidth,
        [classes.appBarFull]: fullWidth
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => onChange()}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Img
            src="https://configs.emp-sig.com/assets/PoweredByLogo.png"
            height="50"
          />
          {!canClose ? (
            <IconButton onClick={handleClick}>
              <AccountIcon />
            </IconButton>
          ) : (
            <Button size="small" onClick={() => onChange('close')}>
              Close
            </Button>
          )}
        </Box>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavbar;
