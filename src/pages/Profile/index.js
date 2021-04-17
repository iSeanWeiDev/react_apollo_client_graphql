import React, { useState, useEffect } from 'react';
import useStyles from './style';
import { Grid, Avatar, Typography, AppBar, Tab, Tabs } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import ProfileLink from './Link';
import ProfileSecurity from './Security';
import ProfileAbout from './About';

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
              <ProfileAbout />
            </TabPanel>
            <TabPanel value={2}>
              <ProfileSecurity />
            </TabPanel>
            <TabPanel value={3}>
              <ProfileLink />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ProfileContainer;
