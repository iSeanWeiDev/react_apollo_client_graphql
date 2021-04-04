import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { useGroupingQuery } from '@app/utils/hooks/apollo';
import TreeView from './TreeView';
import TStation from './Station';
// import TDistrict from './District';
// import TSchool from './School';
// import TClass from './Class';
import useStyles from './style';

const TopologyContainer = ({ match, history }) => {
  const classes = useStyles();
  const [openTreeView, setOpenTreeView] = useState(true);
  const [treeData, setTreeData] = useState([]);
  const [treeLoading, setTreeLoading] = useState(false);
  const stationData = useGroupingQuery({ schemaType: 'station' });
  const districtData = useGroupingQuery({ schemaType: 'district' });
  const schoolData = useGroupingQuery({ schemaType: 'school' });
  const classData = useGroupingQuery({ schemaType: 'class' });

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
    setTreeLoading(true);
    if (stationData && districtData && schoolData && classData) {
      const tmp = generateTreeStructure(
        stationData,
        districtData,
        schoolData,
        classData
      );

      setTreeData(tmp);
      setTreeLoading(false);
    }
  }, [stationData, districtData, schoolData, classData]);

  return (
    <div className={classes.root}>
      <TreeView
        loading={treeLoading}
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
        <TStation resources={stationData} isOpenSide={openTreeView} />
      </main>
    </div>
  );
};

export default withRouter(TopologyContainer);
