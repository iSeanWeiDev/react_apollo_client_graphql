import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Tab, Tabs } from '@material-ui/core';
import { AppTabPanel } from '@app/components/App';
import AdminUsers from './AdminUsers';
import useStyles from './style';

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
};

const AdminContainer = ({ history, match }) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);
  const tabData = [
    { label: 'System Admins', value: 'sysAdmin' },
    { label: 'Station Admins', value: 'stationAdmin' },
    { label: 'District Admins', value: 'districtAdmin' },
    { label: 'School Admins', value: 'schoolAdmin' }
  ];

  const handleChange = (event, newValue) => {
    let tabPath;
    if (newValue === 0) tabPath = 'system-admins';
    if (newValue === 1) tabPath = 'station-admins';
    if (newValue === 2) tabPath = 'district-admins';
    if (newValue === 3) tabPath = 'school-admins';

    history.push({ pathname: `/admins/${tabPath}` });
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
        aria-label="admin vertical tabs"
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
          <AdminUsers type={el.value} />
        </AppTabPanel>
      ))}
    </div>
  );
};

export default withRouter(AdminContainer);
