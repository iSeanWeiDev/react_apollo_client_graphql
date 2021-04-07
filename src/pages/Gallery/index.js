import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Box,
  Paper,
  AppBar,
  Tab,
  Button,
  Typography,
  InputBase,
  IconButton
} from '@material-ui/core';
import {
  Search as SearchIcon,
  ArrowBack as BackIcon,
  DeleteOutline as DeleteIcon
} from '@material-ui/icons';
import { Img } from 'react-image';
import { useSnackbar } from 'notistack';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStyles from './style';

const GalleryContainer = () => {
  const classes = useStyles();
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Box component={Typography} variant="h5" className={classes.title}>
          <FontAwesomeIcon icon={faPhotoVideo} />
          &nbsp; &nbsp; Galleries
        </Box>
        <Box component={Paper} className={classes.search}>
          <InputBase
            className={classes.input}
            // onChange={handleSearchChange}
            placeholder="Search asset... ... "
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          className={classes.addButton}
          // onClick={() => setOpenCreate(!openCreate)}
        >
          Add New Gallery
        </Button>
      </Box>
      <Box component={Paper} className={classes.main}>
        <TabContext value={value} className={classes.tabContext}>
          <AppBar position="static" className={classes.appbar}>
            <TabList
              onChange={handleChange}
              classes={{
                indicator: classes.indicator
              }}
            >
              <Tab label="Images" value="1" />
              <Tab label="Banners" value="2" />
              <Tab label="Logos" value="3" />
              <Tab label="Avatars" value="4" />
            </TabList>
          </AppBar>
          <TabPanel value="1"></TabPanel>
          <TabPanel value="2"></TabPanel>
          <TabPanel value="3"></TabPanel>
          <TabPanel value="4"></TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default withRouter(GalleryContainer);
