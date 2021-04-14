import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Box,
  Paper,
  Tab,
  Tabs,
  Button,
  Typography,
  InputBase,
  IconButton
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { AppTabPanel } from '@app/components/App';
// import { Img } from 'react-image';
// import { useSnackbar } from 'notistack';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GalleryList from './List';
import useStyles from './style';

const tabData = [
  { label: 'Stock Images', value: 'stockImage', url: 'stock-images' },
  { label: 'Stock Banners', value: 'stockBanner', url: 'stock-banners' },
  { label: 'Stock Logos', value: 'stockLogo', url: 'stock-logos' },
  { label: 'Stock Avatars', value: 'stockAvatar', url: 'stock-avatars' }
];

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
};

const GalleryContainer = ({ history }) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);
  const [openCreate, setOpenCreate] = useState(false);

  useEffect(() => {
    history.push(`/galleries/${tabData[currentTab].url}`);
  }, [currentTab]);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
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
          onClick={() => setOpenCreate(true)}
        >
          Add New Gallery
        </Button>
      </Box>
      <Box className={classes.main}>
        <Box className={classes.mainSidebar}>
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
        </Box>
        <Box component={Paper} className={classes.mainContent}>
          {tabData.map((el, index) => (
            <AppTabPanel
              key={index}
              value={currentTab}
              index={index}
              style={{ width: '100%' }}
            >
              <GalleryList
                type={el.value}
                openCreate={openCreate}
                setOpenCreate={setOpenCreate}
              />
            </AppTabPanel>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default withRouter(GalleryContainer);
