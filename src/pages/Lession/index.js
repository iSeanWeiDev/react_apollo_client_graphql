import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Box } from '@material-ui/core';
import { useGroupingQuery } from '@app/utils/hooks/apollo';
import { LessonTreeView } from '@app/components/TreeView';
import LessonClass from './Class';
import useStyles from './style';

const LessonContainer = () => {
  const classes = useStyles();
  const [openTreeView, setOpenTreeView] = useState(false);
  const classData = useGroupingQuery({ schemaType: 'class' });
  const materialData = useGroupingQuery({ schemaType: 'material' });

  return (
    <Box className={classes.root}>
      <LessonTreeView
        open={openTreeView}
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
