import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  InputBase,
  IconButton,
  Button
} from '@material-ui/core';
import { faSwatchbook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchIcon from '@material-ui/icons/Search';
import { useGroupingQuery } from '@app/utils/hooks/apollo';
import ResourceTable from './Table';
import useStyles from './style';

const ResourceContainer = () => {
  const classes = useStyles();
  const [loadedData, setLoadedData] = useState();
  const resourceData = useGroupingQuery({ schemaType: 'resource' });

  useEffect(() => {
    setLoadedData(resourceData);
  }, [resourceData]);

  return (
    <Box className={classes.classes}>
      <Box className={classes.header}>
        <Box component={Typography} variant="h5" className={classes.title}>
          <FontAwesomeIcon icon={faSwatchbook} />
          &nbsp; &nbsp; Resources
        </Box>
        <Box component={Paper} className={classes.search}>
          <InputBase
            className={classes.input}
            placeholder="Search resources... ... "
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
          Add New Resource
        </Button>
      </Box>
      <Box component={Paper} className={classes.main}>
        <ResourceTable resources={loadedData} />
      </Box>
    </Box>
  );
};

export default ResourceContainer;
