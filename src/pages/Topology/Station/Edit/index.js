import React, { useState } from 'react';
import { Grid, Box, Button, Typography, Divider } from '@material-ui/core';
import { TagForm, AvatarForm, DescriptionForm } from '@app/components/Forms';
import useStyles from './style';

const StationEdit = ({ resources, onChange }) => {
  const classes = useStyles();

  const handleFormChange = () => {};

  return (
    <div className={classes.root}>
      <Box className={classes.title}>
        <Box component={Typography} variant="h6">
          {resources.name}
        </Box>
        <Button size="small" onClick={() => onChange('close')}>
          Close
        </Button>
      </Box>
      <Divider className={classes.separator} />
      <main className={classes.main}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item>
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
      </main>
    </div>
  );
};

export default StationEdit;
