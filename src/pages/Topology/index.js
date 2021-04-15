import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { useGroupingQuery } from '@app/utils/hooks/apollo';
import { TopologyTreeView } from '@app/components/TreeView';
import TStation from './Station';
import TDistrict from './District';
import TSchool from './School';
// import TClass from './Class';
import useStyles from './style';

const TopologyContainer = ({ match, history }) => {
  const classes = useStyles();
  const { params } = match;
  const [openTreeView, setOpenTreeView] = useState(true);
  const [currPage, setCurrPage] = useState('stations');
  const stationData = useGroupingQuery({ schemaType: 'station' });
  const districtData = useGroupingQuery({ schemaType: 'district' });
  const schoolData = useGroupingQuery({ schemaType: 'school' });
  // const classData = useGroupingQuery({ schemaType: 'class' });

  useEffect(() => {
    if (params) {
      if (!params.type) history.push({ pathname: '/topologies/stations' });
      if (params.type) setCurrPage(params.type);
    }
  }, [params]);

  const handleStationChange = (type, value) => {
    if (type === 'view') {
      let pathname = '';
      setOpenTreeView(false);

      if (value) pathname = `/topologies/stations/${value['_id']}`;
      else pathname = `/topologies/stations`;
      history.push({ pathname });
    }

    if (type === 'body') {
      let pathname = `/topologies/districts/null/${value['_id']}`;
      history.push({ pathname });
    }
  };

  const handleDistrictChange = (type, value) => {
    if (type === 'view') {
      let pathname = '';
      setOpenTreeView(false);

      if (value)
        pathname = `/topologies/districts/${value['_id']}/${params.pId}`;
      else pathname = `/topologies/stations`;
      history.push({ pathname });
    }

    if (type === 'body') {
      let pathname = `/topologies/schools/null/${value['_id']}`;
      history.push({ pathname });
    }
  };

  const handleSchoolChange = (type, value) => {
    if (type === 'view') {
      const district = districtData.find((el) => el['_id'] === params.pId);
      const station = stationData.find(
        (el) => el['_id'] === district.topology.station
      );
      setOpenTreeView(false);

      if (value) {
        const pathname = `/topologies/schools/${value['_id']}/${params.pId}`;
        history.push({ pathname });
      } else {
        const pathname = `/topologies/districts/null/${station['_id']}`;
        history.push({ pathname });
        setCurrPage('districts');
      }
    }

    if (type === 'body') {
      // let pathname = `/topologies/classes/null/${value['_id']}`;
      // history.push({ pathname });
    }
  };

  const handleTreeChange = (type, value) => {
    if (type === 'close') setOpenTreeView(!openTreeView);
  };

  return (
    <div className={classes.root}>
      <TopologyTreeView open={openTreeView} onChange={handleTreeChange} />
      <main
        className={clsx({
          [classes.mainOpen]: openTreeView,
          [classes.mainClose]: !openTreeView
        })}
      >
        {currPage === 'stations' && (
          <TStation
            params={params}
            resources={stationData}
            onChange={handleStationChange}
          />
        )}
        {currPage === 'districts' && (
          <TDistrict
            params={params}
            stationData={stationData}
            resources={districtData}
            onChange={handleDistrictChange}
          />
        )}
        {currPage === 'schools' && (
          <TSchool
            params={params}
            stationData={stationData}
            districtData={districtData}
            resources={schoolData}
            onChange={handleSchoolChange}
          />
        )}
      </main>
    </div>
  );
};

export default withRouter(TopologyContainer);
