import React, { useState } from 'react';
import clsx from 'clsx';
import { Box } from '@material-ui/core';
import LessonTreeView from './TreeView';
import useStyles from './style';

const LessonContainer = () => {
  const classes = useStyles();
  const [treeData, setTreeData] = useState([]);
  const [treeLoading, setTreeLoading] = useState(false);
  const [openTreeView, setOpenTreeView] = useState(true);

  return (
    <Box className={classes.root}>
      <LessonTreeView
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
      ></main>
    </Box>
  );
};

export default LessonContainer;
