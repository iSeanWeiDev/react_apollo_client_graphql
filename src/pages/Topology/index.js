import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { AppTreeView } from '@app/components/App';
import graphql from '@app/graphql';
import TStation from './Station';
import TDistrict from './District';
import TSchool from './School';
import TClass from './Class';
import useStyles from './style';

const TopologyContainer = ({ match, history }) => {
  const classes = useStyles();
  const [openTreeView, setOpenTreeView] = useState(true);
  const [loadedStationData, setLoadedStationData] = useState([]);
  const [loadedDistrictData, setLoadedDistrictData] = useState([]);
  const [loadedSchoolData, setLoadedSchoolData] = useState([]);
  const [loadedClassData, setLoadedClassData] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [selectedTopology, setSelectedTopology] = useState();

  const {
    loading: stationLoading,
    error: stationError,
    data: stationData
  } = useQuery(graphql.queries.grouping, {
    variables: { schemaType: 'station' },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  });

  const {
    loading: districtLoading,
    error: districtError,
    data: districtData
  } = useQuery(graphql.queries.grouping, {
    variables: { schemaType: 'district' },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  });

  const {
    loading: schoolLoading,
    error: schoolError,
    data: schoolData
  } = useQuery(graphql.queries.grouping, {
    variables: { schemaType: 'school' },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  });

  const {
    loading: classLoading,
    error: classError,
    data: classData
  } = useQuery(graphql.queries.grouping, {
    variables: { schemaType: 'class' },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  });

  useEffect(() => {
    if (!stationLoading && !stationError) {
      setLoadedStationData(stationData.grouping);
    }
  }, [stationLoading, stationData, stationError]);

  useEffect(() => {
    if (!districtLoading && !districtError) {
      setLoadedDistrictData(districtData.grouping);
    }
  }, [districtLoading, districtError, districtData]);

  useEffect(() => {
    if (!schoolLoading && !schoolError) {
      setLoadedSchoolData(schoolData.grouping);
    }
  }, [schoolLoading, schoolError, schoolData]);

  useEffect(() => {
    if (!classLoading && !classError) {
      setLoadedClassData(classData.grouping);
    }
  }, [classLoading, classError, classData]);

  const generateTreeStructure = (arr1, arr2, arr3, arr4) => {
    const tmp1 = [];
    arr1.forEach((station) => {
      const dis = arr2.filter((el) => el.topology?.station === station['_id']);
      const tmp2 = [];
      dis.forEach((district) => {
        const sch = arr3.filter(
          (el) =>
            el.topology?.district === district['_id'] ||
            el.topology?.station === station['_id']
        );

        const tmp3 = [];
        sch.forEach((school) => {
          const cls = arr4.filter(
            (el) =>
              el.topology?.school === school['_id'] ||
              el.topology?.district === district['_id'] ||
              el.topology?.station === station['_id']
          );
          tmp3.push({ parent: school, children: cls });
        });
        tmp2.push({ parent: district, children: tmp3 });
      });
      tmp1.push({ parent: station, children: tmp2 });
    });

    return tmp1;
  };

  useEffect(() => {
    const tmp = generateTreeStructure(
      loadedStationData,
      loadedDistrictData,
      loadedSchoolData,
      loadedClassData
    );

    setTreeData(tmp);
  }, [
    loadedStationData,
    loadedDistrictData,
    loadedSchoolData,
    loadedClassData
  ]);

  useEffect(() => {
    const { params } = match;
    switch (params.type) {
      case 'stations':
        setSelectedTopology(<TStation />);
        break;
      case 'districts':
        setSelectedTopology(<TDistrict />);
        break;
      case 'schools':
        setSelectedTopology(<TSchool />);
        break;
      case 'classes':
        setSelectedTopology(<TClass />);
        break;
      default:
        history.push({ pathname: '/topologies/stations' });
        break;
    }
  }, [match]);

  return (
    <div className={classes.root}>
      <AppTreeView
        open={openTreeView}
        resources={treeData}
        onChange={() => setOpenTreeView(!openTreeView)}
      />
      <main
        className={clsx({
          [classes.mainOpen]: openTreeView,
          [classes.mainClose]: !openTreeView
        })}
      >
        {selectedTopology}
      </main>
    </div>
  );
};

export default withRouter(TopologyContainer);
