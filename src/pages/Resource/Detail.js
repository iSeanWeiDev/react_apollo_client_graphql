import React, { useState } from 'react';
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

const ResourceDetail = ({ resources, onChange }) => {
  const classes = useStyles();
  const [value, setValue] = useState('1');

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
              <Box display="flex">
                <AvatarForm
                  docId={resources['_id']}
                  resources={resources.avatar?.url}
                  acceptedFiles={['image/png']}
                  onChange={(value) => onChange('avatar', value)}
                />
                <DescriptionForm
                  resources={{
                    title: resources.desc?.title,
                    short: resources.desc?.short,
                    long: resources.desc?.long
                  }}
                  onChange={(value) => onChange('desc', value)}
                />
              </Box>
              <TagForm
                resources={resources.tagList}
                onChange={(value) => onChange('tagList', value)}
              />
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
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <AttachmentForm resources={resources.docAssets} />
            </Grid>
          </Grid>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ResourceDetail;
