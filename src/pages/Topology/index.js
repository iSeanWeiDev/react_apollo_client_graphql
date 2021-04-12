import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { useGroupingQuery } from '@app/utils/hooks/apollo';
import { TopologyTreeView } from '@app/components/TreeView';
import TStation from './Station';
import TDistrict from './District';
import TSchool from './School';
import TClass from './Class';
import useStyles from './style';

const TopologyContainer = ({ match, history }) => {
  const classes = useStyles();
  const { params } = match;
  const [openTreeView, setOpenTreeView] = useState(true);
  const [currPage, setCurrPage] = useState('');
  const stationData = useGroupingQuery({ schemaType: 'station' });
  const districtData = useGroupingQuery({ schemaType: 'district' });
  const schoolData = useGroupingQuery({ schemaType: 'school' });
  const classData = useGroupingQuery({ schemaType: 'class' });

  useEffect(() => {
    if (params) {
      if (!params.type) history.push({ pathname: '/topologies/stations' });
      switch (params.type) {
        case 'stations':
          setCurrPage('station');
          break;
        case 'districts':
          setCurrPage('district');
          break;
        case 'schools':
          setCurrPage('school');
          break;
        case 'classes':
          setCurrPage('class');
          break;
        default:
          break;
      }
    }
  }, [params]);

  return (
    <div className={classes.root}>
      <TopologyTreeView
        open={openTreeView}
        onChange={() => setOpenTreeView(!openTreeView)}
      />
      <main
        className={clsx({
          [classes.mainOpen]: openTreeView,
          [classes.mainClose]: !openTreeView
        })}
      >
        {currPage === 'station' && <TStation resources={stationData} />}
        {currPage === 'district' && (
          <TDistrict resources={districtData} stations={stationData} />
        )}
        {currPage === 'school' && (
          <TSchool resources={schoolData} districts={districtData} />
        )}
        {currPage === 'class' && (
          <TClass resources={classData} schools={schoolData} />
        )}
      </main>
    </div>
  );
};

export default withRouter(TopologyContainer);
