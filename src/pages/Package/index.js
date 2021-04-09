import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import {
  Box,
  Paper,
  Button,
  Typography,
  InputBase,
  IconButton
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { useGroupingQuery } from '@app/utils/hooks/apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { packaging } from '@app/api';
import { LoadingCard } from '@app/components/Cards';
import PreviewPackage from './Preview';
import PackageTable from './Table';
import useStyles from './style';

const PackageContainer = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [loadedData, setLoadedData] = useState([]);
  const [selectedData, setSelectedData] = useState();
  const resourceData = useGroupingQuery({ schemaType: 'package' });

  useEffect(() => {
    setLoading(true);
    if (resourceData) {
      setLoadedData(resourceData);
      setLoading(false);
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

  const handleTableChange = (value) => {
    setSelectedData(value);
  };

  const handlePackaging = async () => {
    try {
      const response = await packaging();
      console.log(response);
      enqueueSnackbar('Successfully packaged', { variant: 'success' });
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: 'error' });
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
          onClick={handlePackaging}
        >
          Packaging
        </Button>
      </Box>
      <LoadingCard
        loading={loading}
        height={`calc(100vh - 350px)`}
        component={Paper}
        className={clsx(classes.main, {
          [classes.mainMd]: !selectedData,
          [classes.mainSm]: !!selectedData
        })}
      >
        <PackageTable
          resources={loadedData}
          onChange={handleTableChange}
          dense={!!selectedData}
        />
      </LoadingCard>
      {selectedData && (
        <PreviewPackage
          resources={selectedData}
          onChange={() => setSelectedData()}
        />
      )}
    </Box>
  );
};

export default withRouter(PackageContainer);
