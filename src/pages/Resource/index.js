import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
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
import {
  Search as SearchIcon,
  ArrowBack as BackIcon,
  DeleteOutline as DeleteIcon
} from '@material-ui/icons';
import { Img } from 'react-image';
import { useGroupingQuery } from '@app/utils/hooks/apollo';
import ResourceTable from './Table';
import ResourceDetail from './Detail';
import useStyles from './style';

const ResourceContainer = ({ history, match }) => {
  const { params } = match;
  const classes = useStyles();
  const [loadedData, setLoadedData] = useState();
  const [selectedData, setSelectedData] = useState();
  const resourceData = useGroupingQuery({ schemaType: 'resource' });

  useEffect(() => {
    setLoadedData(resourceData);
  }, [resourceData]);

  useEffect(() => {
    if (params.id && resourceData) {
      const tmp = resourceData.find((el) => el['_id'] === params.id);
      setSelectedData({
        id: tmp['_id'],
        name: tmp.name,
        avatar: tmp.avatar?.url || '',
        title: tmp.desc?.title || '',
        long: tmp.desc?.long || '',
        version: tmp.version,
        status: tmp.status,
        schemaVer: tmp.schemaVer,
        schemaType: tmp.schemaType
      });
    }
  }, [params, resourceData]);

  const handleTableChange = (value) => {
    setSelectedData(value);
    history.push({ pathname: `/resources/${value.id}` });
  };

  const handleBack = () => {
    setSelectedData();
    history.goBack();
  };

  return (
    <Box className={classes.classes}>
      <Box className={classes.header}>
        {!selectedData ? (
          <React.Fragment>
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
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Box marginRight={2}>
                <IconButton color="inherit" onClick={handleBack}>
                  <BackIcon />
                </IconButton>
              </Box>
              <Img src={selectedData.avatar} width="50" height="50" />
              <Box marginLeft={2}>
                <Typography variant="h6">{selectedData.name}</Typography>
                <Typography variant="caption">Resource detail</Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <IconButton variant="contained" className={classes.addButton}>
                <DeleteIcon /> &nbsp; Remove
              </IconButton>
              &nbsp; &nbsp;
              <Button variant="contained" className={classes.addButton}>
                Save
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
      <Box component={Paper} className={classes.main}>
        {!selectedData && (
          <ResourceTable resources={loadedData} onChange={handleTableChange} />
        )}
        {selectedData && <ResourceDetail resources={selectedData} />}
      </Box>
    </Box>
  );
};

export default withRouter(ResourceContainer);