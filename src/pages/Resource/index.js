import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/client';
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
import { useSnackbar } from 'notistack';
import { useGroupingQuery } from '@app/utils/hooks/apollo';
import graphql from '@app/graphql';
import ResourceTable from './Table';
import ResourceDetail from './Detail';
import CreateResource from './Create';
import useStyles from './style';

const ResourceContainer = ({ history, match }) => {
  const { params } = match;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [canUpdate, setCanUpdate] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [loadedData, setLoadedData] = useState();
  const [selectedData, setSelectedData] = useState();
  const resourceData = useGroupingQuery({ schemaType: 'resource' });

  const [createGrouping] = useMutation(graphql.mutations.createGrouping, {
    update(cache, { data: { createGrouping } }) {
      const existData = cache.readQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: 'resource'
        }
      });
      let data = existData ? existData.grouping.slice() : [];
      const idx = data.findIndex((el) => el['_id'] === createGrouping['_id']);
      if (idx > -1) {
        data[idx] = createGrouping;
      } else {
        data = [...data, createGrouping];
      }

      cache.writeQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: 'resource'
        },
        data: {
          grouping: data
        }
      });
    }
  });

  const [deleteDocument] = useMutation(graphql.mutations.deleteDocument, {
    update(cache, { data: { deleteDocument } }) {
      const idx = deleteDocument.split(' ')[1];
      const existData = cache.readQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: 'resource'
        }
      });

      const tmp = existData.grouping.filter((el) => el['_id'] !== idx);
      cache.writeQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: 'resource'
        },
        data: {
          grouping: tmp
        }
      });
    }
  });

  const [updateGrouping] = useMutation(graphql.mutations.updateGrouping, {
    update(cache, { data: { updateGrouping } }) {
      const existData = cache.readQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: 'resource'
        }
      });
      let tmp = existData.grouping.slice();
      const idx = tmp.findIndex((el) => el['_id'] === updateGrouping['_id']);
      if (idx > -1) {
        tmp[idx] = updateGrouping;
      }

      cache.writeQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: 'resource'
        },
        data: {
          grouping: tmp
        }
      });
    }
  });

  useEffect(() => {
    setCanUpdate(false);
    setLoadedData(resourceData);
  }, [resourceData]);

  useEffect(() => {
    if (params.id && resourceData) {
      const tmp = resourceData.find((el) => el['_id'] === params.id);
      setSelectedData(tmp);
    } else {
      setSelectedData();
    }
  }, [params, resourceData]);

  const handleTableChange = (value) => {
    setSelectedData(value);
    history.push({ pathname: `/resources/${value['_id']}` });
  };

  const handleBack = () => {
    setSelectedData();
    history.goBack();
  };

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

  const handleDetailChange = (type, value) => {
    if (type === 'avatar') {
      setSelectedData({
        ...selectedData,
        avatar: {
          ...selectedData.avatar,
          url: value
        }
      });
    } else {
      setSelectedData({
        ...selectedData,
        [type]: value
      });
    }

    setCanUpdate(true);
  };

  const handleCreateDialogChange = async (flag, value) => {
    try {
      if (flag) {
        await createGrouping({
          variables: {
            schemaType: 'resource',
            schemaVer: 1,
            version: 1,
            name: value.name,
            desc: {
              title: value.title,
              short: value.short,
              long: value.long
            }
          }
        });
        enqueueSnackbar('Successfully resource created!', {
          variant: 'success'
        });
      }
      setOpenCreate(false);
    } catch (error) {
      setOpenCreate(false);
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteDocument({
        variables: {
          id: selectedData['_id'],
          schemaType: 'resource'
        }
      });
      const { data } = response;
      enqueueSnackbar(data.deleteDocument, { variant: 'success' });
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleSave = async () => {
    try {
      const response = await updateGrouping({
        variables: {
          id: selectedData['_id'],
          name: selectedData.name,
          schemaType: 'resource',
          schemaVer: selectedData.schemaVer,
          version: selectedData.version,
          desc: {
            title: selectedData.desc?.title,
            short: selectedData.desc?.short,
            long: selectedData.desc?.long
          },
          tagList: selectedData.tagList,
          avatar: {
            type: selectedData.avatar?.type,
            url: selectedData.avatar?.url,
            name: selectedData.avatar?.name,
            iconUrl: selectedData.avatar?.iconUrl,
            mimeType: selectedData.avatar?.mimeType,
            altText: selectedData.avatar?.altText
          },
          body: selectedData.body
        }
      });
      const { data } = response;
      enqueueSnackbar(
        `Successfully User ${data.updateGrouping.name} updated.`,
        { variant: 'success' }
      );
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
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
                onChange={handleSearchChange}
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
            <Button
              variant="contained"
              className={classes.addButton}
              onClick={() => setOpenCreate(!openCreate)}
            >
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
              <Img src={selectedData.avatar?.url} width="50" height="50" />
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
              <IconButton
                variant="contained"
                className={classes.addButton}
                onClick={handleDelete}
              >
                <DeleteIcon /> &nbsp; Remove
              </IconButton>
              &nbsp; &nbsp;
              <Button
                variant="contained"
                className={classes.saveButton}
                onClick={handleSave}
                disabled={!canUpdate}
              >
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
        {selectedData && (
          <ResourceDetail
            resources={selectedData}
            onChange={handleDetailChange}
          />
        )}
      </Box>
      <CreateResource open={openCreate} onChange={handleCreateDialogChange} />
    </Box>
  );
};

export default withRouter(ResourceContainer);
