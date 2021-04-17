import React, { useState, useEffect } from 'react';
import useStyles from './style';
import {
  Grid,
  Avatar,
  Typography,
  AppBar,
  Tab,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import {
  Apple as AppleIcon,
  Link as LinkIcon,
  Facebook as FacebookIcon,
  GitHub as GithubIcon,
  LinkOff as LinkOffIcon
} from '@material-ui/icons';

const ProfileContainer = () => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(1);
  const [loadedData, setLoadedData] = useState({});

  useEffect(() => {
    setLoadedData({
      userName: 'TEST',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@gmail.com',
      phone: '123456789',
      address: 'test address',
      role: 'admin',
      sex: 'male'
    });
  }, []);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleInputChange = (type, value) => {
    setLoadedData({
      ...loadedData,
      [type]: value
    });
  };

  const submitSecInfo = () => {
    console.log(
      'save password...',
      loadedData.newPassword,
      loadedData.oldPassword,
      loadedData.rePassword,
      loadedData.twoStep
    );
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.hero} />
        <Grid item xs={12} className={classes.userInfo}>
          <Avatar className={classes.avatar} />
          <Typography variant="h4" gutterBottom>
            John Smith
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TabContext value={tabIndex} className={classes.tabContext}>
            <AppBar position="static" className={classes.appbar}>
              <TabList
                onChange={handleChange}
                classes={{
                  indicator: classes.indicator
                }}
              >
                <Tab label="About" value={1} />
                <Tab label="Security" value={2} />
                <Tab label="Links" value={3} />
              </TabList>
            </AppBar>
            <TabPanel value={1}>
              <TextField
                label="User name"
                className={classes.inputArea}
                variant="outlined"
                size="small"
                value={loadedData.userName}
                onChange={(e) => handleInputChange('userName', e.target.value)}
              />
              <TextField
                label="First name"
                className={classes.inputArea}
                variant="outlined"
                size="small"
                value={loadedData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
              <TextField
                label="Last name"
                className={classes.inputArea}
                variant="outlined"
                size="small"
                value={loadedData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
              <TextField
                label="Email"
                className={classes.inputArea}
                variant="outlined"
                size="small"
                value={loadedData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
              <TextField
                label="Phone"
                className={classes.inputArea}
                variant="outlined"
                size="small"
                value={loadedData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
              <TextField
                label="Address"
                className={classes.inputArea}
                variant="outlined"
                size="small"
                value={loadedData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
              <FormControl
                variant="outlined"
                size="small"
                className={classes.inputArea}
              >
                <InputLabel id="user-role-select-outlined-label">
                  User Role
                </InputLabel>
                <Select
                  value={loadedData.role || ''}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  label="User Role"
                >
                  <MenuItem value={'admin'}>Admin</MenuItem>
                  <MenuItem value={'user'}>User</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                variant="outlined"
                size="small"
                className={classes.inputArea}
              >
                <InputLabel id="user-sex-select-outlined-label">Sex</InputLabel>
                <Select
                  value={loadedData.sex || ''}
                  onChange={(e) => handleInputChange('sex', e.target.value)}
                  label="Sex"
                >
                  <MenuItem value={'male'}>Male</MenuItem>
                  <MenuItem value={'female'}>Female</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TabPanel>
            <TabPanel value={2}>
              <TextField
                label="Old Password"
                className={classes.inputArea}
                variant="outlined"
                size="small"
                type="password"
                value={loadedData.oldPassword}
                onChange={(e) =>
                  handleInputChange('oldPassword', e.target.value)
                }
              />
              <TextField
                label="New Password"
                className={classes.inputArea}
                variant="outlined"
                size="small"
                type="password"
                value={loadedData.newPassword}
                onChange={(e) =>
                  handleInputChange('newPassword', e.target.value)
                }
              />
              <TextField
                label="Confirm Password"
                className={classes.inputArea}
                variant="outlined"
                size="small"
                type="password"
                value={loadedData.rePassword}
                onChange={(e) =>
                  handleInputChange('rePassword', e.target.value)
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={loadedData.twoStep}
                    onChange={(e) =>
                      handleInputChange('twoStep', e.target.checked)
                    }
                    name="checkedB"
                    color="primary"
                  />
                }
                label="2 Step Verification Enabled"
              />
              <Button
                variant="contained"
                className={classes.saveSecBtn}
                onClick={submitSecInfo}
              >
                Submit New Password
              </Button>
            </TabPanel>
            <TabPanel value={3}>
              <Grid container spacing={3} className={classes.linkListContainer}>
                <Grid item xs={8}>
                  <AppleIcon />{' '}
                  <Typography variant="caption">Apple </Typography>
                </Grid>
                <Grid item xs={4}>
                  <LinkIcon />
                </Grid>
                <Grid item xs={8}>
                  <FacebookIcon />{' '}
                  <Typography variant="caption">Facebook </Typography>
                </Grid>
                <Grid item xs={4}>
                  <LinkIcon />
                </Grid>
                <Grid item xs={8}>
                  <GithubIcon />{' '}
                  <Typography variant="caption">Github </Typography>
                </Grid>
                <Grid item xs={4}>
                  <LinkOffIcon />
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ProfileContainer;
