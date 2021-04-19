/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { Box, Tooltip, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
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
import noUserFemale from '@app/assets/imgs/no-user-female.jpeg';
import noUserMale from '@app/assets/imgs/no-user-male.jpeg';
import StyledBadge from './StyledBadge';
import { mainMenuElements, actionMenuElements } from './menus';
import useStyles from './style';

const AppDrawer = ({ location }) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

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
      const loadUser = () => {};

      const onLoad = async () => {
        try {
          const currentUser = await loadUser();
          // setAvatarInfo(currentUser['attributes']);
        } catch (error) {
          console.log(error.message);
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
            src={noUserMale}
          />
        </StyledBadge>
        <Typography variant="subtitle1" className={classes.userName}>
          {/* {userName} */}
          John Smith
        </Typography>
        <Typography variant="subtitle2" className={classes.userRole}>
          {/* {role} */}
          Super Admin
        </Typography>
      </Box>

      <Divider className={classes.separator} />
      <List className={classes.menus}>
        {mainMenuElements.map((el, index) => (
          <Tooltip
            arrow
            key={index}
            title={el.tooltip}
            placement="right-center"
            style={{ fontSize: 20 }}
          >
            <ListItem
              button
              className={classes.listItems}
              onClick={() => handleListClick(el)}
              disabled={el.disabled}
            >
              <ListItemIcon className={classes.listItemIcons}>
                <FontAwesomeIcon
                  icon={el.icon}
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
          </Tooltip>
        ))}
      </List>

      <List className={classes.actionList}>
        <Divider className={classes.actionSeparator} />
        {actionMenuElements.map((el, index) => (
          <Tooltip
            key={index}
            title={el.tooltip}
            placement="right-center"
            arrow
          >
            <ListItem
              button
              className={classes.listItems}
              onClick={() => handleListClick(el)}
              disabled={el.disabled}
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
          </Tooltip>
        ))}
      </List>
    </Box>
  );
};

export default withRouter(AppDrawer);
