import React from 'react';
import { Box, AppBar, Tab, Grid } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import {
  TagForm,
  HTMLEditor,
  AvatarForm,
  AttachmentForm,
  DescriptionForm
} from '@app/components/Forms';
import useStyles from './style';

const ResourceDetail = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.detailRoot}>
      <TabContext value={value} className={classes.detailTabContext}>
        <AppBar position="static" className={classes.detailAppbar}>
          <TabList
            onChange={handleChange}
            classes={{
              indicator: classes.indicator
            }}
          >
            <Tab label="Basic Info *" value="1" />
            <Tab label="Html Editor" value="2" />
            <Tab label="Attachments" value="3" />
          </TabList>
        </AppBar>
        <TabPanel value="1">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12} sm={12} md={10} lg={9}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item xs={12} sm={5} md={4} lg={3}>
                  <AvatarForm />
                </Grid>
                <Grid item xs={12} sm={7} md={8} lg={9}>
                  <DescriptionForm />
                </Grid>
              </Grid>
              <TagForm />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="2">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12} sm={12} md={10} lg={10}>
              <HTMLEditor />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="3">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12} sm={12} md={10} lg={10}>
              <AttachmentForm />
            </Grid>
          </Grid>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ResourceDetail;
