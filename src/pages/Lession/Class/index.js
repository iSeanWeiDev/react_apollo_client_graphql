import React, { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';
import {
  Grid,
  List,
  Box,
  Paper,
  Button,
  IconButton,
  InputBase,
  Typography,
  AppBar,
  Tab
} from '@material-ui/core';

import { Search as SearchIcon, Close as CloseIcon } from '@material-ui/icons';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingCard } from '@app/components/Cards';
import ClassCard from './partials/Card';
import ClassList from './partials/List';
import ClassDetail from './Detail';
import useStyles from './style';

const LessonClass = ({ resources }) => {
  const classes = useStyles();
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadedData, setLoadedData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [currMainWidth, setCurrMainWidth] = useState(null);
  const [openView, setOpenView] = useState(false);

  const mainRef = useCallback((node) => {
    if (node !== null) {
      setCurrMainWidth(node.offsetWidth);
    }
  }, []);

  useEffect(() => {
    setLoadingPage(true);
    if (resources && currMainWidth) {
      const elPerRow = Math.floor(currMainWidth / 250);
      const countElLastRow = resources.length % elPerRow;
      const tmp = resources.slice();
      if (!openView) {
        for (let i = 0; i < elPerRow - countElLastRow; i++) {
          tmp.push({ _id: i, name: '', status: 'fake_data' });
        }
      }

      setLoadedData(tmp);
      setLoadingPage(false);
    }
  }, [resources, currMainWidth, openView]);

  const handleCardAction = (type, value) => {
    if (type === 'view') {
      setOpenView(true);
      setSelectedData(value);
    }
  };

  const handleDetailChange = (type, value) => {
    if (type === 'close') {
      setOpenView(false);
      setSelectedData();
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.toolbar}>
        <Box component={Typography} variant="h5" className={classes.title}>
          <FontAwesomeIcon icon={faChalkboardTeacher} />
          &nbsp; &nbsp; Classes
        </Box>
        <Box component={Paper} className={classes.search}>
          <InputBase
            className={classes.input}
            // onChange={handleSearchChange}
            placeholder="Search classes... ... "
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
        <Button variant="contained" className={classes.addButton}>
          Add New Class
        </Button>
      </Box>
      <LoadingCard loading={loadingPage} height={`calc(100vh - 200px)`}>
        <Box className={classes.main}>
          <Box
            className={clsx({
              [classes.elements]: !openView,
              [classes.elementsOnView]: openView
            })}
            ref={mainRef}
          >
            {!openView &&
              loadedData.map((el) =>
                el.status === 'fake_data' ? (
                  <div key={el['_id']} style={{ width: 250, margin: 8 }}></div>
                ) : (
                  <ClassCard
                    data={el}
                    key={el['_id']}
                    onChange={handleCardAction}
                  />
                )
              )}
            <Box component={List}>
              {openView &&
                loadedData.map((el) => (
                  <ClassList
                    key={el['_id']}
                    data={el}
                    selectedData={selectedData}
                    onChange={(value) => setSelectedData(value)}
                  />
                ))}
            </Box>
          </Box>
          {openView && (
            <Box component={Paper} className={classes.preview}>
              <ClassDetail
                resources={selectedData}
                onChange={handleDetailChange}
              />
            </Box>
          )}
        </Box>
      </LoadingCard>
    </Box>
  );
};

export default LessonClass;
