import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Box } from '@material-ui/core';
import { useGroupingQuery } from '@app/utils/hooks/apollo';
import LessonTreeView from './TreeView';
import LessonClass from './Class';
import useStyles from './style';

const LessonContainer = () => {
  const classes = useStyles();
  const [treeData, setTreeData] = useState([]);
  const [treeLoading, setTreeLoading] = useState(false);
  const [openTreeView, setOpenTreeView] = useState(false);
  const classData = useGroupingQuery({ schemaType: 'class' });
  const materialData = useGroupingQuery({ schemaType: 'material' });

  const generateTreeStructure = (arr1, arr2) => {
    const tmpArr1 = [...arr1, ...arr2];

    let nodeObj = {};
    tmpArr1.forEach((el) => {
      nodeObj = {
        ...nodeObj,
        [el['_id']]: el
      };
    });
    return nodeObj;
  };

  useEffect(() => {
    setTreeLoading(true);
    if (materialData && classData) {
      const tmp = generateTreeStructure(classData, materialData);
      setTreeData(tmp);
      setTreeLoading(false);
    }
  }, [materialData, classData]);

  return (
    <Box className={classes.root}>
      <LessonTreeView
        loading={treeLoading}
        open={openTreeView}
        classData={classData}
        treeData={treeData}
        onChange={() => setOpenTreeView(!openTreeView)}
      />
      <main
        className={clsx({
          [classes.mainOpen]: openTreeView,
          [classes.mainClose]: !openTreeView
        })}
      >
        <LessonClass resources={classData} />
      </main>
    </Box>
  );
};

export default LessonContainer;
