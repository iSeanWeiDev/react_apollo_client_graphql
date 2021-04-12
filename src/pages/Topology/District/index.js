/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { Box, Paper, List } from '@material-ui/core';
import { useHistory, withRouter } from 'react-router-dom';
import { LoadingCard } from '@app/components/Cards';
import DistrictHeader from './partials/Header';
import DistrictCard from './partials/Card';
import DistrictList from './partials/List';
import useStyles from './style';

const TDistrict = ({ params, stationData, resources, onChange }) => {
  const classes = useStyles();
  const history = useHistory();
  const [openView, setOpenView] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadedData, setLoadedData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [currStation, setCurrStation] = useState({});
  const [currMainWidth, setCurrMainWidth] = useState(null);

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

  const handleCardAction = (type, value) => {
    if (type === 'view') {
      setOpenView(true);
      setSelectedData(value);
      onChange('view', value);
    }
  };

  return (
    <Box className={classes.root}>
      <DistrictHeader stationData={currStation} className={classes.toolbar} />
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
                    onChange={(value) => setSelectedData(value)}
                  />
                ))}
            </Box>
          </Box>
          {openView && (
            <Box component={Paper} className={classes.preview}></Box>
          )}
        </Box>
      </LoadingCard>
    </Box>
  );
};

export default withRouter(TDistrict);
