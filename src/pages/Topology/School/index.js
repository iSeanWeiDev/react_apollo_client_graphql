/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { Box, Paper, List } from '@material-ui/core';
import { useHistory, withRouter } from 'react-router-dom';
import { LoadingCard } from '@app/components/Cards';
import graphql from '@app/graphql';
import { isEmptyObject } from '@app/utils/data-format';
import DistrictHeader from './partials/Header';
import DistrictCard from './partials/Card';
import DistrictList from './partials/List';
import DistrictEdit from './Edit';
import useStyles from './style';

const TSchool = ({
  params,
  stationData,
  districtData,
  resources,
  onChange
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [openView, setOpenView] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [canUpdate, setCanUpdate] = useState(false);
  const [loadedData, setLoadedData] = useState([]);
  const [selectedData, setSelectedData] = useState();
  const [currStation, setCurrStation] = useState({});
  const [currMainWidth, setCurrMainWidth] = useState(null);

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
          schemaType: 'district'
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
          schemaType: 'district'
        },
        data: {
          grouping: tmp
        }
      });
    }
  });

  useEffect(() => {
    setLoadingPage(true);
    if (!params.pId) history.push({ pathname: '/topologies/stations' });

    if (resources && params.pId && stationData) {
      const districts = resources.filter(
        (el) => el.topology?.station === params.pId
      );

      const elPerRow = Math.floor(currMainWidth / 250);
      const countElLastRow = resources.length % elPerRow;
      const tmp = districts.slice();
      if (!openView) {
        for (let i = 0; i < elPerRow - countElLastRow + 1; i++) {
          tmp.push({ _id: i, name: '', status: 'fake_data' });
        }
      }
      setLoadedData(tmp);

      const station = stationData.find((el) => el['_id'] === params.pId);
      setCurrStation(station);
      setLoadingPage(false);
    }
  }, [params, resources, stationData, currMainWidth, openView]);

  const mainRef = useCallback((node) => {
    if (node !== null) {
      setCurrMainWidth(node.offsetWidth);
    }
  }, []);

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
            schemaType: 'district'
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

  const handleHeaderChange = async (type, value) => {
    try {
      if (type === 'back') {
        setSelectedData();
        setOpenView(false);
      }

      if (type === 'view') {
        onChange('view');
      }

      if (type === 'search') {
        const districts = resources.filter(
          (el) => el.topology?.station === params.pId
        );
        if (value.length >= 2) {
          const filteredData = districts.filter((el) =>
            el.name.toLowerCase().includes(value.toLowerCase())
          );
          setLoadedData(filteredData);
        } else {
          const elPerRow = Math.floor(currMainWidth / 250);
          const countElLastRow = resources.length % elPerRow;
          const tmp = districts.slice();
          if (!openView) {
            for (let i = 0; i < elPerRow - countElLastRow + 1; i++) {
              tmp.push({ _id: i, name: '', status: 'fake_data' });
            }
          }
          setLoadedData(tmp);
        }
      }

      if (type === 'save') {
        setLoadingSave(true);
        const response = await updateGrouping({
          variables: {
            id: selectedData['_id'],
            name: selectedData.name,
            schemaType: 'district',
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
      }

      if (type === 'delete') {
        const response = await deleteDocument({
          variables: {
            id: selectedData['_id'],
            schemaType: 'district'
          }
        });
        const { data } = response;
        setSelectedData();
        setOpenView(false);
        enqueueSnackbar(data.deleteDocument, { variant: 'success' });
      }
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleDistrictEditChange = (type, value) => {
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

  const handleDistrictListChange = (value) => {
    setOpenView(true);
    setSelectedData(value);
    onChange('view', value);
  };

  return (
    <Box className={classes.root}>
      <DistrictHeader
        loadingSave={loadingSave}
        canUpdate={canUpdate}
        selectedData={selectedData}
        stationData={currStation}
        className={classes.toolbar}
        onChange={handleHeaderChange}
      />
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
                  <DistrictCard
                    data={el}
                    key={el['_id']}
                    onChange={handleCardAction}
                  />
                )
              )}
            <Box component={List}>
              {openView &&
                loadedData.map((el) => (
                  <DistrictList
                    key={el['_id']}
                    data={el}
                    selectedData={selectedData}
                    onChange={handleDistrictListChange}
                  />
                ))}
            </Box>
          </Box>
          {openView && selectedData && (
            <Box component={Paper} className={classes.preview}>
              <DistrictEdit
                resources={selectedData}
                onChange={handleDistrictEditChange}
              />
            </Box>
          )}
        </Box>
      </LoadingCard>
    </Box>
  );
};

export default withRouter(TSchool);
