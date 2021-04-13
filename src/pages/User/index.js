import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Tab, Tabs } from '@material-ui/core';
import { AppTabPanel } from '@app/components/App';
import Users from './Users';
import useStyles from './style';

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
};

const UserContainer = ({ history, match }) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);
  const tabData = [
    { label: 'System Admins', value: 'sysAdmin' },
    { label: 'Station Admins', value: 'stationAdmin' },
    { label: 'District Admins', value: 'districtAdmin' },
    { label: 'School Admins', value: 'schoolAdmin' },
    { label: 'Educators', value: 'educator' },
    { label: 'Students', value: 'student' }
  ];

  const handleChange = (event, newValue) => {
    let tabPath;
    if (newValue === 0) tabPath = 'system-admins';
    if (newValue === 1) tabPath = 'station-admins';
    if (newValue === 2) tabPath = 'district-admins';
    if (newValue === 3) tabPath = 'school-admins';
    if (newValue === 4) tabPath = 'educators';
    if (newValue === 5) tabPath = 'students';

    history.push({ pathname: `/users/${tabPath}` });
    setCurrentTab(newValue);
  };

  useEffect(() => {
    const { params } = match;
    if (params.type) {
      switch (params.type) {
        case 'system-admins':
          setCurrentTab(0);
          break;
        case 'station-admins':
          setCurrentTab(1);
          break;
        case 'district-admins':
          setCurrentTab(2);
          break;
        case 'school-admins':
          setCurrentTab(3);
          break;
        case 'educators':
          setCurrentTab(4);
          break;
        case 'students':
          setCurrentTab(5);
          break;
        default:
          setCurrentTab(0);
          break;
      }
    }
    if (params.id) {
      console.log(params);
    }
  }, []);

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={currentTab}
        onChange={handleChange}
        aria-label="user vertical tabs"
        className={classes.tabs}
        classes={{
          indicator: classes.indicator
        }}
      >
        {tabData.map((el, index) => (
          <Tab
            key={index}
            label={el.label}
            className={classes.tabHeader}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {tabData.map((el, index) => (
        <AppTabPanel key={index} value={currentTab} index={index}>
          <Users type={el.value} />
        </AppTabPanel>
      ))}
    </div>
  );
};

export default withRouter(UserContainer);
