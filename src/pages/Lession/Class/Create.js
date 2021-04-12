import React, { useEffect, useState } from 'react';
import { Dialog, Box, Container } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { useAppStateContext } from '@app/providers';
import { AppNavbar } from '@app/components/App';
import { TopologyTreeView } from '@app/components/TreeView';
import LessonStepper from './partials/Stepper';
import useStyles from './style';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateClass = ({ open, onChange }) => {
  const classes = useStyles();
  const [loadingTreeView, setLoadingTreeView] = useState(false);
  const [treeData, setTreeData] = useState({});
  const [appStateContext] = useAppStateContext();

  const handleClickOpen = () => {
    onChange(true);
  };

  const handleClose = () => {
    onChange(false);
  };
  useEffect(() => {
    setLoadingTreeView(true);
    if (Object.keys(appStateContext).length > 0) {
      setTreeData(appStateContext.topologies);
      setLoadingTreeView(false);
    }
  }, [appStateContext]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppNavbar
        position="relative"
        fullWidth
        canClose
        onChange={() => onChange(false)}
      />
      <main>
        <TopologyTreeView
          open
          preview
          loading={loadingTreeView}
          resources={treeData}
        />

        <Container className={classes.conatiner}>
          <LessonStepper />
        </Container>
      </main>
    </Dialog>
  );
};

export default CreateClass;
