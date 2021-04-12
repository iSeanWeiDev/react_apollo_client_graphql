import React, { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';
import {
  List,
  Box,
  Paper,
  Button,
  IconButton,
  InputBase,
  Typography,
  CircularProgress
} from '@material-ui/core';
import {
  Search as SearchIcon,
  ArrowBack as BackIcon,
  DeleteOutline as DeleteIcon
} from '@material-ui/icons';
import { useMutation } from '@apollo/client';
import { Img } from 'react-image';
import { useSnackbar } from 'notistack';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingCard } from '@app/components/Cards';
import noLogo from '@app/assets/imgs/no-logo.jpg';
import graphql from '@app/graphql';
import { isEmptyObject } from '@app/utils/data-format';
import StationCreate from './Create';
import StationEdit from './Edit';
import StationCard from './partials/Card';
import StationList from './partials/List';
import useStyles from './style';

const TStation = ({ params, resources, onChange }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [canUpdate, setCanUpdate] = useState(false);
  const [loadedData, setLoadedData] = useState([]);
  const [selectedData, setSelectedData] = useState();
  const [currMainWidth, setCurrMainWidth] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const [deleteDocument] = useMutation(graphql.mutations.deleteDocument, {
    update(cache, { data: { deleteDocument } }) {
      const idx = deleteDocument.split(' ')[1];
      const existData = cache.readQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: 'station'
        }
      });

      if (isEmptyObject(existData.grouping)) {
        const tmp = existData.grouping.filter((el) => el['_id'] !== idx);
        cache.writeQuery({
          query: graphql.queries.grouping,
          variables: {
            schemaType: 'station'
          },
          data: {
            grouping: tmp
          }
        });
      }
    }
  });

  const [updateGrouping] = useMutation(graphql.mutations.updateGrouping, {
    update(cache, { data: { updateGrouping } }) {
      const existData = cache.readQuery({
        query: graphql.queries.grouping,
        variables: {
          schemaType: 'station'
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
          schemaType: 'station'
        },
        data: {
          grouping: tmp
        }
      });
    }
  });

  const mainRef = useCallback((node) => {
    if (node !== null) {
      setCurrMainWidth(node.offsetWidth);
    }
  }, []);

  useEffect(() => {
    setLoadingPage(true);
    if (isEmptyObject(resources) && currMainWidth) {
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

      if (params.type === 'stations' && params.typeId) {
        onChange('view');
        setOpenView(true);
        const tmp = resources.find((el) => el['_id'] === params.typeId);
        setSelectedData(tmp);
      }
    }
  }, [resources, currMainWidth, openView, params]);

  const handleSearchChange = (e) => {
    const filterKey = e.target.value;
    if (filterKey.length >= 2) {
      const filteredData = resources.filter((el) =>
        el.name.toLowerCase().includes(filterKey.toLowerCase())
      );
      setLoadedData(filteredData);
    } else {
      setLoadedData(resources);
    }
  };

  const handleCardAction = async (type, value) => {
    try {
      if (type === 'view') {
        setOpenView(true);
        setSelectedData(value);
        onChange('view', value);
      }

      if (type === 'delete') {
        const response = await deleteDocument({
          variables: {
            id: value['_id'],
            schemaType: 'station'
          }
        });
        const { data } = response;
        enqueueSnackbar(data.deleteDocument, { variant: 'success' });
      }
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleDetailChange = (type, value) => {
    if (type === 'close') {
      setOpenView(false);
      setSelectedData();
      onChange('view');
    } else {
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
    }
  };

  const handleBack = () => {
    setOpenView(false);
    setSelectedData();
    onChange('view');
  };

  const handleDelete = async () => {
    try {
      const response = await deleteDocument({
        variables: {
          id: selectedData['_id'],
          schemaType: 'station'
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
      setLoadingSave(true);
      const response = await updateGrouping({
        variables: {
          id: selectedData['_id'],
          name: selectedData.name,
          schemaType: 'station',
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
      setLoadingSave(false);
    } catch (error) {
      setLoadingSave(false);
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.toolbar}>
        {!selectedData ? (
          <React.Fragment>
            <Box component={Typography} variant="h5" className={classes.title}>
              <FontAwesomeIcon icon={faChalkboardTeacher} />
              &nbsp; &nbsp; Stations
            </Box>
            <Box component={Paper} className={classes.search}>
              <InputBase
                className={classes.input}
                onChange={handleSearchChange}
                placeholder="Search stations... ... "
                inputProps={{ 'aria-label': 'search stations' }}
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
              Add New Station
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <Box marginRight={2}>
                <IconButton
                  color="inherit"
                  style={{ color: 'white' }}
                  onClick={handleBack}
                >
                  <BackIcon />
                </IconButton>
              </Box>
              <Img
                src={
                  selectedData.avatar?.url ? selectedData.avatar?.url : noLogo
                }
                width="40"
                height="40"
              />
              <Box marginLeft={2} className={classes.title}>
                <Typography variant="h6">{selectedData.name}</Typography>
                <Typography variant="caption">Station detail</Typography>
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
              <Box position="relative">
                <Button
                  variant="contained"
                  className={classes.saveButton}
                  onClick={handleSave}
                  disabled={!canUpdate || loadingSave}
                >
                  Save
                  {loadingSave && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Button>
              </Box>
            </Box>
          </React.Fragment>
        )}
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
                  <StationCard
                    data={el}
                    key={el['_id']}
                    onChange={handleCardAction}
                  />
                )
              )}
            <Box component={List}>
              {openView &&
                loadedData.map((el) => (
                  <StationList
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
              <StationEdit
                resources={selectedData}
                onChange={handleDetailChange}
              />
            </Box>
          )}
        </Box>
      </LoadingCard>
      <StationCreate open={openCreate} onChange={() => setOpenCreate(false)} />
    </Box>
  );
};

export default TStation;
