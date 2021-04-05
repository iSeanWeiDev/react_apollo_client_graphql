/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useTheme } from '@material-ui/core/styles';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsersCog,
  faSitemap,
  faCog,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import StyledBadge from './StyledBadge';
import useStyles from './style';

const AppDrawer = ({ location }) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const menuElements = [
    {
      icon: faSitemap,
      text: 'Topology',
      url: '/topologies',
      disabled: false
    },
    {
      icon: faUsersCog,
      text: 'Admins',
      url: '/admins',
      disabled: false
    }
  ];

  const actionElements = [
    {
      icon: faInfoCircle,
      text: 'Tutorials',
      url: '/tutorials',
      disabled: false
    },
    { icon: faCog, text: 'Settings', url: '/settings', disabled: false }
  ];

  const [role, setRole] = useState('');
  const [userName, setUserName] = useState('');
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (location) {
      let tmpUrl = `/${location.pathname.split('/')[1]}`;
      if (tmpUrl === '/materials' || tmpUrl === '/classes') {
        tmpUrl = `/${location.pathname.split('/')[1]}/${
          location.pathname.split('/')[2]
        }`;
      }
      setSelected(tmpUrl);
    }
  }, [location]);

  const setAvatarInfo = (data) => {
    switch (data['custom:userrole']) {
      case 'superAdmin':
        setRole('Super Admin');
        break;
      case 'sysAdmin':
        setRole('System Admin');
        break;
      default:
        break;
    }
    const tmp = `${data['custom:firstName']} ${data['custom:lastName']}`;
    setUserName(tmp);
  };

  useEffect(() => {
    let profile = localStorage.getItem('profile');

    if (!profile) {
      const loadUser = () => {
        return Auth.currentUserInfo({ bypassCache: true });
      };

      const onLoad = async () => {
        try {
          const currentUser = await loadUser();
          setAvatarInfo(currentUser['attributes']);
        } catch (err) {
          console.log(err);
        }
      };
      onLoad();
    } else {
      profile = JSON.parse(profile);
      setAvatarInfo(profile);
    }
  }, []);

  const handleListClick = (value) => {
    history.push({ pathname: value.url });
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.profile}>
        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          variant="dot"
        >
          <Avatar
            alt="Remy Sharp"
            className={classes.avatar}
            src="./assets/imgs/no-user-female.jpeg"
          />
        </StyledBadge>
        <Typography variant="subtitle1" className={classes.userName}>
          {userName}
        </Typography>
        <Typography variant="subtitle2" className={classes.userRole}>
          {role}
        </Typography>
      </Box>

      <List className={classes.menus}>
        <Divider className={classes.separator} />
        {menuElements.map((el, index) => (
          <ListItem
            button
            key={index}
            className={classes.listItems}
            onClick={() => handleListClick(el)}
          >
            <ListItemIcon className={classes.listItemIcons}>
              <FontAwesomeIcon
                icon={el.icon}
                size="lg"
                className={clsx(classes.listItemIcon, {
                  [classes.listItemIconSelcted]: el.url === selected,
                  [classes.listItemIcon]: el.url !== selected
                })}
              />
            </ListItemIcon>
            <ListItemText
              className={clsx(classes.listItemText, {
                [classes.listItemTextSelcted]: el.url === selected,
                [classes.listItemText]: el.url !== selected
              })}
            >
              {el.text}
            </ListItemText>
          </ListItem>
        ))}
      </List>

      <List className={classes.actionList}>
        <Divider className={classes.separator} />
        {actionElements.map((el, index) => (
          <ListItem
            button
            key={index}
            className={classes.listItems}
            onClick={() => handleListClick(el)}
          >
            <ListItemIcon className={classes.listItemIcons}>
              <FontAwesomeIcon
                icon={el.icon}
                size="lg"
                color={theme.palette.common.white}
              />
            </ListItemIcon>
            <ListItemText>{el.text}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default withRouter(AppDrawer);
