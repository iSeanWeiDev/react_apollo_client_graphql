import React, { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Grid, Box, Button, AppBar, Tab } from '@material-ui/core';
import { TagForm, AvatarForm, DescriptionForm } from '@app/components/Forms';
import { UserTable } from '@app/components/Tables';
import useStyles from './style';

const ClassDetail = ({ resources, onChange }) => {
  const classes = useStyles();
  const [currTab, setCurrTab] = useState('1');

  const handleTabChange = (event, newValue) => {
    setCurrTab(newValue);
  };

  const handleFormChange = () => {};

  return (
    <TabContext value={currTab}>
      <AppBar position="static" className={classes.appbar}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <TabList
            onChange={handleTabChange}
            classes={{
              indicator: classes.indicator
            }}
          >
            <Tab label="Basic Info *" value="1" />
            <Tab label="Educators" value="2" />
            <Tab label="Students" value="3" />
          </TabList>
          <Button size="small" onClick={() => onChange('close')}>
            Close
          </Button>
        </Box>
      </AppBar>
      <TabPanel value="1">
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={12} md={10} lg={9}>
            <Box display="flex">
              <AvatarForm
                docId={resources['_id']}
                resources={resources.avatar?.url}
                acceptedFiles={['image/png']}
                onChange={(value) => handleFormChange('avatar', value)}
              />
              <DescriptionForm
                resources={{
                  title: resources.desc?.title,
                  short: resources.desc?.short,
                  long: resources.desc?.long
                }}
                onChange={(value) => handleFormChange('desc', value)}
              />
            </Box>
            <TagForm
              resources={resources.tagList}
              onChange={(value) => handleFormChange('tagList', value)}
            />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value="2">
        <UserTable />
      </TabPanel>
      <TabPanel value="3">
        <UserTable />
      </TabPanel>
    </TabContext>
  );
};

export default ClassDetail;
