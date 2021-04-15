import React, { useEffect, useState } from 'react';
import { Box, AppBar, Tab, Grid } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { TagForm, AvatarForm, DescriptionForm } from '@app/components/Forms';
import useStyles from './style';

const SchoolEdit = ({ resources, onChange }) => {
  console.log(resources);
  const classes = useStyles();
  const [value, setValue] = useState('1');
  const [loadedData, setLoadedData] = useState({});

  useEffect(() => {
    if (resources) {
      setLoadedData(resources);
    } else {
      setLoadedData();
    }
  }, [resources]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.root}>
      <TabContext value={value} className={classes.tabContext}>
        <AppBar position="static" className={classes.appbar}>
          <TabList
            onChange={handleChange}
            classes={{
              indicator: classes.indicator
            }}
          >
            <Tab label="Basic Info *" value="1" />
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
                  docId={loadedData['_id']}
                  resources={loadedData.avatar?.url}
                  acceptedFiles={['image/png']}
                  onChange={(value) => onChange('avatar', value)}
                />
                <DescriptionForm
                  resources={{
                    title: loadedData.desc?.title,
                    short: loadedData.desc?.short,
                    long: loadedData.desc?.long
                  }}
                  onChange={(value) => onChange('desc', value)}
                />
              </Box>
              <TagForm
                resources={loadedData.tagList}
                onChange={(value) => onChange('tagList', value)}
              />
            </Grid>
          </Grid>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default SchoolEdit;
