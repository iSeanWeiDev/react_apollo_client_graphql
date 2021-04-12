import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { useGroupingQuery } from '@app/utils/hooks/apollo';
import { TopologyTreeView } from '@app/components/TreeView';
import TStation from './Station';
// import TDistrict from './District';
// import TSchool from './School';
// import TClass from './Class';
import useStyles from './style';

const TopologyContainer = ({ match, history }) => {
  const classes = useStyles();
  const { params } = match;
  const [openTreeView, setOpenTreeView] = useState(true);
  const [currPage, setCurrPage] = useState('station');
  const stationData = useGroupingQuery({ schemaType: 'station' });
  // const districtData = useGroupingQuery({ schemaType: 'district' });
  // const schoolData = useGroupingQuery({ schemaType: 'school' });
  // const classData = useGroupingQuery({ schemaType: 'class' });

  useEffect(() => {
    if (params) {
      if (!params.type) history.push({ pathname: '/topologies/stations' });
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
  };

  const handleTreeChange = (type, value) => {
    if (type === 'close') setOpenTreeView(!openTreeView);
    console.log(type, value);
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
        {currPage === 'station' && (
          <TStation
            params={params}
            resources={stationData}
            onChange={handleStationChange}
          />
        )}
      </main>
    </div>
  );
};

export default withRouter(TopologyContainer);
