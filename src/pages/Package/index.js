import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Box,
  Paper,
  Button,
  Typography,
  InputBase,
  IconButton
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { Img } from 'react-image';
import { useSnackbar } from 'notistack';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { useGroupingQuery } from '@app/utils/hooks/apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PreviewPackage from './Preview';
import PackageTable from './Table';
import useStyles from './style';

const PackageContainer = () => {
  const classes = useStyles();
  const [loadedData, setLoadedData] = useState([]);
  const resourceData = useGroupingQuery({ schemaType: 'package' });

  useEffect(() => {
    if (resourceData) {
      setLoadedData(resourceData);
    }
  }, [resourceData]);

  const handleSearchChange = (e) => {
    const filterKey = e.target.value;
    if (filterKey.length >= 3) {
      const filteredData = resourceData.filter((el) =>
        el.name.toLowerCase().includes(filterKey.toLowerCase())
      );
      setLoadedData(filteredData);
    } else {
      setLoadedData(resourceData);
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Box component={Typography} variant="h5" className={classes.title}>
          <FontAwesomeIcon icon={faBox} />
          &nbsp; &nbsp; Packages
        </Box>
        <Box component={Paper} className={classes.search}>
          <InputBase
            className={classes.input}
            onChange={handleSearchChange}
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
          Publish
        </Button>
      </Box>
      <Box component={Paper} className={classes.main}>
        <PackageTable resources={loadedData} />
        {/* <PreviewPackage /> */}
      </Box>
    </Box>
  );
};

export default withRouter(PackageContainer);
